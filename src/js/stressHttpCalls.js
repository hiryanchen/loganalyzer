const https = require('https');
const colors = require('colors');

if (process.argv.length <3) {
  console.log(
      colors.red('Calculates how many times keyword appear in stress calls\n') +
      colors.red('Usage: node stressHttpCalls.js <host> <path> <keyword>'));
} else {
  const host = process.argv[2] || 'www.google.com';
  const path = process.argv[3] || '/';
  const keyword = process.argv[4] || 'a';
  const SAMPLE_SIZE = 100;

  let httpCount = 0;
  let resultCount = 0;

  for (let i=1; i<=SAMPLE_SIZE; i++) {
    const finalPath = path + Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    //console.log(host);
    //console.log(finalPath);
    https.get({
      hostname: host,
      path: finalPath
    }, response => {
      response.setEncoding('utf8');
      response.on('data', d => {
        //console.log(d);
        if (d.indexOf(keyword) > -1) {
          resultCount = resultCount + 1;
        }
        httpCount++;
        if (httpCount >= SAMPLE_SIZE) {
          console.log(
              'Result: ' + colors.green(resultCount) + ' / ' + SAMPLE_SIZE);
        }
      });
    });
  }
}
