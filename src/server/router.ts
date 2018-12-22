import { IRoute, Route } from './route';
import { HttpMethod } from './http-method';
import { Request } from './request';
import { Response } from './response';


export class Router {
    private routes: IRoute[] = [];

    /**
     * get
     */
    public get(path: string, handle: any): Route {
        return this.any(path, HttpMethod.GET, handle);
    }

    public post(path: string, handle: any): Route {
        return this.any(path, HttpMethod.POST, handle);
    }

    public delete(path: string, handle: any): Route {
        return this.any(path, HttpMethod.DELETE, handle);
    }

    public any(path: string, methods: HttpMethod|HttpMethod[], handle: any): Route {
        return this.route(new Route(path, handle, methods instanceof Array ? methods : [methods]));
    }

    public route(route: Route): Route {
        this.routes.push(route);
        return route;
    }

    public match(request: Request): Route {
        for (let i = 0; i < this.routes.length; i++) {
            const route = this.routes[i];
            if (route.isMatch(request)) {
                return route;
            }
        }
        return new Route('', (req: Request, resp: Response) => {
            resp.notFound();
        });
    }
}