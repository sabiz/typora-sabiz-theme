const fs = require('fs-extra');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const cssnano = require('cssnano');
const path = require('path');

const BUILD_TYPE_RELEASE = "release";
const BUILD_TYPE_DEVELOP = "dev";

const OUT_DIRECTORY_PATH = './dist';
exports.OUT_DIRECTORY_PATH = OUT_DIRECTORY_PATH;

if (require.main !== module) {
    return;
}

let buildType = process.argv[2] || BUILD_TYPE_RELEASE;

const inputCssPath = path.resolve('./src/main.css');
const outputCssPath = path.resolve(`${OUT_DIRECTORY_PATH}/sabiz.css`);

fs.removeSync(OUT_DIRECTORY_PATH);

fs.mkdirsSync(OUT_DIRECTORY_PATH);

const plugins = [
    autoprefixer(),
    postcssImport(),
];
if (buildType === BUILD_TYPE_RELEASE) {
    plugins.push(cssnano());
}

fs.readFile(inputCssPath, (err, css) => {
    if (err) throw err;
    postcss(plugins)
        .process(css, { from: inputCssPath, to: outputCssPath })
        .then(result => {
            fs.writeFileSync(outputCssPath, result.css);
            if (result.map) {
                fs.writeFileSync(outputCssPath + '.map', result.map.toString());
            }
            fs.copySync('./src/res', `${OUT_DIRECTORY_PATH}/sabiz`);
        })
        .catch(e => {
            console.error(e);
            process.exit(1);
        });
});