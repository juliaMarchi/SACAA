/* eslint-disable prettier/prettier */
/* eslint-disable one-var */
/* eslint-disable eqeqeq */

let currentTab = 1;
showTab(currentTab);

function showTab(step = null) {
  if(step === null) return;
  const firstStepNumber = document.querySelector('.tab:first-child').dataset.step;
  const lastStepNumber = document.querySelector('.tab:last-child').dataset.step;
  const currentTabElement = document.querySelector('.tab:not(.hidden_tab)');
  const nextTabElement = document.querySelector(`.tab[data-step="${step}"]`);

  currentTabElement.classList.remove('hidden_tab');
  currentTabElement.classList.add('hidden_tab');
  nextTabElement.classList.remove('hidden_tab');

  if (step == firstStepNumber) {
    document.getElementById("prevBtn").classList.add('hidden_tab');
  } else {
    document.getElementById("prevBtn").classList.remove('hidden_tab');
  }
  if (step == lastStepNumber) {
    const nextButton = document.getElementById("nextBtn");
    const buttonLabel = nextButton.dataset.submitLabel || 'Criar Conta';
    nextButton.innerHTML = buttonLabel;
  } else {
    document.getElementById("nextBtn").innerHTML = "Próximo";
  }

  fixStepIndicator(step);
}

function next() {
  const lastStepNumber = document.querySelector('.tab:last-child').dataset.step;  
  const currentStep = document.querySelector('.tab:not(.hidden_tab)').dataset.step;

  if(!validateForm()) return false;

  const nextStep = parseInt(currentStep) + 1;
  if (nextStep > lastStepNumber) {
    document.querySelector('#js-form-pessoa').submit();
    return false;
  }
  currentTab = nextStep;

  showTab(currentTab);
}

function previous() {
  const firstStepNumber = document.querySelector('.tab:first-child').dataset.step;
  const currentStep = document.querySelector('.tab:not(.hidden_tab)').dataset.step;

  const prevStep = parseInt(currentStep) - 1;
  if (currentStep < firstStepNumber) return false;
  
  currentTab = prevStep;

  showTab(currentTab);
}

function validateForm() {
  let valid = true;
  const currentTabElement = document.querySelector(`.tab[data-step="${currentTab}"]`);
  const tabInputs = currentTabElement.querySelectorAll(".tab *:not([data-radio-input-group].hidden_tab) input");

  tabInputs.forEach(input => {
    if(input.value === '') {
      input.classList.remove('invalid');
      input.classList.add('invalid');

      valid = false;
    }
  });

  if (valid) {
    const currentStepIndicator = document.querySelector(`.step[data-step="${currentTab}"]`);
    currentStepIndicator.classList.remove('finish');
    currentStepIndicator.classList.add('finish');
  }

  return valid;
}

function fixStepIndicator(step) {
  const currentStepIndicator = document.querySelector(`.step[data-step="${currentTab}"]`);
  const stepIndicators = Array.from(document.querySelectorAll('.step'));

  stepIndicators.forEach(stepIndicator => {
    stepIndicator.classList.remove('active');
  });
  currentStepIndicator.classList.add('active');
}

document.querySelector('#prevBtn').addEventListener('click', () => {
  previous();
});

document.querySelector('#nextBtn').addEventListener('click', () => {
  next();
});

Array.from(
  document.querySelectorAll('input[type="radio"][name="ong"]')
).forEach(radioButton => {
  radioButton.addEventListener('change', event => {
    const radioGroup = event.target.dataset.radioGroup;
    const formGroups = document.querySelectorAll(`*[data-radio-input-group]:not([data-radio-input-group~="${radioGroup}"])`);
    
    Array.from(document.querySelectorAll('.tab *[data-radio-input-group].hidden_tab')).forEach(element => {
      element.classList.remove('hidden_tab');
    });

    Array.from(formGroups).forEach(formGroup => {
      const inputsToHide = formGroup.querySelectorAll('input');
      Array.from(inputsToHide).forEach(input => {
        input.value = "";
      });
      formGroup.classList.add('hidden_tab')
    });
  });
});