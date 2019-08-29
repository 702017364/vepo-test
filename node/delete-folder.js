/* 功能：删除指定目录 */
import fs from 'fs';
import path from 'path';
import minimist from 'minimist';

const deleteFolder = (folder) => {
  fs.readdirSync(folder).forEach((name) => {
    const file = path.join(folder, name);
    if(fs.lstatSync(file).isDirectory()){
      deleteFolder(file);
    } else{
      fs.unlinkSync(file);
      console.log(`删除文件 ${name}`);
    }
  });
  fs.rmdirSync(folder);
  console.log(`删除目录 ${folder}`);
};

const folder = minimist(process.argv.slice(2))._;
folder && folder.forEach((folder) => {
  if(fs.existsSync(folder)){
    if(fs.lstatSync(folder).isDirectory()){
      deleteFolder(folder);
    } else{
      fs.unlinkSync(folder);
    }
  } else{
    console.log('不存在的目录');
  }
});