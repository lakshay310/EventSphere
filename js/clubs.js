// Clubs Page JavaScript
const clubsData = {
    technical: { name: 'Technical Club', description: 'Empowering students with technical skills through workshops, hackathons, and tech talks. Join us to learn cutting-edge technologies, participate in coding competitions, and build innovative projects with fellow tech enthusiasts.', members: '300+', events: 20, contact: 'tech@eventsphere.com' },
    coding: { name: 'Coding Club', description: 'Master programming languages and competitive coding through practice and mentorship. We organize regular coding sessions, algorithm workshops, and participate in national-level coding competitions. Perfect for beginners and advanced programmers alike.', members: '280+', events: 18, contact: 'coding@eventsphere.com' },
    innovation: { name: 'Innovation Club', description: 'Nurturing innovative thinking and entrepreneurial spirit among students. We host startup workshops, innovation challenges, and provide mentorship for budding entrepreneurs. Turn your ideas into reality with our supportive community.', members: '180+', events: 15, contact: 'innovation@eventsphere.com' },
    cultural: { name: 'Cultural Club', description: 'Celebrating arts, music, dance, and cultural diversity through vibrant events and performances. Experience the richness of various cultures, participate in cultural fests, and showcase your talents on a grand stage.', members: '250+', events: 22, contact: 'cultural@eventsphere.com' },
    music: { name: 'Music & Dance Club', description: 'Expressing creativity through music, dance, and performing arts. Whether you\'re into classical, contemporary, or fusion styles, find your rhythm with us. Regular jam sessions, dance workshops, and annual music festivals await you.', members: '220+', events: 16, contact: 'music@eventsphere.com' },
    drama: { name: 'Drama & Film Club', description: 'Bringing stories to life through theatre, filmmaking, and dramatic performances. From stage plays to short films, scriptwriting to acting, explore every aspect of dramatic arts. Join our theatrical productions and film screenings.', members: '160+', events: 12, contact: 'drama@eventsphere.com' },
    literary: { name: 'Literary Club', description: 'Fostering love for literature, creative writing, poetry, and literary discussions. Participate in poetry slams, book clubs, creative writing workshops, and publish your work in our annual magazine. A haven for word lovers.', members: '150+', events: 14, contact: 'literary@eventsphere.com' },
    photography: { name: 'Photography Club', description: 'Capturing moments and developing photography skills through workshops and photo walks. Learn composition, lighting, editing, and various photography genres. Join our photo exhibitions and nature walks to hone your craft.', members: '140+', events: 10, contact: 'photography@eventsphere.com' },
    art: { name: 'Art & Design Club', description: 'Exploring creativity through painting, sketching, graphic design, and digital art. From traditional art forms to modern digital design, unleash your artistic potential. Participate in art competitions, exhibitions, and collaborative projects.', members: '130+', events: 11, contact: 'art@eventsphere.com' },
    sports: { name: 'Sports Club', description: 'Promoting fitness, sportsmanship, and athletic excellence through various sporting events. Train with professional coaches, compete in inter-college tournaments, and maintain an active lifestyle with fellow sports enthusiasts.', members: '300+', events: 25, contact: 'sports@eventsphere.com' },
    fitness: { name: 'Fitness & Wellness Club', description: 'Dedicated to health, fitness, yoga, and overall wellness of students. Access our gym facilities, attend yoga and meditation sessions, nutrition workshops, and wellness seminars. Build a healthier version of yourself.', members: '200+', events: 18, contact: 'fitness@eventsphere.com' },
    adventure: { name: 'Adventure Club', description: 'Organizing treks, camping, and outdoor adventure activities for thrill-seekers. From mountain treks to river rafting, rock climbing to camping trips, experience the thrill of adventure. Safety-certified instructors guide all our expeditions.', members: '170+', events: 8, contact: 'adventure@eventsphere.com' }
};

