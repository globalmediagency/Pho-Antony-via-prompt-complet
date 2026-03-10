import fs from 'fs';
import https from 'https';
import path from 'path';

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

const files = [
  { id: '1BtxYH1SsJJGx5jBAVeQ4STmGmOfOIggT', name: 'hero.jpg' },
  { id: '1JPZjOnHm676Ue79OqO-6htHB4xNhnVHv', name: 'restaurant2.jpg' },
  { id: '1qk8trTYn8RbitMtj_8oz0xSSvp-6L13Q', name: 'team.jpg' },
  { id: '1hnpkwDXG93HaIQx7m4KWoQyXdgYSwFxm', name: 'pho.jpg' },
  { id: '18PVt_pn1QBTSP2THIzacv258lTBP3nYn', name: 'bobun.jpg' },
  { id: '1ZrnFCSQUY4hquMmn3zHyF4EWEuZczBtT', name: 'loclac.jpg' },
  { id: '1EA1NTWd-6LAoVUHm1Y_IINEhHJbA4k9-', name: 'banhcuon.jpg' }
];

async function run() {
  fs.mkdirSync('public/images', { recursive: true });
  for (const f of files) {
    console.log(`Downloading ${f.name}...`);
    try {
      await downloadFile(`https://drive.google.com/uc?export=download&id=${f.id}`, `public/images/${f.name}`);
      console.log(`Downloaded ${f.name}`);
    } catch (e) {
      console.error(`Failed to download ${f.name}`, e);
    }
  }
}
run();
