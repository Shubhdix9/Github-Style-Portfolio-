const https = require('https');

const options = {
  hostname: 'api.github.com',
  path: '/repos/Schweinepriester/github-profile-achievements/contents/images',
  headers: {
    'User-Agent': 'Node-Fetch-Script'
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    try {
      const files = JSON.parse(data);
      if (Array.isArray(files)) {
        const fileNames = files.map(f => f.name);
        console.log(JSON.stringify(fileNames, null, 2));
      } else {
        console.log("Error parsing response:", data);
      }
    } catch (e) {
      console.log("Error parsing JSON:", e.message);
    }
  });
}).on('error', (err) => {
  console.log("Error fetching:", err.message);
});
