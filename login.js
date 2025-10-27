document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault(); 

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMessage = document.getElementById("error-message");

  // Fetch from users.json directly
  fetch("users.json")
    .then(response => response.json())
    .then(data => {
      const user = data.users.find(u => u.email === email && u.password === password);
      if (user) {
        // ✅ Save the logged-in user's details
        localStorage.setItem("loggedInUser", user.email);
        localStorage.setItem("loggedInUserId", user.id);
        localStorage.setItem("loggedInUserName", user.name || email.split('@')[0]);
        localStorage.setItem("isLoggedIn", "true");

        // Redirect to event page
        window.location.href = "event.html";
      } else {
        errorMessage.textContent = "Invalid email or password!";
      }
    })
    .catch(err => {
      console.error("Error loading user data:", err);
      errorMessage.textContent = "Error loading user data. Make sure users.json is accessible.";
    });
});
