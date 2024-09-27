import { Component } from "./component";
import gsap from "gsap";

export class Animation extends Component {
	rect: any;
	vh: any;
	vw: any;

	constructor({ element, children, inOutAnimation, initialState }: AnimationProps) {
		// call methods here
		super({ element, children });

		this.setUtils;

		initialState ? this.initialize(initialState) : null;
		inOutAnimation ? this.inOut(inOutAnimation) : null;
	}

	// calculate inital distance between center of element and center of viewport height
	setUtils(): void {
		this.vh = typeof window !== 'undefined' && window.innerHeight;
		this.vw =typeof window !== 'undefined' &&  window.innerWidth;
		this.rect = this.element.getBoundingClientRect();
	}

	initialize(initialState: gsap.TweenVars) {
		gsap.set(this.element, {
			...initialState,
		});
	}

	inOut(props: AnimationProps["inOutAnimation"]) {
		if (!props) {
			return;
		}

		const tl: GSAPTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: this.element,
				start: props.start || "center bottom",
				toggleActions: props.toggle || "restart none none reverse",
				onEnter: props.onEnter,
				onEnterBack: props.onEnterBack,
				onLeave: props.onLeave,
				onLeaveBack: props.onLeaveBack,
			},
		});

		tl.to(this.element, {
			...props?.tween,
		});
	}
}
