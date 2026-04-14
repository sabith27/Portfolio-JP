document.addEventListener("DOMContentLoaded", () => {
  // Sticky Navbar
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Fade-in Animation on Scroll using Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Optional: Stop observing once faded in for performance
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-section').forEach(section => {
    observer.observe(section);
  });

  // Smooth Scrolling for anchor links (if browser doesn't support CSS scroll-behavior natively)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      // Allow standalone resume link to work if it doesn't have an anchor
      if (this.getAttribute('href') === '#') return;

      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for sticky navbar
          behavior: 'smooth'
        });
      }
    });
  });

  // Back to Top Button
  const backToTopButton = document.getElementById("backToTop");

  if (backToTopButton) {
    const toggleBackToTop = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      if (scrollPosition > 300) {
        backToTopButton.classList.add("show");
      } else {
        backToTopButton.classList.remove("show");
      }
    };

    window.addEventListener("scroll", toggleBackToTop);
    toggleBackToTop(); // Check immediately on load

    backToTopButton.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- EmailJS Contact Form Integration ---
  if (typeof emailjs !== "undefined") {
    emailjs.init({
      publicKey: "woMTvo7GwVTseYHVg", // <-- 1. Replace with your actual EmailJS Public Key
    });
  }

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.style.opacity = "0.7";
      submitBtn.disabled = true;

      // console.log("Sending email..."); // useful for debugging

      // <-- 2. Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' 
      emailjs.sendForm("service_a5w0jcz", "template_c5cqei5", this)
        .then(() => {
          // Success State
          submitBtn.textContent = "Message Sent Successfully!";
          submitBtn.style.backgroundColor = "#2e7d32"; // Success green
          submitBtn.style.borderColor = "#2e7d32";
          submitBtn.style.opacity = "1";
          contactForm.reset();

          // Reset button after 4 seconds
          setTimeout(() => {
            submitBtn.textContent = originalBtnText;
            submitBtn.style.backgroundColor = "";
            submitBtn.style.borderColor = "";
            submitBtn.disabled = false;
          }, 4000);
        },
          (error) => {
            // Error State
            console.error("FAILED...", error);
            submitBtn.textContent = "Failed to Send Model";
            submitBtn.style.backgroundColor = "var(--accent-red)";
            submitBtn.style.borderColor = "var(--accent-red)";
            submitBtn.style.opacity = "1";

            setTimeout(() => {
              submitBtn.textContent = originalBtnText;
              submitBtn.style.backgroundColor = "";
              submitBtn.style.borderColor = "";
              submitBtn.disabled = false;
            }, 4000);
          }
        );
    });
  }
});
