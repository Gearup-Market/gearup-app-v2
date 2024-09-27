import { EventEmitter } from "events";
import { each } from "lodash";

export class Component extends EventEmitter {
	element: any;
	children: any;

	constructor({ element, children }: ComponentProps) {
		super();
		this.create(element, children);
	}

	create(element: any, children: any): void {
		const isEl = element instanceof window.HTMLElement;
		this.element = isEl ? element : document.querySelector(element);

		this.children = {};

		each(children, (item: any, key: any): void => {
			const isEl = item instanceof window.HTMLElement;
			this.children[key] = isEl ? item : document.querySelectorAll(item);
		});
	}
}
