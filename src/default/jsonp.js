class Jsonp{
  constructor(path){
    this.path = path;
  }

  then(option){
    const $script = document.createElement('script');
    $script.src = this.path;
    window.$jsonp = {
      data: option.data,
      callback(value){
        $script.remove();
        option.success(value);
      },
    }
    document.body.appendChild($script);
  }
}

const jsonp = new Jsonp('./json-callbakc.js');
const $arg1 = document.querySelector('input');
const $arg2 = $arg1.nextElementSibling;
const $button = $arg2.nextElementSibling;
const $result = $button.nextElementSibling;
$button.addEventListener('click', () => {
  jsonp.then({
    data: {
      a: $arg1.valueAsNumber || 0,
      b: $arg2.valueAsNumber || 0,
    },
    success(value){
      $result.value = value;
    },
  })
}, false);