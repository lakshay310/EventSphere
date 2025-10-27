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

// ----------------- CLUB EVENTS DATA -----------------
const clubEvents = {
  "Technical Club": [
    { name: "HACKFORGE 2025", date: "Nov 15, 2025", time: "9:00 AM - 5:00 PM" },
    { name: "Tech Talk: AI & ML", date: "Nov 22, 2025", time: "2:00 PM - 4:00 PM" },
    { name: "Circuit Design Workshop", date: "Dec 5, 2025", time: "10:00 AM - 1:00 PM" }
  ],
  "Coding Club": [
    { name: "CodeSprint Competition", date: "Nov 10, 2025", time: "10:00 AM - 6:00 PM" },
    { name: "Python Bootcamp", date: "Nov 18, 2025", time: "3:00 PM - 6:00 PM" },
    { name: "DSA Challenge", date: "Dec 1, 2025", time: "11:00 AM - 2:00 PM" }
  ],
  "Innovation Club": [
    { name: "Startup Pitch Day", date: "Nov 12, 2025", time: "1:00 PM - 5:00 PM" },
    { name: "Innovation Workshop", date: "Nov 25, 2025", time: "10:00 AM - 12:00 PM" },
    { name: "Product Design Session", date: "Dec 8, 2025", time: "2:00 PM - 4:00 PM" }
  ],
  "Cultural Club": [
    { name: "NIGHTPULSE Festival", date: "Nov 8, 2025", time: "6:00 PM - 11:00 PM" },
    { name: "Cultural Evening", date: "Nov 20, 2025", time: "5:00 PM - 9:00 PM" },
    { name: "Traditional Day", date: "Dec 3, 2025", time: "10:00 AM - 4:00 PM" }
  ],
  "Music & Dance Club": [
    { name: "Live Band Night", date: "Nov 9, 2025", time: "7:00 PM - 10:00 PM" },
    { name: "Dance Battle 2025", date: "Nov 16, 2025", time: "4:00 PM - 8:00 PM" },
    { name: "Music Jam Session", date: "Dec 6, 2025", time: "3:00 PM - 6:00 PM" }
  ],
  "Drama & Film Club": [
    { name: "Theatre Workshop", date: "Nov 11, 2025", time: "2:00 PM - 5:00 PM" },
    { name: "Short Film Screening", date: "Nov 19, 2025", time: "6:00 PM - 9:00 PM" },
    { name: "Acting Masterclass", date: "Dec 2, 2025", time: "11:00 AM - 2:00 PM" }
  ],
  "Literary Club": [
    { name: "INSPIRE TALKS", date: "Nov 7, 2025", time: "3:00 PM - 5:00 PM" },
    { name: "Poetry Slam", date: "Nov 14, 2025", time: "4:00 PM - 6:00 PM" },
    { name: "Book Discussion Meet", date: "Nov 28, 2025", time: "2:00 PM - 4:00 PM" }
  ],
  "Photography Club": [
    { name: "Photo Walk Campus", date: "Nov 13, 2025", time: "7:00 AM - 10:00 AM" },
    { name: "Portrait Photography Workshop", date: "Nov 21, 2025", time: "1:00 PM - 4:00 PM" },
    { name: "Photo Exhibition", date: "Dec 10, 2025", time: "10:00 AM - 6:00 PM" }
  ],
  "Art & Design Club": [
    { name: "Canvas Painting Session", date: "Nov 6, 2025", time: "11:00 AM - 2:00 PM" },
    { name: "Digital Art Workshop", date: "Nov 17, 2025", time: "3:00 PM - 6:00 PM" },
    { name: "Art Exhibition", date: "Dec 7, 2025", time: "9:00 AM - 5:00 PM" }
  ],
  "Sports Club": [
    { name: "Inter-College Tournament", date: "Nov 5, 2025", time: "8:00 AM - 5:00 PM" },
    { name: "Sports Day", date: "Nov 23, 2025", time: "7:00 AM - 4:00 PM" },
    { name: "Cricket Championship", date: "Dec 4, 2025", time: "9:00 AM - 6:00 PM" }
  ],
  "Fitness & Wellness Club": [
    { name: "Yoga & Meditation", date: "Nov 4, 2025", time: "6:00 AM - 8:00 AM" },
    { name: "Fitness Bootcamp", date: "Nov 24, 2025", time: "5:00 PM - 7:00 PM" },
    { name: "Wellness Workshop", date: "Dec 9, 2025", time: "10:00 AM - 12:00 PM" }
  ],
  "Adventure Club": [
    { name: "Trekking Expedition", date: "Nov 26, 2025", time: "5:00 AM - 8:00 PM" },
    { name: "Camping Trip", date: "Dec 12, 2025", time: "All Day" },
    { name: "Rock Climbing Session", date: "Dec 15, 2025", time: "8:00 AM - 12:00 PM" }
  ]
};

