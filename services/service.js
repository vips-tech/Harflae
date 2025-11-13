document.addEventListener('DOMContentLoaded', () => {
    // Select all elements with the class 'book-kit'
    const bookButtons = document.querySelectorAll('.book-kit');

    // Attach an event listener to each button
    bookButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Prevent the default button action (if it were in a form)
            event.preventDefault();

            // Find the parent kit-card element
            const kitCard = event.target.closest('.kit-card');
            
            // Get the name of the kit from the data-kit attribute
            const kitName = kitCard ? kitCard.dataset.kit : 'a Design Package';

            // Show a simple success alert
            alert(`🎉 Thank you for your interest in the ${kitName}! An architect will contact you shortly to confirm your booking and next steps.`);

            // Optional: You could redirect the user here
            // window.location.href = '/checkout.html?kit=' + kitName;
        });
    });
});