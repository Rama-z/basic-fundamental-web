let canvas;
let ctx;
let flowField;
let flowFieldEAnimation;

window.onload = () => {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
  flowField.animate(0);
};

window.addEventListener("resize", function () {
  // Cancel old animation request
  cancelAnimationFrame(flowFieldEAnimation);
  // Resize canvas due to window dimensions
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // Create new instance of flow field effect class
  flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
  // Call animate to create new request animation loop
  flowField.animate(0);
});

const mouse = {
  x: 0,
  y: 0,
};

const mouseClicked = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener("click", function (e) {
  mouseClicked.x = e.x;
  mouseClicked.y = e.y;
});

class FlowFieldEffect {
  #ctx; // private class field
  #width; // private class field
  #height; // private class field

  constructor(ctx, width, height) {
    this.#ctx = ctx;
    // this.#ctx.strokeStyle = "red";
    this.#ctx.lineWidth = 5;
    this.#width = width;
    this.#height = height;
    // this.angle = 0;
    this.lastTime = 0;
    this.interval = 1000 / 60;
    this.timer = 0;
    this.cellSize = 15;
    this.gradient;
    this.#createGradient();
    this.#ctx.strokeStyle = this.gradient;
  }

  #createGradient() {
    this.gradient = this.#ctx.createLinearGradient(
      0,
      0,
      this.#width,
      this.#height
    );
    this.gradient.addColorStop("0.1", "#ff5c33");
    this.gradient.addColorStop("0.2", "#ff66b3");
    this.gradient.addColorStop("0.4", "#ccccff");
    this.gradient.addColorStop("0.6", "#b3ffff");
    this.gradient.addColorStop("0.8", "#80ff80");
    this.gradient.addColorStop("0.9", "#ffff33");
  }

  #drawLine(angle, x, y) {
    const length = 100;
    this.#ctx.beginPath();
    this.#ctx.moveTo(x, y);
    // this.#ctx.lineTo(x + length, y + length);
    this.#ctx.lineTo(x + Math.cos(angle) * 20, y + Math.sin(angle) * 20);
    this.#ctx.stroke();
  }

  animate(timestamp) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    if (this.timer > this.interval) {
      // this.angle += 0.1;
      this.#ctx.clearRect(0, 0, this.#width, this.#height);
      // this.#draw(
      //   this.#width / 2 + Math.sin(this.angle) * 50,
      //   this.#height / 2 + Math.cos(this.angle) * 50
      // );
      for (let y = 0; y < this.#height; y += this.cellSize) {
        for (let x = 0; x < this.#width; x += this.cellSize) {
          const angle = Math.cos(x * 0.5) + Math.sin(y * 0.5);
          this.#drawLine(angle, x, y);
        }
      }
      this.timer = 0;
    } else {
      this.timer += deltaTime;
    }
    flowFieldEAnimation = requestAnimationFrame(this.animate.bind(this));
  }
}
