import fetch from 'node-fetch';
import fs from 'fs/promises';
import http, {IncomingMessage, ServerResponse} from 'http';
import path from 'path';
import url from 'url';

import { Joke } from './interfaces';

async function requestListener(req: IncomingMessage, res: ServerResponse) {
  const parsedUrl = url.parse(req.url || '', true);
  const pathName = parsedUrl.pathname;

  // Serve CSS files
  if (pathName?.endsWith('.css')) {
    try {
      const filePath = path.join(__dirname, `static${pathName}`);
      const cssData = await fs.readFile(filePath, 'utf-8');
      res.writeHead(200, {'Content-Type': 'text/css', 'Content-Length': cssData.length});
      res.write(cssData);
      res.end();
      return;
    } catch (error) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.end('CSS file not found');
      return;
    }
  }

  let data = "";

  try {
    let htmlPathName = pathName;

    if (htmlPathName === '/') {
      htmlPathName = "/index";
    }

    const filePath = path.join(__dirname, `static${htmlPathName}.html`)

    data = await fs.readFile(filePath, 'utf-8');
  } catch (error) {
    data = await fs.readFile(path.join(__dirname, 'static/404.html'), 'utf-8');
    console.error('Error reading file:', error);
  }

  if (pathName === '/joke') {
    const response = await fetch('https://icanhazdadjoke.com', {
      headers: {
        'Accept': 'application/json',
        "user-agent": "NodeJS Server - Learning TypeScript"
      }
    })

    const joke: Joke = await response.json();

    data = data.replace(/{{joke}}/gm, joke.joke);
  }

  res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': data.length});
  res.write(data);
  res.end();
}

http.createServer(requestListener).listen(3000, () => {
  console.log('🚀 Server is running on http://localhost:3000');
})