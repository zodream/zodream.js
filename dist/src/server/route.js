"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_method_1 = require("./http-method");
const HTTP_METHODS = [http_method_1.HttpMethod.GET, http_method_1.HttpMethod.POST, http_method_1.HttpMethod.PUT, http_method_1.HttpMethod.DELETE, http_method_1.HttpMethod.HEAD];
class Route {
    /**
     *
     */
    constructor(path, handle, methods = HTTP_METHODS) {
        this.path = path;
        this.handle = handle;
        this.methods = methods;
    }
    isMatch(request) {
        if (this.methods.indexOf(request.method) < 0) {
            return false;
        }
        return request.url == this.path;
    }
    handle_reques(request, response) {
        const fn = this.handle;
        try {
            return fn(request, response);
        }
        catch (error) {
            return error;
        }
    }
}
exports.Route = Route;
//# sourceMappingURL=route.js.map