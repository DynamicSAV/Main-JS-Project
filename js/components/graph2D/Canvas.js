class Canvas {
  constructor({ id, width, height, WIN, callbacks = {} } = {}) {
      this.WIN = WIN;
      this.canvas = document.getElementById(id);
      this.canvas.width = width;
      this.canvas.height = height;
      this.context = this.canvas.getContext('2d');
      this.canvas.addEventListener('wheel', callbacks.wheel);
      this.canvas.addEventListener('mouseup', callbacks.up);
      this.canvas.addEventListener('mousedown', callbacks.down);
      this.canvas.addEventListener('mousemove', callbacks.move);
  }


  xs(x) {
      return this.canvas.width * (x - this.WIN.LEFT) / this.WIN.WIDTH;
  }

  ys(y) {
      return this.canvas.height - this.canvas.height * (y - this.WIN.BOTTOM) / this.WIN.HEIGHT;
  }

  sx(x) {
      return x * this.WIN.WIDTH / this.canvas.width;
  }
  
  sy(y) {
      return -y * this.WIN.HEIGHT / this.canvas.height;
  }


  clear() {
      this.context.fillStyle = "#FFFFFF";
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }



  line(x1, y1, x2, y2, color, width, isDash) {
      this.context.beginPath();
      this.context.strokeStyle = color || 'black';
      this.context.lineWidth = width || 2;
      if (isDash) {
          this.context.setLineDash([5, 5]);
      } else {
          this.context.setLineDash([]);
      }
      this.context.moveTo(this.xs(x1), this.ys(y1));
      this.context.lineTo(this.xs(x2), this.ys(y2));
      this.context.stroke();
  }

  XY() {
      for (var n = this.WIN.LEFT.toFixed(0); n < this.WIN.WIDTH + this.WIN.LEFT; n++) {
          this.context.fillStyle = 'black';
          this.context.font = "15px serif";
          this.context.fillText(n, this.xs(n + 0.2), this.ys(0));
      }
      this.context.fillText('X', this.canvas.width - 20, this.ys(-1));

      for (var n = this.WIN.BOTTOM.toFixed(0); n < this.WIN.BOTTOM + this.WIN.HEIGHT; n++) {
          this.context.fillStyle = 'black';
          this.context.font = "15px serif";
          this.context.fillText(n, this.xs(0.2), this.ys(n));
      }
      this.context.fillText('Y', this.xs(-1), this.WIN.HEIGHT);
  }

  printZero(x) {
      this.context.beginPath();
      this.context.strokeStyle = "green";
      this.context.fillStyle = "green";
      this.context.globalAlpha = 1;
      this.context.arc(this.xs(x), this.ys(0), 6, Math.PI * 0, Math.PI * 2, true);
      this.context.closePath();
      this.context.fill();
      this.context.stroke();
  }

  printPoint(f, x) {
      this.context.beginPath();
      this.context.strokeStyle = "lawngreen";
      this.context.fillStyle = "lawngreen";
      this.context.globalAlpha = 1;
      this.context.arc(this.xs(x), this.ys(f), 2, Math.PI * 0, Math.PI * 2, true);
      this.context.closePath();
      this.context.fill();
      this.context.stroke();
  }

  polygon(points, color = '#FF800055') {
    this.context.fillStyle = color;
    this.context.beginPath();
    this.context.moveTo(this.xs(points[0].x), this.ys(points[0].y));
    for (let i = 1; i < points.length; i++) {
        this.context.lineTo(this.xs(points[i].x), this.ys(points[i].y));
    }
    this.context.lineTo(this.xs(points[0].x), this.ys(points[0].y))
    this.context.closePath();
    this.context.fill();
}
//   polygon(points, color = '#FF800055') {
//       this.context.fillStyle = color;
//       this.context.beginPath();
//       this.context.moveTo(this.xs(points[0]), this.ys(points[0]));//(points[0].y)
//       for (let i = 1; i < points.length; i++) {
//           this.context.lineTo(this.xs(points[i]), this.ys(points[i]));
//       }
//       this.context.lineTo(this.xs(points[0]), this.ys(points[0]))
//       this.context.closePath();
//       this.context.fill();
//   }
}
