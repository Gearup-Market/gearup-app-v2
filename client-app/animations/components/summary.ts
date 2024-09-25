import { Component } from "../classes/component";
import { Parallax } from "../classes/parallax";
import { each } from "lodash";
import gsap from "gsap";

export class Summary extends Component {
	constructor() {
		super({
			element: "[data-animation='scroll']",
			children: {
				// text: "[data-animation='roadmap-text']",
				sticky: "[data-animation='roadmap-sticky']",
				cards: "[data-animation='cards']",
				card: "[data-animation='card']",
			},
		});

		this.createRoller();
		// this.createParallax();
		// this.pinToTop();
	}

	createParallax() {
		const all = [...this.children.card];

		each(all, (item: HTMLElement) => {
			new Parallax({
				element: item,
				children: null,
				defaultParallax: {
					displacement: 100,
				},
			});
		});
	}

	createRoller() {
		if (globalThis.ismobile) {
			return;
		}

		const cards = this.children.cards[0];
		if (!cards) {
			return;
		}
		cards!.style.overflow = "visible";

		// const end = cards.clientWidth + 64 + 64 + 64;
		const vpW = typeof window !== 'undefined' ? window.innerWidth : 400;
		const end = cards.scrollWidth - vpW + 64 + 64;

		const tl: GSAPTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: this.element,
				scrub: 1,
				start: () => "top top+=100px",
				end: () => "bottom bottom+=100px",
			},
		});

		tl.to(cards, {
			x: -end,
		});
	}

	pinToTop() {
		if (!globalThis.ismobile) {
			return;
		}

		const sticky = this.element;

		const rect: DOMRect | undefined = sticky?.getBoundingClientRect();
		const stickyheight = rect?.height;

		if (!stickyheight) {
			return;
		}

		// set sticky offset
		const half = stickyheight / 2;
		const margin = "15px";
		sticky.style.setProperty("top", `calc(50% - ${half}px + ${margin})`);

		// this.mobileRoller();
	}

	mobileRoller() {
		const container = this.element;
		const cards = this.children.cards[0];
		cards.style.overflow = "visible";

		const vpW = typeof window !== 'undefined' ? window.innerWidth : 400;
		const vpH = typeof window !== 'undefined' ? window.innerHeight : 700;

		// set container height
		const scrollableWidth = cards.scrollWidth;
		const scrollLength = scrollableWidth - vpW + vpH + 31.04;

		container.style.height = `${scrollLength}px`;

		const tl: GSAPTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: this.element,
				scrub: 0.5,
				start: () => "top top",
				end: () => "bottom bottom",
			},
		});

		const end = cards.scrollWidth - vpW + 31.04 + 31.04;

		tl.to(cards, {
			x: -end,
		});
	}
}

// export class Summary extends Component {
// 	totop: any;
// 	tobottom: any;
// 	image: any;
// 	tabslength: number;
// 	progress: any;
// 	iteration: number;

// 	constructor() {
// 		super({
// 			element: "[data-animation='summary']",
// 			children: {
// 				image: "[data-animation='summary-image']",
// 				sticky: "[data-animation='card']",
// 				alert: "[data-animation='alert']",
// 				title: "[data-animation='title']",
// 				desc: "[data-animation='desc']",
// 				buttons: "[data-animation='button']",
// 			},
// 		});

// 		this.tabslength = 3;
// 		this.iteration = 0;
// 		this.createPin();
// 	}

// 	createPin() {
// 		const sticky = this.children.sticky[0];
// 		this.totop = [...this.children.alert, ...this.children.title];
// 		this.tobottom = [...this.children.desc, ...this.children.buttons];
// 		this.image = [...this.children.image];

// 		const rect: DOMRect | undefined = sticky?.getBoundingClientRect();
// 		const stickyheight = rect?.height;

// 		if (!stickyheight) {
// 			return;
// 		}

