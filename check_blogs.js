const http = require('http');
http.get('http://localhost:3000/api/site-data', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    console.log(JSON.stringify(json.data.blogs, null, 2));
  });
});
