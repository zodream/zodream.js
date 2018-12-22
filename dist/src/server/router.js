"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("./route");
const http_method_1 = require("./http-method");
class Router {
    constructor() {
        this.routes = [];
    }
    /**
     * get
     */
    get(path, handle) {
        return this.any(path, http_method_1.HttpMethod.GET, handle);
    }
    post(path, handle) {
        return this.any(path, http_method_1.HttpMethod.POST, handle);
    }
    delete(path, handle) {
        return this.any(path, http_method_1.HttpMethod.DELETE, handle);
    }
    any(path, methods, handle) {
        return this.route(new route_1.Route(path, handle, methods instanceof Array ? methods : [methods]));
    }
    route(route) {
        this.routes.push(route);
        return route;
    }
    match(request) {
        for (let i = 0; i < this.routes.length; i++) {
            const route = this.routes[i];
            if (route.isMatch(request)) {
                return route;
            }
        }
        return new route_1.Route('', (req, resp) => {
            resp.notFound();
        });
    }
}
exports.Router = Router;
//# sourceMappingURL=router.js.map