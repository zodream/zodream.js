"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const content_type_1 = require("./content-type");
class Response {
    /**
     *
     */
    constructor(httpResponse) {
        this.httpResponse = httpResponse;
        this.statusCode = 200;
        this.headers = {};
    }
    /**
     * send
     */
    send() {
        this.sendHeader();
        this.sendBody();
        this.httpResponse.end();
    }
    /**
     * sendBody
     */
    sendBody() {
        this.httpResponse.write(this.body);
    }
    /**
     * sendHeader
     */
    sendHeader() {
        this.httpResponse.writeHead(this.statusCode, this.headers);
    }
    /**
     * html
     */
    html(html) {
        this.setContentType('html');
        this.body = html;
    }
    json(data) {
        this.setContentType('json');
        this.body = typeof data == 'object' ? JSON.stringify(data) : data;
    }
    xml(data) {
        this.setContentType('xml');
    }
    rss(data) {
        this.setContentType('rss');
    }
    file(file) {
    }
    /**
     * redirect
     */
    redirect(url, time = 0) {
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
    notFound() {
        this.statusCode = 404;
        this.html('NOT FOUND!');
    }
    setContentType(type = 'html', option = 'utf-8') {
        if (['image', 'img'].indexOf(type) >= 0) {
            this.headers['Content-Type'] = 'image/' + option;
            return;
        }
        if (!content_type_1.CONTENT_TYPES.hasOwnProperty(type)) {
            this.headers['Content-Type'] = type;
            return;
        }
        let content = content_type_1.CONTENT_TYPES[type];
        if (['html', 'json', 'rss', 'xml'].indexOf(type) >= 0) {
            content += ';charset=' + option;
        }
        this.headers['Content-Type'] = content;
    }
}
exports.Response = Response;
//# sourceMappingURL=response.js.map