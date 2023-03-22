const canvas = document.querySelector("#canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
let c = canvas.getContext("2d");

class Circle {
  constructor(x, y, dx, dy, raduis, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.raduis = raduis;
    this.color = color;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.raduis, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    return this;
  }
  update() {
    // if((this.x - this.raduis) < 0) {
    //     if(this.dx < 0) {
    //         this.dx = -this.dx
    //     }

    //         this.dx = this.dx ;

    // }
    if (this.x + this.raduis > window.innerWidth || this.x - this.raduis < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.raduis > window.innerHeight || this.y - this.raduis < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;
  }
  reverse() {
    if (this.dx > 0 || this.dx < 0) {
      this.dx *= -1;
    }
    if (this.dy > 0 || this.dy < 0) {
      this.dy *= -1;
    }
    return this;
  }
  zoom() {
    this.raduis += 5;
  }
}

function getDistance(x1, x2, y1, y2) {
  let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  return distance;
}

let c2 = new Circle(canvas.width - 40);

let c1 = new Circle(50);

let mouse = {
  x: undefined,
  y: undefined,
};
window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

function mouseOverObj(x, y, raduis) {
  return (
    mouse.x - x > 0 &&
    mouse.x - x < raduis &&
    mouse.y - y > 0 &&
    mouse.y - y < raduis
  );
}

let circleArray = [];

let colors = ["blue"];
for (let i = 0; i < 10; i++) {
  let raduis = Math.random() * 10;
  let x = Math.random() * (window.innerWidth - raduis * 2) + raduis;
  let y = Math.random() * (window.innerHeight - raduis * 2) + raduis;
  let dx = Math.random() * 4;
  let dy = Math.random() * 4;
  let color = colors[Math.floor(Math.random() * colors.length)];
  circleArray.push(new Circle(x, y, dx, dy, raduis, color));
}

function animate() {
  let myReq = requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  circleArray.forEach((circle) => {
    circle.draw().update();
    //  if(getDistance(circle.x,c2.x,circle.y,c2.y) < (c1.raduis + c2.raduis)) {
    //         c1.reverse().update();
    //         c2.reverse().update();
    //  }
  });

  // if(mouseOverObj(c1.x,c1.y,c1.raduis)) {
  //  c1.zoom();
  // }
  // if(mouseOverObj(c2.x,c2.y,c2.raduis)) {
  //  c2.zoom();
  // }
}

animate();
