const canvas = document.getElementById("signature-pad");
const clearBtn = document.getElementById("clear-btn");
const answerBtn = document.getElementById('answerBtn');

const context = canvas.getContext("2d");
let display = document.getElementById("show");
let painting = false;
let drawStart = false;

// DOM elements
const startInput = document.getElementById('startChar');
const endInput = document.getElementById('endChar');
const startBtn = document.getElementById('startBtn');
const infoBox = document.getElementById('infoBox');
const kanaInfo = document.getElementById('kanaInfo');
const audioBtn = document.getElementById('audioBtn');
const nextBtn = document.getElementById('nextBtn');
const countdown = document.getElementById('remainCount');

const strokeWidthSelect = document.getElementById('strokeWidth');
const colorPickerBtn = document.getElementById('colorPickerBtn');
const colorPickerInput = document.getElementById('colorPicker');

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

function clearCanvasAndState() {
  painting = false;  // Ngừng vẽ và reset path
  context.beginPath();
  context.clearRect(0, 0, canvas.width, canvas.height);  // Xoá toàn bộ nét vẽ
  setBackgroundImage();  // Vẽ lại nền
  drawStart = false;  // Reset cờ
  display.innerHTML = "";  // Xoá hiển thị phụ (nếu có)
  saveState();  // Lưu lại state mới lên localStorage
}
clearBtn.addEventListener("click", () => {
  clearCanvasAndState();
});




loadState();
window.onload = (event) => {
  drawStart = false;
  context.clearRect(0, 0, canvas.width, canvas.height);
  saveState();
};

function setBackgroundImage() {
    const img = new Image();
    img.src = "123.png";
    img.onload = function() {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}

function resizeCanvas() {
    if (window.innerWidth > 1008) {
        canvas.width = 600; canvas.height = 600;
    } else {
        canvas.width = 300; canvas.height = 300;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    setBackgroundImage();
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('load', resizeCanvas);








// Dữ liệu chữ cái tiếng Nhật (Hiragana mẫu)
const kanaList = [
    {kana: 'あ', romaji: 'a'},  {kana: 'い', romaji: 'i'},  {kana: 'う', romaji: 'u'},  {kana: 'え', romaji: 'e'},  {kana: 'お', romaji: 'o'},
    {kana: 'か', romaji: 'ka'}, {kana: 'き', romaji: 'ki'}, {kana: 'く', romaji: 'ku'}, {kana: 'け', romaji: 'ke'}, {kana: 'こ', romaji: 'ko'},
    {kana: 'さ', romaji: 'sa'}, {kana: 'し', romaji: 'shi'},{kana: 'す', romaji: 'su'}, {kana: 'せ', romaji: 'se'}, {kana: 'そ', romaji: 'so'},
    {kana: 'た', romaji: 'ta'}, {kana: 'ち', romaji: 'chi'},{kana: 'つ', romaji: 'tsu'},{kana: 'て', romaji: 'te'}, {kana: 'と', romaji: 'to'},
    {kana: 'な', romaji: 'na'}, {kana: 'に', romaji: 'ni'}, {kana: 'ぬ', romaji: 'nu'}, {kana: 'ね', romaji: 'ne'}, {kana: 'の', romaji: 'no'},
    {kana: 'は', romaji: 'ha'}, {kana: 'ひ', romaji: 'hi'}, {kana: 'ふ', romaji: 'fu'}, {kana: 'へ', romaji: 'he'}, {kana: 'ほ', romaji: 'ho'},
    {kana: 'ま', romaji: 'ma'}, {kana: 'み', romaji: 'mi'}, {kana: 'む', romaji: 'mu'}, {kana: 'め', romaji: 'me'}, {kana: 'も', romaji: 'mo'},
    {kana: 'や', romaji: 'ya'}, {kana: 'ゆ', romaji: 'yu'}, {kana: 'よ', romaji: 'yo'},
    {kana: 'ら', romaji: 'ra'}, {kana: 'り', romaji: 'ri'}, {kana: 'る', romaji: 'ru'}, {kana: 'れ', romaji: 're'}, {kana: 'ろ', romaji: 'ro'},
    {kana: 'わ', romaji: 'wa'}, {kana: 'を', romaji: 'wo'}, {kana: 'ん', romaji: 'n'}
];

let activeList = [];
let currentIdx = 0;

// Tính năng luyện chữ cái
startBtn.addEventListener('click', () => {

    setBackgroundImage();
    let startVal = startInput.value.trim().toLowerCase();
    let endVal = endInput.value.trim().toLowerCase();
    let startIndex = kanaList.findIndex(k => k.romaji === startVal);
    let endIndex = kanaList.findIndex(k => k.romaji === endVal);
    if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
        alert('Vui lòng nhập đúng chữ bắt đầu và kết thúc (phải nằm trong bảng Hiragana và theo thứ tự).');
        infoBox.style.display = 'none';
        return;
    }
    activeList = kanaList.slice(startIndex, endIndex + 1);
    shuffleArray(activeList);
    currentIdx = 0;
    infoBox.style.display = 'flex';
    showCurrentKana();
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showCurrentKana() {
    let curr = activeList[currentIdx];
    kanaInfo.innerHTML = ` 
  <div class="phien_am_truoc_bam">
    Phiên âm: ${curr.romaji}
  </div>`;
    countdown.textContent = activeList.length - currentIdx - 1;
    // Xoá ảnh đáp án nếu có (chỉ giữ phần chữ & phiên âm)
    let imgs = infoBox.querySelectorAll('img');
    imgs.forEach(el => el.remove());
}

audioBtn.addEventListener('click', () => {
    let curr = activeList[currentIdx];
    let audioFile = `audio/${curr.kana}.mp3`;
    let audio = new Audio(audioFile);
    audio.onerror = () => {
        alert('Chữ này chưa hỗ trợ!');
    };
    audio.play();
});

nextBtn.addEventListener('click', () => {
  if (currentIdx + 1 < activeList.length) {
    currentIdx++;
    showCurrentKana();
    clearCanvasAndState();
  } else {
    alert('Đã hoàn thành tất cả các chữ cái!');
    infoBox.style.display = 'none';
  }
});


answerBtn.addEventListener('click', () => {
  let curr = activeList[currentIdx];

  kanaInfo.innerHTML = `
  <div class="phien_am_sau_bam">
    Phiên âm: ${curr.romaji}
  </div>

  <div class="chudanhmay" style="display: flex; justify-content: center; align-items: center;">
    <div class="textt">chữ đánh máy: </div>
    <div class="ky_tu">
      ${curr.kana}
    </div>
  </div>
  
  <div class="chu_chuan" style="display: flex; justify-content: center; align-items: center;>
    <div class="textt2">chữ viết tay: </div>
    <div class="chuan_viettay">
      <img src="hiragana/${curr.romaji}.png"/>
    </div>
  </div>
  `;
});


// Lưu màu và kích thước hiện tại
let currentStrokeColor = '#000000'; // mặc định ban đầu màu vẽ
let currentStrokeWidth = 10;

strokeWidthSelect.addEventListener('change', function () {
  currentStrokeWidth = parseInt(this.value);
});

// Gán vào context mỗi lần vẽ
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
  // context.strokeStyle = '#af05f1ff';
  // context.lineWidth = 30;
  context.lineWidth = currentStrokeWidth;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.strokeStyle = currentStrokeColor;

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


// Tương tác nút màu
colorPickerBtn.onclick = function() {
  colorPickerInput.click();
}
colorPickerInput.oninput = function() {
  currentStrokeColor = this.value;
  colorPickerBtn.style.background = this.value;
}