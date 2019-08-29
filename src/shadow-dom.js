const cssStyle = { //优化获取外部css
  _queue: [],
  then(callback){
    if(this._wait){
      this._queue.push(callback);
    } else{
      const value = this._value;
      if(typeof value == 'string'){
        return callback(value);
      } else{
        this._wait = true;
        this._queue.push(callback);
        fetch('./shadow-dom.css')
          .then(res => res.text())
          .then(value => {
            this._wait = false;
            const matchs = value.match(/\/\*\s*shadow dom\s*\*\/([\s\S]+$)/i);
            this.action(matchs && matchs[1]);
          });
      }
    }
  },
  action(value = ''){
    this._value = value;
    this._queue.forEach(callback => callback(value));
    delete this._queue;
  },
};

class HTMLCalc{
  constructor(obj, mode){
    //mode设置外部js是否可以访问 shodow dom（值为 'open' 时，可通过自定义元素的 shadowRoot 属性进行访问）
    const shadow = obj.attachShadow({mode});
    this.list = [];
    this.createWrapper(shadow);
    this.createStyle(shadow);
    this.createImportStyle(shadow);
  }

  //标准中已经废除使用 /deep/ 或 ::shadow 对 shadow dom 进行穿透
  //解决方法：使用 @import 样式表（不用担心网络问题，因为浏览器对其做了优化，只会加载一次，之后都将使用缓存）
  createImportStyle(shadow){
    const style = document.createElement('style');
    style.textContent = `@import 'shadow-dom-import.css'`;
    shadow.appendChild(style);
  }

  createStyle(shadow){
    cssStyle.then(value => {
      const style = document.createElement('style');
      style.textContent = value;
      shadow.appendChild(style);
    });
  }

  createWrapper(shadow){
    const wrap = document.createElement('div');
    wrap.className = 'wrap';
    this.createInput(wrap, 'input-first');
    this.createSymbol(wrap, '+');
    this.createInput(wrap, 'input-second');
    this.createSymbol(wrap, '=');
    this.createResult(wrap);
    shadow.appendChild(wrap);
  }

  createInput(parent, pseudo){
    const init = 0;
    const {
      list,
    } = this;
    const input = document.createElement('input');
    input.type = 'number';
    input.setAttribute('placeholder', init);
    input.setAttribute('pseudo', pseudo);
    const index = list.push(init) - 1;
    input.addEventListener('blur', () => {
      list[index] = input.valueAsNumber || 0;
      this.result.textContent = list.reduce((a, b) => a + b, 0);
    }, false);
    parent.appendChild(input);
  }

  createSymbol(parent, symbol){
    const span = document.createElement('span');
    span.textContent = symbol;
    parent.appendChild(span);
  }

  createResult(parent){
    const section = this.result = document.createElement('section');
    section.textContent = 0;
    parent.appendChild(section);
  }
}

class HTMLFCalc extends HTMLElement{
  constructor(){
    super();
    new HTMLCalc(this, 'open');
  }
}
customElements.define('f-calc', HTMLFCalc);

class HTMLUCalc extends HTMLDivElement{
  constructor(){
    super();
    new HTMLCalc(this, 'closed');
  }
}
customElements.define('u-calc', HTMLUCalc, {
  extends: 'div',
});