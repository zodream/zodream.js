import { ServerResponse } from 'http';
import { CONTENT_TYPES } from './content-type';

interface HttpHeaders {
    [header: string]: number | string | string[] | undefined;
}

export class Response {
    /**
     *
     */
    constructor(
        public httpResponse: ServerResponse
    ) {
    }

    public statusCode: number = 200;

    public headers: HttpHeaders = {};

    public body: string| any;


    /**
     * send
     */
    public send() {
        this.sendHeader();
        this.sendBody();
        this.httpResponse.end();
    }

    /**
     * sendBody
     */
    public sendBody() {
        this.httpResponse.write(this.body);
    }

    /**
     * sendHeader
     */
    public sendHeader() {
        this.httpResponse.writeHead(this.statusCode, this.headers);
    }

    /**
     * html
     */
    public html(html: string) {
        this.setContentType('html');
        this.body = html;
    }

    public json(data: any) {
        this.setContentType('json');
        this.body = typeof data == 'object' ? JSON.stringify(data) : data;
    }

    public xml(data: any) {
        this.setContentType('xml');
    }

    public rss(data: any) {
        this.setContentType('rss');
    }

    public file(file: string) {

    }

    /**
     * redirect
     */
    public redirect(url: string, time = 0) {
        this.statusCode = 302;
        if (time <= 0) {
            this.headers['Location'] = url;
            return;
        }
        this.headers['Refresh'] = time + ';url=' + url;
    }

    /**
     * notFound
     */
    public notFound() {
        this.statusCode = 404;
        this.html('NOT FOUND!');
    }

    public setContentType(type: string = 'html', option: string = 'utf-8') {
        if (['image', 'img'].indexOf(type) >= 0) {
            this.headers['Content-Type'] = 'image/' + option;
            return;
        }
        if (!CONTENT_TYPES.hasOwnProperty(type)) {
            this.headers['Content-Type'] = type;
            return;
        }
        let content: string = CONTENT_TYPES[type];
        if (['html', 'json', 'rss', 'xml'].indexOf(type) >= 0) {
            content += ';charset=' + option;
        }
        this.headers['Content-Type'] = content;
    }
}