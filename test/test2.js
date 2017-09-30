function send2(body) {
    var chunk = body;
    var encoding;
    var len;
    var req = this.req;
    var type;

    // settings
    var app = this.app;

    // allow status / body
    if (arguments.length === 2) {
        // res.send(body, status) backwards compat
        if (typeof arguments[0] !== 'number' && typeof arguments[1] === 'number') {
            deprecate('res.send(body, status): Use res.status(status).send(body) instead');
            this.statusCode = arguments[1];
        } else {
            deprecate('res.send(status, body): Use res.status(status).send(body) instead');
            this.statusCode = arguments[0];
            chunk = arguments[1];
        }
    }

    // disambiguate res.send(status) and res.send(status, num)
    if (typeof chunk === 'number' && arguments.length === 1) {
        // res.send(status) will set status message as text string
        if (!this.get('Content-Type')) {
            this.type('txt');
        }

        deprecate('res.send(status): Use res.sendStatus(status) instead');
        this.statusCode = chunk;
        chunk = statusCodes[chunk];
    }

    switch (typeof chunk) {
        // string defaulting to html
        case 'string':
            if (!this.get('Content-Type')) {
                this.type('html');
            }
            break;
        case 'boolean':
        case 'number':
        case 'object':
            if (chunk === null) {
                chunk = '';
            } else if (Buffer.isBuffer(chunk)) {
                if (!this.get('Content-Type')) {
                    this.type('bin');
                }
            } else {
                return this.json(chunk);
            }
            break;
    }

    // write strings in utf-8
    if (typeof chunk === 'string') {
        encoding = 'utf8';
        type = this.get('Content-Type');

        // reflect this in content-type
        if (typeof type === 'string') {
            this.set('Content-Type', setCharset(type, 'utf-8'));
        }
    }

    // populate Content-Length
    if (chunk !== undefined) {
        if (!Buffer.isBuffer(chunk)) {
            // convert chunk to Buffer; saves later double conversions
            chunk = new Buffer(chunk, encoding);
            encoding = undefined;
        }

        len = chunk.length;
        this.set('Content-Length', len);
    }

    // populate ETag
    var etag;
    var generateETag = len !== undefined && app.get('etag fn');
    if (typeof generateETag === 'function' && !this.get('ETag')) {
        if ((etag = generateETag(chunk, encoding))) {
            this.set('ETag', etag);
        }
    }

    // freshness
    if (req.fresh) this.statusCode = 304;

    // strip irrelevant headers
    if (204 === this.statusCode || 304 === this.statusCode) {
        this.removeHeader('Content-Type');
        this.removeHeader('Content-Length');
        this.removeHeader('Transfer-Encoding');
        chunk = '';
    }

    if (req.method === 'HEAD') {
        // skip body for HEAD
        this.end();
    } else {
        // respond
        this.end(chunk, encoding);
    }

    return this;
}