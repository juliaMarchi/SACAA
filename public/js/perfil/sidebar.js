/* eslint-disable prettier/prettier */
function hideAllSections() {
  [...document.querySelectorAll('.editable > div')].forEach((section) => {
      section.classList.remove('hidden');
      section.classList.add('hidden');
  })
}

function toggleSection(sectionId) {
    hideAllSections();
    const section = document.querySelector(sectionId);
    section.classList.remove('hidden');
}

function toggleActiveButton(buttonElement) {
    const activeButton = document.querySelector('.sidebar button.bg-green-500.text-white');
    activeButton.classList.remove('bg-green-500');
    activeButton.classList.remove('text-white');

    buttonElement.classList.add('bg-green-500');
    buttonElement.classList.add('text-white');
}

function addEventListeners() {
    [...document.querySelectorAll('.sidebar button')].forEach(buttonElement => {
        buttonElement.addEventListener('click', (event => {
            toggleActiveButton(event.target);
            toggleSection(event.target.dataset.sectionTarget);
        }));
    });
}

addEventListeners();