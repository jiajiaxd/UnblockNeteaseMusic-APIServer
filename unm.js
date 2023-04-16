const match = require('@unblockneteasemusic/server');
const http = require('http');
const url = require('url');

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (parsedUrl.pathname === '/get') {
    const id = parsedUrl.query.id;
    if (id) {
      try {
        const result = await match(id, ['qq', 'kugou', 'kuwo', 'migu']);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      }
    } else {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Bad Request: Missing id parameter');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(42985, () => {
  console.log('Server is listening on port 42985');
});