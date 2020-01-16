document.querySelector('button').addEventListener('click', function(){
  this.disabled = true;
  const ws = new WebSocket('ws://localhost:8823');
  let logError = false;
  ws.onopen = e => {
    console.log('连接服务器成功');
    ws.send(Math.random().toString());
  };
  
  ws.onclose = e => {
    logError || console.log('服务器关闭');
    this.disabled = false;
  };
  
  ws.onerror = e => {
    console.log('连接出错：', '请确认是否开启服务端');
    logError = true;
  };
  
  const $span = document.querySelector('span');
  const $text = document.createTextNode('（该时间是通过 WebSocket 从服务端推送过来）');
  let first = true;
  ws.onmessage = e => {
    first && (first = false, $span.parentNode.appendChild($text));
    $span.textContent = e.data;
  };
  
  window.addEventListener('beforeunload', () => ws.close());
}, false);