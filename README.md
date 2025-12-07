# Portfolio Website - Muhammad Kabir Abdullahi

A responsive, single-page personal portfolio website built with HTML, CSS, and Vanilla JavaScript.

## Features

- **Hero Slider**: Responsive image carousel with manual controls and auto-rotation logic.
- **Projects Integration**: Dynamically fetches and displays GitHub repositories using the GitHub API.
- **Recommendations Section**: Showcases testimonials with LinkedIn profile integration.
- **Contact Form**: Functional contact form powered by [Formspree](https://formspree.io) with client-side validation.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.
- **Theme Toggle**: Light/Dark mode support.

## Getting Started

To run this project locally:

1.  Clone the repository:
    ```bash
    git clone https://github.com/mkabdullahi/personal-website.git
    cd personal-website
    ```

2.  Run a local server (requires Node.js):
    ```bash
    npx http-server .
    ```
    OR using Python:
    ```bash
    python3 -m http.server
    ```

3.  Open `http://localhost:8080` in your browser.

## Configuration

To make the contact form work for you:
1.  Register at [Formspree](https://formspree.io).
2.  Create a new form and get your **Form ID**.
3.  Update `index.html` (form action) and `script.js` (fetch URL) with your Form ID.

## License

MIT License

Copyright (c) 2025 Muhammad Kabir Abdullahi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
