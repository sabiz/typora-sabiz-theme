const fs = require('fs-extra');
const sass = require('sass');

const BUILD_TYPE_RELEASE = "release";
const BUILD_TYPE_DEVELOP = "dev";

const OUT_DIRECTORY_PATH = './dist';

exports.OUT_DIRECTORY_PATH = OUT_DIRECTORY_PATH;

if (require.main !== module) {
    return;
}

let buildType = process.argv[2] || BUILD_TYPE_RELEASE;

let options = {};

switch(buildType) {
    case BUILD_TYPE_RELEASE:
        options.style ='compressed';
        break;
    default: // BUILD_TYPE_DEVELOP
        break;
}

fs.removeSync(OUT_DIRECTORY_PATH);

let result = sass.compile('./src/main.scss', options);
// console.log(result);
fs.mkdirsSync(OUT_DIRECTORY_PATH);
fs.writeFileSync(`${OUT_DIRECTORY_PATH}/sabiz.css`, result.css.toString());

fs.copySync('./src/res', `${OUT_DIRECTORY_PATH}/sabiz`);