function initClubFilters() {
    const filtersHTML = `<div class="club-filters"><button class="filter-btn active" data-filter="all">All Clubs</button><button class="filter-btn" data-filter="technical">Technical</button><button class="filter-btn" data-filter="cultural">Cultural</button><button class="filter-btn" data-filter="sports">Sports</button><button class="filter-btn" data-filter="arts">Arts</button></div>`;
    
    const cardsSection = document.querySelector('.cards-section');
    if (cardsSection && !document.querySelector('.club-filters')) {
        const title = cardsSection.querySelector('.title');
        if (title) {
            title.insertAdjacentHTML('afterend', filtersHTML);
        }
    }
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filter;
            filterClubs(filter);
        });
    });
}

function filterClubs(category) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const cardCategory = card.dataset.category || 'all';
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'flex';
            card.style.animation = 'slideIn 0.5s ease-out';
        } else {
            card.style.display = 'none';
        }
    });
}

function initClubModals() {
    const learnMoreButtons = document.querySelectorAll('.learn-more');
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const card = button.closest('.card');
            const clubName = card.querySelector('h2').textContent;
            const clubKey = clubName.toLowerCase().split(' ')[0];
            showClubDetails(clubName, clubKey);
        });
    });
}

function showClubDetails(clubName, clubKey) {
    const club = clubsData[clubKey];
    let modalContent = `<div class="club-details"><p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px;">${club ? club.description : 'Discover amazing opportunities and connect with like-minded individuals.'}</p>`;
    
    if (club) {
        modalContent += `<div class="club-stats"><div class="stat-item"><h3>${club.members}</h3><p>Active Members</p></div><div class="stat-item"><h3>${club.events}</h3><p>Events This Year</p></div></div><div class="club-info"><p><strong>Contact:</strong> ${club.contact}</p><p><strong>Meetings:</strong> Every Friday, 4:00 PM</p><p><strong>Location:</strong> Student Activity Center</p></div><div class="club-actions"><button class="btn join-club-btn">Join This Club</button><button class="btn secondary-btn">Follow Updates</button></div>`;
    }
    
    modalContent += `</div>`;
    window.EventSphere.openModal(clubName, modalContent);
    
    setTimeout(() => {
        const joinBtn = document.querySelector('.join-club-btn');
        if (joinBtn) {
            joinBtn.addEventListener('click', () => {
                showJoinClubForm(clubName);
            });
        }
        
        const followBtn = document.querySelector('.secondary-btn');
        if (followBtn) {
            followBtn.addEventListener('click', () => {
                window.EventSphere.showNotification(`Now following ${clubName}!`, 'success');
                document.querySelector('.modal').classList.remove('active');
            });
        }
    }, 100);
}

function showJoinClubForm(clubName) {
    const formContent = `<div class="join-club-form"><p style="margin-bottom: 20px;">Join <strong>${clubName}</strong></p><form id="joinClubForm"><div class="form-group"><label for="joinName">Full Name</label><input type="text" id="joinName" required placeholder="Enter your name"></div><div class="form-group"><label for="joinEmail">Email</label><input type="email" id="joinEmail" required placeholder="Enter your email"></div><div class="form-group"><label for="joinRollNo">Roll Number</label><input type="text" id="joinRollNo" required placeholder="Enter your roll number"></div><div class="form-group"><label for="joinYear">Year</label><select id="joinYear" required><option value="">Select Year</option><option value="1">First Year</option><option value="2">Second Year</option><option value="3">Third Year</option><option value="4">Fourth Year</option></select></div><div class="form-group"><label for="joinReason">Why do you want to join?</label><textarea id="joinReason" rows="3" placeholder="Tell us why you're interested..."></textarea></div><button type="submit" class="btn submit-btn">Submit Application</button></form></div>`;
    
    window.EventSphere.openModal(`Join ${clubName}`, formContent);
    
    setTimeout(() => {
        const form = document.getElementById('joinClubForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                handleClubJoin(clubName, form);
            });
        }
    }, 100);
}

