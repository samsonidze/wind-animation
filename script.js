const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const numParticles = 500;
const particles = [];

function createParticle() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        history: [],
        maxHistory: 20,
        alpha: 1
    };
}

function velocityField(x, y, t) {
    return {
        u: Math.sin(y * 0.002 + t * 0.0003) * 1.5 + 0.5,  // Horizontal wind speed
        v: Math.cos(x * 0.002 + t * 0.0003) * 1.2  // Vertical wind speed
    };
}

for (let i = 0; i < numParticles; i++) {
    particles.push(createParticle());
}

function animate(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 1;
    ctx.lineJoin = "round";

    for (let p of particles) {
        let { u, v } = velocityField(p.x, p.y, t);

        p.x += u;
        p.y += v;

        p.history.push({ x: p.x, y: p.y });

        if (p.history.length > p.maxHistory) {
            p.history.shift();
        }

        if (p.x < 0 || p.y < 0 || p.x > canvas.width || p.y > canvas.height) {
            Object.assign(p, createParticle());
        }

        ctx.beginPath();
        ctx.strokeStyle = `rgba(173, 216, 230, ${p.alpha})`;  // Light color with fading effect
        p.history.forEach((point, i) => {
            ctx.globalAlpha = i / p.history.length;  // Fading trail
            if (i === 0) ctx.moveTo(point.x, point.y);
            else ctx.lineTo(point.x, point.y);
        });
        ctx.stroke();
    }

    requestAnimationFrame(animate);
}

animate(0);