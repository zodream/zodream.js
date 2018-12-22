"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Request {
    /**
     *
     */
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }
    get method() {
        return this.httpRequest.method;
    }
    get url() {
        return this.httpRequest.url;
    }
}
exports.Request = Request;
//# sourceMappingURL=request.js.map