var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, '__esModule', { value: true });
var __export = (target, all) => {
	__markAsModule(target);
	for (var name in all) __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
	if ((module2 && typeof module2 === 'object') || typeof module2 === 'function') {
		for (let key of __getOwnPropNames(module2))
			if (!__hasOwnProp.call(target, key) && key !== 'default')
				__defProp(target, key, {
					get: () => module2[key],
					enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable
				});
	}
	return target;
};
var __toModule = (module2) => {
	return __reExport(
		__markAsModule(
			__defProp(
				module2 != null ? __create(__getProtoOf(module2)) : {},
				'default',
				module2 && module2.__esModule && 'default' in module2
					? { get: () => module2.default, enumerable: true }
					: { value: module2, enumerable: true }
			)
		),
		module2
	);
};

// .svelte-kit/vercel/entry.js
__export(exports, {
	default: () => entry_default
});

// node_modules/.pnpm/@sveltejs+kit@1.0.0-next.129_svelte@3.38.3/node_modules/@sveltejs/kit/dist/install-fetch.js
var import_http = __toModule(require('http'));
var import_https = __toModule(require('https'));
var import_zlib = __toModule(require('zlib'));
var import_stream = __toModule(require('stream'));
var import_util = __toModule(require('util'));
var import_crypto = __toModule(require('crypto'));
var import_url = __toModule(require('url'));
function dataUriToBuffer(uri) {
	if (!/^data:/i.test(uri)) {
		throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
	}
	uri = uri.replace(/\r?\n/g, '');
	const firstComma = uri.indexOf(',');
	if (firstComma === -1 || firstComma <= 4) {
		throw new TypeError('malformed data: URI');
	}
	const meta = uri.substring(5, firstComma).split(';');
	let charset = '';
	let base64 = false;
	const type = meta[0] || 'text/plain';
	let typeFull = type;
	for (let i = 1; i < meta.length; i++) {
		if (meta[i] === 'base64') {
			base64 = true;
		} else {
			typeFull += `;${meta[i]}`;
			if (meta[i].indexOf('charset=') === 0) {
				charset = meta[i].substring(8);
			}
		}
	}
	if (!meta[0] && !charset.length) {
		typeFull += ';charset=US-ASCII';
		charset = 'US-ASCII';
	}
	const encoding = base64 ? 'base64' : 'ascii';
	const data = unescape(uri.substring(firstComma + 1));
	const buffer = Buffer.from(data, encoding);
	buffer.type = type;
	buffer.typeFull = typeFull;
	buffer.charset = charset;
	return buffer;
}
var src = dataUriToBuffer;
var { Readable } = import_stream.default;
var wm = new WeakMap();
async function* read(parts) {
	for (const part of parts) {
		if ('stream' in part) {
			yield* part.stream();
		} else {
			yield part;
		}
	}
}
var Blob = class {
	constructor(blobParts = [], options2 = {}) {
		let size = 0;
		const parts = blobParts.map((element) => {
			let buffer;
			if (element instanceof Buffer) {
				buffer = element;
			} else if (ArrayBuffer.isView(element)) {
				buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
			} else if (element instanceof ArrayBuffer) {
				buffer = Buffer.from(element);
			} else if (element instanceof Blob) {
				buffer = element;
			} else {
				buffer = Buffer.from(typeof element === 'string' ? element : String(element));
			}
			size += buffer.length || buffer.size || 0;
			return buffer;
		});
		const type = options2.type === void 0 ? '' : String(options2.type).toLowerCase();
		wm.set(this, {
			type: /[^\u0020-\u007E]/.test(type) ? '' : type,
			size,
			parts
		});
	}
	get size() {
		return wm.get(this).size;
	}
	get type() {
		return wm.get(this).type;
	}
	async text() {
		return Buffer.from(await this.arrayBuffer()).toString();
	}
	async arrayBuffer() {
		const data = new Uint8Array(this.size);
		let offset = 0;
		for await (const chunk of this.stream()) {
			data.set(chunk, offset);
			offset += chunk.length;
		}
		return data.buffer;
	}
	stream() {
		return Readable.from(read(wm.get(this).parts));
	}
	slice(start = 0, end = this.size, type = '') {
		const { size } = this;
		let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
		let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
		const span = Math.max(relativeEnd - relativeStart, 0);
		const parts = wm.get(this).parts.values();
		const blobParts = [];
		let added = 0;
		for (const part of parts) {
			const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
			if (relativeStart && size2 <= relativeStart) {
				relativeStart -= size2;
				relativeEnd -= size2;
			} else {
				const chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
				blobParts.push(chunk);
				added += ArrayBuffer.isView(chunk) ? chunk.byteLength : chunk.size;
				relativeStart = 0;
				if (added >= span) {
					break;
				}
			}
		}
		const blob = new Blob([], { type: String(type).toLowerCase() });
		Object.assign(wm.get(blob), { size: span, parts: blobParts });
		return blob;
	}
	get [Symbol.toStringTag]() {
		return 'Blob';
	}
	static [Symbol.hasInstance](object) {
		return (
			object &&
			typeof object === 'object' &&
			typeof object.stream === 'function' &&
			object.stream.length === 0 &&
			typeof object.constructor === 'function' &&
			/^(Blob|File)$/.test(object[Symbol.toStringTag])
		);
	}
};
Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});
var fetchBlob = Blob;
var FetchBaseError = class extends Error {
	constructor(message, type) {
		super(message);
		Error.captureStackTrace(this, this.constructor);
		this.type = type;
	}
	get name() {
		return this.constructor.name;
	}
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
};
var FetchError = class extends FetchBaseError {
	constructor(message, type, systemError) {
		super(message, type);
		if (systemError) {
			this.code = this.errno = systemError.code;
			this.erroredSysCall = systemError.syscall;
		}
	}
};
var NAME = Symbol.toStringTag;
var isURLSearchParameters = (object) => {
	return (
		typeof object === 'object' &&
		typeof object.append === 'function' &&
		typeof object.delete === 'function' &&
		typeof object.get === 'function' &&
		typeof object.getAll === 'function' &&
		typeof object.has === 'function' &&
		typeof object.set === 'function' &&
		typeof object.sort === 'function' &&
		object[NAME] === 'URLSearchParams'
	);
};
var isBlob = (object) => {
	return (
		typeof object === 'object' &&
		typeof object.arrayBuffer === 'function' &&
		typeof object.type === 'string' &&
		typeof object.stream === 'function' &&
		typeof object.constructor === 'function' &&
		/^(Blob|File)$/.test(object[NAME])
	);
};
function isFormData(object) {
	return (
		typeof object === 'object' &&
		typeof object.append === 'function' &&
		typeof object.set === 'function' &&
		typeof object.get === 'function' &&
		typeof object.getAll === 'function' &&
		typeof object.delete === 'function' &&
		typeof object.keys === 'function' &&
		typeof object.values === 'function' &&
		typeof object.entries === 'function' &&
		typeof object.constructor === 'function' &&
		object[NAME] === 'FormData'
	);
}
var isAbortSignal = (object) => {
	return typeof object === 'object' && object[NAME] === 'AbortSignal';
};
var carriage = '\r\n';
var dashes = '-'.repeat(2);
var carriageLength = Buffer.byteLength(carriage);
var getFooter = (boundary) => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;
function getHeader(boundary, name, field) {
	let header = '';
	header += `${dashes}${boundary}${carriage}`;
	header += `Content-Disposition: form-data; name="${name}"`;
	if (isBlob(field)) {
		header += `; filename="${field.name}"${carriage}`;
		header += `Content-Type: ${field.type || 'application/octet-stream'}`;
	}
	return `${header}${carriage.repeat(2)}`;
}
var getBoundary = () => (0, import_crypto.randomBytes)(8).toString('hex');
async function* formDataIterator(form, boundary) {
	for (const [name, value] of form) {
		yield getHeader(boundary, name, value);
		if (isBlob(value)) {
			yield* value.stream();
		} else {
			yield value;
		}
		yield carriage;
	}
	yield getFooter(boundary);
}
function getFormDataLength(form, boundary) {
	let length = 0;
	for (const [name, value] of form) {
		length += Buffer.byteLength(getHeader(boundary, name, value));
		if (isBlob(value)) {
			length += value.size;
		} else {
			length += Buffer.byteLength(String(value));
		}
		length += carriageLength;
	}
	length += Buffer.byteLength(getFooter(boundary));
	return length;
}
var INTERNALS$2 = Symbol('Body internals');
var Body = class {
	constructor(body, { size = 0 } = {}) {
		let boundary = null;
		if (body === null) {
			body = null;
		} else if (isURLSearchParameters(body)) {
			body = Buffer.from(body.toString());
		} else if (isBlob(body));
		else if (Buffer.isBuffer(body));
		else if (import_util.types.isAnyArrayBuffer(body)) {
			body = Buffer.from(body);
		} else if (ArrayBuffer.isView(body)) {
			body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
		} else if (body instanceof import_stream.default);
		else if (isFormData(body)) {
			boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
			body = import_stream.default.Readable.from(formDataIterator(body, boundary));
		} else {
			body = Buffer.from(String(body));
		}
		this[INTERNALS$2] = {
			body,
			boundary,
			disturbed: false,
			error: null
		};
		this.size = size;
		if (body instanceof import_stream.default) {
			body.on('error', (err) => {
				const error3 =
					err instanceof FetchBaseError
						? err
						: new FetchError(
								`Invalid response body while trying to fetch ${this.url}: ${err.message}`,
								'system',
								err
						  );
				this[INTERNALS$2].error = error3;
			});
		}
	}
	get body() {
		return this[INTERNALS$2].body;
	}
	get bodyUsed() {
		return this[INTERNALS$2].disturbed;
	}
	async arrayBuffer() {
		const { buffer, byteOffset, byteLength } = await consumeBody(this);
		return buffer.slice(byteOffset, byteOffset + byteLength);
	}
	async blob() {
		const ct =
			(this.headers && this.headers.get('content-type')) ||
			(this[INTERNALS$2].body && this[INTERNALS$2].body.type) ||
			'';
		const buf = await this.buffer();
		return new fetchBlob([buf], {
			type: ct
		});
	}
	async json() {
		const buffer = await consumeBody(this);
		return JSON.parse(buffer.toString());
	}
	async text() {
		const buffer = await consumeBody(this);
		return buffer.toString();
	}
	buffer() {
		return consumeBody(this);
	}
};
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});
async function consumeBody(data) {
	if (data[INTERNALS$2].disturbed) {
		throw new TypeError(`body used already for: ${data.url}`);
	}
	data[INTERNALS$2].disturbed = true;
	if (data[INTERNALS$2].error) {
		throw data[INTERNALS$2].error;
	}
	let { body } = data;
	if (body === null) {
		return Buffer.alloc(0);
	}
	if (isBlob(body)) {
		body = body.stream();
	}
	if (Buffer.isBuffer(body)) {
		return body;
	}
	if (!(body instanceof import_stream.default)) {
		return Buffer.alloc(0);
	}
	const accum = [];
	let accumBytes = 0;
	try {
		for await (const chunk of body) {
			if (data.size > 0 && accumBytes + chunk.length > data.size) {
				const err = new FetchError(
					`content size at ${data.url} over limit: ${data.size}`,
					'max-size'
				);
				body.destroy(err);
				throw err;
			}
			accumBytes += chunk.length;
			accum.push(chunk);
		}
	} catch (error3) {
		if (error3 instanceof FetchBaseError) {
			throw error3;
		} else {
			throw new FetchError(
				`Invalid response body while trying to fetch ${data.url}: ${error3.message}`,
				'system',
				error3
			);
		}
	}
	if (body.readableEnded === true || body._readableState.ended === true) {
		try {
			if (accum.every((c) => typeof c === 'string')) {
				return Buffer.from(accum.join(''));
			}
			return Buffer.concat(accum, accumBytes);
		} catch (error3) {
			throw new FetchError(
				`Could not create Buffer from response body for ${data.url}: ${error3.message}`,
				'system',
				error3
			);
		}
	} else {
		throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
	}
}
var clone = (instance, highWaterMark) => {
	let p1;
	let p2;
	let { body } = instance;
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}
	if (body instanceof import_stream.default && typeof body.getBoundary !== 'function') {
		p1 = new import_stream.PassThrough({ highWaterMark });
		p2 = new import_stream.PassThrough({ highWaterMark });
		body.pipe(p1);
		body.pipe(p2);
		instance[INTERNALS$2].body = p1;
		body = p2;
	}
	return body;
};
var extractContentType = (body, request) => {
	if (body === null) {
		return null;
	}
	if (typeof body === 'string') {
		return 'text/plain;charset=UTF-8';
	}
	if (isURLSearchParameters(body)) {
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	}
	if (isBlob(body)) {
		return body.type || null;
	}
	if (
		Buffer.isBuffer(body) ||
		import_util.types.isAnyArrayBuffer(body) ||
		ArrayBuffer.isView(body)
	) {
		return null;
	}
	if (body && typeof body.getBoundary === 'function') {
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	}
	if (isFormData(body)) {
		return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
	}
	if (body instanceof import_stream.default) {
		return null;
	}
	return 'text/plain;charset=UTF-8';
};
var getTotalBytes = (request) => {
	const { body } = request;
	if (body === null) {
		return 0;
	}
	if (isBlob(body)) {
		return body.size;
	}
	if (Buffer.isBuffer(body)) {
		return body.length;
	}
	if (body && typeof body.getLengthSync === 'function') {
		return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
	}
	if (isFormData(body)) {
		return getFormDataLength(request[INTERNALS$2].boundary);
	}
	return null;
};
var writeToStream = (dest, { body }) => {
	if (body === null) {
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		dest.write(body);
		dest.end();
	} else {
		body.pipe(dest);
	}
};
var validateHeaderName =
	typeof import_http.default.validateHeaderName === 'function'
		? import_http.default.validateHeaderName
		: (name) => {
				if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
					const err = new TypeError(`Header name must be a valid HTTP token [${name}]`);
					Object.defineProperty(err, 'code', { value: 'ERR_INVALID_HTTP_TOKEN' });
					throw err;
				}
		  };
var validateHeaderValue =
	typeof import_http.default.validateHeaderValue === 'function'
		? import_http.default.validateHeaderValue
		: (name, value) => {
				if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
					const err = new TypeError(`Invalid character in header content ["${name}"]`);
					Object.defineProperty(err, 'code', { value: 'ERR_INVALID_CHAR' });
					throw err;
				}
		  };
