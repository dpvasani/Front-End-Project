var accordionItems = document.querySelectorAll(".accordion-item");

for (var i = 0; i < accordionItems.length; i++) {
	var header = accordionItems[i].querySelector(".accordion-header");
	header.addEventListener("click", function() {
		var currentItem = this.parentNode;
		var isActive = currentItem.classList.contains("active");
		closeAllItems();
		if (!isActive) {
			currentItem.classList.add("active");
			var content = currentItem.querySelector(".accordion-content");
			content.style.maxHeight = content.scrollHeight + "px";
		}
	});
}

function closeAllItems() {
	for (var i = 0; i < accordionItems.length; i++) {
		var item = accordionItems[i];
		item.classList
