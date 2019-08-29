/* 卸载安装包 */
import fs from 'fs';

fs.readFile('../package.json', 'utf8', (err, data) => {
  if(err) throw err;
  const option = JSON.parse(data);
  const packages = Object.assign(option.dependencies, option.devDependencies);
  Object.keys(packages).forEach(task => {
    exec(`npm uninstall ${task}`, (err, stdout, stderr) => {
      console.log(`uninstall ${task} ${err ? 'failure' : 'success'}`);
    });
  });
});