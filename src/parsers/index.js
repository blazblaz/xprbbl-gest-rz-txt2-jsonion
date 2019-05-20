import { path, join } from "path"
const { readdir, stat } = require("fs").promises


// async getDirs function
export const getDirs = function(rootDir, cb) { 
  fs.readdir(rootDir, function(err, files) { 
      var dirs = []; 
      for (var index = 0; index < files.length; ++index) { 
        var file = files[index]; 
        if (file[0] !== '.') { 
          var filePath = rootDir + '/' + file; 
          fs.stat(filePath, function(err, stat) {
            if (stat.isDirectory()) { 
              dirs.push(this.file); 
            } 
            if (files.length === (this.index + 1)) { 
              return cb(dirs); 
            } 
          }.bind({index: index, file: file})); 
        }
    }
  });
}

// async getDirectories function
export const getDirectories = async path => {
  let dirs = []
  for (const file of await readdir(path)) {
    if ((await stat(join(path, file))).isDirectory()) {
      dirs = [...dirs, file]
    }
  }
  return dirs
}


/*
path.resolve(__dirname, file)

const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories = source =>
  readdirSync(source).map(name => join(source, name)).filter(isDirectory)
*/


export const function encode_utf8(s) {
  return unescape(encodeURIComponent(s));
}


function getLineFS(filename, line_no, callback) {
    fs.readFile(filename, function (err, data) {
      if (err) throw err;

      // Data is a buffer that we need to convert to a string
      // Improvement: loop over the buffer and stop when the line is reached
      var lines = data.toString('utf-8').split("\n");

      if(+line_no > lines.length){
        return callback('File end reached without finding line', null);
      }

      callback(null, lines[+line_no]);
    });
}

getLineFS('./file.txt', 9, function(err, line){
  console.log('The line: ' + line);
})





fs.readFile('JournalDEV.txt', 'utf8', readData);


function readData(err, data) {
    console.log(data);
}