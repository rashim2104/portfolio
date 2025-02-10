const display = {
  socials: true,
  newsletter: false,
  location: true,
};

const effects = {
  mask: {
    cursor: false,
    x: 0,
    y: 0,
    radius: 240,
  },
  gradient: {
    display: true,
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    tilt: 0,
    colorStart: "brand",
    colorEnd: "accent",
    opacity: 10,
  },
  dots: {
    display: true,
    color: "neutral",
    size: "s",
    opacity: 5,
  },
  grid: {
    display: false,
    color: "neutral",
    width: 32,
    height: 32,
    opacity: 5,
  },
  lines: {
    display: false,
    opacity: 5,
  },
};

export { display, effects };