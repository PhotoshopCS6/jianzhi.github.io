document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const images = [
        'images/justin1.jpg',
        'images/justin2.jpg',
        'images/justin3.jpg',
        'images/justin4.jpg',
        'images/justin5.jpg',
        'images/justin6.jpg'
    ];
    const targets = [];
    const targetSize = 150;
    const maxTargets = 10;
    let loveCounter = 0;

    function updateCounter() {
        document.getElementById('counter').innerText = `How much you love Justin: ${loveCounter}`;
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Target {
        constructor(imgSrc, x, y, speedX, speedY) {
            this.img = new Image();
            this.img.src = imgSrc;
            this.x = x;
            this.y = y;
            this.speedX = speedX;
            this.speedY = speedY;
            this.fading = false;
            this.opacity = 1;
            this.size = targetSize;
            this.growthRate = Math.random() * 2 - 1;
        }

        draw() {
            if (!this.fading) {
                ctx.globalAlpha = this.opacity;
                ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
                ctx.globalAlpha = 1;
            }
        }

        move() {
            if (!this.fading) {
                this.x += this.speedX;
                this.y += this.speedY;
                this.size += this.growthRate;
                if (this.size > targetSize * 1.5 || this.size < targetSize * 0.5) {
                    this.growthRate *= -1;
                }

                if (this.x < 0 || this.x + this.size > canvas.width) {
                    this.speedX *= -1;
                }
                if (this.y < 0 || this.y + this.size > canvas.height) {
                    this.speedY *= -1;
                }
            }
        }

        fadeOut() {
            this.fading = true;
            const fadeInterval = setInterval(() => {
                this.opacity -= 0.05;
                if (this.opacity <= 0) {
                    clearInterval(fadeInterval);
                    this.opacity = 0;
                    targets.splice(targets.indexOf(this), 1);
                }
            }, 50);
        }

        isClicked(mouseX, mouseY) {
            return mouseX >= this.x && mouseX <= this.x + this.size &&
                   mouseY >= this.y && mouseY <= this.y + this.size;
        }
    }

    function addNewTarget() {
        const x = Math.random() * (canvas.width - targetSize);
        const y = Math.random() * (canvas.height - targetSize);
        const speedX = (Math.random() - 0.5) * 4;
        const speedY = (Math.random() - 0.5) * 4;
        targets.push(new Target(images[Math.floor(Math.random() * images.length)], x, y, speedX, speedY));
    }

    function maintainTargetCount() {
        while (targets.length < maxTargets) {
            addNewTarget();
        }
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        targets.forEach(target => {
            target.move();
            target.draw();
        });

        maintainTargetCount();
        requestAnimationFrame(gameLoop);
    }

    function handleMouseClick(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        targets.forEach(target => {
            if (target.isClicked(mouseX, mouseY)) {
                loveCounter++;
                updateCounter();

                const clickSound = new Audio('sounds/vine-boom.mp3'); // New Audio instance
                clickSound.play();

                target.fadeOut();
            }
        });
    }

    maintainTargetCount();
    canvas.addEventListener('click', handleMouseClick);
    gameLoop();
});