// ----------------- OUR EVENTS -----------------
async function showUserEvents() {
  try {
    const response = await fetch("users.json");
    const data = await response.json();
    // Return merged registrations (server + local) for other code to consume if needed
    const merged = mergeRegistrations(data.registrations || []);
    return merged;
  } catch (err) {
    console.error("Error fetching users/events:", err);
    return getLocalRegistrations();
  }
}

// Utility: local registrations stored in localStorage (since we cannot write to users.json)
function getLocalRegistrations() {
  try {
    return JSON.parse(localStorage.getItem('localRegistrations') || '[]');
  } catch (e) {
    return [];
  }
}

function saveLocalRegistration(reg) {
  const regs = getLocalRegistrations();
  regs.push(reg);
  localStorage.setItem('localRegistrations', JSON.stringify(regs));
}

function getLocalJoinRequests() {
  try {
    return JSON.parse(localStorage.getItem('joinRequests') || '[]');
  } catch (e) {
    return [];
  }
}

function saveLocalJoinRequest(req) {
  const reqs = getLocalJoinRequests();
  reqs.push(req);
  localStorage.setItem('joinRequests', JSON.stringify(reqs));
}

// Merge registrations from users.json and localStorage for display
function mergeRegistrations(serverRegs) {
  const local = getLocalRegistrations();
  return serverRegs.concat(local);
}

