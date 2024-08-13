export const getDistanceFromMidViewport = (element: HTMLElement): [x: number, y: number] => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  
  const { x, y, width, height }: DOMRect = element.getBoundingClientRect();

  const yCenter = y + height / 2;
  const xCenter = x + width / 2;

<<<<<<< HEAD
  const distY = vh  - yCenter;
  const distX = vw  - xCenter;
=======
  const distY = vh / 2 - yCenter;
  const distX = vw / 2 - xCenter;
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe

  return [distX, distY]
}