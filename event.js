const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupTitle = document.getElementById("popup-title");
const popupDescription = document.getElementById("popup-description");
const popupDate = document.getElementById("popup-date");
const popupVenue = document.getElementById("popup-venue");
const closeBtn = document.querySelector(".close-btn");
const registerBtn = document.getElementById("registerBtn");
const msg = document.getElementById("registerMsg");

// ✅ Event Details
const eventDetails = {
  "HACKFORGE": {
    img: "img/person-working-html-computer.jpg",
    description: "Turn your innovative ideas into working prototypes and showcase your coding skills!",
    date: "Nov 15–16, 2025",
    venue: "Tech Hall, Chitkara University"
  },
  "INSPIRE TALKS": {
    img: "img/corporate-businessman-giving-presentation-large-audience.jpg",
    description: "Get motivated by speakers from top industries and explore new horizons.",
    date: "Nov 22, 2025",
    venue: "Main Auditorium, Chitkara University"
  },
  "NIGHTPULSE": {
    img: "img/excited-audience-watching-confetti-fireworks-having-fun-music-festival-night-copy-space.jpg",
    description: "A vibrant DJ night filled with beats, lights, and high energy!",
    date: "Dec 5, 2025",
    venue: "Open Ground, Chitkara University"
  },
  "JOKE NIGHTS": {
    img: "img/35105922_8248639.jpg",
    description: "Laugh your heart out with stand-up performances from top comedians!",
    date: "Dec 10, 2025",
    venue: "Cultural Center, Chitkara University"
  }
};

// ✅ Show popup on “Join” button click
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const title = btn.parentElement.querySelector("h2").textContent;
    const event = eventDetails[title];

    popupImg.src = event.img;
    popupTitle.textContent = title;
    popupDescription.textContent = event.description;
    popupDate.textContent = event.date;
    popupVenue.textContent = event.venue;
    msg.textContent = "";

    popup.style.display = "flex";
  });
});

// ✅ Close popup
closeBtn.addEventListener("click", () => popup.style.display = "none");
window.addEventListener("click", (e) => {
  if (e.target === popup) popup.style.display = "none";
});

// ✅ Register button logic
registerBtn.addEventListener("click", async () => {
  const email = localStorage.getItem("loggedInUser");
  const userId = localStorage.getItem("loggedInUserId");
  const eventName = popupTitle.textContent;

  if (!email || !userId) {
    msg.textContent = "⚠️ Please log in first!";
    msg.style.color = "orange";
    return;
  }

  try {
    const existing = await fetch("http://localhost:3000/registrations")
      .then(res => res.json())
      .then(data => data.find(r => r.userId == userId && r.event === eventName));

    if (existing) {
      msg.textContent = "⚠️ You are already registered for this event!";
      msg.style.color = "orange";
      return;
    }

    const newReg = {
      userId: Number(userId),
      email,
      event: eventName,
      time: new Date().toLocaleString()
    };

    const res = await fetch("http://localhost:3000/registrations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReg)
    });

    if (res.ok) {
      msg.textContent = "✅ Successfully registered!";
      msg.style.color = "limegreen";
    } else {
      msg.textContent = "❌ Failed to register.";
      msg.style.color = "red";
    }
  } catch (err) {
    console.error(err);
    msg.textContent = "❌ Server error.";
    msg.style.color = "red";
  }
});
