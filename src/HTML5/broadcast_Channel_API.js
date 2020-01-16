const name = 'channel_html';

(() => { //子页面发送信息
  const bc = new BroadcastChannel(name);
  let count = 0;
  document.getElementById('BroadcastChannel').addEventListener('click', () => {
    bc.postMessage(++count);
  }, false);
  window.addEventListener('beforeunload', () => bc.close(), false);
})();

(() => { //父页面注册事件接收信息（在这里是为了测试要求，才在本页面中做以下操作）
  const bc = new parent.BroadcastChannel(name);
  bc.onmessage = function(e){
    console.log('接收到子页面发送过来的信息：', e.data);
  };
})();