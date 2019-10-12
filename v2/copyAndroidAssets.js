const fs = require('fs');

const imagePath = './src/assets/images';
const imageDestPath = './android/app/src/main/res/drawable';

const filterHiddenFiles = filename => !/^\..*/.test(filename);
const files = fs.readdirSync(imagePath).filter(filterHiddenFiles);

const filesToCopy = files.reduce((acc, fileName) => {
  const [fileWithoutExt, fileExt] = fileName.split('.');
  const fileWithoutQuality = fileWithoutExt.replace(/@\dx/gm, '');
  const higherQualityFile = `${fileWithoutQuality}@3x.${fileExt}`;

  // Does a higher quality image exist and have we already included it?
  if (files.includes(higherQualityFile) && !acc.includes(higherQualityFile)) {
    acc.push(higherQualityFile);
    return acc;

    // Does no higher quality image exist?
  } else if (!files.includes(higherQualityFile)) {
    acc.push(fileName);
    return acc;
  }

  return acc;
}, []);

for (const file of filesToCopy) {
  const sanitizedFile = file.replace(/@\dx/gm, '').toLowerCase();

  fs.copyFileSync(`${imagePath}/${file}`, `${imageDestPath}/${sanitizedFile}`);
}
