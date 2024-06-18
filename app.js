const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const chalk= require('chalk')
yargs.command({
    command : 'remove',
    describe : 'path to be removed',
    builder : {
        path : {
            describe : 'url is here',
            demandOption : true ,
            type : 'string'
        },
        r : {
            describe : 'option to remove contents recursively',
            demandOption : false ,
            type : 'boolean'
        }
    },
    handler(argv) {
        const targetPath = path.resolve(argv.path)
        remove(targetPath,argv.r)
    }
})
const remove = (filePath,recursion) => {
  if (!fs.existsSync(filePath)) {
    console.log(chalk.red.inverse("no file found in da path"));
    return;
  }

  const stats = fs.lstatSync(filePath);

  if (stats.isDirectory()) {
    if (!recursion) {
      console.log(chalk.red.inverse("recursive deletion is not enabled"))
      return;
    }
    // Recursively remove directory contents
    fs.readdirSync(filePath).forEach(file => remove(path.join(filePath, file),recursion));
    fs.rmdirSync(filePath);
  } else {
    // Remove file
    fs.unlinkSync(filePath);
  }
  console.log(chalk.green.inverse("job done!"))};
yargs.parse()

