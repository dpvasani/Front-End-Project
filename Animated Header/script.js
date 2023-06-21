window.addEventListener("scroll", function() {
	if (window.scrollY > 10) {
		document.querySelector("header").classList.add("header-scrolled");
	} else {
		document.querySelector("header").classList.remove("header-scrolled");
	}
});