var Headers = class extends URLSearchParams {
	constructor(init2) {
		let result = [];
		if (init2 instanceof Headers) {
			const raw = init2.raw();
			for (const [name, values] of Object.entries(raw)) {
				result.push(...values.map((value) => [name, value]));
			}
		} else if (init2 == null);
		else if (typeof init2 === 'object' && !import_util.types.isBoxedPrimitive(init2)) {
			const method = init2[Symbol.iterator];
			if (method == null) {
				result.push(...Object.entries(init2));
			} else {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}
				result = [...init2]
					.map((pair) => {
						if (typeof pair !== 'object' || import_util.types.isBoxedPrimitive(pair)) {
							throw new TypeError('Each header pair must be an iterable object');
						}
						return [...pair];
					})
					.map((pair) => {
						if (pair.length !== 2) {
							throw new TypeError('Each header pair must be a name/value tuple');
						}
						return [...pair];
					});
			}
		} else {
			throw new TypeError(
				"Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)"
			);
		}
		result =
			result.length > 0
				? result.map(([name, value]) => {
						validateHeaderName(name);
						validateHeaderValue(name, String(value));
						return [String(name).toLowerCase(), String(value)];
				  })
				: void 0;
		super(result);
		return new Proxy(this, {
			get(target, p, receiver) {
				switch (p) {
					case 'append':
					case 'set':
						return (name, value) => {
							validateHeaderName(name);
							validateHeaderValue(name, String(value));
							return URLSearchParams.prototype[p].call(
								receiver,
								String(name).toLowerCase(),
								String(value)
							);
						};
					case 'delete':
					case 'has':
					case 'getAll':
						return (name) => {
							validateHeaderName(name);
							return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase());
						};
					case 'keys':
						return () => {
							target.sort();
							return new Set(URLSearchParams.prototype.keys.call(target)).keys();
						};
					default:
						return Reflect.get(target, p, receiver);
				}
			}
		});
	}
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
	toString() {
		return Object.prototype.toString.call(this);
	}
	get(name) {
		const values = this.getAll(name);
		if (values.length === 0) {
			return null;
		}
		let value = values.join(', ');
		if (/^content-encoding$/i.test(name)) {
			value = value.toLowerCase();
		}
		return value;
	}
	forEach(callback) {
		for (const name of this.keys()) {
			callback(this.get(name), name);
		}
	}
	*values() {
		for (const name of this.keys()) {
			yield this.get(name);
		}
	}
	*entries() {
		for (const name of this.keys()) {
			yield [name, this.get(name)];
		}
	}
	[Symbol.iterator]() {
		return this.entries();
	}
	raw() {
		return [...this.keys()].reduce((result, key) => {
			result[key] = this.getAll(key);
			return result;
		}, {});
	}
	[Symbol.for('nodejs.util.inspect.custom')]() {
		return [...this.keys()].reduce((result, key) => {
			const values = this.getAll(key);
			if (key === 'host') {
				result[key] = values[0];
			} else {
				result[key] = values.length > 1 ? values : values[0];
			}
			return result;
		}, {});
	}
};
Object.defineProperties(
	Headers.prototype,
	['get', 'entries', 'forEach', 'values'].reduce((result, property) => {
		result[property] = { enumerable: true };
		return result;
	}, {})
);
function fromRawHeaders(headers = []) {
	return new Headers(
		headers
			.reduce((result, value, index2, array) => {
				if (index2 % 2 === 0) {
					result.push(array.slice(index2, index2 + 2));
				}
				return result;
			}, [])
			.filter(([name, value]) => {
				try {
					validateHeaderName(name);
					validateHeaderValue(name, String(value));
					return true;
				} catch {
					return false;
				}
			})
	);
}
var redirectStatus = new Set([301, 302, 303, 307, 308]);
var isRedirect = (code) => {
	return redirectStatus.has(code);
};
var INTERNALS$1 = Symbol('Response internals');
var Response = class extends Body {
	constructor(body = null, options2 = {}) {
		super(body, options2);
		const status = options2.status || 200;
		const headers = new Headers(options2.headers);
		if (body !== null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}
		this[INTERNALS$1] = {
			url: options2.url,
			status,
			statusText: options2.statusText || '',
			headers,
			counter: options2.counter,
			highWaterMark: options2.highWaterMark
		};
	}
	get url() {
		return this[INTERNALS$1].url || '';
	}
	get status() {
		return this[INTERNALS$1].status;
	}
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}
	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}
	get statusText() {
		return this[INTERNALS$1].statusText;
	}
	get headers() {
		return this[INTERNALS$1].headers;
	}
	get highWaterMark() {
		return this[INTERNALS$1].highWaterMark;
	}
	clone() {
		return new Response(clone(this, this.highWaterMark), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected,
			size: this.size
		});
	}
	static redirect(url, status = 302) {
		if (!isRedirect(status)) {
			throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
		}
		return new Response(null, {
			headers: {
				location: new URL(url).toString()
			},
			status
		});
	}
	get [Symbol.toStringTag]() {
		return 'Response';
	}
};
Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});
var getSearch = (parsedURL) => {
	if (parsedURL.search) {
		return parsedURL.search;
	}
	const lastOffset = parsedURL.href.length - 1;
	const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === '#' ? '#' : '');
	return parsedURL.href[lastOffset - hash2.length] === '?' ? '?' : '';
};
var INTERNALS = Symbol('Request internals');
var isRequest = (object) => {
	return typeof object === 'object' && typeof object[INTERNALS] === 'object';
};
var Request = class extends Body {
	constructor(input, init2 = {}) {
		let parsedURL;
		if (isRequest(input)) {
			parsedURL = new URL(input.url);
		} else {
			parsedURL = new URL(input);
			input = {};
		}
		let method = init2.method || input.method || 'GET';
		method = method.toUpperCase();
		if (
			(init2.body != null || isRequest(input)) &&
			input.body !== null &&
			(method === 'GET' || method === 'HEAD')
		) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}
		const inputBody = init2.body
			? init2.body
			: isRequest(input) && input.body !== null
			? clone(input)
			: null;
		super(inputBody, {
			size: init2.size || input.size || 0
		});
		const headers = new Headers(init2.headers || input.headers || {});
		if (inputBody !== null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody, this);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}
		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init2) {
			signal = init2.signal;
		}
		if (signal !== null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}
		this[INTERNALS] = {
			method,
			redirect: init2.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};
		this.follow =
			init2.follow === void 0 ? (input.follow === void 0 ? 20 : input.follow) : init2.follow;
		this.compress =
			init2.compress === void 0
				? input.compress === void 0
					? true
					: input.compress
				: init2.compress;
		this.counter = init2.counter || input.counter || 0;
		this.agent = init2.agent || input.agent;
		this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
		this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
	}
	get method() {
		return this[INTERNALS].method;
	}
	get url() {
		return (0, import_url.format)(this[INTERNALS].parsedURL);
	}
	get headers() {
		return this[INTERNALS].headers;
	}
	get redirect() {
		return this[INTERNALS].redirect;
	}
	get signal() {
		return this[INTERNALS].signal;
	}
	clone() {
		return new Request(this);
	}
	get [Symbol.toStringTag]() {
		return 'Request';
	}
};
Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});
var getNodeRequestOptions = (request) => {
	const { parsedURL } = request[INTERNALS];
	const headers = new Headers(request[INTERNALS].headers);
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}
	let contentLengthValue = null;
	if (request.body === null && /^(post|put)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body !== null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number' && !Number.isNaN(totalBytes)) {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch');
	}
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate,br');
	}
	let { agent } = request;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}
	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}
	const search = getSearch(parsedURL);
	const requestOptions = {
		path: parsedURL.pathname + search,
		pathname: parsedURL.pathname,
		hostname: parsedURL.hostname,
		protocol: parsedURL.protocol,
		port: parsedURL.port,
		hash: parsedURL.hash,
		search: parsedURL.search,
		query: parsedURL.query,
		href: parsedURL.href,
		method: request.method,
		headers: headers[Symbol.for('nodejs.util.inspect.custom')](),
		insecureHTTPParser: request.insecureHTTPParser,
		agent
	};
	return requestOptions;
};
var AbortError = class extends FetchBaseError {
	constructor(message, type = 'aborted') {
		super(message, type);
	}
};
var supportedSchemas = new Set(['data:', 'http:', 'https:']);
async function fetch(url, options_) {
	return new Promise((resolve2, reject) => {
		const request = new Request(url, options_);
		const options2 = getNodeRequestOptions(request);
		if (!supportedSchemas.has(options2.protocol)) {
			throw new TypeError(
				`node-fetch cannot load ${url}. URL scheme "${options2.protocol.replace(
					/:$/,
					''
				)}" is not supported.`
			);
		}
		if (options2.protocol === 'data:') {
			const data = src(request.url);
			const response2 = new Response(data, { headers: { 'Content-Type': data.typeFull } });
			resolve2(response2);
			return;
		}
		const send = (options2.protocol === 'https:' ? import_https.default : import_http.default)
			.request;
		const { signal } = request;
		let response = null;
		const abort = () => {
			const error3 = new AbortError('The operation was aborted.');
			reject(error3);
			if (request.body && request.body instanceof import_stream.default.Readable) {
				request.body.destroy(error3);
			}
			if (!response || !response.body) {
				return;
			}
			response.body.emit('error', error3);
		};
		if (signal && signal.aborted) {
			abort();
			return;
		}
		const abortAndFinalize = () => {
			abort();
			finalize();
		};
		const request_ = send(options2);
		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}
		const finalize = () => {
			request_.abort();
			if (signal) {
				signal.removeEventListener('abort', abortAndFinalize);
			}
		};
		request_.on('error', (err) => {
			reject(
				new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err)
			);
			finalize();
		});
		request_.on('response', (response_) => {
			request_.setTimeout(0);
			const headers = fromRawHeaders(response_.rawHeaders);
			if (isRedirect(response_.statusCode)) {
				const location = headers.get('Location');
				const locationURL = location === null ? null : new URL(location, request.url);
				switch (request.redirect) {
					case 'error':
						reject(
							new FetchError(
								`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`,
								'no-redirect'
							)
						);
						finalize();
						return;
					case 'manual':
						if (locationURL !== null) {
							try {
								headers.set('Location', locationURL);
							} catch (error3) {
								reject(error3);
							}
						}
						break;
					case 'follow': {
						if (locationURL === null) {
							break;
						}
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}
						const requestOptions = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							size: request.size
						};
						if (
							response_.statusCode !== 303 &&
							request.body &&
							options_.body instanceof import_stream.default.Readable
						) {
							reject(
								new FetchError(
									'Cannot follow redirect with body being a readable stream',
									'unsupported-redirect'
								)
							);
							finalize();
							return;
						}
						if (
							response_.statusCode === 303 ||
							((response_.statusCode === 301 || response_.statusCode === 302) &&
								request.method === 'POST')
						) {
							requestOptions.method = 'GET';
							requestOptions.body = void 0;
							requestOptions.headers.delete('content-length');
						}
						resolve2(fetch(new Request(locationURL, requestOptions)));
						finalize();
						return;
					}
				}
			}
			response_.once('end', () => {
				if (signal) {
					signal.removeEventListener('abort', abortAndFinalize);
				}
			});
			let body = (0, import_stream.pipeline)(
				response_,
				new import_stream.PassThrough(),
				(error3) => {
					reject(error3);
				}
			);
			if (process.version < 'v12.10') {
				response_.on('aborted', abortAndFinalize);
			}
			const responseOptions = {
				url: request.url,
				status: response_.statusCode,
				statusText: response_.statusMessage,
				headers,
				size: request.size,
				counter: request.counter,
				highWaterMark: request.highWaterMark
			};
			const codings = headers.get('Content-Encoding');
			if (
				!request.compress ||
				request.method === 'HEAD' ||
				codings === null ||
				response_.statusCode === 204 ||
				response_.statusCode === 304
			) {
				response = new Response(body, responseOptions);
				resolve2(response);
				return;
			}
			const zlibOptions = {
				flush: import_zlib.default.Z_SYNC_FLUSH,
				finishFlush: import_zlib.default.Z_SYNC_FLUSH
			};
			if (codings === 'gzip' || codings === 'x-gzip') {
				body = (0, import_stream.pipeline)(
					body,
					import_zlib.default.createGunzip(zlibOptions),
					(error3) => {
						reject(error3);
					}
				);
				response = new Response(body, responseOptions);
				resolve2(response);
				return;
			}
			if (codings === 'deflate' || codings === 'x-deflate') {
				const raw = (0, import_stream.pipeline)(
					response_,
					new import_stream.PassThrough(),
					(error3) => {
						reject(error3);
					}
				);
				raw.once('data', (chunk) => {
					if ((chunk[0] & 15) === 8) {
						body = (0, import_stream.pipeline)(
							body,
							import_zlib.default.createInflate(),
							(error3) => {
								reject(error3);
							}
						);
					} else {
						body = (0, import_stream.pipeline)(
							body,
							import_zlib.default.createInflateRaw(),
							(error3) => {
								reject(error3);
							}
						);
					}
					response = new Response(body, responseOptions);
					resolve2(response);
				});
				return;
			}
			if (codings === 'br') {
				body = (0, import_stream.pipeline)(
					body,
					import_zlib.default.createBrotliDecompress(),
					(error3) => {
						reject(error3);
					}
				);
				response = new Response(body, responseOptions);
				resolve2(response);
				return;
			}
			response = new Response(body, responseOptions);
			resolve2(response);
		});
		writeToStream(request_, request);
	});
}

// node_modules/.pnpm/@sveltejs+kit@1.0.0-next.129_svelte@3.38.3/node_modules/@sveltejs/kit/dist/adapter-utils.js
function isContentTypeTextual(content_type) {
	if (!content_type) return true;
	const [type] = content_type.split(';');
	return (
		type === 'text/plain' ||
		type === 'application/json' ||
		type === 'application/x-www-form-urlencoded' ||
		type === 'multipart/form-data'
	);
}

// node_modules/.pnpm/@sveltejs+kit@1.0.0-next.129_svelte@3.38.3/node_modules/@sveltejs/kit/dist/node.js
function getRawBody(req) {
	return new Promise((fulfil, reject) => {
		const h = req.headers;
		if (!h['content-type']) {
			return fulfil(null);
		}
		req.on('error', reject);
		const length = Number(h['content-length']);
		if (isNaN(length) && h['transfer-encoding'] == null) {
			return fulfil(null);
		}
		let data = new Uint8Array(length || 0);
		if (length > 0) {
			let offset = 0;
			req.on('data', (chunk) => {
				const new_len = offset + Buffer.byteLength(chunk);
				if (new_len > length) {
					return reject({
						status: 413,
						reason: 'Exceeded "Content-Length" limit'
					});
				}
				data.set(chunk, offset);
				offset = new_len;
			});
		} else {
			req.on('data', (chunk) => {
				const new_data = new Uint8Array(data.length + chunk.length);
				new_data.set(data, 0);
				new_data.set(chunk, data.length);
				data = new_data;
			});
		}
		req.on('end', () => {
			const [type] = h['content-type'].split(/;\s*/);
			if (isContentTypeTextual(type)) {
				const encoding = h['content-encoding'] || 'utf-8';
				return fulfil(new TextDecoder(encoding).decode(data));
			}
			fulfil(data);
		});
	});
}

