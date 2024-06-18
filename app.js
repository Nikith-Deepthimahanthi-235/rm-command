
const fs = require('fs');
const path = require('path');
const yargs = require('yargs');

yargs.command({
    command : 'remove',
    describe : 'path to be removed',
    builder : {
        url : {
            describe : 'url is here',
            demandOption : true ,
            type : 'string'
        },
        rOption : {
            describe : 'option to remove contents recursively',
            demandOption : false ,
            type : 'boolean'
        }
    },

    handler(argv) {
        const targetPath = path.resolve(argv.url)
        remove(targetPath,argv.rOption)
    }
})
const remove = (filePath,recursion) => {
  console.log(recursion)
  if (!fs.existsSync(filePath)) {
    console.log("brrr");
    return;
  }

  const stats = fs.lstatSync(filePath);

  if (stats.isDirectory()) {
    if (!recursion) {
      console.log("grrrrr")
      return
    }
    // Recursively remove directory contents
    fs.readdirSync(filePath).forEach((file) => remove(path.join(filePath, file)));
    fs.rmdirSync(filePath);
  } else {
    // Remove file
    fs.unlinkSync(filePath);
  }
};
yargs.parse()

