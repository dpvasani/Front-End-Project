var faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(function(item) {
	var toggleButton = item.querySelector('.faq-toggle');
	var answer = item.querySelector('.faq-answer');
	
	toggleButton.addEventListener('click', function() {
		if (answer.style.display === 'none') {
			answer.style.display = 'block';
			toggleButton.innerHTML = 'Hide Answer';
		} else {
			answer.style.display = 'none';
			toggleButton.innerHTML = 'Show Answer';
		}
	});
});
