const fs = require('fs-extra');
const build = require('./build');

let destPath = '';
let sourcePath = build.OUT_DIRECTORY_PATH;

switch(process.platform) {
    case 'darwin':
        destPath = `${process.env["HOME"]}/Library/ApplicationSupport/abnerworks.Typora/themes`;
        break;
    case 'win32':
        destPath = `${process.env["USERPROFILE"]}\\AppData\\Roaming\\Typora\\themes`;
        break;
    case 'linux':
        destPath = `${process.env["HOME"]}/.config/Typora/themes`;
        break;
    default:
        console.error("Not Supported...");
        process.exit(1);
}

if(!fs.existsSync(destPath)) {
    console.error("themes directory not found.");
    process.exit(1);
}

if(!fs.existsSync(sourcePath)) {
    console.error("dist directory not found.");
    process.exit(1);
}

let copyFiles = fs.readdirSync(sourcePath);

copyFiles.forEach((name) => {
    fs.copySync(`${sourcePath}/${name}`, `${destPath}/${name}`);
});


