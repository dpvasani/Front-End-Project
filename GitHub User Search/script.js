const form = document.querySelector('form');
const resultSection = document.getElementById('result');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = e.target.elements[0].value;
  const url = `https://api.github.com/users/${username}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const card = `
        <div class="card">
          <img src="${data.avatar_url}">
          <h3>${data.name}</h3>
          <p>${data.bio}</p>
        </div>
      `;
      resultSection.innerHTML = card;
    })
    .catch(error => console.error(error));
});
