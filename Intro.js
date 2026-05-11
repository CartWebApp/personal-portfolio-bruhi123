const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const width = canvas.width;
const height = canvas.height;

const bubbleImg = document.querySelector('.bubble');
const bubblePoppedImg = document.querySelector('.bubblePopped');

const popSound = new Audio('/Images/pop.mp3');

function playPop() {
    popSound.currentTime = 0;
    popSound.play();
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Bubble(x, y, velX, velY, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.size = size;
    this.popped = false;
}

Bubble.prototype.draw = function () {
    if (this.popped) {
        ctx.drawImage(bubblePoppedImg, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
    } else {
        ctx.drawImage(bubbleImg, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
    }
};

Bubble.prototype.update = function () {
    if (this.popped) return;

    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }
    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }
    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }
    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
};

function spawnBubble() {
    const size = random(30, 50);
    return new Bubble(
        random(size, width - size),
        random(size, height - size),
        random(-2, 2) || 1,
        random(-2, 2) || 1,
        size
    );
}

const total = 7;
let bubbles = [];
let poppedCount = 0;

while (bubbles.length < total) {
    bubbles.push(spawnBubble());
}

const counterEl = document.getElementById('counter');
const overlay = document.getElementById('intro-overlay');

window.addEventListener('click', function (e) {
    if (poppedCount >= total) return;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        if (b.popped) continue;

        const dx = mouseX - b.x;
        const dy = mouseY - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist <= b.size) {
            playPop();
            b.popped = true;
            poppedCount++;

            const left = total - poppedCount;
            if (left === 0) {
                counterEl.textContent = 'Loading...';
                setTimeout(() => {
                    overlay.style.opacity = '1';
                    setTimeout(() => {
                        window.location.href = 'OtherPages/index.html';
                    }, 800);
                }, 400);
            } else {
                counterEl.textContent = left + ' bubble' + (left !== 1 ? 's' : '') + ' left';
            }

            setTimeout(() => {
                const index = bubbles.indexOf(b);
                if (index !== -1) bubbles.splice(index, 1);
            }, 500);

            break;
        }
    }
});

function loop() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].draw();
        bubbles[i].update();
    }
    requestAnimationFrame(loop);
}

if (bubbleImg.complete) {
    loop();
} else {
    bubbleImg.addEventListener('load', loop);
}