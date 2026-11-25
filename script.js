
// Lấy các phần tử HTML cần sử dụng
const arena = document.getElementById("arena");
const target = document.getElementById("target");

const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");

const startBtn = document.getElementById("startBtn");
const colorBtn = document.getElementById("colorBtn");
const playerBtn = document.getElementById("playerBtn");

const durationSelect = document.getElementById("duration");
const playerInfo = document.getElementById("playerInfo");
const message = document.getElementById("message");

// Khai báo mã sinh viên
const studentID = "241A010268";

// Khai báo biến trò chơi
let score = 0;
let timeLeft = 30;
let gameRunning = false;

let timer = null;
let moveInterval = null;

// Hàm tạo màu ngẫu nhiên
function randomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

// Chức năng đổi màu nền trò chơi
colorBtn.addEventListener("click", function() {
    arena.style.backgroundColor = randomColor();
});

// Chức năng hiển thị mã sinh viên
playerBtn.addEventListener("click", function() {
    playerInfo.textContent = "Mã sinh viên: " + studentID;
});

// Hàm di chuyển mục tiêu ngẫu nhiên
function moveTarget() {
    const maxLeft = arena.clientWidth - target.offsetWidth;
    const maxTop = arena.clientHeight - target.offsetHeight;

    const left = Math.random() * maxLeft;
    const top = Math.random() * maxTop;

    target.style.left = left + "px";
    target.style.top = top + "px";
}

// Hàm bắt đầu trò chơi
function startGame() {

    // Xóa bộ đếm cũ nếu có
    clearInterval(timer);
    clearInterval(moveInterval);

    // Lấy thời gian người chơi đã chọn
    timeLeft = Number(durationSelect.value);

    // Đặt lại điểm số
    score = 0;

    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;

    // Bật trạng thái trò chơi
    gameRunning = true;

    // Khóa lựa chọn thời gian khi đang chơi
    durationSelect.disabled = true;

    startBtn.disabled = true;
    startBtn.textContent = "Đang chơi...";

    message.textContent = "Nhanh tay click vào mục tiêu!";

    // Hiển thị mục tiêu
    target.style.display = "block";

    // Đưa mục tiêu đến vị trí ngẫu nhiên
    moveTarget();

    // Tự động thay đổi vị trí mỗi giây
    moveInterval = setInterval(function() {
        if (gameRunning) {
            moveTarget();
        }
    }, 1000);

    // Đếm ngược thời gian
    timer = setInterval(function() {

        timeLeft--;

        timeDisplay.textContent = timeLeft;

        // Khi hết giờ thì kết thúc trò chơi
        if (timeLeft <= 0) {
            endGame();
        }

    }, 1000);
}

// Xử lý khi click trúng mục tiêu
target.addEventListener("click", function(event) {

    // Không cho tính điểm nếu trò chơi đã kết thúc
    if (!gameRunning) return;

    // Ngăn sự kiện click lan ra khu vực chơi
    event.stopPropagation();

    // Tăng điểm lên 1
    score++;

    scoreDisplay.textContent = score;

    // Di chuyển mục tiêu ngay lập tức
    moveTarget();
});

// Hàm kết thúc trò chơi
function endGame() {

    // Dừng tất cả bộ đếm
    clearInterval(timer);
    clearInterval(moveInterval);

    // Khóa trò chơi
    gameRunning = false;

    // Ẩn mục tiêu
    target.style.display = "none";

    // Mở lại nút bắt đầu và lựa chọn thời gian
    startBtn.disabled = false;
    startBtn.textContent = "Chơi lại";

    durationSelect.disabled = false;

    // Hiển thị kết quả
    message.textContent =
        "🎉 Hết giờ! Bạn đạt được " + score + " điểm!";
}

// Gắn sự kiện cho nút bắt đầu
startBtn.addEventListener("click", startGame);
