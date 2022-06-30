import utils from './utils.js'

// 1. 캔버스 불러오기
const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')

// 2. Particle 클래스 정의
class Particle {
  constructor(x, y, radius, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.velocity = velocity;
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = '#fff'
    ctx.fill()
    ctx.closePath()
  }

  animate() {
    if (this.x <= 0 || this.x >= innerWidth || this.y <= 0 || this.y >= innerHeight) {
      this.x = utils.randomFloatBetween(0, innerWidth);
      this.y = utils.randomFloatBetween(0, innerHeight);
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    //마우스가 캔버스 안에 있으면 파티클 배열에 
    //하나를 더한다
    // particles = mouse.isActive ? particles.concat(mouse) : particles;
    (mouse.isActive ? particles.concat(mouse) : particles).forEach(particle => {
      let distance = utils.distance(particle.x, particle.y, this.x, this.y);
      if (distance < 300) {
        let from = { x: this.x, y: this.y };
        let to = { x: particle.x, y: particle.y };
        new Line(from, to, distance).draw();
      }
    })
    this.draw();
  }
}
class Line {
  constructor(from, to, distance) {
    this.from = from;
    this.to = to;
    this.distance = distance;
  }
  draw() {
    ctx.beginPath();
    ctx.moveTo(this.from.x, this.from.y);
    ctx.lineTo(this.to.x, this.to.y);
    ctx.strokeStyle = `rgba(215,205,0,${1 - this.distance / 400})`;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
  }
}
// 3. 파티클 만들기
const TOTAL = 50;
let particles = [];
// * 마우스 객체 만들기
let mouse = { x: 0, y: 0, isActive: false, radius: 10 };
for (let i = 0; i < TOTAL; i++) {
  let x = utils.randomFloatBetween(0, innerWidth);
  let y = utils.randomFloatBetween(0, innerHeight);
  let radius = utils.randomFloatBetween(0.5, 2);
  let velocity = {
    x: utils.randomFloatBetween(-2, 2),
    y: utils.randomFloatBetween(-2, 2)
  }
  particles.push(new Particle(x, y, radius, velocity))
}

// 4. 매 프레임마다 실행되는 재귀함수
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  particles.forEach(particle => particle.animate())
  if (mouse.isActive) {
    let velocity = {
      x: 0,
      y: 0
    }
    new Particle(mouse.x, mouse.y, 5, velocity).animate();
  }
  window.requestAnimationFrame(render)
}

// 5. 윈도우 resize 함수 정의
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

// 6. 실행하기
render()

// 7. 마우스이벤트 연결하기
canvas.addEventListener("mouseenter", function () {
  mouse.isActive = true;
})
canvas.addEventListener("mouseleave", function () {
  mouse.isActive = false;
})
canvas.addEventListener("mousemove", function (e) {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
})