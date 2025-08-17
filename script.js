const canvas = document.getElementById("signature-pad");
const clearBtn = document.getElementById("clear-btn");
const context = canvas.getContext("2d");
let display = document.getElementById("show");
let painting = false;
let drawStart = false;

function startPosition(e) {
  painting = true;
  drawStart = true;
  draw(e);
}

function finishedPosition() {
  painting = false;
  context.beginPath();
  saveState();
}

function draw(e) {
  if (!painting) return;
  let clientX, clientY;
  if (e.type.startsWith("touch")) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }

  context.lineWidth = 2;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.strokeStyle = "black";

  const x = clientX - canvas.offsetLeft;
  const y = clientY - canvas.offsetTop;

  if (painting) {
    context.lineTo(x, y);
    context.stroke();
    context.beginPath();
    context.moveTo(x, y);
  } else {
    context.moveTo(x, y);
  }
}

function saveState() {
  localStorage.setItem("canvas", canvas.toDataURL());
}

function loadState() {
  const savedData = localStorage.getItem("canvas");
  if (savedData) {
    const img = new Image();
    img.src = savedData;
    img.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
    };
  }
}

canvas.addEventListener("mousedown", (e) => {
  painting = true;
  drawStart = true;
  startPosition(e);
});

canvas.addEventListener("mouseup", finishedPosition);
canvas.addEventListener("mousemove", draw);

canvas.addEventListener("touchstart", (e) => {
  painting = true;
  drawStart = true;
  startPosition(e);
});

canvas.addEventListener("touchend", finishedPosition);
canvas.addEventListener("touchmove", draw);

clearBtn.addEventListener("click", () => {
  drawStart = false;
  context.clearRect(0, 0, canvas.width, canvas.height);
  saveState();
  display.innerHTML = "";
});



loadState();
window.onload = (event) => {
  drawStart = false;
  context.clearRect(0, 0, canvas.width, canvas.height);
  saveState();
};

function resizeCanvas() {
  // Nếu là laptop (ví dụ: chiều rộng màn hình > 768px), set kích thước lớn
  if (window.innerWidth > 1008) {
    canvas.width = 800;
    canvas.height = 600;
  } else {
    canvas.width = 300;
    canvas.height = 200;
  }
  // Optional: clear canvas khi thay đổi size (tránh vỡ hình cũ)
  context.clearRect(0, 0, canvas.width, canvas.height);
}

// Gọi khi trang tải hoặc resize
window.addEventListener('resize', resizeCanvas);
window.addEventListener('load', resizeCanvas);
