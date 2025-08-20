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








    // Danh sách Hiragana
  const hiraganaList = [
    // Cơ bản (seion)
    {char: 'あ', reading: 'a'}, {char: 'い', reading: 'i'}, {char: 'う', reading: 'u'}, {char: 'え', reading: 'e'}, {char: 'お', reading: 'o'},
    {char: 'か', reading: 'ka'}, {char: 'き', reading: 'ki'}, {char: 'く', reading: 'ku'}, {char: 'け', reading: 'ke'}, {char: 'こ', reading: 'ko'},
    {char: 'さ', reading: 'sa'}, {char: 'し', reading: 'shi'}, {char: 'す', reading: 'su'}, {char: 'せ', reading: 'se'}, {char: 'そ', reading: 'so'},
    {char: 'た', reading: 'ta'}, {char: 'ち', reading: 'chi'}, {char: 'つ', reading: 'tsu'}, {char: 'て', reading: 'te'}, {char: 'と', reading: 'to'},
    {char: 'な', reading: 'na'}, {char: 'に', reading: 'ni'}, {char: 'ぬ', reading: 'nu'}, {char: 'ね', reading: 'ne'}, {char: 'の', reading: 'no'},
    {char: 'は', reading: 'ha'}, {char: 'ひ', reading: 'hi'}, {char: 'ふ', reading: 'fu'}, {char: 'へ', reading: 'he'}, {char: 'ほ', reading: 'ho'},
    {char: 'ま', reading: 'ma'}, {char: 'み', reading: 'mi'}, {char: 'む', reading: 'mu'}, {char: 'め', reading: 'me'}, {char: 'も', reading: 'mo'},
    {char: 'や', reading: 'ya'}, {char: 'ゆ', reading: 'yu'}, {char: 'よ', reading: 'yo'},
    {char: 'ら', reading: 'ra'}, {char: 'り', reading: 'ri'}, {char: 'る', reading: 'ru'}, {char: 'れ', reading: 're'}, {char: 'ろ', reading: 'ro'},
    {char: 'わ', reading: 'wa'}, {char: 'を', reading: 'wo'}, {char: 'ん', reading: 'n'},
  ];
// Danh sách Katakana
const katakanaList = [
    {char: 'ア', reading: 'a'}, {char: 'イ', reading: 'i'}, {char: 'ウ', reading: 'u'}, {char: 'エ', reading: 'e'}, {char: 'オ', reading: 'o'},
    {char: 'カ', reading: 'ka'}, {char: 'キ', reading: 'ki'}, {char: 'ク', reading: 'ku'}, {char: 'ケ', reading: 'ke'}, {char: 'コ', reading: 'ko'},
    {char: 'サ', reading: 'sa'}, {char: 'シ', reading: 'shi'}, {char: 'ス', reading: 'su'}, {char: 'セ', reading: 'se'}, {char: 'ソ', reading: 'so'},
    {char: 'タ', reading: 'ta'}, {char: 'チ', reading: 'chi'}, {char: 'ツ', reading: 'tsu'}, {char: 'テ', reading: 'te'}, {char: 'ト', reading: 'to'},
    {char: 'ナ', reading: 'na'}, {char: 'ニ', reading: 'ni'}, {char: 'ヌ', reading: 'nu'}, {char: 'ネ', reading: 'ne'}, {char: 'ノ', reading: 'no'},
    {char: 'ハ', reading: 'ha'}, {char: 'ヒ', reading: 'hi'}, {char: 'フ', reading: 'fu'}, {char: 'ヘ', reading: 'he'}, {char: 'ホ', reading: 'ho'},
    {char: 'マ', reading: 'ma'}, {char: 'ミ', reading: 'mi'}, {char: 'ム', reading: 'mu'}, {char: 'メ', reading: 'me'}, {char: 'モ', reading: 'mo'},
    {char: 'ヤ', reading: 'ya'}, {char: 'ユ', reading: 'yu'}, {char: 'ヨ', reading: 'yo'},
    {char: 'ラ', reading: 'ra'}, {char: 'リ', reading: 'ri'}, {char: 'ル', reading: 'ru'}, {char: 'レ', reading: 're'}, {char: 'ロ', reading: 'ro'},
    {char: 'ワ', reading: 'wa'}, {char: 'ヲ', reading: 'wo'}, {char: 'ン', reading: 'n'}
];
// Chế độ hiện tại: 'hira' | 'kata'
let mode = 'hira'; // mặc định Hiragana
let kanaList = hiraganaList; // danh sách đang dùng theo mode

let activeList = [];
let currentIdx = 0;

