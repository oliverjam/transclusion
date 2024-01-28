import { cookies, Root, html } from "./helpers.ts";

let server = Bun.serve({
	async fetch(req) {
		let c = cookies(req);
		let count = Number(c.count ?? 0);
		if (req.method === "GET") {
			let title = "Counter - transclusion examples";
			let body = /*html*/ `
				<form method="POST" data-boost data-select="output" data-target="output">
					<button name="diff" value="-1">-</button>
					<output>${count}</output>
					<button name="diff" value="+1">+</button>
				</form>
			`;
			return html(Root(title, body));
		}
		if (req.method === "POST") {
			let body = await req.formData();
			let diff = Number(body.get("diff"));
			let res = Response.redirect("/", 303);
			res.headers.append("set-cookie", `count=${count + diff}`);
			return res;
		}
		return html("<h1>Not found</h1>", { status: 404 });
	},
});

console.log(`http://localhost:${server.port}`);
