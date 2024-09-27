import { Summary } from "./components/summary";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/all";
import gsap from "gsap";

// declare type for globalthis.ismobile
declare global {
	var ismobile: boolean;
}

export class App {
	preloader: any;
	summary: any;

	constructor({ ismobile }: { ismobile: boolean }) {
		// set mobile variable
		globalThis.ismobile = ismobile;

		// register scroll trigger
		gsap.registerPlugin(ScrollTrigger, Draggable);

		// iitialise preloader
		this.onPreloaded();
	}

	onPreloaded() {
		// call createAnimations method
		this.createAnimations();
	}

	createAnimations() {
		this.summary = new Summary();
	}
}