// 		// set sticky offset
// 		const half = stickyheight / 2;
// 		const margin = globalThis.ismobile ? "15px" : "30px";
// 		sticky.style.setProperty("top", `calc(50% - ${half}px + ${margin})`);

// 		// store triggee positions
// 		let triggerPoints: number[] = [];
// 		for (let index = 1; index < this.tabslength; index++) {
// 			const percent = Math.round(100 / this.tabslength) * index;
// 			triggerPoints.push(percent);
// 		}

// 		const onUpdate = ({ progress, direction }: any) => {
// 			// get percentage progress
// 			const percent = Math.round(progress * 100);

// 			if (percent === this.progress) {
// 				return;
// 			}

// 			// update progress
// 			this.progress = percent;

// 			// check direction
// 			const dir: string = String(direction);
// 			const forward = !dir.includes("-");
// 			const backward = dir.includes("-");

// 			// initialise shouldTriggerVariable
// 			let triggerDirection: "forward" | "backward" | null = null;

// 			if (forward) {
// 				// check if current progress has gotten to range for current iteration
// 				const stForward =
// 					this.progress >= triggerPoints[this.iteration] &&
// 					this.progress < (triggerPoints[this.iteration + 1] || 100);

// 				// set trigger direction to fowards if withing range and update iteration
// 				stForward && [(triggerDirection = "forward"), this.iteration++];
// 			} else if (backward) {
// 				// console.log(`current at `)

// 				// check if current progress has gotten to range for current iteration
// 				const stBackward =
// 					this.progress <= triggerPoints[this.iteration - 1] &&
// 					this.progress > (triggerPoints[this.iteration - 2] || 0);

// 				// set trigger direction to backwards if withing range
// 				stBackward && [(triggerDirection = "backward"), this.iteration--];
// 			}

// 			triggerDirection === "forward"
// 				? this.moveInOut("forward")
// 				: triggerDirection === "backward"
// 				? this.moveInOut("backward")
// 				: null;
// 		};

// 		const tofirstTab = () => {
// 			this.progress = 0;
// 			eventEmitter.emit(`switch-tab-first`);
// 		};

// 		const toLastTab = () => {
// 			this.progress = 100;
// 			eventEmitter.emit(`switch-tab-last`);
// 		};

// 		// create scroll trigger
// 		const tl: GSAPTimeline = gsap.timeline({
// 			scrollTrigger: {
// 				trigger: this.element,
// 				scrub: true,
// 				start: () => "top top",
// 				end: () => "bottom bottom",
// 				onUpdate: onUpdate,
// 				onEnter: tofirstTab,
// 				onLeaveBack: tofirstTab,
// 				onLeave: toLastTab,
// 			},
// 		});
// 	}

// 	moveInOut(direction: "forward" | "backward") {
// 		// clear previous tweens
// 		gsap.killTweensOf([...this.totop, ...this.tobottom]);

// 		// new timeline for in and out
// 		const tl: GSAPTimeline = gsap.timeline();

// 		// move out
// 		tl.to(this.image, {
// 			scale: 1.1,
// 		});

// 		tl.to(
// 			this.totop,
// 			{
// 				y: -30,
// 				autoAlpha: 0,
// 			},
// 			"<"
// 		);

// 		tl.to(
// 			this.tobottom,
// 			{
// 				y: 30,
// 				autoAlpha: 0,
// 			},
// 			"<"
// 		);

// 		// switch tab content
// 		tl.call(() => {
// 			eventEmitter.emit(`switch-tab-${direction}`);
// 		});

// 		// move in
// 		tl.to(this.image, {
// 			scale: 1,
// 		});

// 		tl.to(
// 			this.totop,
// 			{
// 				y: 0,
// 				autoAlpha: 1,
// 			},
// 			"<"
// 		);

// 		tl.to(
// 			this.tobottom,
// 			{
// 				y: 0,
// 				autoAlpha: 1,
// 			},
// 			"<"
// 		);
// 	}
// }
