# Toast Notifications System

A simple and customizable toast notification system for HTML.

## Demo
![ezgif-4-f43ae138e8](https://github.com/seraprogrammer/sera.js/assets/73139993/1282fa75-9f47-42c6-a320-74c17ba68308)


## Features

- Customizable positions: top, bottom, top-right, top-left, bottom-right, bottom-left
- Different notification types: info, error, warning, success
- Progress bar
- Close button
- Light and dark themes
- Animation effects

## Installation

Include the following HTML and JavaScript code in your project.

### HTML

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Toast Notifications</title>
</head>

<body import="Toasts">

  <button toast-trigger role="info">Show Info Toast</button>

  <div role="info" class="toast-container" toast-container toast-content="Wow so easy!" time="2000000"
    toast-position="top-right" type="error" light text="#e11d48"></div>

  <script src="https://cdn.jsdelivr.net/gh/seraprogrammer/sera.js@main/html.js"></script>
</body>

</html>
