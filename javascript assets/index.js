const burger = document.querySelector(".burgr-icon");
const nav = document.querySelector(".nav-links");
const hero = document.querySelector(".hero-section"); // optional hero section

// Get all dropdown parents
const dropdowns = document.querySelectorAll('.about-li');

// Burger click → nav toggle
burger.addEventListener("click", (e) => {
  e.stopPropagation();
  nav.classList.toggle("active");
});

// Click outside nav → hide nav and all dropdowns
document.addEventListener("click", (e) => {
  if(nav.classList.contains("active")){
    if(!nav.contains(e.target) && !burger.contains(e.target)){
      nav.classList.remove("active");
    }
  }

  dropdowns.forEach(drop => {
    if(drop.classList.contains("active")){
      if(!drop.contains(e.target)){
        drop.classList.remove("active");
      }
    }
  });
});

// Hero scroll/touch → hide nav (optional)
if(hero){
  hero.addEventListener("scroll", () => {
    if(nav.classList.contains("active")){
      nav.classList.remove("active");
    }
  });
  hero.addEventListener("touchstart", () => {
    if(nav.classList.contains("active")){
      nav.classList.remove("active");
    }
  });
}

// Dropdown click toggle (mobile)
dropdowns.forEach(drop => {
  const link = drop.querySelector('a');
  link.addEventListener("click", (e) => {
    if(window.innerWidth <= 1100){
      e.preventDefault(); // link navigate na kare
      // Close other dropdowns
      dropdowns.forEach(d => {
        if(d !== drop) d.classList.remove("active");
      });
      // Toggle clicked dropdown
      drop.classList.toggle("active");
    }
  });
});

const container = document.querySelector('.left-rigt');

const slides = Array.from(container.children);
slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    container.appendChild(clone);
});

let speed = 0.6;
let position = 0;

function animate() {
    position -= speed;
    if (Math.abs(position) >= container.scrollWidth / 2) {
        position = 0;
    }
    container.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
}

animate();



// faqs container open and close function 
document.querySelectorAll(".ans-ques h4").forEach(question => {
  question.addEventListener("click", () => {

    const parent = question.parentElement;

    // close other FAQs
    document.querySelectorAll(".ans-ques").forEach(item => {
      if (item !== parent) {
        item.classList.remove("active");
      }
    });

    parent.classList.toggle("active");
  });
});




// Function to count up a number start
const ratingNumbers = document.querySelectorAll('.rtg-num');
const ratingSection = document.querySelector('.rating-container');

// Function to count up a number
function countUp(num) {
    const target = parseInt(num.textContent.replace('+',''));
    let count = 0;
    const increment = Math.ceil(target / 100); // adjust speed
    const speed = 20;

    function updateNumber() {
        count += increment;
        if (count > target) count = target;
        num.textContent = count + '+';
        if (count < target) {
            setTimeout(updateNumber, speed);
        }
    }

    updateNumber();
}

// Use IntersectionObserver to detect when section is visible
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            ratingNumbers.forEach(num => countUp(num));
        }
    });
}, { threshold: 0.5 }); // 50% of the section should be visible

observer.observe(ratingSection);



// reviewes container funciton start here
  const testimonialContainer = document.querySelector(".client-reviews-container");
  const testimonialLeftBtn = document.querySelector(".tstm-left");
  const testimonialRightBtn = document.querySelector(".tstm-right");

  let testimonialBoxes = document.querySelectorAll(".review-box");
  const testimonialGap = 10;
  const testimonialBoxWidth =
    testimonialBoxes[0].offsetWidth + testimonialGap;

  let isAnimating = false;

  // Right Button / Auto
  function moveNextTestimonial() {
    if (isAnimating) return;
    isAnimating = true;

    testimonialContainer.scrollBy({
      left: testimonialBoxWidth,
      behavior: "smooth",
    });

    setTimeout(() => {
      const firstItem = testimonialContainer.firstElementChild;
      testimonialContainer.appendChild(firstItem);
      testimonialContainer.scrollLeft -= testimonialBoxWidth;
      isAnimating = false;
    }, 500);
  }
  //  PREVIOUS Left Button
  function movePrevTestimonial() {
    if (isAnimating) return;
    isAnimating = true;

    const lastItem = testimonialContainer.lastElementChild;
    testimonialContainer.prepend(lastItem);
    testimonialContainer.scrollLeft += testimonialBoxWidth;

    testimonialContainer.scrollBy({
      left: -testimonialBoxWidth,
      behavior: "smooth",
    });

    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }

  // auto slide 
  let testimonialInterval = setInterval(moveNextTestimonial, 2000);

  // button function 
  testimonialRightBtn.addEventListener("click", () => {
    clearInterval(testimonialInterval);
    moveNextTestimonial();
    testimonialInterval = setInterval(moveNextTestimonial, 2000);
  });

  testimonialLeftBtn.addEventListener("click", () => {
    clearInterval(testimonialInterval);
    movePrevTestimonial();
    testimonialInterval = setInterval(moveNextTestimonial, 2000);
  });


// function of scroll down to pricing container 
  document.addEventListener("DOMContentLoaded", function () {
    const viewPlanBtn = document.querySelector(".view-plan-btn");
    const pricingSection = document.querySelector(".pricing-container");

    if (viewPlanBtn && pricingSection) {
        viewPlanBtn.addEventListener("click", function () {
            pricingSection.scrollIntoView({
                behavior: "smooth"
            });
        });
    }
});



document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".logo-container");

  // wrap existing items in track
  const track = document.createElement("div");
  track.className = "logo-container-track";

  const items = Array.from(container.children);

  items.forEach(item => track.appendChild(item));
  items.forEach(item => track.appendChild(item.cloneNode(true)));

  container.appendChild(track);
});

