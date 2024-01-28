let client = await Bun.file("main.js").text();

let shared = /*css*/ `
  body { font-family: system-ui, sans-serif }
  input, button { font: inherit }
  .vh { position: absolute; transform: scale(0) }
`;

export function Root(title: string, body: string, styles = "") {
	return /*html*/ `
<html lang="en">
  <title>${title}</title>
  <style>
    ${shared}${styles}
  </style>
  <h1>${title}</h1>
  ${body}
  <script>${client}</script>
</html>
  `;
}

export function html(body: string, init?: ResponseInit) {
	let r = new Response("<!doctype html>" + body, init);
	r.headers.set("content-type", "text/html; charset='utf8'");
	return r;
}

export function cookies(req: Request): Record<string, string | undefined> {
	let header = req.headers.get("cookie");
	if (header === null) return {};
	return Object.fromEntries(header.split(";").map((c) => c.trim().split("=")));
}
