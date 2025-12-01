document.addEventListener('DOMContentLoaded', function() {
        // Carousel functionality
        const carouselImages = document.querySelectorAll('.carousel-image');
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');
        let currentIndex = 0;

        function showImage(index) {
            let i = 0;
            for (const img of carouselImages) {
                img.classList.toggle('active', i === index);
                i++;
            }
        }

        function showPrevImage() {
            currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
            showImage(currentIndex);
        }

        function showNextImage() {
            currentIndex = (currentIndex + 1) % carouselImages.length;
            showImage(currentIndex);
        }

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', showPrevImage);
            nextBtn.addEventListener('click', showNextImage);
        }

        // Optional: auto-advance every 5 seconds
        setInterval(showNextImage, 5000);
    // Smooth scroll for navigation links
    for (const anchor of document.querySelectorAll('a[href^="#"]')) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Add scroll animation for elements
    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        }
    });

    // Observe all sections
    for (const section of document.querySelectorAll('section')) {
        observer.observe(section);
    }

    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = globalThis.matchMedia('(prefers-color-scheme: light)');

    // Function to toggle theme
    function toggleTheme() {
        const currentTheme = document.documentElement.dataset.theme;
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = newTheme;
        localStorage.setItem('theme', newTheme);
        // Update icon
        const icon = themeToggle.querySelector('i');
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Initialize theme
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemTheme = prefersDarkScheme.matches ? 'dark' : 'light';
        const currentTheme = savedTheme || systemTheme;
        document.documentElement.dataset.theme = currentTheme;
        const icon = themeToggle.querySelector('i');
        icon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Event listeners
    themeToggle.addEventListener('click', toggleTheme);
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            document.documentElement.dataset.theme = e.matches ? 'dark' : 'light';
        }
    });

    // Initialize theme on page load
    initializeTheme();

    // Load GitHub projects dynamically
    function loadGitHubProjects() {
        const projectsGrid = document.getElementById('github-projects');
        fetch('https://api.github.com/users/mkabdullahi/repos?sort=updated')
            .then(response => response.json())
            .then(repos => {
                projectsGrid.innerHTML = '';
                const topRepos = repos.slice(0, 6);
                for (const repo of topRepos) {
                    const card = document.createElement('div');
                    card.className = 'project-card';
                    card.innerHTML = `
                        <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                        <p>${repo.description || 'No description provided.'}</p>
                    `;
                    projectsGrid.appendChild(card);
                }
            })
            .catch(() => {
                projectsGrid.innerHTML = '<div class="error">Unable to load projects from GitHub.</div>';
            });
    }
    loadGitHubProjects();
});