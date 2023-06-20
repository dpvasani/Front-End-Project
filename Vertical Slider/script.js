const slider = document.getElementById("mySlider");

slider.addEventListener("input", function() {
  const value = (this.value - this.min) / (this.max - this.min) * 100;
  this.style.background = `linear-gradient(to top, #3498db ${value}%, #ccc ${value}%)`;
});
