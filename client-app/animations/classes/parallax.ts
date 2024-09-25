import { Animation } from "./animation";
import gsap from "gsap";

export class Parallax extends Animation {
	defaultTL: any;
	customTL: any;

	constructor({ element, children, defaultParallax, customParallax }: ParallaxProps) {
		super({ element, children });

		this.animate(defaultParallax);
		this.createCustom(customParallax);
	}

	animate(props: ParallaxProps["defaultParallax"]) {
		if (!props) {
			return;
		}

		gsap.to(this.element, {
			y: props.displacement,
		});

		this.defaultTL = gsap.timeline({
			scrollTrigger: {
				scrub: props.scrub || 0.7,
				trigger: this.element,
				start: props.start || "top bottom",
				end: props.end || "center center",
				onEnter: props.onEnter,
				onLeave: props.onLeave,
				onEnterBack: props.onEnterBack,
				onLeaveBack: props.onLeaveBack,
				onUpdate: props.onUpdate,
				markers: props.markers,
			},
		});

		this.defaultTL.to(this.element, {
			ease: "none",
			y: 0,
		});
	}

	createCustom(props: ParallaxProps["customParallax"]) {
		if (!props) {
			return;
		}

		gsap.to(this.element, {
			...props.initialState,
		});

		this.customTL = gsap.timeline({
			scrollTrigger: {
				scrub: props.scrub || 0.7,
				trigger: this.element,
				start: props.start || "top bottom",
				end: props.end || "center center",
				onEnter: props.onEnter,
				onLeave: props.onLeave,
				onEnterBack: props.onEnterBack,
				onLeaveBack: props.onLeaveBack,
				onUpdate: props.onUpdate,
				markers: props.markers,
			},
		});

		props.function && props.function(this.customTL);
	}

	async killCustom() {
		await this.customTL?.kill();
		return Promise.resolve();
	}

	async killDefault() {
		await this.defaultTL?.kill();
		return Promise.resolve();
	}

	async killAll() {
		await Promise.all([this.defaultTL?.kill(), this.customTL?.kill()]);
		return Promise.resolve();
	}
}
