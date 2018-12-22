import http, { ServerResponse, IncomingMessage } from 'http';
import { Router } from './router';
import { Request } from './request';
import { Response } from './response';

export class Web {
    constructor() {
        this.route = new Router();
        this.env = process.env.NODE_ENV || 'development';
    }

    public route: Router;

    public env: string;

    /**
     * listen
     */
    public listen(port: number = 3000, ...args: any) {
        http.createServer(this.handle.bind(this)).listen(port, ...args);
    }

    protected handle(req: IncomingMessage, resp: ServerResponse) {
        const request = new Request(req),
            response = new Response(resp);
        this.route.match(request).handle_reques(request, response);
        response.send();
    }
}