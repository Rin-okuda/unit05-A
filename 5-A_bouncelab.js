const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");
const info = document.getElementById("info");   // 5_stage.html の <p id="info">

function changeColor() {
  const colors = [
    "#7aa2ff",
    "#ff7a7a",
    "#7aff9b",
    "#ffd36a",
    "#c27aff"
  ];

  const n = Math.floor(Math.random() * colors.length);
  ballColor = colors[n];
}

let x = 100;          // 丸の中心の位置
let y = 80;
let vx = 180;         // 横の速さ（1秒に180px）
let vy = 140;         // 縦の速さ（1秒に140px。＋ は下へ）
let r = 14;         // 半径
let last = performance.now();
let ballColor= "#03ff31";
document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowUp") {
    vx = vx * 1.2;   // 速さを1.2倍（向きはそのまま）
    vy = vy * 1.2;
  }
  if(e.code==="ArrowRight"){
    r+=10;
  }
  if(e.code==="ArrowLeft"){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ballcolor="#7aa2ff";
     
  }
});

function update(dt) {
  x = x + vx * dt;
  y = y + vy * dt;

  // 右の壁
  if (x + r > canvas.width) {
    x = canvas.width - r;
    vx = -vx;
    changeColor();
  }

  // 左の壁
  if (x - r < 0) {
    x = r;
    vx = -vx;
    changeColor();
  }

  // 下の壁
  if (y + r > canvas.height) {
    y = canvas.height - r;
    vy = -vy;
    changeColor();
  }

  // 上の壁
  if (y - r < 0) {
    y = r;
    vy = -vy;
    changeColor();
  }
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = ballColor;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

// now：今回呼ばれた時刻（ミリ秒）。requestAnimationFrame が引数で渡してくれる
function loop(now) {
  const dt = (now - last) / 1000;   // 前回からの時間（秒）
  last = now;                       // 今回の時刻を、次の「前回」として覚えておく

  info.textContent = "dt：" + dt.toFixed(4) + " 秒　／　1秒に約 " + (1 / dt).toFixed(0) + " 回";

  update(dt);
  draw();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);