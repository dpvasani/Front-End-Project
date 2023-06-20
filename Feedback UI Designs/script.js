//Add event listener to form submit button
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Thank you for your feedback!');
  form.reset();
});
