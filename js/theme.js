console.log('theme.js loaded');

const colorOptions = document.querySelectorAll('.color-option');
console.log('colorOptions:', colorOptions);

colorOptions.forEach(option => {
    console.log('Adding event listener to:', option);
    option.addEventListener('click', function() {
        console.log('Button clicked:', this); // Debugging line
        const color = this.getAttribute('data-color');
        console.log('Changing background to:', color); // Debugging line
        document.body.style.background = color;
    });
});

const menuButton = document.querySelector('.menu-button');
const menuContent = document.querySelector('.menu-content');

menuButton.addEventListener('click', function() {
    if (menuContent.style.display === 'block') {
        menuContent.style.display = 'none';
    } else {
        menuContent.style.display = 'block';
    }
});

// Optional: Close the menu if clicked outside of it
document.addEventListener('click', function(event) {
    if (!menuButton.contains(event.target) && !menuContent.contains(event.target)) {
        menuContent.style.display = 'none';
    }
});