function handleClubJoin(clubName, form) {
    const email = document.getElementById('joinEmail').value;
    if (!window.EventSphere.validateEmail(email)) {
        window.EventSphere.showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    console.log(`Application submitted for ${clubName}`);
    document.querySelector('.modal').classList.remove('active');
    window.EventSphere.showNotification(`Application submitted successfully! We'll contact you soon.`, 'success');
    form.reset();
}

function initClubEvents() {
    const eventsButtons = document.querySelectorAll('.Events');
    eventsButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const card = button.closest('.card');
            const clubName = card.querySelector('h2').textContent;
            showClubEvents(clubName);
        });
    });
}

function showClubEvents(clubName) {
    const eventsContent = `<div class="club-events-list"><p>Upcoming events organized by <strong>${clubName}</strong>:</p><div class="events-timeline"><div class="event-item"><h4>Workshop: Getting Started</h4><p>Date: November 15, 2025</p><p>Time: 3:00 PM - 5:00 PM</p></div><div class="event-item"><h4>Annual Fest</h4><p>Date: December 10, 2025</p><p>Time: All Day Event</p></div><div class="event-item"><h4>Guest Lecture</h4><p>Date: January 5, 2026</p><p>Time: 4:00 PM - 6:00 PM</p></div></div><button class="btn view-all-events">View All Events</button></div>`;
    window.EventSphere.openModal(`${clubName} Events`, eventsContent);
}

function initClubHeroAnimation() {
    const heroText = document.querySelector('.dis h1');
    const heroDesc = document.querySelector('.dis p');
    
    if (heroText) {
        heroText.style.opacity = '0';
        heroText.style.transform = 'translateY(-30px)';
        setTimeout(() => {
            heroText.style.transition = 'all 0.8s ease-out';
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateY(0)';
        }, 200);
    }
    
    if (heroDesc) {
        heroDesc.style.opacity = '0';
        setTimeout(() => {
            heroDesc.style.transition = 'opacity 0.8s ease-out';
            heroDesc.style.opacity = '1';
        }, 600);
    }
}

function enhanceCardHovers() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('img').style.transform = 'scale(1.1)';
            this.querySelector('img').style.transition = 'transform 0.5s ease';
        });
        card.addEventListener('mouseleave', function() {
            this.querySelector('img').style.transform = 'scale(1)';
        });
    });
}

function initExploreButton() {
    const cardsSection = document.querySelector('.cards-section');
    const exploreBtn = document.querySelector('.explore-btn, .btn[href="#clubs"], a[href*="club"]');
    
    if (cardsSection) {
        cardsSection.style.display = 'none';
    }
    
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function(event) {
            event.preventDefault();
            if (cardsSection) {
                cardsSection.style.display = 'block';
                cardsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initExploreButton();
    initClubFilters();
    initClubModals();
    initClubEvents();
    initClubHeroAnimation();
    enhanceCardHovers();
    console.log('Clubs page initialized!');
});

const style = document.createElement('style');
style.textContent = `@keyframes slideIn { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); }} .club-stats { display: flex; gap: 30px; margin: 20px 0; justify-content: center; } .stat-item { text-align: center; padding: 15px; background: rgba(255, 204, 0, 0.1); border-radius: 10px; min-width: 120px; } .stat-item h3 { color: #ffcc00; font-size: 2rem; margin: 0; } .stat-item p { margin: 5px 0 0 0; color: #ddd; } .club-actions { display: flex; gap: 15px; margin-top: 20px; justify-content: center; } .secondary-btn { background: transparent; border: 2px solid #ffcc00; color: #ffcc00; } .secondary-btn:hover { background: #ffcc00; color: black; } .events-timeline { margin: 20px 0; } .event-item { padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; margin-bottom: 15px; border-left: 3px solid #ffcc00; } .event-item h4 { margin: 0 0 10px 0; color: #ffcc00; } .event-item p { margin: 5px 0; color: #ddd; }`;
document.head.appendChild(style);
