document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault(); 

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMessage = document.getElementById("error-message");

  fetch("http://localhost:3000/users")
    .then(response => response.json())
    .then(users => {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        // ✅ Save the logged-in user's email for later use (e.g. registration)
        localStorage.setItem("loggedInUser", user.email);
        localStorage.setItem("loggedInUserId", user.id);

        // Redirect to event page
        window.location.href = "event.html";
      } else {
        errorMessage.textContent = "Invalid email or password!";
      }
    })
    .catch(err => {
      console.error("Error loading user data:", err);
      errorMessage.textContent = "Error loading user data.";
    });
});
