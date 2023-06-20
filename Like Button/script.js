const likeBtn = document.querySelector('.like-btn');
const likeCount = document.querySelector('.count');
let count = 0;

likeBtn.addEventListener('click', () => {
  count++;
  likeCount.innerText = count;
  likeBtn.innerText = `${count} likes`;
});
