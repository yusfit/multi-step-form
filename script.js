
document.addEventListener('DOMContentLoaded', () => {
    // Cache elements for performance
    const steps = ['form', 'plan', 'add-ons', 'check-up', 'thank-you'];
    const stepButtons = document.querySelectorAll('#step-btn');
    // const form = document.getElementById('form-fill');
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

    // validate plan selection
    
    let selectedPlan = 'Arcade';
    let selectedAddons = []

    function validatePlanSelection() {
      const selectedPlan = document.querySelector('#plan-choose.border-blue-700');
      const planError = document.getElementById('plan-error')
      if (!selectedPlan) {
        planError.style.display = 'block';
        return false;
      }
      return true;
    }

    const planSelect = document.querySelectorAll('#plan-choose');

    planSelect.forEach(button => {
      button.addEventListener('click', () => {
        selectedPlan = button.querySelector('#plan-name').textContent;
        planSelect.forEach(btn => btn.classList.remove('border-blue-700')
      )
        button.classList.add('border-blue-700')
      })
    })


    // validate addons
    const addonsCheckboxes = document.querySelectorAll('#cont-addons input[type="checkbox"]');
  
    function validateAddOns() {
      
      return true;
    }

    addonsCheckboxes.forEach((checkbox, idx) => {
      checkbox.addEventListener("change", (e) => {
        if (e.target.checked) {
          selectedAddons.push({
            name: document.querySelectorAll('#addon-content #addon-name')[idx].textContent,
            price: document.querySelectorAll('#addon-price')[idx].textContent
          })
        } else{
          selectedAddons = selectedAddons.filter(addon => addon.name !== document.querySelectorAll('#addon-content #addon-name')[idx].textContent)
        }
      })
    })
  
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }

    const summaryTitle = document.querySelector('#summary-container #summary-title');
    const summaryPrice = document.querySelector('#summary-container #summary-price');
    const summaryAddons = document.querySelector('#summary-addons');
    const totalSum = document.querySelector('total-sum');

    // update summary

    const updateSummary = () => {
      summaryTitle.textContent = selectedPlan;
    }
  
    function handleNextStep(event) {
      event.preventDefault();
      if (validateStep(currentStep)) {
        currentStep++;
        showStep(currentStep);
      }

      if (currentStep === 4) {
        updateSummary();
      }
    }
  
    function handlePreviousStep(event) {
      event.preventDefault();
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    }
  
    // Event Listeners
    nextButtons.forEach(button => {
      button.addEventListener('click', handleNextStep);
      updateSummary();
    });
  
    prevButtons.forEach(button => {
      button.addEventListener('click', handlePreviousStep);
    });
  
    // Initialize the form to show the first step
    showStep(currentStep);
  });
  