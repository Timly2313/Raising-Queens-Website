const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    mobileNav.style.display = mobileNav.style.display === "flex" ? "none" : "flex";
    menuToggle.innerHTML = mobileNav.style.display === "flex"
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });
}

// ---------- progress bar
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    progressBar.style.width = scrollPercent + '%';
  }
});

// ---------- Testimonials carousel
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonials = document.querySelectorAll('.testimonial-box');
const prevBtn = document.querySelector('.prev-testimonial');
const nextBtn = document.querySelector('.next-testimonial');

if (testimonialTrack && testimonials.length > 0) {
  let index = 0;
  const total = testimonials.length;
  const intervalTime = 5000; // 5 seconds

  function updateCarousel() {
    testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
  }

  // Auto-scroll
  let autoScroll = setInterval(() => {
    index = (index + 1) % total;
    updateCarousel();
  }, intervalTime);

  // Arrow controls
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      index = (index + 1) % total;
      updateCarousel();
      resetAutoScroll();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      index = (index - 1 + total) % total;
      updateCarousel();
      resetAutoScroll();
    });
  }

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

  // Add click event for dots
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      index = i;
      updateCarousel();
      resetAutoScroll();
    });
  });
}

//continuous sponsor scroll
const track = document.querySelector('.carousel-track');
if (track) {
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

  animate();
}

// =============== EVENTS PAGE FUNCTIONALITY ===============

// Event Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const eventCards = document.querySelectorAll('.event-card');

  if (filterButtons.length > 0 && eventCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        eventCards.forEach(card => {
          card.classList.remove('visible', 'hidden');
          
          if (filterValue === 'all') {
            card.classList.add('visible');
          } else {
            if (card.classList.contains(filterValue)) {
              card.classList.add('visible');
            } else {
              card.classList.add('hidden');
            }
          }
        });
      });
    });

    // Initialize all cards as visible
    eventCards.forEach(card => {
      card.classList.add('visible');
    });
  }

  // Event Calendar Functionality
  const calendarGrid = document.getElementById('calendarGrid');
  const currentMonthElement = document.getElementById('currentMonth');
  const prevMonthBtn = document.getElementById('prevMonth');
  const nextMonthBtn = document.getElementById('nextMonth');

  if (calendarGrid && currentMonthElement) {
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Sample event dates (you would typically fetch this from a database)
    const eventDates = [
      { date: '2025-02-22', title: 'Financial Literacy Workshop' },
      { date: '2025-02-28', title: 'Networking Brunch' },
      { date: '2025-03-08', title: 'Mental Health Workshop' },
      { date: '2025-03-15', title: 'Leadership Summit' }
    ];

    function generateCalendar(month, year) {
      calendarGrid.innerHTML = '';
      currentMonthElement.textContent = `${months[month]} ${year}`;

      // Add day headers
      const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      dayHeaders.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.textContent = day;
        dayHeader.style.fontWeight = 'bold';
        dayHeader.style.color = '#c6a291';
        dayHeader.style.padding = '10px';
        calendarGrid.appendChild(dayHeader);
      });

      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      // Add empty cells for days before the first day of the month
      for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('calendar-day');
        calendarGrid.appendChild(emptyDay);
      }

      // Add days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.textContent = day;

        // Check if this day has an event
        const currentDateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const hasEvent = eventDates.some(event => event.date === currentDateString);
        
        if (hasEvent) {
          dayElement.classList.add('has-event');
          const eventForDay = eventDates.find(event => event.date === currentDateString);
          dayElement.title = eventForDay.title;
        }

        calendarGrid.appendChild(dayElement);
      }
    }

    // Event listeners for navigation buttons
    if (prevMonthBtn) {
      prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
          currentMonth = 11;
          currentYear--;
        }
        generateCalendar(currentMonth, currentYear);
      });
    }

    if (nextMonthBtn) {
      nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
          currentMonth = 0;
          currentYear++;
        }
        generateCalendar(currentMonth, currentYear);
      });
    }

    // Generate initial calendar
    generateCalendar(currentMonth, currentYear);
  }

  // Newsletter Form Functionality
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = this.querySelector('input[type="email"]').value;
      
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        // Here you would typically send the email to your server
        alert('Thank you for subscribing! You\'ll receive updates about our upcoming events.');
        this.querySelector('input[type="email"]').value = '';
      } else {
        alert('Please enter a valid email address.');
      }
    });
  }

  // Event Registration Functionality
  const registerButtons = document.querySelectorAll('.register-btn, .btn-primary');
  registerButtons.forEach(button => {
    if (button.textContent.includes('Register')) {
      button.addEventListener('click', function() {
        // Here you would typically redirect to a registration form or open a modal
        alert('Registration functionality would be implemented here. This would typically redirect to a detailed registration form.');
      });
    }
  });

  // Learn More Functionality
  const learnMoreButtons = document.querySelectorAll('.btn-secondary');
  learnMoreButtons.forEach(button => {
    if (button.textContent.includes('Learn More')) {
      button.addEventListener('click', function() {
        // Here you would typically show more details or redirect to an event details page
        alert('This would typically show more details about the event or redirect to a dedicated event page.');
      });
    }
  });

  // View Highlights Functionality for Past Events
  const highlightButtons = document.querySelectorAll('.btn-secondary');
  highlightButtons.forEach(button => {
    if (button.textContent.includes('View Highlights')) {
      button.addEventListener('click', function() {
        // Here you would typically show event photos, testimonials, or achievements
        alert('This would typically display photo galleries, testimonials, and highlights from the past event.');
      });
    }
  });

  // Smooth scrolling for any anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add animation on scroll for event cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all event cards for animation
  eventCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });

  // Featured event animation
  const featuredEvent = document.querySelector('.featured-event');
  if (featuredEvent) {
    observer.observe(featuredEvent);
  }

  // Add loading states for buttons (optional enhancement)
  function addLoadingState(button, originalText, loadingText = 'Loading...') {
    button.textContent = loadingText;
    button.disabled = true;
    
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 2000);
  }

  // Enhanced event card interactions
  eventCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Mobile-friendly touch interactions
  if ('ontouchstart' in window) {
    eventCards.forEach(card => {
      card.addEventListener('touchstart', function() {
        this.classList.add('touch-active');
      });

      card.addEventListener('touchend', function() {
        setTimeout(() => {
          this.classList.remove('touch-active');
        }, 150);
      });
    });
  }

  // Search functionality (if you want to add a search feature later)
  function filterEventsBySearch(searchTerm) {
    eventCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const description = card.querySelector('p').textContent.toLowerCase();
      const category = card.querySelector('.event-category').textContent.toLowerCase();
      
      const matchesSearch = title.includes(searchTerm.toLowerCase()) || 
                           description.includes(searchTerm.toLowerCase()) ||
                           category.includes(searchTerm.toLowerCase());
      
      if (matchesSearch) {
        card.style.display = 'block';
        card.classList.add('visible');
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
        card.classList.remove('visible');
      }
    });
  }

  // Expose search function globally if needed
  window.filterEventsBySearch = filterEventsBySearch;
});

// Additional utility functions for events page
function formatEventDate(dateString) {
  const date = new Date(dateString);
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  };
  return date.toLocaleDateString('en-US', options);
}

function calculateDaysUntilEvent(eventDate) {
  const today = new Date();
  const event = new Date(eventDate);
  const diffTime = event - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Export functions if using modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    formatEventDate,
    calculateDaysUntilEvent,
    filterEventsBySearch: window.filterEventsBySearch
  };
}