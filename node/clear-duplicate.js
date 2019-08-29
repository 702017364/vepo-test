/* 清除指定路径下重复的文件（不包含子目录） */
import fs from 'fs';
import path from 'path';
import minimist from 'minimist';
import md5 from 'md5';

let folder = minimist(process.argv.slice(2))._;
if(folder && (folder = folder[0]) && fs.existsSync(folder)){
  const opt = {};
  fs.readdirSync(folder).forEach(name => {
    const file = path.join(folder, name);
    const stat = fs.lstatSync(file);
    stat.isDirectory() || fs.readFile(file, (err, buf) => {
      if(err) return console.log(err);
      const key = md5(buf);
      if(key in opt){
        fs.unlinkSync(file);
        console.log(`delete ${name}`);
      } else{
        opt[key] = true;
      }
    });
  });
}