import { HttpMethod } from './http-method';
import { Request } from './request';
import { Response } from './response';

export interface IRoute {
    path: string;
    methods: HttpMethod[];
    handle: any;
    isMatch(request: Request): boolean;
    handle_reques(request: Request, response: Response): any;
}

const HTTP_METHODS: HttpMethod[] = [HttpMethod.GET, HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.HEAD];

export class Route implements IRoute {
    /**
     *
     */
    constructor(
        public path: string,
        public handle: any,
        public methods: HttpMethod[] = HTTP_METHODS
    ) {

    }

    public isMatch(request: Request): boolean {
        if (this.methods.indexOf(request.method) < 0) {
            return false;
        }
        return request.url == this.path;
    }

    public handle_reques(request: Request, response: Response): any {
        const fn = this.handle;
        try {
            return fn(request, response);
        } catch (error) {
            return error;
        }
    }
}



