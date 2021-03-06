class Polygon {
  constructor(points = [], color = "#ffaa22", distance = 0) {
    this.points = points;
    this.color = this.hexToRgb(color);
    this.distance = distance;
    this.lumen = 1;
  }
  hexToRgb(hex) {
		const resault = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return resault
      ? {
          r: parseInt(resault[1], 16),
          g: parseInt(resault[2], 16),
          b: parseInt(resault[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  }
  rgbToHex(r, g, b) {
		return `rgb(${r},${g},${b})`; // пробелов ставить не надо
	}
}
