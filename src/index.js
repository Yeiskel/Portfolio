const splide = new Splide(".splide", {
	type: "loop",
	pagination: false,
	autoplay: true,
	interval: 3000,
	pauseOnHover: true,
	keyboard: true,
}).mount();

const btn = document.getElementById("mobile-menu-button");
const menu = document.getElementById("mobile-menu");
btn.addEventListener("click", () => {
	menu.classList.toggle("hidden");
	menu.classList.toggle("flex");
});

const form_btn = document.getElementById("form_btn");
const thanks = document.getElementById("thanks");

form_btn.addEventListener("click", () => {
	thanks.classList.toggle("hidden");
});

// const group = document.getElementById("group");
// const desc = document.getElementById("description");

// console.log(group);
// group.addEventListener("mouseover", () => {
// 	desc.classList.toggle("hidden");
// });
