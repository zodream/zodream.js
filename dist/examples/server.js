"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../src/server");
const app = new server_1.Web(), port = 3000;
app.route.get('/api', function (req, resp) {
    resp.json({
        code: 200,
        message: 'Hi'
    });
});
app.listen(port, () => {
    console.log('  App is running at http://localhost:%d', port);
    console.log('  Press CTRL-C to stop\n');
});
//# sourceMappingURL=server.js.map