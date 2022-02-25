class Canvas3D {
  constructor({ id, width, height, WIN}) {
      this.WIN = WIN;
      this.canvas = document.getElementById(id);
      this.canvas.width = width;
      this.canvas.height = height;
      this.context = this.canvas.getContext('2d');
  }
  clear() {
      this.context.fillStyle = "#FFFFFF";
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  printPoint(x, y) {
      this.context.beginPath();
      this.context.strokeStyle = "lawngreen";
      this.context.fillStyle = "lawngreen";
      this.context.globalAlpha = 1;
      this.context.arc(this.xs(x), this.ys(y), 6, Math.PI * 0, Math.PI * 2, true);
      this.context.closePath();
      this.context.fill();
      this.context.stroke();
  }


  xs(x) {
      return this.canvas.width * (x - this.WIN.LEFT) / this.WIN.WIDTH;
  }

  ys(y) {
      return this.canvas.height - this.canvas.height * (y - this.WIN.BOTTOM) / this.WIN.HEIGHT;
  }
}