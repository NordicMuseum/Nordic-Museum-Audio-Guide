const fs = require('fs');

const audioAssetsPath = './src/assets/audio';
const destAssetsPath = './android/app/src/main/res/raw';

const filterHiddenFiles = filename => !/^\..*/.test(filename);
const folderNames = fs.readdirSync(audioAssetsPath).filter(filterHiddenFiles);

for (const folderName of folderNames) {
  const audioPath = `${audioAssetsPath}/${folderName}`;
  const audioFiles = fs
    .readdirSync(`${audioAssetsPath}/${folderName}`)
    .filter(filterHiddenFiles);

  for (const audioFileName of audioFiles) {
    fs.copyFileSync(
      `${audioPath}/${audioFileName}`,
      `${destAssetsPath}/audio_${audioFileName.toLowerCase()}`,
    );
  }
}
