
document.addEventListener('DOMContentLoaded', () => {
    // Cache elements for performance
    const steps = ['form', 'plan', 'add-ons', 'check-up', 'thank-you'];
    const stepButtons = document.querySelectorAll('#step-btn');
    const form = document.getElementById('form-fill');
    const nextButtons = document.querySelectorAll('#nxt-btn');
    const prevButtons = document.querySelectorAll('#prv-btn');
  
    let currentStep = 0;
  
    function showStep(stepIndex) {
      steps.forEach((step, index) => {
        document.getElementById(step).classList.toggle('hidden', index !== stepIndex);
      });
  
      // Update step buttons
      stepButtons.forEach((button, index) => {
        button.classList.toggle('bg-blue-900', index <= stepIndex);
        button.classList.toggle('border-light-blue', index <= stepIndex); // Make sure to keep the border
      });
    }
  
    function validateStep(stepIndex) {
      switch(stepIndex) {
        case 0:
          return validatePersonalInfo();
        case 1:
          return validatePlanSelection();
        case 2:
          return validateAddOns();
        case 3:
          return true; // No validation needed for the summary step
        default:
          return false;
      }
    }
  
    function validatePersonalInfo() {
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const error = document.getElementById('error');
      const emailError = document.getElementById('email-error');

      

  
      if (!name || !email || !phone) {
        error.style.display = 'block';
        return false;
      }
  
      if (!validateEmail(email)) {
        
        emailError.style.display = 'block';
        return false;
      }
  
      return true;
    }
  
    document.getElementById('pricingToggle').addEventListener('change', function() {
        const initPrice = document.getElementById('init-price');
        if (this.checked) {
            // Yearly pricing
            initPrice.textContent = '₦50,000';
        } else {
            // Monthly pricing
            initPrice.textContent = '₦5,000';
        }
    });
    function validatePlanSelection() {
      const selectedPlan = document.querySelector('input[name="plan"]:checked');
      if (!selectedPlan) {
        alert('Please select a plan.');
        return false;
      }
      return true;

      
    }
  
    function validateAddOns() {
      // Assuming no validation needed for add-ons; customize if required
      return true;
    }
  
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  
    function handleNextStep(event) {
      event.preventDefault(); // Prevent form submission
      if (validateStep(currentStep)) {
        currentStep++;
        showStep(currentStep);
      }
    }
  
    function handlePreviousStep(event) {
      event.preventDefault(); // Prevent form submission
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    }
  
    // Event Listeners
    nextButtons.forEach(button => {
      button.addEventListener('click', handleNextStep);
    });
  
    prevButtons.forEach(button => {
      button.addEventListener('click', handlePreviousStep);
    });
  
    // Initialize the form to show the first step
    showStep(currentStep);
  });
  