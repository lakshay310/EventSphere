const buttons = document.querySelectorAll(".learn-more");

buttons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    
    // Create popup container
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.innerHTML = `
      <div class="popup-content">
        <h2>Event Details</h2>
        <p>This is where the event details will go.</p>
        <button id="registerBtn">Register Now</button>
        <button id="closePopup">Close</button>
      </div>
    `;
    document.body.appendChild(popup);

    // Close button
    document.getElementById("closePopup").addEventListener("click", () => {
      document.body.removeChild(popup);
    });

    // Register button (optional)
    document.getElementById("registerBtn").addEventListener("click", () => {
      alert("Redirecting to registration page...");
      window.location.href = "event.html";
    });
  });
});
