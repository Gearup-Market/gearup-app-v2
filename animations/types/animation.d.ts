interface Params {
  displacement?: number;
  endPosition: number;
}

interface ObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
}

interface AnimationProps {
  element: string | HTMLElement;
  children: any;
  displacement?: number;
  initialState?: gsap.TweenVars;
  inOutAnimation?: {
    tween?: gsap.TweenVars;
    start?: string;
    toggle?: string;
    onEnter?: () => void;
    onLeave?: () => void;
    onEnterBack?: () => void;
    onLeaveBack?: () => void;
  };
}

interface ParallaxSettings {
  start?: string;
  end?: string;
  scrub?: number;
  initialState?: gsap.TweenVars;
  displacement?: number;
  function?: (tl: GSAPTimeline) => void;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
  onUpdate?: () => void,
  markers?: boolean;
}

interface ParallaxProps {
  element: string | HTMLElement;
  children: any;
  defaultParallax?: ParallaxSettings;
  customParallax?: ParallaxSettings;
}