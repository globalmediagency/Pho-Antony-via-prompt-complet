import fs from 'fs';
import https from 'https';

const downloadFile = (url: string, dest: string) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 303) {
        return downloadFile(response.headers.location!, dest).then(resolve).catch(reject);
      }
      const file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(true);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

async function run() {
  console.log('Downloading logo...');
  try {
    await downloadFile('https://drive.google.com/uc?export=download&id=1Frb-07yUjuOevp6HvNmmCQSiNRbmhDiG', 'public/logo.png');
    console.log('Downloaded logo.png');
  } catch (e) {
    console.error('Failed to download logo', e);
  }
}
run();
