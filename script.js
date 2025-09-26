document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO MENU HAMBÚRGUER ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.querySelector('#primary-navigation');

    mobileNavToggle.addEventListener('click', () => {
        const isVisible = primaryNav.getAttribute('data-visible') === 'true';
        
        if (isVisible) {
            primaryNav.setAttribute('data-visible', false);
            mobileNavToggle.setAttribute('aria-expanded', false);
        } else {
            primaryNav.setAttribute('data-visible', true);
            mobileNavToggle.setAttribute('aria-expanded', true);
        }
    });

    // Fecha o menu ao clicar em um link
    const navLinksInMobile = primaryNav.querySelectorAll('a');
    navLinksInMobile.forEach(link => {
        link.addEventListener('click', () => {
            primaryNav.setAttribute('data-visible', false);
            mobileNavToggle.setAttribute('aria-expanded', false);
        });
    });

    // Scroll-spy para a navegação
    const navLinks = document.querySelectorAll('.navbar nav a');
    const sections = document.querySelectorAll('main > section'); 

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const targetId = entry.target.id;
                const activeLink = document.querySelector(`.navbar nav a[href="#${targetId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, { rootMargin: '-30% 0px -70% 0px' }); 

    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Garante que o link "home" comece ativo
    const homeLink = document.querySelector('.navbar nav a[href="#home"]');
    if (window.scrollY < 200 && homeLink) { // Adicionado uma checagem para o caso de a página carregar no meio
        navLinks.forEach(link => link.classList.remove('active'));
        homeLink.classList.add('active');
    }

});