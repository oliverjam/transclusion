import { test, expect, mock, beforeEach, afterEach } from "bun:test";
import { handle } from "./main.js";

let _fetch = window.fetch;

beforeEach(() => {
	document.documentElement.innerHTML = `<html><body></body></html>`;
});

afterEach(() => {
	window.fetch = _fetch;
});

test("Basic form submit", async () => {
	window.fetch = respond(`<body><h1>Test</h1></body>`);
	await trigger(el("form", "/test"));
	let h1 = query("h1");
	expect(h1.textContent).toBe("Test");
});

test("Basic link click", async () => {
	window.fetch = respond(`<body><h1>Test</h1></body>`);
	await trigger(el("a", "/test"));
	let h1 = query("h1");
	expect(h1.textContent).toBe("Test");
});

function el(type: "a" | "form", url: string) {
	let e = document.createElement(type);
	let attr = type === "a" ? "href" : "action";
	e.setAttribute(attr, "https://localhost" + url);
	e.setAttribute("data-boost", "");
	return e;
}

function respond(body: string) {
	return mock(() => Promise.resolve(new Response(body)));
}

type Els = HTMLElementTagNameMap;
function query<K extends keyof Els>(selector: K): Els[K] {
	let e = document.querySelector(selector);
	if (!e) throw new Error(`Could not find element matching '${e}'`);
	return e;
}

async function trigger(el: HTMLAnchorElement | HTMLFormElement) {
	let e = el instanceof HTMLAnchorElement ? click() : submit();
	el.dispatchEvent(e);
	return handle(e);
}

function click() {
	return new MouseEvent("click", { bubbles: true });
}

function submit() {
	return new SubmitEvent("submit", { bubbles: true });
}
