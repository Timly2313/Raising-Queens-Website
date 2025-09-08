const modal = document.getElementById("donationModal");
const closeBtn = document.querySelector(".close");
const causeText = document.getElementById("selectedCause");
const donationTypeInput = document.getElementById("donationType");
const volunteeringSelect = document.getElementById("volunteering");
const availabilityField = document.getElementById("availabilityField");

// Open modal when Donate Now button clicked
document.querySelectorAll("#donate-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const cause = btn.getAttribute("data-cause");
    causeText.textContent = `Register your donation for: ${cause}`;
    donationTypeInput.value = cause;
    modal.style.display = "flex";
  });
});

// Close modal
closeBtn.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Show availability field if volunteering = yes
volunteeringSelect.addEventListener("change", (e) => {
  availabilityField.style.display = e.target.value === "yes" ? "block" : "none";
});

// Handle form submission
document.getElementById("donationForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you for registering your donation!");
  modal.style.display = "none";
  e.target.reset();
});

document.getElementById("donate-money-btn").addEventListener("click", () => {
    const amount = document.getElementById("custom-amount").value;
    if (!amount || amount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    // Redirect to your Stripe Payment Link
    window.location.href = "https://donate.stripe.com/test_12345"; 
  });