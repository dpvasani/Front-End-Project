const button = document.getElementById('click-me');
const output = document.getElementById('output');

button.addEventListener('click', () => {
	output.textContent = 'You clicked the button!';
});
