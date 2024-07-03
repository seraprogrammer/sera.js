document.addEventListener('DOMContentLoaded', function () {
  function Toasts() {
    const style = document.createElement('style');
    style.textContent = `
    /* Toast container */
    [toast-container] {
      position: fixed;
      z-index: 1000;
      pointer-events: none; /* Allow clicks to pass through */
    }

    /* Positions */
    [toast-container][toast-position="top"] {
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
    }
    [toast-container][toast-position="bottom"] {
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
    }
    [toast-container][toast-position="top-right"] {
      top: 10px;
      right: 10px;
    }
    [toast-container][toast-position="top-left"] {
      top: 10px;
      left: 10px;
    }
    [toast-container][toast-position="bottom-right"] {
      bottom: 10px;
      right: 10px;
    }
    [toast-container][toast-position="bottom-left"] {
      bottom: 10px;
      left: 10px;
    }

    /* Toast message */
    .toast {
      display: flex;
      align-items: center;
      background: #000;
      color: #fff;
      padding: 8px 21px;
      border-radius: 5px;
      box-shadow: 0 1px 10px 0 rgba(0,0,0,.1),0 2px 15px 0 rgba(0,0,0,.05);
      margin: 10px 0;
      opacity: 0;
      transform: translate3d(100%, 0, 0) scale(0.5);
      pointer-events: auto; /* Allow clicks */
      transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
      // width: fit-content;
      position: relative;
      margin-bottom: 10px;
      cursor: pointer;
      width: 250px;
}
    }
    .toast p {
      font-size: 16px;
      font-family: sans-serif;
    }
    .toast svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
      margin-right: 10px;
    }
    .toast.show {
      opacity: 1;
      transform: translate3d(0, 0, 0) scale(1);
      animation: bounceInRight 0.75s;
    }

    .toast.hide {
      opacity: 0;
      transform: translate3d(100%, 0, 0) scale(0.5);
    }

    /* Animation for coming from the right */
    @keyframes slideInFromRight {
      0% {
        opacity: 0;
        transform: translateX(3000px) scale(0.5);
      }
      60% {
        opacity: 1;
        transform: translateX(-25px) scale(1.05);
      }
      75% {
        transform: translateX(10px) scale(0.95);
      }
      90% {
        transform: translateX(-5px) scale(1.02);
      }
      100% {
        transform: translateX(0) scale(1);
      }
    }

    /* Animation for coming from the left */
    @keyframes slideInFromLeft {
      0% {
        opacity: 0;
        transform: translateX(-3000px) scale(0.5);
      }
      60% {
        opacity: 1;
        transform: translateX(25px) scale(1.05);
      }
      75% {
        transform: translateX(-10px) scale(0.95);
      }
      90% {
        transform: translateX(5px) scale(1.02);
      }
      100% {
        transform: translateX(0) scale(1);
      }
    }

    @keyframes slideInFromTop {
      0% {
        opacity: 0;
        transform: translateY(-3000px) scale(0.5);
      }
      60% {
        opacity: 1;
        transform: translateY(25px) scale(1.05);
      }
      75% {
        transform: translateY(-10px) scale(0.95);
      }
      90% {
        transform: translateY(5px) scale(1.02);
      }
      100% {
        transform: translateY(0) scale(1);
      }
    }

    @keyframes slideInFromBottom {
      0% {
        opacity: 0;
        transform: translateY(3000px) scale(0.5);
      }
      60% {
        opacity: 1;
        transform: translateY(-25px) scale(1.05);
      }
      75% {
        transform: translateY(10px) scale(0.95);
      }
      90% {
        transform: translateY(-5px) scale(1.02);
      }
      100% {
        transform: translateY(0) scale(1);
      }
    }

    .toast.from-right {
      animation: slideInFromRight 0.75s;
    }

    .toast.from-left {
      animation: slideInFromLeft 0.75s;
    }

    .toast.from-top {
      animation: slideInFromTop 0.75s;
    }
    .toast.from-bottom {
      animation: slideInFromBottom 0.75s;
    }

    /* Close button */
    .toast .toast-close {
      background: transparent;
      border: none;
      color: #9e9898;
      font-size: 15px;
      margin-left: 10px;
      cursor: pointer;
      position: absolute;
      right: 1px;
      top: 5px;
    }

    /* Progress bar */
    .progress-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 5px;
      background-color: #fff;
    }

    .progress-bar-fill {
      height: 100%;
      background: linear-gradient(
        45deg,
        #ff5733,
        #ff8d1a,
        #ffc300,
        #daf7a6,
        #33ff57,
        #33ffbd,
        #33d4ff,
        #3375ff,
        #8e33ff,
        #ff33a8
      );
      width: 100%;
      transition: width 0.1s;
    }

    /* Dark theme */
    [toast-container][dark] .toast {
      background-color: #121212;
      color: #fff;
      box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1),
        0 2px 15px 0 rgba(0, 0, 0, 0.05);
    }

    [toast-container][dark] .toast-close {
      color: #d1d0d0;
    }

    [toast-container][dark] .toast-close:hover {
      color: #fff;
    }

    /* Light theme */
    [toast-container]:not([dark]) .toast {
      background-color: #fff;
      color: #333;
      box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1),
        0 2px 15px 0 rgba(0, 0, 0, 0.05);
    }

    [toast-container]:not([dark]) .toast-close {
      color: #9b9a9a;
    }

    [toast-container]:not([dark]) .toast-close:hover {
      color: #000;
    }
  `;
    document.head.appendChild(style);

    const toastContainer = document.querySelector('[toast-container]');
    const toastTriggers = document.querySelectorAll('[toast-trigger]');

    toastTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const role = trigger.getAttribute('role');
        const matchingToast = document.querySelector(
          `.toast-container[role="${role}"]`
        );

        if (matchingToast) {
          const content = matchingToast.getAttribute('toast-content');
          const time = parseInt(matchingToast.getAttribute('time'));
          const notifySide = matchingToast.getAttribute('toast-position');
          const textColor = matchingToast.getAttribute('text');
          const type = matchingToast.getAttribute('type');

          notify(content, time, notifySide, textColor, type);
        }
      });
    });

    function notify(content, time, notifySide, textColor, type) {
      const toast = document.createElement('div');
      toast.className = 'toast';

      // Create icon based on type
      let iconSvg;
      switch (type) {
        case 'error':
          iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">

<defs>
</defs>
<g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
	<path d="M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c 24.813 0 45 20.187 45 45 C 90 69.813 69.813 90 45 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(236,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 28.902 66.098 c -1.28 0 -2.559 -0.488 -3.536 -1.465 c -1.953 -1.952 -1.953 -5.118 0 -7.07 l 32.196 -32.196 c 1.951 -1.952 5.119 -1.952 7.07 0 c 1.953 1.953 1.953 5.119 0 7.071 L 32.438 64.633 C 31.461 65.609 30.182 66.098 28.902 66.098 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 61.098 66.098 c -1.279 0 -2.56 -0.488 -3.535 -1.465 L 25.367 32.438 c -1.953 -1.953 -1.953 -5.119 0 -7.071 c 1.953 -1.952 5.118 -1.952 7.071 0 l 32.195 32.196 c 1.953 1.952 1.953 5.118 0 7.07 C 63.657 65.609 62.377 66.098 61.098 66.098 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
</g>
</svg>`;
          break;
        case 'info':
          iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">

<defs>
</defs>
<g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
	<circle cx="45" cy="45" r="45" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(72,214,247); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
	<path d="M 54.717 63.299 c -0.264 -0.074 -0.566 -0.011 -0.769 0.164 c -5.643 5.009 -7.288 5.625 -7.734 5.657 c -0.056 0.004 -0.18 -0.048 -0.344 -0.211 c -0.206 -0.201 -0.317 -0.465 -0.342 -0.807 c -0.172 -2.383 1.447 -9.741 4.812 -21.87 c 2.826 -10.143 3.089 -12.2 3.041 -12.863 c -0.071 -0.99 -0.563 -1.759 -1.46 -2.287 c -0.854 -0.501 -2.025 -0.701 -3.477 -0.596 c -2.448 0.177 -5.362 1.206 -8.661 3.06 c -0.943 0.531 -1.926 1.166 -2.92 1.886 c -2.622 1.9 -4.06 4.79 -3.848 7.729 c 0.017 0.241 0.206 0.446 0.478 0.522 c 0.273 0.075 0.578 0.005 0.773 -0.177 c 2.602 -2.419 4.335 -3.902 5.153 -4.409 c 0.873 -0.54 1.651 -0.837 2.315 -0.885 c 0.245 -0.018 0.368 -0.027 0.397 0.38 c 0.039 0.541 -0.047 1.188 -0.255 1.919 c -4.927 16.991 -7.17 27.343 -6.86 31.647 c 0.106 1.463 0.672 2.6 1.684 3.382 c 1.024 0.793 2.363 1.137 3.976 1.02 c 1.757 -0.127 3.866 -0.902 6.446 -2.369 c 1.241 -0.706 2.849 -1.847 4.78 -3.391 c 2.277 -1.822 3.475 -4.366 3.287 -6.98 C 55.171 63.581 54.987 63.377 54.717 63.299 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<circle cx="50.830999999999996" cy="19.591" r="6.171" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
</g>
</svg>`;
          break;
        case 'warning':
          iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">

<defs>
</defs>
<g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
	<path d="M 45 88.11 h 40.852 c 3.114 0 5.114 -3.307 3.669 -6.065 L 48.669 4.109 c -1.551 -2.959 -5.786 -2.959 -7.337 0 L 0.479 82.046 c -1.446 2.758 0.555 6.065 3.669 6.065 H 45 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,157,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 45 64.091 L 45 64.091 c -1.554 0 -2.832 -1.223 -2.9 -2.776 l -2.677 -25.83 c -0.243 -3.245 2.323 -6.011 5.577 -6.011 h 0 c 3.254 0 5.821 2.767 5.577 6.011 L 47.9 61.315 C 47.832 62.867 46.554 64.091 45 64.091 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<circle cx="44.995999999999995" cy="74.02600000000001" r="4.626" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
</g>
</svg>`;
          break;
        case 'success':
          iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">

<defs>
</defs>
<g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
	<circle cx="45" cy="45" r="45" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(40,201,55); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
	<path d="M 38.478 64.5 c -0.01 0 -0.02 0 -0.029 0 c -1.3 -0.009 -2.533 -0.579 -3.381 -1.563 L 21.59 47.284 c -1.622 -1.883 -1.41 -4.725 0.474 -6.347 c 1.884 -1.621 4.725 -1.409 6.347 0.474 l 10.112 11.744 L 61.629 27.02 c 1.645 -1.862 4.489 -2.037 6.352 -0.391 c 1.862 1.646 2.037 4.49 0.391 6.352 l -26.521 30 C 40.995 63.947 39.767 64.5 38.478 64.5 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
</g>
</svg>`;
          break;
        default:
          iconSvg = '';
          break;
      }

      // Create icon element and append to toast
      const icon = document.createElement('div');
      icon.className = 'toast-icon';
      icon.innerHTML = iconSvg;
      toast.appendChild(icon);

      // Create content paragraph
      const contentParagraph = document.createElement('p');
      contentParagraph.textContent = content;
      contentParagraph.style.color = textColor || '#fff';
      toast.appendChild(contentParagraph);

      // Set toast-position attribute
      toast.setAttribute('toast-position', notifySide);

      // Create close button
      const closeButton = document.createElement('button');
      closeButton.className = 'toast-close';
      closeButton.textContent = 'X';
      closeButton.addEventListener('click', () => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 500);
      });
      toast.appendChild(closeButton);

      // Create progress bar
      const progressBar = document.createElement('div');
      progressBar.className = 'progress-bar';
      const progressBarFill = document.createElement('div');
      progressBarFill.className = 'progress-bar-fill';
      progressBar.appendChild(progressBarFill);
      toast.appendChild(progressBar);

      toastContainer.appendChild(toast);

      // Trigger the show animation
      setTimeout(() => {
        toast.classList.add('show');
      }, 10);

      // Auto close after the specified time
      if (time) {
        const startTime = Date.now();
        const endTime = startTime + time;
        const updateProgressBar = () => {
          const now = Date.now();
          const remainingTime = Math.max(0, endTime - now);
          const progress = (remainingTime / time) * 100;
          progressBarFill.style.width = progress + '%';
          if (now < endTime) {
            requestAnimationFrame(updateProgressBar);
          } else {
            toast.classList.add('hide');
            setTimeout(() => toast.remove(), 500);
          }
        };
        updateProgressBar();
      }

      // Adjust animation direction based on position
      if (
        notifySide.includes('top-right') ||
        notifySide.includes('bottom-right')
      ) {
        toast.classList.add('from-right');
      } else if (
        notifySide.includes('top-left') ||
        notifySide.includes('bottom-left')
      ) {
        toast.classList.add('from-left');
      } else if (notifySide.includes('top')) {
        toast.classList.add('from-top');
      } else if (notifySide.includes('bottom')) {
        toast.classList.add('from-bottom');
      }

      // Add specific type class for different toast types
      if (type === 'error') {
        toast.classList.add('error-toast');
      } else if (type === 'info') {
        toast.classList.add('info-toast');
      } else if (type === 'success') {
        toast.classList.add('success-toast');
      } else if (type === 'warning') {
        toast.classList.add('warning-toast');
      }
    }
  }

  window.MyLibrary = {
    Toasts,
  };

  const body = document.querySelector('body');
  const powerAttr = body.getAttribute('import');

  if (powerAttr) {
    const featuresToInitialize = powerAttr.split(' ');
    featuresToInitialize.forEach(feature => {
      if (typeof MyLibrary[feature] === 'function') {
        MyLibrary[feature]();
      }
    });
  }
});