// Tính năng luyện chữ cái
startBtn.addEventListener('click', () => {

    setBackgroundImage();
    let startVal = startInput.value.trim().toLowerCase();
    let endVal = endInput.value.trim().toLowerCase();
    let startIndex = kanaList.findIndex(k => k.reading === startVal);
    let endIndex = kanaList.findIndex(k => k.reading === endVal);
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
  const curr = activeList[currentIdx];
  const glyph = curr.char; // vì activeList lấy từ kanaList theo mode, trường là 'char'

  kanaInfo.innerHTML = `
    <div class="phien_am_truoc_bam">
      Phiên âm: ${curr.reading}
    </div>
  `;

  countdown.textContent = activeList.length - currentIdx - 1;

  // Xoá ảnh đáp án nếu có (chỉ giữ phần chữ & phiên âm)
  const imgs = infoBox.querySelectorAll('img');
  imgs.forEach(el => el.remove());
}


audioBtn.addEventListener('click', () => {
  const curr = activeList[currentIdx];
  const folder = mode === 'hira' ? 'hiragana' : 'katakana';
  const audioFile = `audio/${folder}/${curr.reading}.mp3`;

  const audio = new Audio(audioFile);
  audio.onerror = () => alert('Chữ này chưa hỗ trợ!');
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
  const curr = activeList[currentIdx];
  const glyph = curr.char;
  const folder = mode === 'hira' ? 'hiragana' : 'katakana'; // đúng yêu cầu bạn

  kanaInfo.innerHTML = `
    <div class="phien_am_sau_bam">
      Phiên âm: ${curr.reading}
    </div>

    <div class="chudanhmay" style="display: flex; justify-content: center; align-items: center;">
      <div class="textt">chữ đánh máy: </div>
      <div class="ky_tu">${glyph}</div>
    </div>
    
    <div class="chu_chuan" style="display: flex; justify-content: center; align-items: center;">
      <div class="textt2">chữ viết tay: </div>
      <div class="chuan_viettay">
        <img src="${folder}/${curr.reading}.png"/>
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


// Map giữa Hira và Kata để đổi ký tự đang hiển thị ngay lập tức
const hiraToKata = new Map(hiraganaList.map((h, i) => [h.char, katakanaList[i].char]));
const kataToHira = new Map(katakanaList.map((k, i) => [k.char, hiraganaList[i].char]));

// Nếu trong HTML đã có input#modeToggle thì thêm sự kiện:
const modeToggle = document.getElementById('modeToggle');

// Khởi tạo label theo mode mặc định
updateModeLabel(); // gọi sau khi biến mode='hira' được set

// Lắng nghe gạt switch
modeToggle.addEventListener('change', () => {
  // Cập nhật mode và danh sách đang dùng
  mode = modeToggle.checked ? 'kata' : 'hira';
  kanaList = mode === 'kata' ? katakanaList : hiraganaList;
  updateModeLabel();

  // Nếu đang có activeList (đã Tạo trước đó), ta giữ nguyên khoảng luyện hiện tại
  // nhưng đổi toàn bộ phần tử sang bảng tương ứng để next/prev一致
  if (activeList && activeList.length > 0) {
    activeList = activeList.map(item => {
      // item hiện có dạng {char, reading}
      const reading = item.reading;
      const idx = (mode === 'kata'
        ? hiraganaList.findIndex(k => k.reading === reading)
        : katakanaList.findIndex(k => k.reading === reading));
      const sourceList = (mode === 'kata') ? katakanaList : hiraganaList;
      return sourceList[idx]; // trả về object đúng bảng, cùng reading
    });
  }

  // Cập nhật ngay ký tự đang hiển thị (nếu đang hiển thị)
  // showCurrentKana() hiện đang render từ activeList[currentIdx] nếu có
  // Cần bảo toàn chỉ số và đổi glyph tức thời
  if (typeof showCurrentKana === 'function') {
    // Trường hợp đang hiển thị random từ activeList
    if (activeList && activeList.length > 0) {
      // Chỉ cần gọi lại render
      showCurrentKana();
    } else {
      // Nếu chưa bấm Tạo, có thể đang hiển thị một glyph đơn lẻ từ kanaInfo (nếu có)
      // Ta cố gắng đổi ngay cái đang hiện bằng map
      const glyphEl = document.querySelector('#kanaInfo .ky_tu');
      if (glyphEl && glyphEl.textContent) {
        const cur = glyphEl.textContent.trim();
        let nextChar = cur;
        if (mode === 'kata' && hiraToKata.has(cur)) nextChar = hiraToKata.get(cur);
        if (mode === 'hira' && kataToHira.has(cur)) nextChar = kataToHira.get(cur);
        if (nextChar !== cur) {
          glyphEl.textContent = nextChar;
        }
      }
    }
  }

  // Đổi hình nền/hint nếu cần
  setBackgroundImage();
});

// Cập nhật nội dung label theo mode
function updateModeLabel() {
  const modeLabel = document.getElementById('modeLabel');
  if (modeLabel) {
    modeLabel.textContent = (mode === 'kata') ? 'Katakana' : 'Hiragana';
  }
  // Đồng bộ trạng thái switch theo mode hiện tại
  if (modeToggle) {
    modeToggle.checked = (mode === 'kata');
  }
}
