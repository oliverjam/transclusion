import { Root, html } from "./helpers.ts";

let server = Bun.serve({
	async fetch(req) {
		if (req.method === "GET") {
			let title = "Click to load - transclusion examples";
			let url = new URL(req.url);
			let count = Number(url.searchParams.get("count") || 10);
			let rows = "";
			for (let u of users(count)) rows += Row(u);
			let body = /*html*/ `
				<form data-boost data-select="form" data-target="this" data-history="replace">
					<table>
						<thead><th>Name<th>Email<th>ID</thead>
						<tbody>${rows}</tbody>
					</table>
					<p><button name="count" value="${count + 10}">Load more</button></p>
				</form>
			`;
			let styles = /*css*/ `
			  table { width: 100%; border-collapse: collapse; }
				th { padding: 4px; text-align: left; border-bottom: 2px solid #eee }
				td { padding: 4px; border-bottom: 1px solid #eee }
			`;
			return html(Root(title, body, styles));
		}
		return html("<h1>Not found</h1>", { status: 404 });
	},
});

function users(length = 10) {
	return Array.from({ length }, (_, i) => ({
		id: i,
		name: "Agent Smith",
		email: `void${i}@null.org`,
	}));
}

function Row({ id, name, email }: ReturnType<typeof users>[number]) {
	return /*html*/ `<tr><td>${name}<td>${email}<td>${id}</tr>`;
}

console.log(`http://localhost:${server.port}`);