// Open a structured modal for a club allowing register / join actions
function openClubModal(card) {
  const title = card.querySelector('h2').innerText;
  const description = card.querySelector('p').innerText;
  const imgSrc = card.querySelector('img').src;

  // Remove existing modal if any
  const existing = document.querySelector('.modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>
        ${title}
      </h2>
      <div class="modal-body">
        <img src="${imgSrc}" alt="${title}">
        <p>${description}</p>

        <div class="club-actions">
          <label for="eventSelect">Select an event to register (if available):</label>
          <select id="eventSelect">
            <option value="">-- No upcoming events --</option>
          </select>

          <div style="display:flex;gap:10px;margin-top:12px;justify-content:center;flex-wrap:wrap;">
            <button id="registerEventBtn" class="btn action-btn">Register for Event</button>
            <button id="requestJoinBtn" class="btn action-btn">Request to Join Club</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Close behavior
  modal.querySelector('.close').onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };

  // Fill the event select with upcoming events for this club from clubEvents data
  (function populateEvents() {
    const select = modal.querySelector('#eventSelect');
    select.innerHTML = '';
    
    const events = clubEvents[title] || [];
    
    if (events.length === 0) {
      const opt = document.createElement('option');
      opt.value = '';
      opt.textContent = '-- No upcoming events --';
      select.appendChild(opt);
    } else {
      const placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = '-- Select an event --';
      select.appendChild(placeholder);
      
      events.forEach(ev => {
        const o = document.createElement('option');
        o.value = ev.name;
        o.textContent = `${ev.name} - ${ev.date} (${ev.time})`;
        select.appendChild(o);
      });
    }
  })();

  // Actions
  modal.querySelector('#registerEventBtn').addEventListener('click', () => {
    if (!isLoggedIn()) return alert('Please login to register for events.');
    const userId = Number(localStorage.getItem('loggedInUserId'));
    const email = localStorage.getItem('loggedInUser') || '';
    const select = modal.querySelector('#eventSelect');
    const chosen = select.value;
    if (!chosen) return alert('Please select an event to register for.');

    const reg = {
      id: Date.now().toString(36),
      userId,
      email,
      event: chosen,
      time: new Date().toLocaleString(),
      club: title
    };
    saveLocalRegistration(reg);
    alert(`Registered for ${chosen} (club: ${title}).`);
    modal.remove();
  });

  modal.querySelector('#requestJoinBtn').addEventListener('click', () => {
    if (!isLoggedIn()) return alert('Please login to request to join a club.');
    
    // Get the modal body and replace actions with join form
    const modalBody = modal.querySelector('.modal-body');
    const userId = Number(localStorage.getItem('loggedInUserId'));
    const email = localStorage.getItem('loggedInUser') || '';
    
    // Create join form
    const joinFormHTML = `
      <img src="${imgSrc}" alt="${title}">
      <p>${description}</p>
      
      <div class="join-form">
        <h3 style="color: #ffcc00; margin-bottom: 20px;">Join ${title}</h3>
        
        <div class="form-group">
          <label for="joinName">Full Name *</label>
          <input type="text" id="joinName" placeholder="Enter your full name" required>
        </div>
        
        <div class="form-group">
          <label for="joinEmail">Email *</label>
          <input type="email" id="joinEmail" value="${email}" readonly>
        </div>
        
        <div class="form-group">
          <label for="joinPhone">Phone Number *</label>
          <input type="tel" id="joinPhone" placeholder="Enter your phone number" required>
        </div>
        
        <div class="form-group">
          <label for="joinYear">Year of Study *</label>
          <select id="joinYear" required>
            <option value="">-- Select Year --</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="joinDepartment">Department *</label>
          <input type="text" id="joinDepartment" placeholder="e.g., Computer Science" required>
        </div>
        
        <div class="form-group">
          <label for="joinReason">Why do you want to join this club? *</label>
          <textarea id="joinReason" rows="4" placeholder="Tell us about your interest and what you hope to gain..." required></textarea>
        </div>
        
        <div class="form-group">
          <label for="joinExperience">Relevant Experience (Optional)</label>
          <textarea id="joinExperience" rows="3" placeholder="Share any relevant skills or experience..."></textarea>
        </div>
        
        <div style="display:flex;gap:10px;margin-top:20px;justify-content:center;flex-wrap:wrap;">
          <button id="submitJoinBtn" class="btn action-btn">Submit Request</button>
          <button id="cancelJoinBtn" class="btn action-btn" style="background: linear-gradient(135deg, #666 0%, #444 100%);">Cancel</button>
        </div>
      </div>
    `;
    
    modalBody.innerHTML = joinFormHTML;
    
    // Handle form submission
    modal.querySelector('#submitJoinBtn').addEventListener('click', () => {
      const name = modal.querySelector('#joinName').value.trim();
      const phone = modal.querySelector('#joinPhone').value.trim();
      const year = modal.querySelector('#joinYear').value;
      const department = modal.querySelector('#joinDepartment').value.trim();
      const reason = modal.querySelector('#joinReason').value.trim();
      const experience = modal.querySelector('#joinExperience').value.trim();
      
      // Validation
      if (!name || !phone || !year || !department || !reason) {
        return alert('Please fill in all required fields marked with *');
      }
      
      const req = {
        id: Date.now().toString(36),
        userId,
        email,
        name,
        phone,
        year,
        department,
        reason,
        experience,
        club: title,
        time: new Date().toLocaleString(),
        status: 'pending'
      };
      
      saveLocalJoinRequest(req);
      alert(`Join request submitted successfully for ${title}!\n\nWe'll review your application and get back to you soon.`);
      modal.remove();
    });
    
    // Handle cancel
    modal.querySelector('#cancelJoinBtn').addEventListener('click', () => {
      modal.remove();
    });
  });
}

// Replace Events click behavior to open modal (and keep previous showUserEvents summary functionality merged with local regs)
document.querySelectorAll('.card .Events').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    // If not logged in, prompt
    if (!isLoggedIn()) return alert('Please login to manage or view events.');
    const card = btn.closest('.card');
    openClubModal(card);
  });
});

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
