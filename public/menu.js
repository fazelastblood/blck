document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    menu.classList.toggle('open');
  });
});

const input = document.getElementById('uv-address');
const searchContent = document.querySelector('.search-content');

input.addEventListener('focus', () => {
  searchContent.classList.add('focused');
});

input.addEventListener('blur', () => {
  searchContent.classList.remove('focused');
});


var closeBtn = document.querySelector('.popup-close');
  closeBtn.onclick = function() {
      document.getElementById("popup").style.display = 'none';
  };


function show() {
  document.querySelector('.hamburger').classList.toggle('open');
  document.querySelector('.navigation').classList.toggle('active');
}

// Function to toggle fullscreen
function toggleFullScreen() {
  // Check if the document is currently in fullscreen mode
  const isInFullScreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;

  if (!isInFullScreen) {
    // Enter fullscreen mode
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
  } else {
    // Exit fullscreen mode
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
  show();
}

// Example of how to call the function (you can trigger it based on user interaction, e.g., button click)
// toggleFullScreen();
