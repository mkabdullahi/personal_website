document.addEventListener('DOMContentLoaded', function () {
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

    let autoSlideInterval;

    function startAutoSlide() {
        autoSlideInterval = setInterval(showNextImage, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            showPrevImage();
            resetAutoSlide();
        });
        nextBtn.addEventListener('click', () => {
            showNextImage();
            resetAutoSlide();
        });
    }

    // Auto-advance every 5 seconds
    startAutoSlide();
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

    // Load Recommendations Logic
    const recommendations = [
        {
            text: `I had the privilege of working with Muhammad during his six-month, 50% occupation Generative AI Fellowship focusing on our 'missing link' problem.
Muhammad demonstrated a strong commitment to learning a sophisticated and new environment, including Kubeflow, Kubernetes, and specialized LLM prompting techniques in Python. This rapid adaptation to a complex technical stack was a significant accomplishment during the fellowship.
They successfully executed the core exploration goal of the project, investigating the viability of LLM usage for our specific challenge. Muhammad also showed initiative by attempting to optimize long experiment runtimes through parallelization and batch size adjustments.
While the scope of the project was ultimately restricted by external factors (long runtimes), Muhammad is a diligent worker who delivered on the foundational goals. They are well-positioned for roles requiring quick ramp-up time in new technical domains and practical experience with structured LLM exploration.`,
            author: "Sven-Martin Liebig",
            role: "Senior Software Developer at SAP SE | Expert for Cloud and Machine",
            linkedin: "https://www.linkedin.com/in/sven-martin-liebig/"
        },
        {
            text: "I was lucky to be Muhammad’s mentor and see him grow. He may be quiet, but he connects with people in a kind and real way. He listens, learns fast, and always wants to do better. Muhammad works hard and never gives up, no matter how tough things get. He takes feedback with a smile and turns it into action. He is smart, humble, and always curious to learn more. I truly believe he will be a great leader very soon, the one who leads with heart and care. I wish him great luck and best wishes.",
            author: "Harit Bahsin",
            role: "Senior Product Manager at SAP",
            linkedin: "https://www.linkedin.com/in/bhasinharit948/"
        },
        {
            text: "It is my pleasure to recommend Muhammad Kabir, whom I supervised directly. He is a dedicated and highly competent professional, consistently demonstrating a commitment to delivering high-quality results within deadlines. On a personal level, he is a person of great character and a dedicated family man. He has my strongest recommendation.",
            author: "Andres Santini Filho",
            role: "Coordinator at QualityWare Ltda",
            linkedin: "https://www.linkedin.com/in/andresantini00/"
        },
        {
            text: "Tive o prazer de trabalhar ao lado de Muhammad em vários projetos e posso dizer que ele é um profissional confiável ​​e colaborativo, com foco nas habilidades técnicas e atenção aos detalhes, além de uma ótima atitude que torna o trabalho em conjunto fácil e agradável.",
            author: "João Carlos Essenfedler Filho",
            role: "Senior Analyst",
            linkedin: "https://www.linkedin.com/in/jcefilho/"
        }
    ];

    const recGrid = document.getElementById('recommendations-list');
    if (recGrid) {
        recGrid.innerHTML = '';
        recommendations.forEach(rec => {
            const card = document.createElement('div');
            card.className = 'recommendation-card';

            // Build the LinkedIn link HTML only if the URL is provided
            const linkedinHtml = rec.linkedin
                ? `<a href="${rec.linkedin}" target="_blank" class="rec-linkedin" aria-label="LinkedIn Profile"><i class="fab fa-linkedin"></i></a>`
                : '';

            card.innerHTML = `
                <i class="fas fa-quote-left rec-quote-icon"></i>
                <p class="rec-text">"${rec.text}"</p>
                <div class="rec-author">
                    <div>
                        <h4>${rec.author} ${linkedinHtml}</h4>
                        <p>${rec.role}</p>
                    </div>
                </div>
            `;
            recGrid.appendChild(card);
        });
    }

    // Contact Form Logic
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = this.querySelector('.submit-btn');
            const feedback = document.getElementById('form-feedback');

            // 1. Get the form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Custom Validation
            if (!name.trim()) {
                feedback.textContent = 'Please enter your name.';
                feedback.className = 'error';
                return;
            }
            if (!email.trim() || !/\S+@\S+\.\S/.test(email)) {
                feedback.textContent = 'Please enter a valid email address.';
                feedback.className = 'error';
                return;
            }
            if (!message.trim()) {
                feedback.textContent = 'Please enter your message.';
                feedback.className = 'error';
                return;
            }

            // 2. Visual feedback (loading)
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            feedback.textContent = '';

            try {
                // 3. Send to Formspree (REPLACE 'YOUR_FORM_ID' WITH ACTUAL ID)
                // You need to register at formspree.io and get a form ID.
                // It will look like: https://formspree.io/f/xvgzqzor (example)
                const response = await fetch("https://formspree.io/f/xjknevoj", {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success
                    feedback.textContent = 'Message sent successfully!';
                    feedback.className = 'success';
                    contactForm.reset();
                } else {
                    // Error from service
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        feedback.textContent = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        feedback.textContent = 'Oops! There was a problem submitting your form';
                    }
                    feedback.className = 'error';
                }
            } catch (error) {
                // Network error
                feedback.textContent = 'Oops! There was a problem submitting your form';
                feedback.className = 'error';
            } finally {
                // Reset button
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;

                // Clear success message after 5 seconds
                if (feedback.className === 'success') {
                    setTimeout(() => {
                        feedback.textContent = '';
                        feedback.className = '';
                    }, 5000);
                }
            }
        });
    }
});