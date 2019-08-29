/* 创建 websocket */
import ws from 'nodejs-websocket';

const server = ws.createServer(conn => {
  conn.on('text', value => {
    console.log('收到客户端信息：' + value);
    const interval = setInterval(() => {
      conn.sendText(new Date().toLocaleString());
    }, 1000);
    conn.on('close', () => {
      clearInterval(interval);
      console.log('连接被关闭');
    });
  });
}).listen(9990);

module.exports = server;