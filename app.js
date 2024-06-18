const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const NUM_OBJECTS = 10; // Número de objetos
const objects = [];

class MovingObject {
    constructor(x, y, size, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Detectar colisión con los bordes del canvas
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.speedY = -this.speedY;
        }

        // Detectar colisión con otros objetos
        for (let obj of objects) {
            if (obj !== this && this.isColliding(obj)) {
                this.speedX = -this.speedX;
                this.speedY = -this.speedY;
                obj.speedX = -obj.speedX;
                obj.speedY = -obj.speedY;
            }
        }
    }

    isColliding(obj) {
        const dx = this.x - obj.x;
        const dy = this.y - obj.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < this.size + obj.size;
    }
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function init() {
    for (let i = 0; i < NUM_OBJECTS; i++) {
        const size = getRandom(5, 15);
        const speedX = getRandom(-2, 2);
        const speedY = getRandom(-2, 2);
        objects.push(new MovingObject(canvas.width / 2, canvas.height / 2, size, speedX, speedY));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let obj of objects) {
        obj.update();
        obj.draw();
    }
    requestAnimationFrame(animate);
}

init();
animate();
