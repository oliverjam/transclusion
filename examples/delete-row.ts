import { Root, html } from "./helpers.ts";

let server = Bun.serve({
	async fetch(req) {
		if (req.method === "GET") {
			let title = "Delete row - transclusion examples";
			let rows = "";
			for (let u of users) rows += Row(u);
			let body = /*html*/ `
				<table>
					<thead><th>Name<th>Email<th>Status</thead>
					<tbody>${rows}</tbody>
				</table>
			`;
			let styles = /*css*/ `
			  table { width: 100%; border-collapse: collapse; }
				th { padding: 4px; text-align: left; border-bottom: 2px solid #eee }
				td { padding: 4px; border-bottom: 1px solid #eee }
				tr[data-swapping] { opacity: 0; transition: opacity 500ms ease-out }
			`;
			let res = html(Root(title, body, styles));
			res.headers.append("set-cookie", `changed=`);
			return res;
		}
		if (req.method === "POST") {
			let body = await req.formData();
			let id = Number(body.get("id"));
			users.delete(id);
			return Response.redirect("/", 303);
		}
		return html("<h1>Not found</h1>", { status: 404 });
	},
});

type User = { name: string; email: string; status: "Active" | "Inactive" };
let users = new Map<number, User>([
	[0, { name: "Joe Smith", email: "joe@s.org", status: "Active" }],
	[1, { name: "Angie MacDowell", email: "angie@m.org", status: "Active" }],
	[2, { name: "Fuqua Tarkenton", email: "fuqua@t.org", status: "Active" }],
	[3, { name: "Kim Yee", email: "kim@y.org", status: "Inactive" }],
]);

function Row([id, { name, email, status }]: [number, User]) {
	return /*html*/ `
		<tr>
			<td>${name}
			<td>${email}
			<td>${status}
			<td>
				<form
					method="POST"
					data-boost
					data-target="closest tr"
					data-swap="delete"
					data-delay="500"
					data-confirm="Delete user ${name}?"
				>
					<button name="id" value="${id}">Delete
				</form>
		</tr>
	`;
}

console.log(`http://localhost:${server.port}`);
