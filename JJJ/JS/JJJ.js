
    window.addEventListener("DOMContentLoaded", function() {
    
        const carImage = document.getElementById("mainCarImage");
        const carText = document.getElementById("mainCarText");
        const carGradient = document.getElementById("mainCarGradient");
    
        const watchImage = document.getElementById("mainWatchImage");
        const watchText = document.getElementById("mainWatchText");
        const watchGradient = document.getElementById("mainWatchGradient");
    
        const golfImage = document.getElementById("mainGolfImage");
        const golfText = document.getElementById("mainGolfText");
        const golfGradient = document.getElementById("mainGolfGradient");

        const selectedCar = localStorage.getItem("selectedCar");
        const selectedCarName = localStorage.getItem("selectedCarName");
        const selectedCarBlur = localStorage.getItem("selectedCarBlur");

        const selectedWatch = localStorage.getItem("selectedWatch");
        const selectedWatchName = localStorage.getItem("selectedWatchName");
        const selectedWatchBlur = localStorage.getItem("selectedWatchBlur");

        const selectedGolf = localStorage.getItem("selectedGolf");
        const selectedGolfName = localStorage.getItem("selectedGolfName");
        const selectedGolfBlur = localStorage.getItem("selectedGolfBlur");
    
        // localStorage 값이 있으면 적용
        if (localStorage.getItem("selectedCar")) {
            carImage.src = localStorage.getItem("selectedCar");
            carText.textContent = localStorage.getItem("selectedCarName") || "Car";
            carGradient.style.background = `linear-gradient(rgba(0,0,0,${localStorage.getItem("selectedCarBlur") || 0.5}),
            rgba(0,0,0,${localStorage.getItem("selectedCarBlur") || 0.5}))`;
        }
    
        if (localStorage.getItem("selectedWatch")) {
            watchImage.src = localStorage.getItem("selectedWatch");
            watchText.textContent = localStorage.getItem("selectedWatchName") || "Watch";
            watchGradient.style.background = `linear-gradient(rgba(0,0,0,${localStorage.getItem("selectedWatchBlur") || 0.5}),
            rgba(0,0,0,${localStorage.getItem("selectedWatchBlur") || 0.5}))`;
        }
    
        if (localStorage.getItem("selectedGolf")) {
            golfImage.src = localStorage.getItem("selectedGolf");
            golfText.textContent = localStorage.getItem("selectedGolfName") || "Golf";
            golfGradient.style.background = `linear-gradient(rgba(0,0,0,${localStorage.getItem("selectedGolfBlur") || 0.5}),
            rgba(0,0,0,${localStorage.getItem("selectedGolfBlur") || 0.5}))`;
        }
    
        if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
            localStorage.removeItem("selectedCar");
            localStorage.removeItem("selectedCarName");
            localStorage.removeItem("selectedCarBlur");
            localStorage.removeItem("selectedWatch");
            localStorage.removeItem("selectedWatchName");
            localStorage.removeItem("selectedWatchBlur");
            localStorage.removeItem("selectedGolf");
            localStorage.removeItem("selectedGolfName");
            localStorage.removeItem("selectedGolfBlur");
    
            carImage.src = "IMG/Car_main.jpg";
            carText.textContent = "Car";
            carGradient.style.background = "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))";
    
            watchImage.src = "IMG/Watch_main.jpg";
            watchText.textContent = "Watch";
            watchGradient.style.background = "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))";
    
            golfImage.src = "IMG/Golf_main.jpg";
            golfText.textContent = "Golf";
            golfGradient.style.background = "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))";
        }
    
    });

window.addEventListener("DOMContentLoaded", function() {

    const car = localStorage.getItem("selectedCar");
    const watch = localStorage.getItem("selectedWatch");
    const golf = localStorage.getItem("selectedGolf");

    if (car && watch && golf) {
        startMegaFireworks();
    }

});

function startMegaFireworks() {
    const overlay = document.getElementById("fireworksOverlay");
    overlay.style.background = "rgba(0,0,0,0.35)";
    const canvas = document.getElementById("fireworksCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const gravity = 0.15;

    function createFirework(x, y) {
        const count = 100;

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 6 + 3;

            const isGold = Math.random() < 0.5;

            const color = isGold
                ? `hsl(45, 100%, ${55 + Math.random() * 20}%)`   
                : `hsl(${210 + Math.random() * 15}, 100%, 65%)`;    

            particles.push({
                x: x,
                y: y,
                radius: Math.random() * 3 + 2,
                color: color,
                speedX: Math.cos(angle) * speed,
                speedY: Math.sin(angle) * speed,
                alpha: 1
            });
        }
    }

    function animate() {

ctx.globalCompositeOperation = "destination-out";
ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.globalCompositeOperation = "lighter";

for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];

    p.speedY += gravity;
    p.x += p.speedX;
    p.y += p.speedY;
    p.alpha -= 0.01;

    ctx.globalAlpha = p.alpha;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    if (p.alpha <= 0) {
        particles.splice(i, 1);
    }
}

ctx.globalAlpha = 1;
ctx.globalCompositeOperation = "source-over";

requestAnimationFrame(animate);
}


    animate();

    let burstCount = 0;

    const interval = setInterval(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.6;

        createFirework(x, y);
        burstCount++;

        if (burstCount > 2) {
            clearInterval(interval);
            overlay.style.background = "rgba(0,0,0,0)";
            setTimeout(() => {
                canvas.remove();
            }, 4000);
        }

    }, 400);
}