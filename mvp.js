import { serve } from "https://deno.land/std@0.71.0/http/server.ts";

export class App {
	constructor(options) {
		this._paths = []; // tuples of path string and handler function.
		this.name = options.name || 'mvp_app';
		this.title = options.title || 'New MVP Application';
	}
	get(path, fn) {
		this._paths.push([path, fn]);
	}
	async listen(port) {  // TODO: Get rid of async on the client.
		port = port || 8000;
		const s = serve({ port: port });
		for await (const req of s) {
			this._route_request(req);
		}
		console.log(
			`${this.name}: Serving ${this.title} on http://localhost:${port}/`
		);
	}
	_route_request(req) {
		for (let p of this._paths) {
			let search = new RegExp(`^${p[0]}$`);
			let m = req.url.match(search);
			if (m) {
				// TODO: implement next() functionality.
				return p[1](req);
			}
		}
		req.respond({body:'Page not found.', status:404});
	}
}
