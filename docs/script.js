document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".nav");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            nav.style.transform = "translateY(-100%)";
        } else {
            nav.style.transform = "translateY(0)";
        }
        
        lastScrollY = currentScrollY;
    });

    nav.style.transition = "transform 0.3s ease-in-out";

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    const apiNavLinks = document.querySelectorAll(".api-nav-link");
    const apiSections = document.querySelectorAll(".api-section");
    
    if (apiNavLinks.length > 0 && apiSections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: "-100px 0px -66%",
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");
                    apiNavLinks.forEach(link => {
                        link.classList.remove("active");
                        if (link.getAttribute("href") === `#${id}`) {
                            link.classList.add("active");
                        }
                    });
                }
            });
        }, observerOptions);

        apiSections.forEach(section => observer.observe(section));
    }
});
