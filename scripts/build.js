const fs = require('fs-extra');
const sass = require('node-sass');
const inliner = require('sass-inline-svg');

const BUILD_TYPE_RELEASE = "release";
const BUILD_TYPE_DEVELOP = "dev";

const OUT_DIRECTORY_PATH = './dist';

exports.OUT_DIRECTORY_PATH = OUT_DIRECTORY_PATH;


let buildType = process.argv[2] || BUILD_TYPE_RELEASE;

let options = {
    file: './src/sabiz.scss',
    functions: {
        svg: inliner('./src', {optimize: true})
    }
};

switch(buildType) {
    case BUILD_TYPE_RELEASE:
        options.ouputStyle='compressed';
        break;
    default: // BUILD_TYPE_DEVELOP
        break;
}

sass.render(options,(error, result)=> {
    if (error) {
        console.error(error);
        return;
    }
    fs.mkdirsSync(OUT_DIRECTORY_PATH);
    fs.writeFileSync(`${OUT_DIRECTORY_PATH}/sabiz.css`, result.css.toString());
});
