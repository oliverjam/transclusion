// @ts-check

"use strict";

/**
 * @param {MouseEvent | SubmitEvent} event
 */
async function handle(event) {
	let el = event.target;
	if (!(el instanceof HTMLFormElement)) return;
	if (!(el instanceof HTMLAnchorElement)) return;
	if (!el.hasAttribute("data-boost")) return;

	let { confirm, target, select, swap, reset, history, delay } = config(el);

	event.preventDefault();

	if (confirm && window.confirm(confirm) === false) return;

	let submitter = event instanceof SubmitEvent ? event.submitter : null;
	let res = await request(el, submitter, history);

	// Find existing element to update
	let replacee = find_target(el, target);
	if (replacee === null) {
		throw new Error(`target ${target} not found`);
	}
	// Find new element to use from response
	let replacer = find_selection(await res.text(), select);
	if (replacer === null) {
		throw new Error(`select ${select} not found`);
	}

	// Update the page
	replacee.setAttribute("data-swapping", "");
	swap_elements(replacee, replacer, swap);
	if (delay) await wait(delay);
	replacee.removeAttribute("data-swapping");

	// Reset the form
	if (reset && "reset" in el) el.reset();
}

document.addEventListener("click", handle);
document.addEventListener("submit", handle);

/**
 * @param {HTMLAnchorElement | HTMLFormElement} el
 * @param {string | undefined} target
 */
function find_target(el, target) {
	if (!target) return document.body;
	if (target === "this") return el;
	if (target.startsWith("closest")) {
		return el.closest(target.replace("closest ", ""));
	}
	return document.querySelector(target);
}

/**
 * @param {string} body
 * @param {string | undefined} select
 */
function find_selection(body, select) {
	let dom = new DOMParser().parseFromString(body, "text/html");
	if (select) return dom.querySelector(select);
	return dom.body;
}

/**
 * @typedef {"delete" | "prepend" | "append" | "outerHTML" | "innerHTML"} Swap
 */

/**
 * @param {Element} replacee
 * @param {Element} replacer
 * @param {Swap} swap
 */
function swap_elements(replacee, replacer, swap) {
	if (swap === "delete") replacee.remove();
	if (swap === "prepend") replacee.prepend(replacer);
	if (swap === "append") replacee.append(replacer);
	if (swap === "outerHTML") replacee.replaceWith(replacer);
	if (swap === "innerHTML") replacee.replaceChildren(...replacer.childNodes);
}

/**
@param {HTMLAnchorElement | HTMLFormElement} el
@returns {{
  reset: boolean;
  target: string | undefined;
  select: string | undefined;
  swap: Swap;
	history: "push" | "replace" | "none";
	delay: number;
	confirm: string | undefined;
}}
*/

function config(el) {
	let reset = el.hasAttribute("data-reset") ?? true;
	let delay = Number(el.dataset.delay ?? 0);
	if (Number.isNaN(delay)) {
		throw new TypeError(`data-delay="${el.dataset.delay}" is not valid`);
	}
	let {
		select,
		target,
		swap = "innerHTML",
		history = "push",
		confirm,
	} = el.dataset;
	if (
		swap !== "delete" &&
		swap !== "prepend" &&
		swap !== "append" &&
		swap !== "outerHTML" &&
		swap !== "innerHTML"
	) {
		throw new TypeError(`data-swap="${swap}" is not valid`);
	}
	if (history !== "push" && history !== "replace" && history !== "none") {
		throw new TypeError(`data-history="${history}" is not valid`);
	}
	return { reset, target, select, swap, history, delay, confirm };
}

/**
@param {HTMLAnchorElement | HTMLFormElement} el
@param {HTMLElement | null} submitter
@param {"push" | "replace" | "none"} history
@returns {Promise<Response>}
*/
function request(el, submitter, history) {
	let action = "";
	let method;
	if (el instanceof HTMLAnchorElement) {
		action = el.href;
		method = "get";
	}
	let headers;
	let values = "";
	if (el instanceof HTMLFormElement) {
		action = el.action;
		method = el.method;
		if (
			submitter instanceof HTMLInputElement ||
			submitter instanceof HTMLButtonElement
		) {
			action ||= submitter.formAction;
			method ||= submitter.formMethod;
		}
		headers = { "content-type": "application/x-www-form-urlencoded" };
		values = urlencoded(new FormData(el, submitter)).toString();
	}
	/** @type {RequestInit} */
	let options = { method, headers };
	if (method === "get") {
		let url = new URL(action);
		url.search = values;
		action = url.toString();
		switch (history) {
			case "push":
				window.history.pushState(null, "", action);
				break;
			case "replace":
				window.history.replaceState(null, "", action);
				break;
		}
	}
	if (method === "post") {
		options.body = values;
	}
	return fetch(action, options);
}

/** @param {FormData} data */
function urlencoded(data) {
	let pairs = [];
	for (let [key, val] of data) {
		if (typeof val === "string") pairs.push([key, val]);
		else pairs.push([key, val.name]);
	}
	return new URLSearchParams(pairs);
}

/** @param {number} ms */
let wait = (ms) => new Promise((r) => setTimeout(r, ms));
