/* eslint-disable prettier/prettier */

(function() {
    function toggleUserMenu(selector = "") {
        const menuElement = document.querySelector(selector);
        if(!menuElement) return;

        menuElement.classList.toggle('hidden');
    }

    document.querySelector('#user-menu').addEventListener('click', () => {
        toggleUserMenu('div[role="menu"][aria-labelledby="user-menu"]');
    });
    document.querySelector('button[aria-controls="mobile-menu"]').addEventListener('click', () => {
        toggleUserMenu('#mobile-menu');
    });
    document.querySelector('#buscar-menu').addEventListener('click', () => {
        toggleUserMenu('div[role="menu"][aria-labelledby="buscar-menu"]');
    });
})();
