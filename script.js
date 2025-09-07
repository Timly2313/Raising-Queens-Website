const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

menuToggle.addEventListener("click", () => {
  mobileNav.style.display = mobileNav.style.display === "flex" ? "none" : "flex";
  menuToggle.innerHTML = mobileNav.style.display === "flex"
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});


    // ---------- progress bar
  window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  document.getElementById('progressBar').style.width = scrollPercent + '%';
});

    // ---------- Testimonials carousel
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonials = document.querySelectorAll('.testimonial-box');
const prevBtn = document.querySelector('.prev-testimonial');
const nextBtn = document.querySelector('.next-testimonial');

let index = 0;
const total = testimonials.length;
const intervalTime = 5000; // 5 seconds

function updateCarousel() {
  testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
}

// Auto-scroll
let autoScroll = setInterval(() => {
  index = (index + 1) % total;
  updateCarousel();
}, intervalTime);

// Arrow controls
nextBtn.addEventListener('click', () => {
  index = (index + 1) % total;
  updateCarousel();
  resetAutoScroll();
});

prevBtn.addEventListener('click', () => {
  index = (index - 1 + total) % total;
  updateCarousel();
  resetAutoScroll();
});

function resetAutoScroll() {
  clearInterval(autoScroll);
  autoScroll = setInterval(() => {
    index = (index + 1) % total;
    updateCarousel();
  }, intervalTime);
}
//Nav Dots
const dots = document.querySelectorAll('.dot');

function updateDots() {
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// Update dots whenever carousel moves
function updateCarousel() {
  testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
}

// Add click event for dots
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    index = i;
    updateCarousel();
    resetAutoScroll();
  });
});

    //contiunous sponsor scroll
const track = document.querySelector('.carousel-track');
let speed = 0.5;
let position = 0;

track.innerHTML += track.innerHTML;

function animate() {
  position -= speed;
  if (position <= -track.scrollWidth / 2) {
    position = 0;
  }
  track.style.transform = `translateX(${position}px)`;
  requestAnimationFrame(animate);
}

animate()