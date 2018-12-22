"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const router_1 = require("./router");
const request_1 = require("./request");
const response_1 = require("./response");
class Web {
    constructor() {
        this.route = new router_1.Router();
        this.env = process.env.NODE_ENV || 'development';
    }
    /**
     * listen
     */
    listen(port = 3000, ...args) {
        http_1.default.createServer(this.handle.bind(this)).listen(port, ...args);
    }
    handle(req, resp) {
        const request = new request_1.Request(req), response = new response_1.Response(resp);
        this.route.match(request).handle_reques(request, response);
        response.send();
    }
}
exports.Web = Web;
//# sourceMappingURL=web.js.map