const canvas = document.getElementById('pixel-canvas');
const context = canvas.getContext('2d');
const colorPicker = document.getElementById('color-picker');
const clearBtn = document.getElementById('clear-btn');

const PIXEL_SIZE = 10;
const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

let currentColor = '#000';

// draw the initial grid
for (let x = 0; x < CANVAS_SIZE; x += PIXEL_SIZE) {
    for (let y = 0; y < CANVAS_SIZE; y += PIXEL_SIZE) {
      context.fillStyle = '#fff';
      context.fillRect(x, y, PIXEL_SIZE, PIXEL_SIZE);
      context.strokeRect(x, y, PIXEL_SIZE, PIXEL_SIZE);
    }
  }
  
  // handle mouse events on the canvas
  canvas.addEventListener('mousedown', function(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    const gridX = Math.floor(x / PIXEL_SIZE) * PIXEL_SIZE;
    const gridY = Math.floor(y / PIXEL_SIZE) * PIXEL_SIZE;
  
    context.fillStyle = currentColor;
    context.fillRect(gridX, gridY, PIXEL_SIZE, PIXEL_SIZE);
  });
  
  // handle color picker changes
  colorPicker.addEventListener('change', function(event) {
    currentColor = event.target.value;
  });
  
  // handle clear button click
  clearBtn.addEventListener('click', function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    // redraw the grid
    for (let x = 0; x < CANVAS_SIZE; x += PIXEL_SIZE) {
      for (let y = 0; y < CANVAS_SIZE; y += PIXEL_SIZE) {
        context.fillStyle = '#fff';
        context.fillRect(x, y, PIXEL_SIZE, PIXEL_SIZE);
        context.strokeRect(x, y, PIXEL_SIZE, PIXEL_SIZE);
      }
    }
  });