const express = require('express');
const next = require('next');
const routes = require('./src/routes');
const nextConfig = require('./next.config');

const isLocal = process.env.NODE_ENV === 'local';
const app = next({ dev: isLocal, dir: './src', conf: nextConfig });
const handle = routes.getRequestHandler(app);

app.prepare()
  .then(() => {
    const server = express();

    server.get('/health', (req, res) => {
      res.send('I am healthy');
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    const port = process.env.PORT || 8080;
    const listener = server.listen(port, (err) => {
      if (err) throw err;
      console.log('> Ready on ' + port);
    });


    // Register Signals
    const closeListener = () => {
      listener.close((err) => {
        if (err) {
          console.log(err);
          process.exit(1);
        }
      });
    };

    process.on('SIGINT', () => {
      console.info('SIGINT signal received.')
      closeListener();
    });
    process.on('SIGTERM', function () {
      console.log('SIGTERM received');
      closeListener();
    });
  })
  .catch(exc => {
    console.error(exc.stack);
    process.exit(1);
  });
