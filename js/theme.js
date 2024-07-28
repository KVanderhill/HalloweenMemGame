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
