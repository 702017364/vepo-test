(() => {
  const channel = new MessageChannel();
  const port1 = channel.port1;
  console.log('建立连接...');
  parent.window.postMessage('', '*', [channel.port2]);
  document.getElementById('post').addEventListener('click', () => {
    port1.postMessage(`洞妖洞妖，收到请回答`);
  }, false);
  port1.onmessage = e => {
    console.log('B：', e.data);
  };

  window.addEventListener('beforeunload', () => port1.close(), false);
})();

(() => { //此脚本存在父页面
  let connect = false;
  let fn;
  parent.window.addEventListener('message', fn = e => {
    const port2 = e.ports[0];
    if(!connect){
      console.log('连接成功');
      connect = true;
    }
    port2.onmessage = e => {
      console.log('A：', e.data);
      port2.postMessage('收到');
    };
  }, false);

  window.addEventListener('beforeunload', () => parent.window.removeEventListener('message', fn), false);
})();