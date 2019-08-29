/* 动态拷贝 js 库 */
import {exec} from 'child_process';

(async () => {
  const packages = require('../static/libs.json');
  for(let i = 0, j = packages.length; i < j; i++){
    await new Promise((resolve) => {
      const pkg = packages[i];
      exec(`npm run copy ${pkg}`, (err) => {
        if(err) throw err;
        console.log(`Successful copy ${pkg}`);
        resolve(); 
      });
    });
  }
})();