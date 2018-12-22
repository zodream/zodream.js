import { Web, Response } from '../src/server';

const app = new Web(),
    port = 3000;

app.route.get('/api', function(req, resp: Response) {
    resp.json({
        code: 200,
        message: 'Hi'
    });
});

app.listen(port, () => {
    console.log(
        '  App is running at http://localhost:%d',
        port
      );
      console.log('  Press CTRL-C to stop\n');
});