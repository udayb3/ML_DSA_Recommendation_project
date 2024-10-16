document.getElementById('loginForm').addEventListener('submit', function(event) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Example: Basic validation
    if (username === "" || password === "") {
        event.preventDefault();
        errorMessage.textContent = "Please fill in both username and password.";
    } else if (username !== "user123" || password !== "pass123") {
        event.preventDefault();
        errorMessage.textContent = "Invalid username or password.";
    }
});
