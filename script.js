document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add scroll animation for elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });

    // Observe all sections
    document.querySelectorAll('section').forEach((section) => {
        observer.observe(section);
    });

    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Function to toggle theme
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
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
        
        document.documentElement.setAttribute('data-theme', currentTheme);
        const icon = themeToggle.querySelector('i');
        icon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Event listeners
    themeToggle.addEventListener('click', toggleTheme);
    prefersDarkScheme.addListener((e) => {
        if (!localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
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