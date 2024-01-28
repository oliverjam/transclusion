import { cookies, Root, html } from "./helpers.ts";

let server = Bun.serve({
	async fetch(req) {
		if (req.method === "GET") {
			return html(Form());
		}
		if (req.method === "POST") {
			let body = await req.formData();
			let values = {
				email: String(body.get("email")),
				first: String(body.get("first")),
				last: String(body.get("last")),
			};
			let errors: Values = {};
			if (!values.email) errors.email = "Email is required";
			else if (!values.email.includes("@")) errors.email = "Not a valid email";
			if (!values.first) errors.first = "First name is required";
			if (!values.last) errors.last = "Last name is required";
			if (Object.keys(errors).length) {
				return html(Form(values, errors), { status: 400 });
			}
			let res = Response.redirect("/", 303);
			return res;
		}
		return html("<h1>Not found</h1>", { status: 404 });
	},
});

type Values = { email?: string; first?: string; last?: string };

// how to validate on blur??
function Form(values: Values = {}, errors: Values = {}) {
	let title = "Inline validation - transclusion examples";
	let body = /*html*/ `
			<form method="POST">
				${Input("Email address", "email", values.email, errors.email)}
				${Input("First name", "first", values.first, errors.first)}
				${Input("Lirst name", "last", values.last, errors.last)}
				<button>Submit</button>
			</form>
		`;
	let styles = /*css*/ `
		[aria-invalid="true"] { box-shadow: 0 0 0 1px red; }
		[id$="error"] { color: red }
	`;
	return Root(title, body, styles);
}

console.log(`http://localhost:${server.port}`);

function Input(label: string, name: string, value: string = "", error = "") {
	return /*html*/ `
		<p>
			<label for="${name}">${label}</label>
			<input
				id="${name}"
				name="${name}"
				value="${value}"
				aria-errormessage="${name}-error"
				${error ? `aria-invalid="true"` : `aria-invalid="false"`}
			>
			<span id="name-error">${error}</span>
	</p>
	`;
}
