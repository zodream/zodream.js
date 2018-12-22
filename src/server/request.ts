import { IncomingMessage } from 'http';
import { HttpMethod } from './http-method';


export class Request {
    /**
     *
     */
    constructor(
        public httpRequest: IncomingMessage) {

    }

    public get method(): HttpMethod {
        return this.httpRequest.method as HttpMethod;
    }

    public get url(): string {
        return this.httpRequest.url;
    }
}