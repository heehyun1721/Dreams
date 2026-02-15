let currentIndex = 0;

const cards = document.querySelectorAll(".card-box");
const slider = document.getElementById("slider");
const viewport = document.querySelector(".slider-viewport");

function updateSlider() {

    cards.forEach(card => card.classList.remove("active"));
    cards[currentIndex].classList.add("active");

    const card = cards[currentIndex];

    const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
    const viewportCenter = viewport.offsetWidth / 2;

    slider.style.transform = 
        `translateX(${viewportCenter - cardCenter}px)`;
}

function moveSlide(direction) {

    currentIndex += direction;

    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= cards.length) 
        currentIndex = cards.length - 1;

    updateSlider();
}

function selectGolf(button, GolfName, blurLevel) {

    const card = button.parentElement;
    const img = card.querySelector("img").src;

    localStorage.setItem("selectedGolf", img);
    localStorage.setItem("selectedGolfName", GolfName);
    localStorage.setItem("selectedGolfBlur", blurLevel);

    window.location.href = "JJJ.html"; 
}

window.onload = function() {
    updateSlider();
};