'use strict';

(function() {

    let themeLamp = document.getElementById('js-theme-lamp');
    let body = document.body;
    themeLamp.addEventListener('click', toggleTheme);

    initTheme();

    function toggleTheme() {
        let currentTheme = '';

        if( body.classList.contains('light-theme') ) {
            body.classList.replace('light-theme', 'dark-theme');
            themeLamp.classList.replace('header__lamp_off', 'header__lamp_on');
            currentTheme = 'dark-theme';
        } else {
            body.classList.replace('dark-theme', 'light-theme');
            themeLamp.classList.replace('header__lamp_on', 'header__lamp_off');
            currentTheme = 'light-theme';
        }

        setLocalStorageTheme(currentTheme);
    }

    function initTheme() {
        let currentTheme = getLocalStorageTheme();
        body.classList.add(currentTheme);
        if(currentTheme == 'light-theme') {
            themeLamp.classList.add('header__lamp_off')
        } else {
            themeLamp.classList.add('header__lamp_on')
        }
        setLocalStorageTheme(currentTheme);
    }

    function getLocalStorageTheme() {
        let theme = localStorage.getItem('theme');
        if(!theme) theme = 'light-theme';
        return theme;
    }

    function setLocalStorageTheme(theme) {
        localStorage.setItem('theme', theme);
    }

})();