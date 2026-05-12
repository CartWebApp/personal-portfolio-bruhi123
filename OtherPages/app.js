const buttonProjectsHome = document.querySelector(".projectsLearnMore");
const footerProjectsLink = document.querySelector(".projectsFooter");
const navProjects = document.querySelector(".projectsWrapper");
const allProjectsWrappers = document.querySelectorAll(".projectsWrapper");

function closeAllDropdowns() {
  allProjectsWrappers.forEach(button => button.classList.remove("open"));
}

function toggleDropdown(wrapper) {
  const isOpen = wrapper.classList.contains("open");
  closeAllDropdowns();
  if (!isOpen) {
    wrapper.classList.add("open");
  }
}

allProjectsWrappers.forEach(wrapper => {
  const trigger = wrapper.querySelector(".projects");
  trigger.addEventListener("click", (button) => {
    button.stopPropagation();
    toggleDropdown(wrapper);
  });
});

document.addEventListener("click", () => {
  closeAllDropdowns()
});

allProjectsWrappers.forEach(wrapper => {
  wrapper.querySelector(".projectsDialog").addEventListener("click", e => {
    e.stopPropagation()
  });
});

function openProjectsDropdown() {
  if (navProjects) {
    navProjects.scrollIntoView({ behavior: "smooth", block: "center" });
    const wrapper = navProjects;
    closeAllDropdowns();
    wrapper.classList.add("open");
    setTimeout(() => wrapper.classList.remove("open"), 2000);
  }
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
    }
  });
}

// bubble move

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

const bubbleImg = document.querySelector('.bubble');
const bubblePoppedImg = document.querySelector('.bubblePopped');

const popSound = new Audio('/Images/pop.mp3');

function playPop() {
  popSound.currentTime = 0;
  popSound.play();
}

// to generate a random number between two numbers
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// the constructor
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
  if (this.popped) {
    return;
  }

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

function spawnBubble() {
  const size = random(25, 45);
  return new Bubble(
    random(size, width - size),
    random(size, height - size),
    random(-2, 2) || 1,
    random(-2, 2) || 1,
    size
  );
}

let bubbles = [];

while (bubbles.length < 5) {
  bubbles.push(spawnBubble());
}

window.addEventListener('click', function (e) {
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

      setTimeout(() => {
        const index = bubbles.indexOf(b);
        if (index !== -1) {
          bubbles.splice(index, 1);
          bubbles.push(spawnBubble());
        }
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
  bubbleImg.addEventListener('load', function () {
    loop();
  });
}


// CONTACT EMAIL
emailjs.init("demWgnGiMJKq9Dogq");

const form = document.querySelector('.contactInput');
const button = document.querySelector('.submit');

form.addEventListener('submit', e => {
  e.preventDefault();
  button.disabled = true;
  button.textContent = 'Sending...';

  emailjs.sendForm("service_y95qmu7", "template_j1ec97o", form)
    .then(() => {
      button.textContent = 'Sent';
      button.classList.add('sent');
      form.reset();

      const popup = document.getElementById('successPopup');
      popup.classList.add('active');

      document.getElementById('successPopupClose').addEventListener('click', () => {
        popup.classList.remove('active');
      });

      setTimeout(() => {
        button.disabled = false;
        button.textContent = 'Submit';
        button.classList.remove('sent');
      }, 3000);
    })
});