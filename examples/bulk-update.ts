import { cookies, Root, html } from "./helpers.ts";

let server = Bun.serve({
	async fetch(req) {
		let c = cookies(req);
		let changed = c.changed?.split(",") || [];
		if (req.method === "GET") {
			let title = "Bulk update - transclusion examples";
			let rows = "";
			for (let u of users) rows += Row(u, changed);
			let body = /*html*/ `
				<form method="POST" data-boost data-select="tbody" data-target="tbody">
					<table>
						<thead><th><span class="vh">Select<th>Name<th>Email<th>Status</thead>
						<tbody>${rows}</tbody>
					</table>
					<p>
						<button name="intent" value="activate">Activate</button>
						<button name="intent" value="deactivate">Deactivate</button>
					</p>
				</form>
			`;
			let styles = /*css*/ `
			  table { width: 100%; border-collapse: collapse; }
				th { padding: 4px; text-align: left; border-bottom: 2px solid #eee }
				td { padding: 4px; border-bottom: 1px solid #eee }
				tr.Active { background-color: green; animation: fade 1s forwards }
				tr.Inactive { background-color: red;  animation: fade 1s forwards }
				@keyframes fade { to { background-color: transparent }}
			`;
			let res = html(Root(title, body, styles));
			res.headers.append("set-cookie", `changed=`);
			return res;
		}
		if (req.method === "POST") {
			let body = await req.formData();
			let intent = String(body.get("intent"));
			let ids = body.getAll("id");
			let changed = [];
			for (let id of ids) {
				let user = users.get(Number(id));
				if (user) {
					if (intent === "activate") user.status = "Active";
					if (intent === "deactivate") user.status = "Inactive";
					changed.push(id);
				}
			}
			let res = Response.redirect("/", 303);
			res.headers.append("set-cookie", `changed=${changed.join(",")}`);
			return res;
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

function Row(
	[id, { name, email, status }]: [number, User],
	changed: Array<string>
) {
	let updated = changed.includes(String(id));
	let classname = updated ? ` class="${status}"` : "";
	return /*html*/ `
	<tr ${classname}>
		<td><input type="checkbox" name="id" value="${id}" aria-label="Select ${name}">
		<td>${name}
		<td>${email}
		<td>${status}
	</tr>
	`;
}

console.log(`http://localhost:${server.port}`);
