import { cookies, Root, html } from "./helpers.ts";

let server = Bun.serve({
	async fetch(req) {
		let { first = "Joe", last = "Blow", email = "joe@blow.com" } = cookies(req);
		let url = new URL(req.url);
		let editing = url.searchParams.has("edit");
		if (req.method === "GET") {
			let title = "Click to edit - transclusion examples";
			let body = /*html*/ `
				<form id="edit" method="POST" data-boost data-select="#edit" data-target="#edit">
					${Input(editing, "First name", "first", first)}
					${Input(editing, "Last name", "last", last)}
					${Input(editing, "Email", "email", email)}
					${
						editing
							? /*html*/ `<button>Save</button><button form="toggle">Cancel</button>`
							: /*html*/ `<button form="toggle" name="edit">Edit</button>`
					}
				</form>
				<form id="toggle" data-boost data-select="#edit" data-target="#edit"></form>
			`;
			let styles = /*css*/ `
				input[readonly] { border-color: transparent }
			`;
			return html(Root(title, body, styles));
		}
		if (req.method === "POST") {
			let body = await req.formData();
			let first = String(body.get("first"));
			let last = String(body.get("last"));
			let email = String(body.get("email"));
			let res = Response.redirect("/", 303);
			res.headers.append("set-cookie", `first=${first}`);
			res.headers.append("set-cookie", `last=${last}`);
			res.headers.append("set-cookie", `email=${email}`);
			return res;
		}
		return html("<h1>Not found</h1>", { status: 404 });
	},
});

console.log(`http://localhost:${server.port}`);

function Input(editing: boolean, label: string, name: string, value: string) {
	let readonly = editing ? "" : " readonly";
	return /*html*/ `
		<p>
			<label for="${name}">${label}:</label>
			<input id="${name}" name="${name}" value="${value}"${readonly}>
		</p>
	`;
}
