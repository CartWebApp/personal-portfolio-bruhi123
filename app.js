const buttonProjectsHome = document.querySelector(".projectsLearnMore");
const navProjects = document.getElementById("projectsNav");
const footerProjectsLink = document.querySelector(".projectsFooter");

function openProjectsDropdown() {
    navProjects.scrollIntoView({ behavior: "smooth", block: "center" });
    navProjects.classList.add("open");
    setTimeout(() => {
        navProjects.classList.remove("open");
    }, 2000);
}

if (buttonProjectsHome) {
    buttonProjectsHome.addEventListener("click", (e) => {
        e.preventDefault();
        openProjectsDropdown();
    });
}

if (footerProjectsLink) {
    footerProjectsLink.addEventListener("click", (e) => {
        e.preventDefault();
        if (navProjects) {
            openProjectsDropdown();
        } else {
            window.location.href = "/index.html#projectsNav";
        }
    });
}

if (window.location.hash === "#projectsNav" && navProjects) {
    openProjectsDropdown();
}


// bubble move

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;


// to generate a random number between two numbers
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// the constructor
function Bubble(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

Bubble.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

Bubble.prototype.update = function() {
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
}

Bubble.prototype.collisionDetect = function() {
  for (let j = 0; j < Bubbles.length; j++) {
    if (!(this === Bubbles[j])) {
      const dx = this.x - Bubbles[j].x;
      const dy = this.y - Bubbles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + Bubbles[j].size) {
        Bubbles[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
      }
    }
  }
}

let Bubbles = [];

while (Bubbles.length < 20) {
  let size = random(25,25);
  let Bubble = new bubble(
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-15,15),
    random(-15,15),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size
  );

  Bubbles.push(Bubble);
}


function loop() {

  ctx.fillStyle = 'rgba(0, 0, 0, 0.10)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < Bubbles.length; i++) {
    Bubbles[i].draw();
    Bubbles[i].update();
    Bubbles[i].collisionDetect();
  }
  requestAnimationFrame(loop);
}

loop();