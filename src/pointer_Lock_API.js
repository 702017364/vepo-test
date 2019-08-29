(() => {
  const body = document.body;
  const button = document.getElementById('button');
  const text = button.textContent;
  button.addEventListener('click', () => {
    if(document.pointerLockElement){
      document.exitPointerLock();
      button.style.display = 'none';
    } else{
      body.requestFullscreen();
      button.textContent = '点击释放指针（鼠标）';
    }
  }, false);
  document.addEventListener('fullscreenchange', () => {
    const ele = document.fullscreenElement;
    if(ele == body){
      console.log('进入全屏');
      button.requestPointerLock();
    } else if(!ele){
      console.log('退出全屏');
      button.textContent = text;
      button.style.display = '';
    }
  }, false);
  document.addEventListener('pointerlockchange', () => {
    if(document.pointerLockElement){
      console.log('锁定指针');
    } else{
      console.log('释放指针');
    }
  }, false);
})();