// ================================
// Christ’s Salvation Church JS
// Simple interactions + UX polish
// ================================

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});


// Fade-in on scroll (simple reveal effect)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll(".welcome-body, .visit-info, .hero-left").forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(20px)";
  el.style.transition = "all 0.8s ease";
  observer.observe(el);
});


// Newsletter simple validation
const newsletterBtn = document.querySelector(".newsletter button");
const newsletterInput = document.querySelector(".newsletter input");

if (newsletterBtn && newsletterInput) {
  newsletterBtn.addEventListener("click", () => {
    const email = newsletterInput.value.trim();

    if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email address.");
      return;
    }

    alert("Thank you for subscribing to Christ’s Salvation Church updates!");
    newsletterInput.value = "";
  });
}