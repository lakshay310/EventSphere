// ----------------- LOGIN/LOGOUT -----------------
const loginBtn = document.getElementById("login-btn");

function isLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true";
}

function updateLoginUI() {
  if (isLoggedIn()) {
    loginBtn.textContent = "Logout";
    document.querySelectorAll(".card .Events").forEach(btn => {
      btn.disabled = false;
      btn.style.cursor = "pointer";
      btn.title = "";
    });
  } else {
    loginBtn.textContent = "Login";
    document.querySelectorAll(".card .Events").forEach(btn => {
      btn.disabled = true;
      btn.style.cursor = "not-allowed";
      btn.title = "Login to view your events";
    });
  }
}

loginBtn.addEventListener("click", () => {
  if (isLoggedIn()) {
    // Logout
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("loggedInUserId");
    localStorage.setItem("isLoggedIn", "false");
    updateLoginUI();
  } else {
    // Redirect to login page
    window.location.href = "login.html";
  }
});

// ----------------- FILTER CLUBS -----------------
function filterClubs(category) {
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    if (category === "all" || card.dataset.category === category) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}

const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filterClubs(btn.dataset.category);
  });
});

// ----------------- LEARN MORE MODAL -----------------
function createModal(title, description, imgSrc) {
  const existingModal = document.querySelector(".modal");
  if (existingModal) existingModal.remove();

  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>${title}</h2>
      <img src="${imgSrc}" alt="${title}">
      <p>${description}</p>
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelector(".close").onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

document.querySelectorAll(".card .learn-more").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    const card = btn.closest(".card");
    const title = card.querySelector("h2").innerText;
    const description = card.querySelector("p").innerText;
    const imgSrc = card.querySelector("img").src;
    createModal(title, description, imgSrc);
  });
});

// ----------------- OUR EVENTS -----------------
async function showUserEvents() {
  try {
    const response = await fetch("users.json");
    const data = await response.json();

    document.querySelectorAll(".card .Events").forEach(btn => {
      btn.addEventListener("click", async e => {
        e.preventDefault();

        // Check login first
        if (!isLoggedIn()) return alert("Please login to view your events.");

        const userId = Number(localStorage.getItem("loggedInUserId"));
        const user = data.users.find(u => u.id === userId);
        if (!user) return alert("User not found!");

        const events = data.registrations.filter(r => r.userId === user.id);
        if (events.length === 0) return alert("No registered events found.");

        let message = "Your Events:\n";
        events.forEach(ev => message += `- ${ev.event} at ${ev.time}\n`);
        alert(message);
      });
    });
  } catch (err) {
    console.error("Error fetching users/events:", err);
  }
}

// ----------------- SCROLL BUTTON -----------------
document.querySelector(".scroll-btn").addEventListener("click", e => {
  e.preventDefault();
  document.querySelector(".filter-bar").style.display = "flex";
  document.querySelector(".cards-section").style.display = "block";
  document.querySelector("#clubs").scrollIntoView({ behavior: "smooth" });
});

// ----------------- INITIALIZE -----------------
document.addEventListener("DOMContentLoaded", () => {
  showUserEvents();
  filterClubs("all");
  updateLoginUI(); // Update login/logout button on page load
});