// node_modules/.pnpm/@sveltejs+kit@1.0.0-next.129_svelte@3.38.3/node_modules/@sveltejs/kit/dist/ssr.js
var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$';
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
	'<': '\\u003C',
	'>': '\\u003E',
	'/': '\\u002F',
	'\\': '\\\\',
	'\b': '\\b',
	'\f': '\\f',
	'\n': '\\n',
	'\r': '\\r',
	'	': '\\t',
	'\0': '\\0',
	'\u2028': '\\u2028',
	'\u2029': '\\u2029'
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function devalue(value) {
	var counts = new Map();
	function walk(thing) {
		if (typeof thing === 'function') {
			throw new Error('Cannot stringify a function');
		}
		if (counts.has(thing)) {
			counts.set(thing, counts.get(thing) + 1);
			return;
		}
		counts.set(thing, 1);
		if (!isPrimitive(thing)) {
			var type = getType(thing);
			switch (type) {
				case 'Number':
				case 'String':
				case 'Boolean':
				case 'Date':
				case 'RegExp':
					return;
				case 'Array':
					thing.forEach(walk);
					break;
				case 'Set':
				case 'Map':
					Array.from(thing).forEach(walk);
					break;
				default:
					var proto = Object.getPrototypeOf(thing);
					if (
						proto !== Object.prototype &&
						proto !== null &&
						Object.getOwnPropertyNames(proto).sort().join('\0') !== objectProtoOwnPropertyNames
					) {
						throw new Error('Cannot stringify arbitrary non-POJOs');
					}
					if (Object.getOwnPropertySymbols(thing).length > 0) {
						throw new Error('Cannot stringify POJOs with symbolic keys');
					}
					Object.keys(thing).forEach(function (key) {
						return walk(thing[key]);
					});
			}
		}
	}
	walk(value);
	var names = new Map();
	Array.from(counts)
		.filter(function (entry) {
			return entry[1] > 1;
		})
		.sort(function (a, b) {
			return b[1] - a[1];
		})
		.forEach(function (entry, i) {
			names.set(entry[0], getName(i));
		});
	function stringify(thing) {
		if (names.has(thing)) {
			return names.get(thing);
		}
		if (isPrimitive(thing)) {
			return stringifyPrimitive(thing);
		}
		var type = getType(thing);
		switch (type) {
			case 'Number':
			case 'String':
			case 'Boolean':
				return 'Object(' + stringify(thing.valueOf()) + ')';
			case 'RegExp':
				return 'new RegExp(' + stringifyString(thing.source) + ', "' + thing.flags + '")';
			case 'Date':
				return 'new Date(' + thing.getTime() + ')';
			case 'Array':
				var members = thing.map(function (v, i) {
					return i in thing ? stringify(v) : '';
				});
				var tail = thing.length === 0 || thing.length - 1 in thing ? '' : ',';
				return '[' + members.join(',') + tail + ']';
			case 'Set':
			case 'Map':
				return 'new ' + type + '([' + Array.from(thing).map(stringify).join(',') + '])';
			default:
				var obj =
					'{' +
					Object.keys(thing)
						.map(function (key) {
							return safeKey(key) + ':' + stringify(thing[key]);
						})
						.join(',') +
					'}';
				var proto = Object.getPrototypeOf(thing);
				if (proto === null) {
					return Object.keys(thing).length > 0
						? 'Object.assign(Object.create(null),' + obj + ')'
						: 'Object.create(null)';
				}
				return obj;
		}
	}
	var str = stringify(value);
	if (names.size) {
		var params_1 = [];
		var statements_1 = [];
		var values_1 = [];
		names.forEach(function (name, thing) {
			params_1.push(name);
			if (isPrimitive(thing)) {
				values_1.push(stringifyPrimitive(thing));
				return;
			}
			var type = getType(thing);
			switch (type) {
				case 'Number':
				case 'String':
				case 'Boolean':
					values_1.push('Object(' + stringify(thing.valueOf()) + ')');
					break;
				case 'RegExp':
					values_1.push(thing.toString());
					break;
				case 'Date':
					values_1.push('new Date(' + thing.getTime() + ')');
					break;
				case 'Array':
					values_1.push('Array(' + thing.length + ')');
					thing.forEach(function (v, i) {
						statements_1.push(name + '[' + i + ']=' + stringify(v));
					});
					break;
				case 'Set':
					values_1.push('new Set');
					statements_1.push(
						name +
							'.' +
							Array.from(thing)
								.map(function (v) {
									return 'add(' + stringify(v) + ')';
								})
								.join('.')
					);
					break;
				case 'Map':
					values_1.push('new Map');
					statements_1.push(
						name +
							'.' +
							Array.from(thing)
								.map(function (_a) {
									var k = _a[0],
										v = _a[1];
									return 'set(' + stringify(k) + ', ' + stringify(v) + ')';
								})
								.join('.')
					);
					break;
				default:
					values_1.push(Object.getPrototypeOf(thing) === null ? 'Object.create(null)' : '{}');
					Object.keys(thing).forEach(function (key) {
						statements_1.push('' + name + safeProp(key) + '=' + stringify(thing[key]));
					});
			}
		});
		statements_1.push('return ' + str);
		return (
			'(function(' +
			params_1.join(',') +
			'){' +
			statements_1.join(';') +
			'}(' +
			values_1.join(',') +
			'))'
		);
	} else {
		return str;
	}
}
function getName(num) {
	var name = '';
	do {
		name = chars[num % chars.length] + name;
		num = ~~(num / chars.length) - 1;
	} while (num >= 0);
	return reserved.test(name) ? name + '_' : name;
}
function isPrimitive(thing) {
	return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
	if (typeof thing === 'string') return stringifyString(thing);
	if (thing === void 0) return 'void 0';
	if (thing === 0 && 1 / thing < 0) return '-0';
	var str = String(thing);
	if (typeof thing === 'number') return str.replace(/^(-)?0\./, '$1.');
	return str;
}
function getType(thing) {
	return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
	return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
	return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
	return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
	return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key)
		? '.' + key
		: '[' + escapeUnsafeChars(JSON.stringify(key)) + ']';
}
function stringifyString(str) {
	var result = '"';
	for (var i = 0; i < str.length; i += 1) {
		var char = str.charAt(i);
		var code = char.charCodeAt(0);
		if (char === '"') {
			result += '\\"';
		} else if (char in escaped$1) {
			result += escaped$1[char];
		} else if (code >= 55296 && code <= 57343) {
			var next = str.charCodeAt(i + 1);
			if (code <= 56319 && next >= 56320 && next <= 57343) {
				result += char + str[++i];
			} else {
				result += '\\u' + code.toString(16).toUpperCase();
			}
		} else {
			result += char;
		}
	}
	result += '"';
	return result;
}
function noop() {}
function safe_not_equal(a, b) {
	return a != a ? b == b : a !== b || (a && typeof a === 'object') || typeof a === 'function';
}
var subscriber_queue = [];
function writable(value, start = noop) {
	let stop;
	const subscribers = [];
	function set(new_value) {
		if (safe_not_equal(value, new_value)) {
			value = new_value;
			if (stop) {
				const run_queue = !subscriber_queue.length;
				for (let i = 0; i < subscribers.length; i += 1) {
					const s2 = subscribers[i];
					s2[1]();
					subscriber_queue.push(s2, value);
				}
				if (run_queue) {
					for (let i = 0; i < subscriber_queue.length; i += 2) {
						subscriber_queue[i][0](subscriber_queue[i + 1]);
					}
					subscriber_queue.length = 0;
				}
			}
		}
	}
	function update(fn) {
		set(fn(value));
	}
	function subscribe(run2, invalidate = noop) {
		const subscriber = [run2, invalidate];
		subscribers.push(subscriber);
		if (subscribers.length === 1) {
			stop = start(set) || noop;
		}
		run2(value);
		return () => {
			const index2 = subscribers.indexOf(subscriber);
			if (index2 !== -1) {
				subscribers.splice(index2, 1);
			}
			if (subscribers.length === 0) {
				stop();
				stop = null;
			}
		};
	}
	return { set, update, subscribe };
}
function hash(value) {
	let hash2 = 5381;
	let i = value.length;
	if (typeof value === 'string') {
		while (i) hash2 = (hash2 * 33) ^ value.charCodeAt(--i);
	} else {
		while (i) hash2 = (hash2 * 33) ^ value[--i];
	}
	return (hash2 >>> 0).toString(36);
}
var s$1 = JSON.stringify;
async function render_response({
	options: options2,
	$session,
	page_config,
	status,
	error: error3,
	branch,
	page
}) {
	const css2 = new Set(options2.entry.css);
	const js = new Set(options2.entry.js);
	const styles = new Set();
	const serialized_data = [];
	let rendered;
	let is_private = false;
	let maxage;
	if (error3) {
		error3.stack = options2.get_stack(error3);
	}
	if (branch) {
		branch.forEach(({ node, loaded, fetched, uses_credentials }) => {
			if (node.css) node.css.forEach((url) => css2.add(url));
			if (node.js) node.js.forEach((url) => js.add(url));
			if (node.styles) node.styles.forEach((content) => styles.add(content));
			if (fetched && page_config.hydrate) serialized_data.push(...fetched);
			if (uses_credentials) is_private = true;
			maxage = loaded.maxage;
		});
		const session = writable($session);
		const props = {
			stores: {
				page: writable(null),
				navigating: writable(null),
				session
			},
			page,
			components: branch.map(({ node }) => node.module.default)
		};
		for (let i = 0; i < branch.length; i += 1) {
			props[`props_${i}`] = await branch[i].loaded.props;
		}
		let session_tracking_active = false;
		const unsubscribe = session.subscribe(() => {
			if (session_tracking_active) is_private = true;
		});
		session_tracking_active = true;
		try {
			rendered = options2.root.render(props);
		} finally {
			unsubscribe();
		}
	} else {
		rendered = { head: '', html: '', css: { code: '', map: null } };
	}
	const include_js = page_config.router || page_config.hydrate;
	if (!include_js) js.clear();
	const links = options2.amp
		? styles.size > 0 || rendered.css.code.length > 0
			? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join('\n')}</style>`
			: ''
		: [
				...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
				...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
		  ].join('\n		');
	let init2 = '';
	if (options2.amp) {
		init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
	} else if (include_js) {
		init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : 'document.body'},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error4) => {
					throw new Error(`Failed to serialize session data: ${error4.message}`);
				})},
				host: ${page && page.host ? s$1(page.host) : 'location.host'},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${
					page_config.ssr && page_config.hydrate
						? `{
					status: ${status},
					error: ${serialize_error(error3)},
					nodes: [
						${branch.map(({ node }) => `import(${s$1(node.entry)})`).join(',\n						')}
					],
					page: {
						host: ${page.host ? s$1(page.host) : 'location.host'}, // TODO this is redundant
						path: ${s$1(page.path)},
						query: new URLSearchParams(${s$1(page.query.toString())}),
						params: ${s$1(page.params)}
					}
				}`
						: 'null'
				}
			});
		<\/script>`;
	}
	if (options2.service_worker) {
		init2 += `<script>
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('${options2.service_worker}');
			}
		<\/script>`;
	}
	const head = [
		rendered.head,
		styles.size && !options2.amp
			? `<style data-svelte>${Array.from(styles).join('\n')}</style>`
			: '',
		links,
		init2
	].join('\n\n		');
	const body = options2.amp
		? rendered.html
		: `${rendered.html}

			${serialized_data
				.map(({ url, body: body2, json }) => {
					let attributes = `type="application/json" data-type="svelte-data" data-url="${url}"`;
					if (body2) attributes += ` data-body="${hash(body2)}"`;
					return `<script ${attributes}>${json}<\/script>`;
				})
				.join('\n\n			')}
		`.replace(/^\t{2}/gm, '');
	const headers = {
		'content-type': 'text/html'
	};
	if (maxage) {
		headers['cache-control'] = `${is_private ? 'private' : 'public'}, max-age=${maxage}`;
	}
	if (!options2.floc) {
		headers['permissions-policy'] = 'interest-cohort=()';
	}
	return {
		status,
		headers,
		body: options2.template({ head, body })
	};
}
function try_serialize(data, fail) {
	try {
		return devalue(data);
	} catch (err) {
		if (fail) fail(err);
		return null;
	}
}
function serialize_error(error3) {
	if (!error3) return null;
	let serialized = try_serialize(error3);
	if (!serialized) {
		const { name, message, stack } = error3;
		serialized = try_serialize({ ...error3, name, message, stack });
	}
	if (!serialized) {
		serialized = '{}';
	}
	return serialized;
}
function normalize(loaded) {
	if (loaded.error) {
		const error3 = typeof loaded.error === 'string' ? new Error(loaded.error) : loaded.error;
		const status = loaded.status;
		if (!(error3 instanceof Error)) {
			return {
				status: 500,
				error: new Error(
					`"error" property returned from load() must be a string or instance of Error, received type "${typeof error3}"`
				)
			};
		}
		if (!status || status < 400 || status > 599) {
			console.warn(
				'"error" returned from load() without a valid status code \u2014 defaulting to 500'
			);
			return { status: 500, error: error3 };
		}
		return { status, error: error3 };
	}
	if (loaded.redirect) {
		if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
			return {
				status: 500,
				error: new Error(
					'"redirect" property returned from load() must be accompanied by a 3xx status code'
				)
			};
		}
		if (typeof loaded.redirect !== 'string') {
			return {
				status: 500,
				error: new Error('"redirect" property returned from load() must be a string')
			};
		}
	}
	return loaded;
}
function resolve(base2, path) {
	const baseparts = path[0] === '/' ? [] : base2.slice(1).split('/');
	const pathparts = path[0] === '/' ? path.slice(1).split('/') : path.split('/');
	baseparts.pop();
	for (let i = 0; i < pathparts.length; i += 1) {
		const part = pathparts[i];
		if (part === '.') continue;
		else if (part === '..') baseparts.pop();
		else baseparts.push(part);
	}
	return `/${baseparts.join('/')}`;
}
var s = JSON.stringify;
var hasScheme = (url) => /^[a-zA-Z]+:/.test(url);
async function load_node({
	request,
	options: options2,
	state,
	route,
	page,
	node,
	$session,
	context,
	is_leaf,
	is_error,
	status,
	error: error3
}) {
	const { module: module2 } = node;
	let uses_credentials = false;
	const fetched = [];
	let loaded;
	if (module2.load) {
		const load_input = {
			page,
			get session() {
				uses_credentials = true;
				return $session;
			},
			fetch: async (resource, opts = {}) => {
				let url;
				if (typeof resource === 'string') {
					url = resource;
				} else {
					url = resource.url;
					opts = {
						method: resource.method,
						headers: resource.headers,
						body: resource.body,
						mode: resource.mode,
						credentials: resource.credentials,
						cache: resource.cache,
						redirect: resource.redirect,
						referrer: resource.referrer,
						integrity: resource.integrity,
						...opts
					};
				}
				if (options2.read && url.startsWith(options2.paths.assets)) {
					url = url.replace(options2.paths.assets, '');
				}
				if (url.startsWith('//')) {
					throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
				}
				let response;
				if (hasScheme(url)) {
					if (typeof request.host !== 'undefined') {
						const { hostname: fetchHostname } = new URL(url);
						const [serverHostname] = request.host.split(':');
						if (`.${fetchHostname}`.endsWith(`.${serverHostname}`) && opts.credentials !== 'omit') {
							uses_credentials = true;
							opts.headers = {
								...opts.headers,
								cookie: request.headers.cookie
							};
						}
					}
					const externalRequest = new Request(url, opts);
					response = await options2.hooks.serverFetch.call(null, externalRequest);
				} else {
					const [path, search] = url.split('?');
					const resolved = resolve(request.path, path);
					const filename = resolved.slice(1);
					const filename_html = `${filename}/index.html`;
					const asset = options2.manifest.assets.find(
						(d) => d.file === filename || d.file === filename_html
					);
					if (asset) {
						if (options2.read) {
							response = new Response(options2.read(asset.file), {
								headers: {
									'content-type': asset.type
								}
							});
						} else {
							response = await fetch(`http://${page.host}/${asset.file}`, opts);
						}
					}
					if (!response) {
						const headers = { ...opts.headers };
						if (opts.credentials !== 'omit') {
							uses_credentials = true;
							headers.cookie = request.headers.cookie;
							if (!headers.authorization) {
								headers.authorization = request.headers.authorization;
							}
						}
						if (opts.body && typeof opts.body !== 'string') {
							throw new Error('Request body must be a string');
						}
						const rendered = await respond(
							{
								host: request.host,
								method: opts.method || 'GET',
								headers,
								path: resolved,
								rawBody: opts.body,
								query: new URLSearchParams(search)
							},
							options2,
							{
								fetched: url,
								initiator: route
							}
						);
						if (rendered) {
							if (state.prerender) {
								state.prerender.dependencies.set(resolved, rendered);
							}
							response = new Response(rendered.body, {
								status: rendered.status,
								headers: rendered.headers
							});
						}
					}
				}
				if (response) {
					const proxy = new Proxy(response, {
						get(response2, key, receiver) {
							async function text() {
								const body = await response2.text();
								const headers = {};
								for (const [key2, value] of response2.headers) {
									if (key2 !== 'etag' && key2 !== 'set-cookie') headers[key2] = value;
								}
								if (!opts.body || typeof opts.body === 'string') {
									fetched.push({
										url,
										body: opts.body,
										json: `{"status":${response2.status},"statusText":${s(
											response2.statusText
										)},"headers":${s(headers)},"body":${escape(body)}}`
									});
								}
								return body;
							}
							if (key === 'text') {
								return text;
							}
							if (key === 'json') {
								return async () => {
									return JSON.parse(await text());
								};
							}
							return Reflect.get(response2, key, response2);
						}
					});
					return proxy;
				}
				return (
					response ||
					new Response('Not found', {
						status: 404
					})
				);
			},
			context: { ...context }
		};
		if (is_error) {
			load_input.status = status;
			load_input.error = error3;
		}
		loaded = await module2.load.call(null, load_input);
	} else {
		loaded = {};
	}
	if (!loaded && is_leaf && !is_error) return;
	return {
		node,
		loaded: normalize(loaded),
		context: loaded.context || context,
		fetched,
		uses_credentials
	};
}
var escaped = {
	'<': '\\u003C',
	'>': '\\u003E',
	'/': '\\u002F',
	'\\': '\\\\',
	'\b': '\\b',
	'\f': '\\f',
	'\n': '\\n',
	'\r': '\\r',
	'	': '\\t',
	'\0': '\\0',
	'\u2028': '\\u2028',
	'\u2029': '\\u2029'
};
function escape(str) {
	let result = '"';
	for (let i = 0; i < str.length; i += 1) {
		const char = str.charAt(i);
		const code = char.charCodeAt(0);
		if (char === '"') {
			result += '\\"';
		} else if (char in escaped) {
			result += escaped[char];
		} else if (code >= 55296 && code <= 57343) {
			const next = str.charCodeAt(i + 1);
			if (code <= 56319 && next >= 56320 && next <= 57343) {
				result += char + str[++i];
			} else {
				result += `\\u${code.toString(16).toUpperCase()}`;
			}
		} else {
			result += char;
		}
	}
	result += '"';
	return result;
}
async function respond_with_error({
	request,
	options: options2,
	state,
	$session,
	status,
	error: error3
}) {
	const default_layout = await options2.load_component(options2.manifest.layout);
	const default_error = await options2.load_component(options2.manifest.error);
	const page = {
		host: request.host,
		path: request.path,
		query: request.query,
		params: {}
	};
	const loaded = await load_node({
		request,
		options: options2,
		state,
		route: null,
		page,
		node: default_layout,
		$session,
		context: {},
		is_leaf: false,
		is_error: false
	});
	const branch = [
		loaded,
		await load_node({
			request,
			options: options2,
			state,
			route: null,
			page,
			node: default_error,
			$session,
			context: loaded.context,
			is_leaf: false,
			is_error: true,
			status,
			error: error3
		})
	];
	try {
		return await render_response({
			options: options2,
			$session,
			page_config: {
				hydrate: options2.hydrate,
				router: options2.router,
				ssr: options2.ssr
			},
			status,
			error: error3,
			branch,
			page
		});
	} catch (error4) {
		options2.handle_error(error4);
		return {
			status: 500,
			headers: {},
			body: error4.stack
		};
	}
}
async function respond$1({ request, options: options2, state, $session, route }) {
	const match = route.pattern.exec(request.path);
	const params = route.params(match);
	const page = {
		host: request.host,
		path: request.path,
		query: request.query,
		params
	};
	let nodes;
	try {
		nodes = await Promise.all(route.a.map((id) => id && options2.load_component(id)));
	} catch (error4) {
		options2.handle_error(error4);
		return await respond_with_error({
			request,
			options: options2,
			state,
			$session,
			status: 500,
			error: error4
		});
	}
	const leaf = nodes[nodes.length - 1].module;
	const page_config = {
		ssr: 'ssr' in leaf ? leaf.ssr : options2.ssr,
		router: 'router' in leaf ? leaf.router : options2.router,
		hydrate: 'hydrate' in leaf ? leaf.hydrate : options2.hydrate
	};
	if (!leaf.prerender && state.prerender && !state.prerender.all) {
		return {
			status: 204,
			headers: {},
			body: null
		};
	}
	let branch;
	let status = 200;
	let error3;
	ssr: if (page_config.ssr) {
		let context = {};
		branch = [];
		for (let i = 0; i < nodes.length; i += 1) {
			const node = nodes[i];
			let loaded;
			if (node) {
				try {
					loaded = await load_node({
						request,
						options: options2,
						state,
						route,
						page,
						node,
						$session,
						context,
						is_leaf: i === nodes.length - 1,
						is_error: false
					});
					if (!loaded) return;
					if (loaded.loaded.redirect) {
						return {
							status: loaded.loaded.status,
							headers: {
								location: encodeURI(loaded.loaded.redirect)
							}
						};
					}
					if (loaded.loaded.error) {
						({ status, error: error3 } = loaded.loaded);
					}
				} catch (e) {
					options2.handle_error(e);
					status = 500;
					error3 = e;
				}
				if (error3) {
					while (i--) {
						if (route.b[i]) {
							const error_node = await options2.load_component(route.b[i]);
							let error_loaded;
							let node_loaded;
							let j = i;
							while (!(node_loaded = branch[j])) {
								j -= 1;
							}
							try {
								error_loaded = await load_node({
									request,
									options: options2,
									state,
									route,
									page,
									node: error_node,
									$session,
									context: node_loaded.context,
									is_leaf: false,
									is_error: true,
									status,
									error: error3
								});
								if (error_loaded.loaded.error) {
									continue;
								}
								branch = branch.slice(0, j + 1).concat(error_loaded);
								break ssr;
							} catch (e) {
								options2.handle_error(e);
								continue;
							}
						}
					}
					return await respond_with_error({
						request,
						options: options2,
						state,
						$session,
						status,
						error: error3
					});
				}
			}
			branch.push(loaded);
			if (loaded && loaded.loaded.context) {
				context = {
					...context,
					...loaded.loaded.context
				};
			}
		}
	}
	try {
		return await render_response({
			options: options2,
			$session,
			page_config,
			status,
			error: error3,
			branch: branch && branch.filter(Boolean),
			page
		});
	} catch (error4) {
		options2.handle_error(error4);
		return await respond_with_error({
			request,
			options: options2,
			state,
			$session,
			status: 500,
			error: error4
		});
	}
}
async function render_page(request, route, options2, state) {
	if (state.initiator === route) {
		return {
			status: 404,
			headers: {},
			body: `Not found: ${request.path}`
		};
	}
	const $session = await options2.hooks.getSession(request);
	if (route) {
		const response = await respond$1({
			request,
			options: options2,
			state,
			$session,
			route
		});
		if (response) {
			return response;
		}
		if (state.fetched) {
			return {
				status: 500,
				headers: {},
				body: `Bad request in load function: failed to fetch ${state.fetched}`
			};
		}
	} else {
		return await respond_with_error({
			request,
			options: options2,
			state,
			$session,
			status: 404,
			error: new Error(`Not found: ${request.path}`)
		});
	}
}
function lowercase_keys(obj) {
	const clone2 = {};
	for (const key in obj) {
		clone2[key.toLowerCase()] = obj[key];
	}
	return clone2;
}
function error(body) {
	return {
		status: 500,
		body,
		headers: {}
	};
}
function is_string(s2) {
	return typeof s2 === 'string' || s2 instanceof String;
}
async function render_route(request, route) {
	const mod = await route.load();
	const handler = mod[request.method.toLowerCase().replace('delete', 'del')];
	if (handler) {
		const match = route.pattern.exec(request.path);
		const params = route.params(match);
		const response = await handler({ ...request, params });
		const preface = `Invalid response from route ${request.path}`;
		if (response) {
			if (typeof response !== 'object') {
				return error(`${preface}: expected an object, got ${typeof response}`);
			}
			let { status = 200, body, headers = {} } = response;
			headers = lowercase_keys(headers);
			const type = headers['content-type'];
			const is_type_textual = isContentTypeTextual(type);
			if (!is_type_textual && !(body instanceof Uint8Array || is_string(body))) {
				return error(
					`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`
				);
			}
			let normalized_body;
			if (
				(typeof body === 'object' || typeof body === 'undefined') &&
				!(body instanceof Uint8Array) &&
				(!type || type.startsWith('application/json'))
			) {
				headers = { ...headers, 'content-type': 'application/json; charset=utf-8' };
				normalized_body = JSON.stringify(typeof body === 'undefined' ? {} : body);
			} else {
				normalized_body = body;
			}
			return { status, body: normalized_body, headers };
		}
	}
}
function read_only_form_data() {
	const map = new Map();
	return {
		append(key, value) {
			if (map.has(key)) {
				map.get(key).push(value);
			} else {
				map.set(key, [value]);
			}
		},
		data: new ReadOnlyFormData(map)
	};
}
var ReadOnlyFormData = class {
	#map;
	constructor(map) {
		this.#map = map;
	}
	get(key) {
		const value = this.#map.get(key);
		return value && value[0];
	}
	getAll(key) {
		return this.#map.get(key);
	}
	has(key) {
		return this.#map.has(key);
	}
	*[Symbol.iterator]() {
		for (const [key, value] of this.#map) {
			for (let i = 0; i < value.length; i += 1) {
				yield [key, value[i]];
			}
		}
	}
	*entries() {
		for (const [key, value] of this.#map) {
			for (let i = 0; i < value.length; i += 1) {
				yield [key, value[i]];
			}
		}
	}
	*keys() {
		for (const [key] of this.#map) yield key;
	}
	*values() {
		for (const [, value] of this.#map) {
			for (let i = 0; i < value.length; i += 1) {
				yield value[i];
			}
		}
	}
};
function parse_body(raw, headers) {
	if (!raw) return raw;
	const [type, ...directives] = headers['content-type'].split(/;\s*/);
	if (typeof raw === 'string') {
		switch (type) {
			case 'text/plain':
				return raw;
			case 'application/json':
				return JSON.parse(raw);
			case 'application/x-www-form-urlencoded':
				return get_urlencoded(raw);
			case 'multipart/form-data': {
				const boundary = directives.find((directive) => directive.startsWith('boundary='));
				if (!boundary) throw new Error('Missing boundary');
				return get_multipart(raw, boundary.slice('boundary='.length));
			}
			default:
				throw new Error(`Invalid Content-Type ${type}`);
		}
	}
	return raw;
}
function get_urlencoded(text) {
	const { data, append } = read_only_form_data();
	text
		.replace(/\+/g, ' ')
		.split('&')
		.forEach((str) => {
			const [key, value] = str.split('=');
			append(decodeURIComponent(key), decodeURIComponent(value));
		});
	return data;
}
function get_multipart(text, boundary) {
	const parts = text.split(`--${boundary}`);
	const nope = () => {
		throw new Error('Malformed form data');
	};
	if (parts[0] !== '' || parts[parts.length - 1].trim() !== '--') {
		nope();
	}
	const { data, append } = read_only_form_data();
	parts.slice(1, -1).forEach((part) => {
		const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
		const raw_headers = match[1];
		const body = match[2].trim();
		let key;
		raw_headers.split('\r\n').forEach((str) => {
			const [raw_header, ...raw_directives] = str.split('; ');
			let [name, value] = raw_header.split(': ');
			name = name.toLowerCase();
			const directives = {};
			raw_directives.forEach((raw_directive) => {
				const [name2, value2] = raw_directive.split('=');
				directives[name2] = JSON.parse(value2);
			});
			if (name === 'content-disposition') {
				if (value !== 'form-data') nope();
				if (directives.filename) {
					throw new Error('File upload is not yet implemented');
				}
				if (directives.name) {
					key = directives.name;
				}
			}
		});
		if (!key) nope();
		append(key, body);
	});
	return data;
}
async function respond(incoming, options2, state = {}) {
	if (incoming.path !== '/' && options2.trailing_slash !== 'ignore') {
		const has_trailing_slash = incoming.path.endsWith('/');
		if (
			(has_trailing_slash && options2.trailing_slash === 'never') ||
			(!has_trailing_slash &&
				options2.trailing_slash === 'always' &&
				!incoming.path.split('/').pop().includes('.'))
		) {
			const path = has_trailing_slash ? incoming.path.slice(0, -1) : incoming.path + '/';
			const q = incoming.query.toString();
			return {
				status: 301,
				headers: {
					location: encodeURI(path + (q ? `?${q}` : ''))
				}
			};
		}
	}
	try {
		const headers = lowercase_keys(incoming.headers);
		return await options2.hooks.handle({
			request: {
				...incoming,
				headers,
				body: parse_body(incoming.rawBody, headers),
				params: null,
				locals: {}
			},
			resolve: async (request) => {
				if (state.prerender && state.prerender.fallback) {
					return await render_response({
						options: options2,
						$session: await options2.hooks.getSession(request),
						page_config: { ssr: false, router: true, hydrate: true },
						status: 200,
						error: null,
						branch: [],
						page: null
					});
				}
				for (const route of options2.manifest.routes) {
					if (!route.pattern.test(request.path)) continue;
					const response =
						route.type === 'endpoint'
							? await render_route(request, route)
							: await render_page(request, route, options2, state);
					if (response) {
						if (response.status === 200) {
							if (!/(no-store|immutable)/.test(response.headers['cache-control'])) {
								const etag = `"${hash(response.body)}"`;
								if (request.headers['if-none-match'] === etag) {
									return {
										status: 304,
										headers: {},
										body: null
									};
								}
								response.headers['etag'] = etag;
							}
						}
						return response;
					}
				}
				return await render_page(request, null, options2, state);
			}
		});
	} catch (e) {
		options2.handle_error(e);
		return {
			status: 500,
			headers: {},
			body: options2.dev ? e.stack : e.message
		};
	}
}

// .svelte-kit/output/server/app.js
function run(fn) {
	return fn();
}
function blank_object() {
	return Object.create(null);
}
function run_all(fns) {
	fns.forEach(run);
}
var current_component;
function set_current_component(component) {
	current_component = component;
}
function get_current_component() {
	if (!current_component) throw new Error('Function called outside component initialization');
	return current_component;
}
function onMount(fn) {
	get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
	get_current_component().$$.after_update.push(fn);
}
function setContext(key, context) {
	get_current_component().$$.context.set(key, context);
}
Promise.resolve();
var escaped2 = {
	'"': '&quot;',
	"'": '&#39;',
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;'
};
function escape2(html) {
	return String(html).replace(/["'&<>]/g, (match) => escaped2[match]);
}
var missing_component = {
	$$render: () => ''
};
function validate_component(component, name) {
	if (!component || !component.$$render) {
		if (name === 'svelte:component') name += ' this={...}';
		throw new Error(
			`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`
		);
	}
	return component;
}
var on_destroy;
function create_ssr_component(fn) {
	function $$render(result, props, bindings, slots, context) {
		const parent_component = current_component;
		const $$ = {
			on_destroy,
			context: new Map(parent_component ? parent_component.$$.context : context || []),
			on_mount: [],
			before_update: [],
			after_update: [],
			callbacks: blank_object()
		};
		set_current_component({ $$ });
		const html = fn(result, props, bindings, slots);
		set_current_component(parent_component);
		return html;
	}
	return {
		render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
			on_destroy = [];
			const result = { title: '', head: '', css: new Set() };
			const html = $$render(result, props, {}, $$slots, context);
			run_all(on_destroy);
			return {
				html,
				css: {
					code: Array.from(result.css)
						.map((css2) => css2.code)
						.join('\n'),
					map: null
				},
				head: result.title + result.head
			};
		},
		$$render
	};
}
var css$1 = {
	code:
		'#svelte-announcer.svelte-1pdgbjn{clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);height:1px;left:0;overflow:hidden;position:absolute;top:0;white-space:nowrap;width:1px}',
	map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n<\/script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>#svelte-announcer{clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);height:1px;left:0;overflow:hidden;position:absolute;top:0;white-space:nowrap;width:1px}</style>"],"names":[],"mappings":"AAqDO,gCAAiB,CAAC,KAAK,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,kBAAkB,MAAM,GAAG,CAAC,CAAC,UAAU,MAAM,GAAG,CAAC,CAAC,OAAO,GAAG,CAAC,KAAK,CAAC,CAAC,SAAS,MAAM,CAAC,SAAS,QAAQ,CAAC,IAAI,CAAC,CAAC,YAAY,MAAM,CAAC,MAAM,GAAG,CAAC"}`
};
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { stores } = $$props;
	let { page } = $$props;
	let { components } = $$props;
	let { props_0 = null } = $$props;
	let { props_1 = null } = $$props;
	let { props_2 = null } = $$props;
	setContext('__svelte__', stores);
	afterUpdate(stores.page.notify);
	let mounted = false;
	let navigated = false;
	let title = null;
	onMount(() => {
		const unsubscribe = stores.page.subscribe(() => {
			if (mounted) {
				navigated = true;
				title = document.title || 'untitled page';
			}
		});
		mounted = true;
		return unsubscribe;
	});
	if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
		$$bindings.stores(stores);
	if ($$props.page === void 0 && $$bindings.page && page !== void 0) $$bindings.page(page);
	if ($$props.components === void 0 && $$bindings.components && components !== void 0)
		$$bindings.components(components);
	if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
		$$bindings.props_0(props_0);
	if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
		$$bindings.props_1(props_1);
	if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
		$$bindings.props_2(props_2);
	$$result.css.add(css$1);
	{
		stores.page.set(page);
	}
	return `


${validate_component(components[0] || missing_component, 'svelte:component').$$render(
	$$result,
	Object.assign(props_0 || {}),
	{},
	{
		default: () =>
			`${
				components[1]
					? `${validate_component(components[1] || missing_component, 'svelte:component').$$render(
							$$result,
							Object.assign(props_1 || {}),
							{},
							{
								default: () =>
									`${
										components[2]
											? `${validate_component(
													components[2] || missing_component,
													'svelte:component'
											  ).$$render($$result, Object.assign(props_2 || {}), {}, {})}`
											: ``
									}`
							}
					  )}`
					: ``
			}`
	}
)}

${
	mounted
		? `<div id="${'svelte-announcer'}" aria-live="${'assertive'}" aria-atomic="${'true'}" class="${'svelte-1pdgbjn'}">${
				navigated ? `${escape2(title)}` : ``
		  }</div>`
		: ``
}`;
});
var base = '';
var assets = '/.';
function set_paths(paths) {
	({ base, assets } = paths);
}
function set_prerendering(value) {}
var user_hooks = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module'
});
var template = ({ head, body }) =>
	'<!DOCTYPE html>\n<html lang="en" class="h-full">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="/favicon.png" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		' +
	head +
	'\n	</head>\n	<body class="h-full">\n		<div class="h-full" id="svelte">' +
	body +
	'</div>\n	</body>\n</html>\n';
var options = null;
var default_settings = { paths: { base: '', assets: '/.' } };
function init(settings = default_settings) {
	set_paths(settings.paths);
	set_prerendering(settings.prerendering || false);
	options = {
		amp: false,
		dev: false,
		entry: {
			file: '/./_app/start-c2fffbae.js',
			css: ['/./_app/assets/start-0826e215.css'],
			js: [
				'/./_app/start-c2fffbae.js',
				'/./_app/chunks/vendor-d3912364.js',
				'/./_app/chunks/paths-d2152a5c.js'
			]
		},
		fetched: void 0,
		floc: false,
		get_component_path: (id) => '/./_app/' + entry_lookup[id],
		get_stack: (error22) => String(error22),
		handle_error: (error22) => {
			if (error22.frame) {
				console.error(error22.frame);
			}
			console.error(error22.stack);
			error22.stack = options.get_stack(error22);
		},
		hooks: get_hooks(user_hooks),
		hydrate: true,
		initiator: void 0,
		load_component,
		manifest,
		paths: settings.paths,
		read: settings.read,
		root: Root,
		service_worker: null,
		router: true,
		ssr: true,
		target: '#svelte',
		template,
		trailing_slash: 'never'
	};
}
var empty = () => ({});
var manifest = {
	assets: [
		{ file: 'beer_hat_l.jpg', size: 385617, type: 'image/jpeg' },
		{ file: 'favicon.png', size: 1571, type: 'image/png' },
		{ file: 'hi.svg', size: 18635, type: 'image/svg+xml' },
		{ file: 'logo.png', size: 5818, type: 'image/png' }
	],
	layout: 'src/routes/__layout.svelte',
	error: '.svelte-kit/build/components/error.svelte',
	routes: [
		{
			type: 'page',
			pattern: /^\/$/,
			params: empty,
			a: ['src/routes/__layout.svelte', 'src/routes/index.svelte'],
			b: ['.svelte-kit/build/components/error.svelte']
		}
	]
};
var get_hooks = (hooks) => ({
	getSession: hooks.getSession || (() => ({})),
	handle: hooks.handle || (({ request, resolve: resolve2 }) => resolve2(request)),
	serverFetch: hooks.serverFetch || fetch
});
var module_lookup = {
	'src/routes/__layout.svelte': () =>
		Promise.resolve().then(function () {
			return __layout;
		}),
	'.svelte-kit/build/components/error.svelte': () =>
		Promise.resolve().then(function () {
			return error2;
		}),
	'src/routes/index.svelte': () =>
		Promise.resolve().then(function () {
			return index;
		})
};
var metadata_lookup = {
	'src/routes/__layout.svelte': {
		entry: '/./_app/pages/__layout.svelte-515be883.js',
		css: ['/./_app/assets/pages/__layout.svelte-a76a234b.css'],
		js: ['/./_app/pages/__layout.svelte-515be883.js', '/./_app/chunks/vendor-d3912364.js'],
		styles: null
	},
	'.svelte-kit/build/components/error.svelte': {
		entry: '/./_app/error.svelte-668e5ea6.js',
		css: [],
		js: ['/./_app/error.svelte-668e5ea6.js', '/./_app/chunks/vendor-d3912364.js'],
		styles: null
	},
	'src/routes/index.svelte': {
		entry: '/./_app/pages/index.svelte-9ed0f0f9.js',
		css: ['/./_app/assets/pages/index.svelte-50211c28.css'],
		js: [
			'/./_app/pages/index.svelte-9ed0f0f9.js',
			'/./_app/chunks/vendor-d3912364.js',
			'/./_app/chunks/paths-d2152a5c.js'
		],
		styles: null
	}
};
async function load_component(file) {
	return {
		module: await module_lookup[file](),
		...metadata_lookup[file]
	};
}
function render(request, { prerender } = {}) {
	const host = request.headers['host'];
	return respond({ ...request, host }, options, { prerender });
}
var _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `${slots.default ? slots.default({}) : ``}`;
});
var __layout = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	default: _layout
});
function load({ error: error22, status }) {
	return { props: { error: error22, status } };
}
var Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { status } = $$props;
	let { error: error22 } = $$props;
	if ($$props.status === void 0 && $$bindings.status && status !== void 0)
		$$bindings.status(status);
	if ($$props.error === void 0 && $$bindings.error && error22 !== void 0) $$bindings.error(error22);
	return `<h1>${escape2(status)}</h1>

<pre>${escape2(error22.message)}</pre>



${error22.frame ? `<pre>${escape2(error22.frame)}</pre>` : ``}
${error22.stack ? `<pre>${escape2(error22.stack)}</pre>` : ``}`;
});
var error2 = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	default: Error$1,
	load
});
var css = {
	code:
		'.menu-item.svelte-1kliy5y{border:3px solid #0461ae}span.svelte-1kliy5y{background:#1365b3;border-radius:255px 15px 225px 15px/15px 225px 15px 255px;color:#fff;cursor:pointer;line-height:1.5em;padding:1em}path.svelte-1kliy5y{stroke:#000;fill:#fff}',
	map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script>\\n    import { assets} from \\"$app/paths\\";\\n    import { draw, fly } from 'svelte/transition';\\n    import { quintOut } from 'svelte/easing';\\nimport { onMount } from \\"svelte\\";\\n    let show = false;\\n    let show1 = false;\\n    let duration = 4000;\\n    let delay = 200;\\n    let condition = false;\\n    onMount(() => {\\n        setTimeout(() => show = true, 500);\\n        setTimeout(() => show1 = true, 2000);\\n\\t\\tsetTimeout(() => condition = true, 300)\\n    })\\n\\n<\/script>\\n{#if condition} \\n<svg width=\\"400\\" height=\\"400\\">\\n    <g>\\n        <path transition:draw=\\"{{duration, delay}}\\"\\n             d=\\"m 19.676108,82.658524 c 1.193416,-1.815901 2.294615,-3.689339 3.405578,-5.556122 1.520259,-2.582728 2.927039,-5.230477 4.259565,-7.914249 1.327868,-2.773913 2.421645,-5.648674 3.53703,-8.511952 0.945108,-2.541038 1.783284,-5.120114 2.509634,-7.731649 0.804926,-2.817006 1.786358,-5.577655 2.621209,-8.385395 0.89863,-3.066124 1.614313,-6.179957 2.292109,-9.300763 0.63206,-2.970114 1.084993,-5.96637 1.32021,-8.992954 0.26222,-2.336694 0.451614,-4.662652 0.15731,-7.001776 -0.21206,-1.490609 -0.7626,-2.82845 -1.705501,-3.992452 -0.610182,-0.733628 -1.357066,-1.275539 -2.246802,-1.607492 -0.671674,-0.208919 -1.367203,-0.317202 -2.06611,-0.224221 -3.404092,0.949337 -4.093043,2.202709 -5.539623,4.569642 -0.826956,1.543042 -1.350749,3.208901 -1.863361,4.874374 -0.678677,2.002893 -0.962359,4.104298 -1.311779,6.181227 -0.459275,2.105761 -0.710641,4.243353 -0.8664,6.390262 -0.110986,1.854509 -0.103404,3.712919 -0.107417,5.569878 -0.004,1.752317 0.0013,3.504637 0.0049,5.256951 0.0052,1.986097 0.0089,3.972184 0.009,5.958287 -4.24e-4,1.970061 -0.0036,3.940122 -0.0041,5.910186 -0.0071,1.793226 0.16868,3.581177 0.254606,5.371705 0.0068,1.525702 0.187611,3.040031 0.304435,4.559194 0.102016,1.417712 0.117014,2.839413 0.132322,4.260072 0.01312,1.577565 0.01068,3.155252 0.0031,4.732843 -0.0018,1.164934 -0.0064,2.329855 -0.0155,3.494754 -0.0084,0.708007 -0.0044,1.41604 -0.0027,2.12406 0.143767,1.004763 0.242888,2.012444 0.298581,3.025788 0.05866,1.036015 0.018,2.074521 0.108969,3.108139 0.138331,1.214901 0.217328,2.434821 0.264032,3.656317 0.09995,2.722656 -0.645987,2.161846 3.353339,-0.334645 -0.823725,-1.98351 -0.92222,-4.184192 -1.083916,-6.299496 -0.186084,-3.096236 -0.203427,-6.19909 -0.199873,-9.299855 0.0045,-1.966447 -0.026,-3.928629 0.16415,-5.887228 0.241062,-2.269511 0.672347,-4.50728 1.219562,-6.721015 0.402894,-1.742892 1.048653,-2.983849 2.180673,-4.348972 0.524531,-0.517744 0.567068,-0.591814 1.152271,-1.041405 0.205433,-0.157824 0.859493,-0.576554 0.632777,-0.45121 -5.258399,2.907162 -2.37545,1.407332 -1.151541,0.868606 1.366457,-0.602176 2.833288,-0.823002 4.308443,-0.942139 1.276128,-0.08443 2.478101,0.17584 3.644109,0.670325 1.30909,0.531471 2.280812,1.524121 3.216611,2.542587 1.062305,1.243912 1.87552,2.639751 2.567001,4.114411 0.841266,1.844763 1.543272,3.750239 2.134661,5.688571 0.509847,1.877052 1.021572,3.758867 1.423985,5.662671 0.351173,1.521438 0.626089,3.060961 0.85135,4.605898 0.214579,1.116753 0.421703,2.234226 0.522695,3.367601 0.07451,0.941874 0.02956,1.886841 0.116395,2.827242 0.155003,0.976823 0.134609,1.977633 0.305268,2.950456 0.09963,0.576964 0.283276,1.137801 0.54188,1.662835 0.280863,0.458853 0.72271,0.62784 1.228879,0.710088 1.113827,0.12907 2.141923,-0.352239 3.121615,-0.816287 3.093698,-1.689367 6.116118,-3.545295 8.842758,-5.787898 1.967037,-1.613355 3.612833,-3.532018 5.142714,-5.5515 1.328447,-1.853639 2.144625,-4.002485 2.939833,-6.122993 0.877927,-2.34088 1.281316,-4.802476 1.533652,-7.277687 0.151778,-1.974665 0.241306,-3.960606 0.146,-5.939901 -0.03346,-1.505718 -0.366466,-2.955171 -1.062381,-4.288774 -0.530614,-0.893514 -1.085411,-1.16957 -2.084973,-1.297041 -0.807005,-0.0274 -1.497316,0.252688 -2.178375,0.668494 -3.783552,2.309968 -3.733742,2.03818 -6.025409,4.531037 -1.853499,2.126477 -3.093516,4.364688 -4.052446,6.999126 -0.678484,1.924039 -0.907306,3.944784 -1.017476,5.968637 -0.06198,1.599777 -0.0369,3.201194 -0.02907,4.80169 -0.05201,1.522463 0.113665,3.035925 0.225888,4.551585 0.09714,1.108766 0.384032,2.173298 0.74313,3.22109 0.239868,0.592178 0.518178,1.169594 1.014486,1.584434 0.656162,0.471101 1.463244,0.638836 2.241325,0.792744 1.460678,0.325853 2.949345,0.462466 4.440452,0.544531 2.212327,0.206579 4.242845,-0.253362 6.324494,-0.950385 4.272039,-1.788737 8.109871,-4.464056 11.814389,-7.210481 3.992703,-3.038142 7.462385,-6.672239 10.813114,-10.386568 3.643931,-4.094816 6.770316,-8.591616 9.662136,-13.236313 2.77116,-4.446246 5.07791,-9.137684 7.1299,-13.9506 1.87898,-4.296725 3.21766,-8.777968 4.32554,-13.324875 0.98199,-4.030384 1.61112,-8.127909 2.08724,-12.244303 0.19581,-3.328214 0.7186,-6.670021 0.5188,-10.0091355 -0.1805,-1.023568 -0.71989,-2.025799 -1.91667,-1.900651 -0.25481,0.02665 -0.49927,0.115264 -0.7489,0.172896 -0.86102,0.336701 -0.96292,0.340095 -1.79908,0.829975 -1.43195,0.83894 -2.86802,1.672245 -4.27074,2.559181 -1.1168,0.7061455 -2.06902,1.7197055 -2.99705,2.6443955 -2.33311,2.339431 -4.35507,4.948049 -6.12639,7.73031 -1.895817,3.106687 -3.433168,6.412315 -4.938356,9.720363 -1.594543,3.296931 -2.618951,6.805126 -3.513629,10.342666 -0.854856,3.271162 -1.467459,6.59231 -2.044608,9.920917 -0.716838,3.652236 -1.205852,7.335625 -1.637437,11.030143 -0.423844,3.477913 -0.563404,6.979007 -0.629306,10.479031 -0.02944,3.625062 -0.07755,7.251703 0.0078,10.876182 0.06775,2.817421 0.5252,5.591067 1.324456,8.288161 0.566338,1.736156 1.152269,2.988054 2.682809,4.035634 1.265989,0.67495 2.666217,0.75001 4.018542,0.25344 0.4533,-0.16645 0.878927,-0.40029 1.31839,-0.60044 5.766859,-3.085969 10.801869,-7.274866 15.725829,-11.533028 3.1312,-2.770917 6.15376,-5.677082 8.87778,-8.854252 1.67783,-1.956945 2.01342,-2.486406 3.52805,-4.534918 3.07531,-4.331346 5.23955,-9.1698 7.11444,-14.112425 2.00328,-5.883603 3.87212,-11.811717 5.79662,-17.72136 1.83427,-5.768094 3.7639,-11.502975 5.30475,-17.3585 0.77992,-3.231433 1.58212,-6.497799 1.82476,-9.823514 -0.16663,-2.0991855 -1.57246,-1.6623705 -3.07972,-1.1354985 -2.14268,1.0070075 -4.1923,2.2790445 -6.17035,3.5519105 -0.38165,0.245593 -0.71169,0.563709 -1.05685,0.858395 -0.86463,0.738183 -1.47624,1.336358 -2.30819,2.121781 -2.45881,2.460152 -4.64781,5.186163 -6.4114,8.188779 -0.36973,0.629497 -0.70264,1.279906 -1.05397,1.919859 -2.01921,3.848069 -3.53097,7.927404 -4.77992,12.081224 -1.30637,5.567921 -1.64351,11.296931 -2.06064,16.9827 -0.60275,7.219426 -0.8805,14.45855 -1.07022,21.698714 -0.11992,4.626618 -0.12669,9.2676 0.26983,13.882142 0.13519,0.570582 0.0678,2.014683 0.91291,2.175621 0.51652,0.0984 0.94938,-0.221551 1.38052,-0.425828 1.41817,-0.859107 2.86252,-1.676432 4.25453,-2.577325 0.39369,-0.254794 0.72863,-0.590558 1.09418,-0.884303 0.41855,-0.336341 0.83814,-0.671402 1.25812,-1.005952 1.37397,-1.094456 2.77725,-2.146699 4.17517,-3.210202 2.48223,-1.744996 4.7761,-3.72427 7.01027,-5.772018 1.83752,-1.601621 3.4396,-3.354705 4.83002,-5.353082 1.00961,-1.48958 1.84726,-3.081263 2.65094,-4.688332 0.6348,-1.226409 1.28493,-2.429565 2.13145,-3.523466 0.75389,-0.928958 1.63735,-1.743567 2.5632,-2.49785 1.09572,-0.683175 3.90398,-2.631667 -1.03402,0.529233 -0.24742,0.158375 0.52711,-0.259966 0.79613,-0.377973 0.65649,-0.287967 0.78169,-0.309401 1.44995,-0.522774 0.93692,-0.219446 1.9235,-0.519912 2.8827,-0.297275 0.65777,0.323876 1.82353,0.705945 2.03977,1.487222 -0.0352,0.09704 -0.0572,0.199991 -0.10574,0.291127 -0.26693,0.501404 -0.70903,0.918199 -1.08166,1.336116 -0.59746,0.670076 -0.54807,0.622988 -1.15177,1.343729 -1.39852,1.846956 -2.80257,3.696356 -4.13053,5.595864 -1.39946,1.996447 -2.12165,4.327247 -2.71258,6.664555 -0.38256,1.587754 -0.54191,3.230477 -0.33021,4.853728 0.28348,0.864986 0.85288,1.551112 1.56867,2.091618 0.8646,0.547558 1.8615,0.767911 2.84526,0.993556 0.92807,0.167608 1.87553,0.338661 2.82378,0.294113 0.74743,-0.03512 1.20139,-0.148246 1.94574,-0.286948 2.64988,-0.554249 5.19928,-1.4692 7.67915,-2.540053 2.78936,-1.403123 5.6455,-2.839088 7.99686,-4.92732 0.78847,-0.700233 1.14594,-1.146288 1.84505,-1.929688 1.8549,-2.160114 2.57396,-4.746937 2.89032,-7.517183 0.17621,-2.458513 -0.49637,-4.283805 -1.88054,-6.264603 -1.27531,-1.448231 -2.88842,-2.534136 -4.59607,-3.405137 -1.58305,-0.727355 -3.23301,-1.298567 -4.92172,-1.72239 -0.95496,-0.228946 -1.92879,-0.358883 -2.90868,-0.273748 -1.86564,0.463862 -3.80559,1.413983 -5.07009,2.874883 -0.32192,0.479565 -0.38376,0.984972 -0.28586,1.539475 0.23172,0.653143 0.77962,0.958999 1.40696,1.149723 1.13237,0.201758 2.2929,0.172863 3.43913,0.176213 1.93851,-0.0046 3.87718,0.0068 5.81471,-0.05866 2.63691,-0.09763 5.2691,-0.294071 7.89759,-0.522139 3.65688,-0.285842 7.29547,-0.755261 10.94095,-1.154382 2.12163,-0.253172 4.24758,-0.465889 6.37419,-0.67178 0,0 3.0164,-2.237817 3.0164,-2.237817 v 0 c -2.13264,0.219975 -4.26543,0.439074 -6.39537,0.684343 -3.62065,0.377301 -7.23255,0.843933 -10.86425,1.105987 -2.6206,0.23727 -5.24661,0.42862 -7.87606,0.531749 -1.91896,0.06903 -3.83859,0.03377 -5.75858,0.03652 -1.11776,-0.0066 -2.24111,0.0085 -3.353,-0.121301 -0.48282,-0.09277 -0.98907,-0.238387 -1.15488,-0.758481 -0.0476,-0.462894 0.0995,-0.876059 0.43845,-1.203944 1.07251,-0.887241 2.57583,-1.561359 -2.67581,1.431118 -0.0975,0.05557 0.19564,-0.110098 0.29279,-0.166307 0.42668,-0.246858 0.17319,-0.137228 0.66365,-0.291536 0.95926,-0.138856 1.90804,-0.06833 2.85645,0.143962 1.68415,0.376032 3.31727,0.934464 4.89708,1.629609 1.66264,0.827516 3.23421,1.867212 4.49581,3.244982 1.35477,1.89996 1.96311,3.631594 1.775,6.000345 -0.35185,2.73385 -1.09904,5.208262 -2.98497,7.300958 -0.91693,0.990684 -1.83138,1.898324 -2.92303,2.700448 -0.37755,0.277419 -1.5924,0.971037 -1.15695,0.798142 0.72147,-0.286456 1.37698,-0.721862 2.02833,-1.144121 0.40098,-0.259946 -0.84991,0.437112 -1.27487,0.655671 -2.4471,1.090698 -4.96883,2.011141 -7.59277,2.580183 -0.56411,0.115284 -1.29501,0.284448 -1.87891,0.332361 -0.92399,0.07582 -1.85119,-0.09261 -2.75903,-0.237082 -0.93854,-0.204497 -1.88359,-0.408131 -2.73358,-0.873305 -0.64691,-0.46142 -1.18744,-1.027581 -1.42692,-1.807895 -0.20374,-1.573276 -0.0359,-3.157985 0.34126,-4.694727 0.59391,-2.30486 1.34379,-4.582745 2.75817,-6.531272 1.34765,-1.889394 2.72854,-3.760604 4.1727,-5.576654 0.58187,-0.676299 2.00084,-2.034159 2.20189,-2.895912 0.0358,-0.153371 0.0145,-0.314643 0.0218,-0.471964 -0.38532,-0.94995 -1.38741,-1.326981 -2.24029,-1.787316 -0.14534,-0.05818 -0.2843,-0.135911 -0.43601,-0.174532 -0.80381,-0.204627 -1.82391,0.196728 -2.61342,0.301691 -2.88884,0.816353 -5.4714,2.46498 -7.89638,4.203136 -0.92122,0.784043 -1.81206,1.615257 -2.53992,2.586773 -0.81238,1.121317 -1.44834,2.345248 -2.07949,3.575497 -0.8033,1.585087 -1.63948,3.157191 -2.64707,4.624197 -1.39532,1.95235 -3.03569,3.680928 -4.838,5.266333 -2.22878,2.02797 -4.52131,3.979579 -6.98225,5.723892 -1.83585,1.395855 -3.64924,2.81535 -5.46538,4.236437 -0.37443,0.292984 -1.5821,1.015715 -1.12905,0.871546 0.84402,-0.268579 1.56064,-0.838126 2.34095,-1.257189 -0.029,0.01746 -1.2201,0.795829 -1.39389,0.671097 -0.36007,-0.258434 -0.42193,-1.441408 -0.5214,-1.766557 -0.52857,-4.554212 -0.5761,-9.151387 -0.46399,-13.730277 0.15914,-7.238714 0.43897,-14.476145 1.09329,-21.689485 0.44649,-5.683523 0.81722,-11.415903 2.20788,-16.965221 1.26065,-4.13077 2.78051,-8.187433 4.81125,-12.008517 0.3547,-0.633499 0.69102,-1.277654 1.06411,-1.900496 1.79027,-2.988615 4.00425,-5.700052 6.50239,-8.123516 0.85096,-0.787822 1.45674,-1.373765 2.34755,-2.104072 0.3522,-0.288747 1.5139,-0.978058 1.08155,-0.834892 -0.81269,0.269111 -1.49735,0.830857 -2.25765,1.22434 -0.61078,0.3161 2.28693,-1.307303 1.81019,-0.989919 0.40043,-0.167437 1.95647,-0.884199 2.39686,-0.492474 0.24776,0.220382 0.23688,0.711071 0.26936,0.974501 -0.18096,3.274052 -0.93039,6.493444 -1.68278,9.674075 -1.50215,5.848821 -3.43787,11.56344 -5.26596,17.315952 -1.91742,5.916311 -3.79358,11.847216 -5.83974,17.720667 -1.90018,4.908502 -4.08672,9.714714 -7.15485,14.021263 -1.51437,2.035455 -1.84017,2.548353 -3.51736,4.492572 -2.72805,3.162369 -5.75343,6.053066 -8.8869,8.808453 -2.33387,2.004038 -4.68778,3.975809 -7.13752,5.838475 -0.69275,0.526735 -1.39814,1.036757 -2.10479,1.544699 -0.61164,0.439652 -1.607195,0.584824 -1.849868,1.297923 -0.20697,0.60819 1.140298,-0.592153 1.710448,-0.888232 -1.839321,0.922012 -3.064048,1.485942 -5.040256,0.618892 C 95.667502,92.611261 95.476039,92.518181 95.307991,92.390818 94.215889,91.563115 93.700843,90.18568 93.26358,88.943441 92.455971,86.290794 91.987267,83.558709 91.919636,80.781 c -0.09039,-3.620381 -0.03321,-7.242696 0.005,-10.863609 0.0791,-3.48574 0.212905,-6.973009 0.62729,-10.437895 0.428839,-3.69444 0.952172,-7.370939 1.669463,-11.022104 0.580892,-3.318074 1.202616,-6.627879 2.048743,-9.890858 0.899025,-3.520623 1.938583,-7.005286 3.541535,-10.28106 1.506433,-3.293338 3.039093,-6.587884 4.955123,-9.668056 1.80357,-2.761255 3.85015,-5.352675 6.20365,-7.67115 0.85947,-0.826311 1.09269,-1.0909825 2.0162,-1.8235875 0.33468,-0.265497 1.42839,-0.917007 1.03015,-0.762407 -0.81635,0.316913 -1.53205,0.848938 -2.30642,1.257861 -0.30688,0.162059 0.59462,-0.359187 0.90366,-0.517101 0.26446,-0.135133 0.54306,-0.240591 0.81458,-0.360887 1.44584,-0.489123 1.93019,-0.506238 2.31713,1.134412 0.25914,3.2959225 -0.20217,6.6109755 -0.4474,9.8939435 -0.48419,4.100261 -1.11057,8.182128 -2.09408,12.196699 -1.10008,4.523361 -2.44739,8.976291 -4.31248,13.251135 -2.05206,4.795284 -4.37813,9.460089 -7.13918,13.892358 -2.898233,4.625877 -6.033172,9.102754 -9.683872,13.174543 -3.378152,3.711302 -6.880537,7.337401 -10.91502,10.348298 -1.250593,0.916612 -1.911006,1.419053 -3.182818,2.280926 -0.486405,0.329623 -2.05191,1.076007 -1.474841,0.965406 0.701897,-0.134525 1.246185,-0.70013 1.873851,-1.041882 0.826984,-0.450275 -3.144494,1.804895 -2.523035,1.2705 -2.007468,0.710388 -4.046895,1.244069 -6.199285,1.041562 -1.471084,-0.07386 -2.946665,-0.18048 -4.384355,-0.521433 C 64.539865,86.500278 63.779277,86.357445 63.14936,85.963322 62.668599,85.6627 62.46347,85.086982 62.234129,84.593654 61.879958,83.58 61.610594,82.546186 61.516156,81.472023 c -0.124637,-1.504114 -0.271277,-3.007765 -0.22588,-4.519414 -0.0071,-1.593149 -0.02191,-3.187163 0.0365,-4.779576 0.109886,-1.984748 0.347413,-3.963856 1.029136,-5.84531 0.963557,-2.535844 2.259322,-4.839203 4.100674,-6.854574 0.31704,-0.332264 0.623223,-0.675238 0.951121,-0.996791 0.307991,-0.30203 1.373336,-0.979795 0.955429,-0.872861 -0.87626,0.224216 -1.590159,0.865066 -2.410856,1.245275 -0.07778,0.03603 0.613772,-0.511638 1.433922,-0.744662 0.181605,-0.0516 0.37306,-0.05828 0.559591,-0.08742 0.895342,0.06437 1.379636,0.153935 1.886614,0.968103 0.68983,1.273214 0.969897,2.675279 1.012751,4.119009 0.0772,1.958896 0.0065,3.922903 -0.146616,5.876859 -0.255902,2.448684 -0.679066,4.876123 -1.571122,7.18393 -0.81619,2.092198 -1.634898,4.214545 -2.993274,6.026594 -1.53376,1.998607 -3.196926,3.884396 -5.172416,5.464281 -1.241629,0.986996 -2.532676,1.896261 -3.855789,2.77124 -0.296952,0.196377 -1.213141,0.743599 -0.897384,0.579147 0.850169,-0.442791 1.668803,-0.943663 2.503204,-1.415495 -0.910717,0.464225 -1.885678,0.989907 -2.938095,0.957051 -0.381862,-0.02294 -0.777467,-0.03477 -1.017095,-0.377531 -0.241432,-0.491382 -0.406421,-1.016889 -0.499732,-1.556192 -0.157276,-0.962088 -0.173672,-1.945418 -0.30516,-2.911647 -0.06434,-0.944179 -0.01669,-1.892959 -0.111987,-2.83614 -0.115745,-1.135568 -0.352785,-2.251014 -0.558898,-3.372699 -0.242306,-1.548916 -0.506836,-3.096422 -0.875578,-4.620932 -0.42409,-1.908146 -0.938474,-3.797589 -1.457957,-5.681403 -0.604097,-1.953107 -1.29912,-3.880716 -2.148464,-5.741842 -0.701093,-1.514065 -1.5244,-2.949411 -2.610726,-4.225864 -0.962417,-1.055778 -1.950429,-2.10879 -3.289673,-2.687752 -1.198637,-0.545488 -2.428531,-0.866653 -3.758996,-0.822544 -1.497442,0.10305 -2.996724,0.273886 -4.398984,0.848426 -2.631324,1.113946 -5.324644,2.396715 -7.246728,4.556889 -1.052187,1.37744 -1.738804,2.783682 -2.092428,4.494634 -0.51911,2.233001 -0.924675,4.487349 -1.189098,6.765583 -0.191438,1.967037 -0.15623,3.937167 -0.125611,5.911779 0.03645,3.102477 0.07358,6.206357 0.245478,9.304914 0.148441,2.199703 0.252356,4.473104 1.050479,6.552986 4.059431,-1.943415 3.634699,-0.67162 3.524477,-3.456927 -0.06547,-1.22305 -0.15534,-2.444491 -0.275651,-3.663442 -0.06531,-1.033058 -0.02602,-2.069703 -0.10407,-3.102777 -0.06112,-1.008332 -0.16667,-2.010608 -0.270484,-3.014784 0.0017,-0.707123 0.0057,-1.414253 -0.0023,-2.12136 -0.0085,-1.160206 -0.01183,-2.320425 -0.01186,-3.48066 -0.0056,-1.578261 -0.0035,-3.15654 -0.0073,-4.734806 -0.0097,-1.429361 -0.03392,-2.859614 -0.142408,-4.285486 -0.122466,-1.513403 -0.293011,-3.023002 -0.312006,-4.542988 -0.09519,-1.782455 -0.265148,-3.563236 -0.255352,-5.349285 -3.97e-4,-1.968688 -0.0035,-3.937375 -0.0041,-5.906063 -3.17e-4,-1.988561 0.0031,-3.977106 0.0046,-5.965664 -3.44e-4,-1.751388 -0.0029,-3.502774 -0.0081,-5.254154 0.0019,-1.848268 0.0075,-3.698004 0.115591,-5.543724 0.151078,-2.134799 0.421179,-4.255371 0.868268,-6.350254 0.348081,-2.068034 0.664213,-4.152802 1.351928,-6.142609 0.518861,-1.645108 1.055206,-3.293259 1.92236,-4.79547 0.357804,-0.580639 0.690578,-1.200298 1.151821,-1.708809 0.130183,-0.143527 0.595318,-0.485921 0.421431,-0.400411 -2.263466,1.113083 -3.978651,2.392264 -2.733485,1.475561 0.723403,-0.144819 1.235954,-0.129367 1.963505,0.06083 0.853448,0.25707 1.558692,0.734606 2.13991,1.417843 0.918038,1.092114 1.448194,2.35313 1.642719,3.775604 0.284189,2.309487 0.07709,4.607343 -0.158388,6.915134 -0.237762,3.004576 -0.676195,5.982343 -1.31051,8.93024 -0.684385,3.115646 -1.418484,6.222029 -2.321634,9.28266 -0.851128,2.808029 -1.82612,5.576459 -2.632861,8.398225 -0.739395,2.596448 -1.571942,5.167307 -2.519365,7.695739 -1.104637,2.854314 -2.193606,5.718482 -3.535917,8.472384 -1.348219,2.676901 -2.7578,5.32406 -4.293959,7.898643 -1.126604,1.882704 -2.23774,3.781359 -3.523529,5.561579 0,0 3.610312,-1.554319 3.610312,-1.554319 z\\"\\n       style=\\"stroke-width:0.264583\\"\\n        />                    \\n    </g>\\n</svg>\\n{/if}\\n{#if show}\\n<article class=\\"h-full w-full\\">\\n    <div class=\\"flex justify-between items-center mx-20\\">\\n        <img transition:fly=\\"{{delay: 300, duration: 400, x: -500, y: 0, opacity: 1, easing: quintOut}}\\"  src=\\"{assets}/logo.png\\" alt=\\"\\"/>\\n        <img alt=\\"\\" transition:fly=\\"{{delay: 0, duration: 400, x: 200, y: 0, opacity: 1, easing: quintOut}}\\" class=\\"h-20 w-20 rounded-full\\" src=\\"{assets}/beer_hat_l.jpg\\" />\\n    </div>\\n    \\n    <section class=\\"flex justify-end mx-10\\">\\n        <div class=\\"flex-grow\\">\\n    \\n        </div>\\n        <div class=\\"font-bold flex flex-col justify-between\\" >\\n            <span transition:fly=\\"{{delay: 500, duration: 400, x: 500, y: 0, opacity: 1, easing: quintOut}}\\" class=\\"menu-item mb-2\\">\\n                About\\n            </span>\\n            <span transition:fly=\\"{{delay: 500, duration: 400, x: 500, y: 0, opacity: 1, easing: quintOut}}\\" class=\\"menu-item mb-2\\">\\n                Career\\n            </span>\\n            <span transition:fly=\\"{{delay: 600, duration: 400, x: 500, y: 0, opacity: 1, easing: quintOut}}\\" class=\\"menu-item mb-2\\">\\n                Programming\\n            </span>\\n            <span transition:fly=\\"{{delay: 700, duration: 400, x: 500, y: 0, opacity: 1, easing: quintOut}}\\" class=\\"menu-item mb-2\\">\\n                Interests\\n            </span>\\n        </div>\\n    </section>\\n</article>\\n\\n{/if}\\n<style>.menu-item{border:3px solid #0461ae}span{background:#1365b3;border-radius:255px 15px 225px 15px/15px 225px 15px 255px;color:#fff;cursor:pointer;line-height:1.5em;padding:1em}path{stroke:#000;fill:#fff}</style>"],"names":[],"mappings":"AAwDO,yBAAU,CAAC,OAAO,GAAG,CAAC,KAAK,CAAC,OAAO,CAAC,mBAAI,CAAC,WAAW,OAAO,CAAC,cAAc,KAAK,CAAC,IAAI,CAAC,KAAK,CAAC,IAAI,CAAC,IAAI,CAAC,KAAK,CAAC,IAAI,CAAC,KAAK,CAAC,MAAM,IAAI,CAAC,OAAO,OAAO,CAAC,YAAY,KAAK,CAAC,QAAQ,GAAG,CAAC,mBAAI,CAAC,OAAO,IAAI,CAAC,KAAK,IAAI,CAAC"}`
};
var Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let show = false;
	let condition = false;
	onMount(() => {
		setTimeout(() => (show = true), 500);
		setTimeout(() => true, 2e3);
		setTimeout(() => (condition = true), 300);
	});
	$$result.css.add(css);
	return `${
		condition
			? `<svg width="${'400'}" height="${'400'}"><g><path d="${'m 19.676108,82.658524 c 1.193416,-1.815901 2.294615,-3.689339 3.405578,-5.556122 1.520259,-2.582728 2.927039,-5.230477 4.259565,-7.914249 1.327868,-2.773913 2.421645,-5.648674 3.53703,-8.511952 0.945108,-2.541038 1.783284,-5.120114 2.509634,-7.731649 0.804926,-2.817006 1.786358,-5.577655 2.621209,-8.385395 0.89863,-3.066124 1.614313,-6.179957 2.292109,-9.300763 0.63206,-2.970114 1.084993,-5.96637 1.32021,-8.992954 0.26222,-2.336694 0.451614,-4.662652 0.15731,-7.001776 -0.21206,-1.490609 -0.7626,-2.82845 -1.705501,-3.992452 -0.610182,-0.733628 -1.357066,-1.275539 -2.246802,-1.607492 -0.671674,-0.208919 -1.367203,-0.317202 -2.06611,-0.224221 -3.404092,0.949337 -4.093043,2.202709 -5.539623,4.569642 -0.826956,1.543042 -1.350749,3.208901 -1.863361,4.874374 -0.678677,2.002893 -0.962359,4.104298 -1.311779,6.181227 -0.459275,2.105761 -0.710641,4.243353 -0.8664,6.390262 -0.110986,1.854509 -0.103404,3.712919 -0.107417,5.569878 -0.004,1.752317 0.0013,3.504637 0.0049,5.256951 0.0052,1.986097 0.0089,3.972184 0.009,5.958287 -4.24e-4,1.970061 -0.0036,3.940122 -0.0041,5.910186 -0.0071,1.793226 0.16868,3.581177 0.254606,5.371705 0.0068,1.525702 0.187611,3.040031 0.304435,4.559194 0.102016,1.417712 0.117014,2.839413 0.132322,4.260072 0.01312,1.577565 0.01068,3.155252 0.0031,4.732843 -0.0018,1.164934 -0.0064,2.329855 -0.0155,3.494754 -0.0084,0.708007 -0.0044,1.41604 -0.0027,2.12406 0.143767,1.004763 0.242888,2.012444 0.298581,3.025788 0.05866,1.036015 0.018,2.074521 0.108969,3.108139 0.138331,1.214901 0.217328,2.434821 0.264032,3.656317 0.09995,2.722656 -0.645987,2.161846 3.353339,-0.334645 -0.823725,-1.98351 -0.92222,-4.184192 -1.083916,-6.299496 -0.186084,-3.096236 -0.203427,-6.19909 -0.199873,-9.299855 0.0045,-1.966447 -0.026,-3.928629 0.16415,-5.887228 0.241062,-2.269511 0.672347,-4.50728 1.219562,-6.721015 0.402894,-1.742892 1.048653,-2.983849 2.180673,-4.348972 0.524531,-0.517744 0.567068,-0.591814 1.152271,-1.041405 0.205433,-0.157824 0.859493,-0.576554 0.632777,-0.45121 -5.258399,2.907162 -2.37545,1.407332 -1.151541,0.868606 1.366457,-0.602176 2.833288,-0.823002 4.308443,-0.942139 1.276128,-0.08443 2.478101,0.17584 3.644109,0.670325 1.30909,0.531471 2.280812,1.524121 3.216611,2.542587 1.062305,1.243912 1.87552,2.639751 2.567001,4.114411 0.841266,1.844763 1.543272,3.750239 2.134661,5.688571 0.509847,1.877052 1.021572,3.758867 1.423985,5.662671 0.351173,1.521438 0.626089,3.060961 0.85135,4.605898 0.214579,1.116753 0.421703,2.234226 0.522695,3.367601 0.07451,0.941874 0.02956,1.886841 0.116395,2.827242 0.155003,0.976823 0.134609,1.977633 0.305268,2.950456 0.09963,0.576964 0.283276,1.137801 0.54188,1.662835 0.280863,0.458853 0.72271,0.62784 1.228879,0.710088 1.113827,0.12907 2.141923,-0.352239 3.121615,-0.816287 3.093698,-1.689367 6.116118,-3.545295 8.842758,-5.787898 1.967037,-1.613355 3.612833,-3.532018 5.142714,-5.5515 1.328447,-1.853639 2.144625,-4.002485 2.939833,-6.122993 0.877927,-2.34088 1.281316,-4.802476 1.533652,-7.277687 0.151778,-1.974665 0.241306,-3.960606 0.146,-5.939901 -0.03346,-1.505718 -0.366466,-2.955171 -1.062381,-4.288774 -0.530614,-0.893514 -1.085411,-1.16957 -2.084973,-1.297041 -0.807005,-0.0274 -1.497316,0.252688 -2.178375,0.668494 -3.783552,2.309968 -3.733742,2.03818 -6.025409,4.531037 -1.853499,2.126477 -3.093516,4.364688 -4.052446,6.999126 -0.678484,1.924039 -0.907306,3.944784 -1.017476,5.968637 -0.06198,1.599777 -0.0369,3.201194 -0.02907,4.80169 -0.05201,1.522463 0.113665,3.035925 0.225888,4.551585 0.09714,1.108766 0.384032,2.173298 0.74313,3.22109 0.239868,0.592178 0.518178,1.169594 1.014486,1.584434 0.656162,0.471101 1.463244,0.638836 2.241325,0.792744 1.460678,0.325853 2.949345,0.462466 4.440452,0.544531 2.212327,0.206579 4.242845,-0.253362 6.324494,-0.950385 4.272039,-1.788737 8.109871,-4.464056 11.814389,-7.210481 3.992703,-3.038142 7.462385,-6.672239 10.813114,-10.386568 3.643931,-4.094816 6.770316,-8.591616 9.662136,-13.236313 2.77116,-4.446246 5.07791,-9.137684 7.1299,-13.9506 1.87898,-4.296725 3.21766,-8.777968 4.32554,-13.324875 0.98199,-4.030384 1.61112,-8.127909 2.08724,-12.244303 0.19581,-3.328214 0.7186,-6.670021 0.5188,-10.0091355 -0.1805,-1.023568 -0.71989,-2.025799 -1.91667,-1.900651 -0.25481,0.02665 -0.49927,0.115264 -0.7489,0.172896 -0.86102,0.336701 -0.96292,0.340095 -1.79908,0.829975 -1.43195,0.83894 -2.86802,1.672245 -4.27074,2.559181 -1.1168,0.7061455 -2.06902,1.7197055 -2.99705,2.6443955 -2.33311,2.339431 -4.35507,4.948049 -6.12639,7.73031 -1.895817,3.106687 -3.433168,6.412315 -4.938356,9.720363 -1.594543,3.296931 -2.618951,6.805126 -3.513629,10.342666 -0.854856,3.271162 -1.467459,6.59231 -2.044608,9.920917 -0.716838,3.652236 -1.205852,7.335625 -1.637437,11.030143 -0.423844,3.477913 -0.563404,6.979007 -0.629306,10.479031 -0.02944,3.625062 -0.07755,7.251703 0.0078,10.876182 0.06775,2.817421 0.5252,5.591067 1.324456,8.288161 0.566338,1.736156 1.152269,2.988054 2.682809,4.035634 1.265989,0.67495 2.666217,0.75001 4.018542,0.25344 0.4533,-0.16645 0.878927,-0.40029 1.31839,-0.60044 5.766859,-3.085969 10.801869,-7.274866 15.725829,-11.533028 3.1312,-2.770917 6.15376,-5.677082 8.87778,-8.854252 1.67783,-1.956945 2.01342,-2.486406 3.52805,-4.534918 3.07531,-4.331346 5.23955,-9.1698 7.11444,-14.112425 2.00328,-5.883603 3.87212,-11.811717 5.79662,-17.72136 1.83427,-5.768094 3.7639,-11.502975 5.30475,-17.3585 0.77992,-3.231433 1.58212,-6.497799 1.82476,-9.823514 -0.16663,-2.0991855 -1.57246,-1.6623705 -3.07972,-1.1354985 -2.14268,1.0070075 -4.1923,2.2790445 -6.17035,3.5519105 -0.38165,0.245593 -0.71169,0.563709 -1.05685,0.858395 -0.86463,0.738183 -1.47624,1.336358 -2.30819,2.121781 -2.45881,2.460152 -4.64781,5.186163 -6.4114,8.188779 -0.36973,0.629497 -0.70264,1.279906 -1.05397,1.919859 -2.01921,3.848069 -3.53097,7.927404 -4.77992,12.081224 -1.30637,5.567921 -1.64351,11.296931 -2.06064,16.9827 -0.60275,7.219426 -0.8805,14.45855 -1.07022,21.698714 -0.11992,4.626618 -0.12669,9.2676 0.26983,13.882142 0.13519,0.570582 0.0678,2.014683 0.91291,2.175621 0.51652,0.0984 0.94938,-0.221551 1.38052,-0.425828 1.41817,-0.859107 2.86252,-1.676432 4.25453,-2.577325 0.39369,-0.254794 0.72863,-0.590558 1.09418,-0.884303 0.41855,-0.336341 0.83814,-0.671402 1.25812,-1.005952 1.37397,-1.094456 2.77725,-2.146699 4.17517,-3.210202 2.48223,-1.744996 4.7761,-3.72427 7.01027,-5.772018 1.83752,-1.601621 3.4396,-3.354705 4.83002,-5.353082 1.00961,-1.48958 1.84726,-3.081263 2.65094,-4.688332 0.6348,-1.226409 1.28493,-2.429565 2.13145,-3.523466 0.75389,-0.928958 1.63735,-1.743567 2.5632,-2.49785 1.09572,-0.683175 3.90398,-2.631667 -1.03402,0.529233 -0.24742,0.158375 0.52711,-0.259966 0.79613,-0.377973 0.65649,-0.287967 0.78169,-0.309401 1.44995,-0.522774 0.93692,-0.219446 1.9235,-0.519912 2.8827,-0.297275 0.65777,0.323876 1.82353,0.705945 2.03977,1.487222 -0.0352,0.09704 -0.0572,0.199991 -0.10574,0.291127 -0.26693,0.501404 -0.70903,0.918199 -1.08166,1.336116 -0.59746,0.670076 -0.54807,0.622988 -1.15177,1.343729 -1.39852,1.846956 -2.80257,3.696356 -4.13053,5.595864 -1.39946,1.996447 -2.12165,4.327247 -2.71258,6.664555 -0.38256,1.587754 -0.54191,3.230477 -0.33021,4.853728 0.28348,0.864986 0.85288,1.551112 1.56867,2.091618 0.8646,0.547558 1.8615,0.767911 2.84526,0.993556 0.92807,0.167608 1.87553,0.338661 2.82378,0.294113 0.74743,-0.03512 1.20139,-0.148246 1.94574,-0.286948 2.64988,-0.554249 5.19928,-1.4692 7.67915,-2.540053 2.78936,-1.403123 5.6455,-2.839088 7.99686,-4.92732 0.78847,-0.700233 1.14594,-1.146288 1.84505,-1.929688 1.8549,-2.160114 2.57396,-4.746937 2.89032,-7.517183 0.17621,-2.458513 -0.49637,-4.283805 -1.88054,-6.264603 -1.27531,-1.448231 -2.88842,-2.534136 -4.59607,-3.405137 -1.58305,-0.727355 -3.23301,-1.298567 -4.92172,-1.72239 -0.95496,-0.228946 -1.92879,-0.358883 -2.90868,-0.273748 -1.86564,0.463862 -3.80559,1.413983 -5.07009,2.874883 -0.32192,0.479565 -0.38376,0.984972 -0.28586,1.539475 0.23172,0.653143 0.77962,0.958999 1.40696,1.149723 1.13237,0.201758 2.2929,0.172863 3.43913,0.176213 1.93851,-0.0046 3.87718,0.0068 5.81471,-0.05866 2.63691,-0.09763 5.2691,-0.294071 7.89759,-0.522139 3.65688,-0.285842 7.29547,-0.755261 10.94095,-1.154382 2.12163,-0.253172 4.24758,-0.465889 6.37419,-0.67178 0,0 3.0164,-2.237817 3.0164,-2.237817 v 0 c -2.13264,0.219975 -4.26543,0.439074 -6.39537,0.684343 -3.62065,0.377301 -7.23255,0.843933 -10.86425,1.105987 -2.6206,0.23727 -5.24661,0.42862 -7.87606,0.531749 -1.91896,0.06903 -3.83859,0.03377 -5.75858,0.03652 -1.11776,-0.0066 -2.24111,0.0085 -3.353,-0.121301 -0.48282,-0.09277 -0.98907,-0.238387 -1.15488,-0.758481 -0.0476,-0.462894 0.0995,-0.876059 0.43845,-1.203944 1.07251,-0.887241 2.57583,-1.561359 -2.67581,1.431118 -0.0975,0.05557 0.19564,-0.110098 0.29279,-0.166307 0.42668,-0.246858 0.17319,-0.137228 0.66365,-0.291536 0.95926,-0.138856 1.90804,-0.06833 2.85645,0.143962 1.68415,0.376032 3.31727,0.934464 4.89708,1.629609 1.66264,0.827516 3.23421,1.867212 4.49581,3.244982 1.35477,1.89996 1.96311,3.631594 1.775,6.000345 -0.35185,2.73385 -1.09904,5.208262 -2.98497,7.300958 -0.91693,0.990684 -1.83138,1.898324 -2.92303,2.700448 -0.37755,0.277419 -1.5924,0.971037 -1.15695,0.798142 0.72147,-0.286456 1.37698,-0.721862 2.02833,-1.144121 0.40098,-0.259946 -0.84991,0.437112 -1.27487,0.655671 -2.4471,1.090698 -4.96883,2.011141 -7.59277,2.580183 -0.56411,0.115284 -1.29501,0.284448 -1.87891,0.332361 -0.92399,0.07582 -1.85119,-0.09261 -2.75903,-0.237082 -0.93854,-0.204497 -1.88359,-0.408131 -2.73358,-0.873305 -0.64691,-0.46142 -1.18744,-1.027581 -1.42692,-1.807895 -0.20374,-1.573276 -0.0359,-3.157985 0.34126,-4.694727 0.59391,-2.30486 1.34379,-4.582745 2.75817,-6.531272 1.34765,-1.889394 2.72854,-3.760604 4.1727,-5.576654 0.58187,-0.676299 2.00084,-2.034159 2.20189,-2.895912 0.0358,-0.153371 0.0145,-0.314643 0.0218,-0.471964 -0.38532,-0.94995 -1.38741,-1.326981 -2.24029,-1.787316 -0.14534,-0.05818 -0.2843,-0.135911 -0.43601,-0.174532 -0.80381,-0.204627 -1.82391,0.196728 -2.61342,0.301691 -2.88884,0.816353 -5.4714,2.46498 -7.89638,4.203136 -0.92122,0.784043 -1.81206,1.615257 -2.53992,2.586773 -0.81238,1.121317 -1.44834,2.345248 -2.07949,3.575497 -0.8033,1.585087 -1.63948,3.157191 -2.64707,4.624197 -1.39532,1.95235 -3.03569,3.680928 -4.838,5.266333 -2.22878,2.02797 -4.52131,3.979579 -6.98225,5.723892 -1.83585,1.395855 -3.64924,2.81535 -5.46538,4.236437 -0.37443,0.292984 -1.5821,1.015715 -1.12905,0.871546 0.84402,-0.268579 1.56064,-0.838126 2.34095,-1.257189 -0.029,0.01746 -1.2201,0.795829 -1.39389,0.671097 -0.36007,-0.258434 -0.42193,-1.441408 -0.5214,-1.766557 -0.52857,-4.554212 -0.5761,-9.151387 -0.46399,-13.730277 0.15914,-7.238714 0.43897,-14.476145 1.09329,-21.689485 0.44649,-5.683523 0.81722,-11.415903 2.20788,-16.965221 1.26065,-4.13077 2.78051,-8.187433 4.81125,-12.008517 0.3547,-0.633499 0.69102,-1.277654 1.06411,-1.900496 1.79027,-2.988615 4.00425,-5.700052 6.50239,-8.123516 0.85096,-0.787822 1.45674,-1.373765 2.34755,-2.104072 0.3522,-0.288747 1.5139,-0.978058 1.08155,-0.834892 -0.81269,0.269111 -1.49735,0.830857 -2.25765,1.22434 -0.61078,0.3161 2.28693,-1.307303 1.81019,-0.989919 0.40043,-0.167437 1.95647,-0.884199 2.39686,-0.492474 0.24776,0.220382 0.23688,0.711071 0.26936,0.974501 -0.18096,3.274052 -0.93039,6.493444 -1.68278,9.674075 -1.50215,5.848821 -3.43787,11.56344 -5.26596,17.315952 -1.91742,5.916311 -3.79358,11.847216 -5.83974,17.720667 -1.90018,4.908502 -4.08672,9.714714 -7.15485,14.021263 -1.51437,2.035455 -1.84017,2.548353 -3.51736,4.492572 -2.72805,3.162369 -5.75343,6.053066 -8.8869,8.808453 -2.33387,2.004038 -4.68778,3.975809 -7.13752,5.838475 -0.69275,0.526735 -1.39814,1.036757 -2.10479,1.544699 -0.61164,0.439652 -1.607195,0.584824 -1.849868,1.297923 -0.20697,0.60819 1.140298,-0.592153 1.710448,-0.888232 -1.839321,0.922012 -3.064048,1.485942 -5.040256,0.618892 C 95.667502,92.611261 95.476039,92.518181 95.307991,92.390818 94.215889,91.563115 93.700843,90.18568 93.26358,88.943441 92.455971,86.290794 91.987267,83.558709 91.919636,80.781 c -0.09039,-3.620381 -0.03321,-7.242696 0.005,-10.863609 0.0791,-3.48574 0.212905,-6.973009 0.62729,-10.437895 0.428839,-3.69444 0.952172,-7.370939 1.669463,-11.022104 0.580892,-3.318074 1.202616,-6.627879 2.048743,-9.890858 0.899025,-3.520623 1.938583,-7.005286 3.541535,-10.28106 1.506433,-3.293338 3.039093,-6.587884 4.955123,-9.668056 1.80357,-2.761255 3.85015,-5.352675 6.20365,-7.67115 0.85947,-0.826311 1.09269,-1.0909825 2.0162,-1.8235875 0.33468,-0.265497 1.42839,-0.917007 1.03015,-0.762407 -0.81635,0.316913 -1.53205,0.848938 -2.30642,1.257861 -0.30688,0.162059 0.59462,-0.359187 0.90366,-0.517101 0.26446,-0.135133 0.54306,-0.240591 0.81458,-0.360887 1.44584,-0.489123 1.93019,-0.506238 2.31713,1.134412 0.25914,3.2959225 -0.20217,6.6109755 -0.4474,9.8939435 -0.48419,4.100261 -1.11057,8.182128 -2.09408,12.196699 -1.10008,4.523361 -2.44739,8.976291 -4.31248,13.251135 -2.05206,4.795284 -4.37813,9.460089 -7.13918,13.892358 -2.898233,4.625877 -6.033172,9.102754 -9.683872,13.174543 -3.378152,3.711302 -6.880537,7.337401 -10.91502,10.348298 -1.250593,0.916612 -1.911006,1.419053 -3.182818,2.280926 -0.486405,0.329623 -2.05191,1.076007 -1.474841,0.965406 0.701897,-0.134525 1.246185,-0.70013 1.873851,-1.041882 0.826984,-0.450275 -3.144494,1.804895 -2.523035,1.2705 -2.007468,0.710388 -4.046895,1.244069 -6.199285,1.041562 -1.471084,-0.07386 -2.946665,-0.18048 -4.384355,-0.521433 C 64.539865,86.500278 63.779277,86.357445 63.14936,85.963322 62.668599,85.6627 62.46347,85.086982 62.234129,84.593654 61.879958,83.58 61.610594,82.546186 61.516156,81.472023 c -0.124637,-1.504114 -0.271277,-3.007765 -0.22588,-4.519414 -0.0071,-1.593149 -0.02191,-3.187163 0.0365,-4.779576 0.109886,-1.984748 0.347413,-3.963856 1.029136,-5.84531 0.963557,-2.535844 2.259322,-4.839203 4.100674,-6.854574 0.31704,-0.332264 0.623223,-0.675238 0.951121,-0.996791 0.307991,-0.30203 1.373336,-0.979795 0.955429,-0.872861 -0.87626,0.224216 -1.590159,0.865066 -2.410856,1.245275 -0.07778,0.03603 0.613772,-0.511638 1.433922,-0.744662 0.181605,-0.0516 0.37306,-0.05828 0.559591,-0.08742 0.895342,0.06437 1.379636,0.153935 1.886614,0.968103 0.68983,1.273214 0.969897,2.675279 1.012751,4.119009 0.0772,1.958896 0.0065,3.922903 -0.146616,5.876859 -0.255902,2.448684 -0.679066,4.876123 -1.571122,7.18393 -0.81619,2.092198 -1.634898,4.214545 -2.993274,6.026594 -1.53376,1.998607 -3.196926,3.884396 -5.172416,5.464281 -1.241629,0.986996 -2.532676,1.896261 -3.855789,2.77124 -0.296952,0.196377 -1.213141,0.743599 -0.897384,0.579147 0.850169,-0.442791 1.668803,-0.943663 2.503204,-1.415495 -0.910717,0.464225 -1.885678,0.989907 -2.938095,0.957051 -0.381862,-0.02294 -0.777467,-0.03477 -1.017095,-0.377531 -0.241432,-0.491382 -0.406421,-1.016889 -0.499732,-1.556192 -0.157276,-0.962088 -0.173672,-1.945418 -0.30516,-2.911647 -0.06434,-0.944179 -0.01669,-1.892959 -0.111987,-2.83614 -0.115745,-1.135568 -0.352785,-2.251014 -0.558898,-3.372699 -0.242306,-1.548916 -0.506836,-3.096422 -0.875578,-4.620932 -0.42409,-1.908146 -0.938474,-3.797589 -1.457957,-5.681403 -0.604097,-1.953107 -1.29912,-3.880716 -2.148464,-5.741842 -0.701093,-1.514065 -1.5244,-2.949411 -2.610726,-4.225864 -0.962417,-1.055778 -1.950429,-2.10879 -3.289673,-2.687752 -1.198637,-0.545488 -2.428531,-0.866653 -3.758996,-0.822544 -1.497442,0.10305 -2.996724,0.273886 -4.398984,0.848426 -2.631324,1.113946 -5.324644,2.396715 -7.246728,4.556889 -1.052187,1.37744 -1.738804,2.783682 -2.092428,4.494634 -0.51911,2.233001 -0.924675,4.487349 -1.189098,6.765583 -0.191438,1.967037 -0.15623,3.937167 -0.125611,5.911779 0.03645,3.102477 0.07358,6.206357 0.245478,9.304914 0.148441,2.199703 0.252356,4.473104 1.050479,6.552986 4.059431,-1.943415 3.634699,-0.67162 3.524477,-3.456927 -0.06547,-1.22305 -0.15534,-2.444491 -0.275651,-3.663442 -0.06531,-1.033058 -0.02602,-2.069703 -0.10407,-3.102777 -0.06112,-1.008332 -0.16667,-2.010608 -0.270484,-3.014784 0.0017,-0.707123 0.0057,-1.414253 -0.0023,-2.12136 -0.0085,-1.160206 -0.01183,-2.320425 -0.01186,-3.48066 -0.0056,-1.578261 -0.0035,-3.15654 -0.0073,-4.734806 -0.0097,-1.429361 -0.03392,-2.859614 -0.142408,-4.285486 -0.122466,-1.513403 -0.293011,-3.023002 -0.312006,-4.542988 -0.09519,-1.782455 -0.265148,-3.563236 -0.255352,-5.349285 -3.97e-4,-1.968688 -0.0035,-3.937375 -0.0041,-5.906063 -3.17e-4,-1.988561 0.0031,-3.977106 0.0046,-5.965664 -3.44e-4,-1.751388 -0.0029,-3.502774 -0.0081,-5.254154 0.0019,-1.848268 0.0075,-3.698004 0.115591,-5.543724 0.151078,-2.134799 0.421179,-4.255371 0.868268,-6.350254 0.348081,-2.068034 0.664213,-4.152802 1.351928,-6.142609 0.518861,-1.645108 1.055206,-3.293259 1.92236,-4.79547 0.357804,-0.580639 0.690578,-1.200298 1.151821,-1.708809 0.130183,-0.143527 0.595318,-0.485921 0.421431,-0.400411 -2.263466,1.113083 -3.978651,2.392264 -2.733485,1.475561 0.723403,-0.144819 1.235954,-0.129367 1.963505,0.06083 0.853448,0.25707 1.558692,0.734606 2.13991,1.417843 0.918038,1.092114 1.448194,2.35313 1.642719,3.775604 0.284189,2.309487 0.07709,4.607343 -0.158388,6.915134 -0.237762,3.004576 -0.676195,5.982343 -1.31051,8.93024 -0.684385,3.115646 -1.418484,6.222029 -2.321634,9.28266 -0.851128,2.808029 -1.82612,5.576459 -2.632861,8.398225 -0.739395,2.596448 -1.571942,5.167307 -2.519365,7.695739 -1.104637,2.854314 -2.193606,5.718482 -3.535917,8.472384 -1.348219,2.676901 -2.7578,5.32406 -4.293959,7.898643 -1.126604,1.882704 -2.23774,3.781359 -3.523529,5.561579 0,0 3.610312,-1.554319 3.610312,-1.554319 z'}" style="${'stroke-width:0.264583'}" class="${'svelte-1kliy5y'}"></path></g></svg>`
			: ``
	}
${
	show
		? `<article class="${'h-full w-full'}"><div class="${'flex justify-between items-center mx-20'}"><img src="${
				escape2(assets) + '/logo.png'
		  }" alt="${''}">
        <img alt="${''}" class="${'h-20 w-20 rounded-full'}" src="${
				escape2(assets) + '/beer_hat_l.jpg'
		  }"></div>
    
    <section class="${'flex justify-end mx-10'}"><div class="${'flex-grow'}"></div>
        <div class="${'font-bold flex flex-col justify-between'}"><span class="${'menu-item mb-2 svelte-1kliy5y'}">About
            </span>
            <span class="${'menu-item mb-2 svelte-1kliy5y'}">Career
            </span>
            <span class="${'menu-item mb-2 svelte-1kliy5y'}">Programming
            </span>
            <span class="${'menu-item mb-2 svelte-1kliy5y'}">Interests
            </span></div></section></article>`
		: ``
}`;
});
var index = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	default: Routes
});

// .svelte-kit/vercel/entry.js
init();
var entry_default = async (req, res) => {
	const { pathname, searchParams } = new URL(req.url || '', 'http://localhost');
	let body;
	try {
		body = await getRawBody(req);
	} catch (err) {
		res.statusCode = err.status || 400;
		return res.end(err.reason || 'Invalid request body');
	}
	const rendered = await render({
		method: req.method,
		headers: req.headers,
		path: pathname,
		query: searchParams,
		rawBody: body
	});
	if (rendered) {
		const { status, headers, body: body2 } = rendered;
		return res.writeHead(status, headers).end(body2);
	}
	return res.writeHead(404).end();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
