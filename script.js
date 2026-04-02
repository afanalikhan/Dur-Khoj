/**
 * DUR KHOJ - Official Script
 * Fixed Mobile Menu & Dark Mode
 */

// --- 1. IMMEDIATE THEME CHECK ---
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

// --- 2. CORE SYSTEM INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("DUR KHOJ Systems Online");

    initTheme();
    initMobileMenu();
    initInteractions();
    initModals();
    initLoginForm();
    updateNavUI();
});

function initMobileMenu() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const barIcon = document.getElementById('bar-icon');
    const closeIcon = document.getElementById('close-icon');

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Toggle ONLY the class
            navMenu.classList.toggle('active');
            
            const isOpened = navMenu.classList.contains('active');
            
            // Swap icons
            if (barIcon) barIcon.style.display = isOpened ? 'none' : 'block';
            if (closeIcon) closeIcon.style.display = isOpened ? 'block' : 'none';
        });
    }
}

// --- 4. THEME LOGIC ---
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        const isDark = document.body.classList.contains('dark-mode');
        themeBtn.textContent = isDark ? '☀️' : '🌙';

        themeBtn.onclick = () => {
            document.body.classList.toggle('dark-mode');
            const nowDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', nowDark ? 'dark' : 'light');
            themeBtn.textContent = nowDark ? '☀️' : '🌙';
        };
    }
}

// --- 5. INTERACTION LOGIC (Like/Comment) ---
function initInteractions() {
    document.body.addEventListener('click', function(e) {
        const likeBtn = e.target.closest('.like-btn');
        if (likeBtn) {
            likeBtn.classList.toggle('liked');
            let countSpan = likeBtn.querySelector('span');
            let currentCount = parseInt(countSpan.innerText) || 0;
            
            if(likeBtn.classList.contains('liked')) {
                likeBtn.innerHTML = `<i class="fas fa-heart"></i> <span>${currentCount + 1}</span>`;
                likeBtn.style.color = "red";
            } else {
                likeBtn.innerHTML = `<i class="far fa-heart"></i> <span>${currentCount - 1}</span>`;
                likeBtn.style.color = "";
            }
        }

        const commentBtn = e.target.closest('.comment-trigger');
        if (commentBtn) {
            const card = commentBtn.closest('.property-details');
            const section = card.querySelector('.comment-section');
            if (section) {
                section.style.display = (section.style.display === "none" || section.style.display === "") ? "block" : "none";
            }
        }
    });
}

// --- 6. MODAL LOGIC ---
function initModals() {
    const modal = document.getElementById('details-modal');
    const closeBtn = document.querySelector('.close-modal');

    document.body.addEventListener('click', function(e) {
        if (e.target.closest('.open-modal') && modal) {
            modal.style.display = "block";
            document.body.style.overflow = 'hidden';
        }
    });

    if (closeBtn && modal) {
        closeBtn.onclick = () => {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
        };
    }
}

// --- 7. AUTH & NAV UI ---
function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.onsubmit = (e) => {
            e.preventDefault();
            localStorage.setItem('userLoggedIn', 'true');
            window.location.href = "index.html"; 
        };
    }
}

function updateNavUI() {
    const isLoggedin = localStorage.getItem('userLoggedIn') === 'true';
    
    const signinLink = document.getElementById('nav-auth-section');
    const profileSection = document.getElementById('user-profile-section');
    const navAvatar = document.getElementById('nav-avatar');

    if (isLoggedin) {
        // User is logged in: Hide "Sign In", Show Photo
        if (signinLink) signinLink.style.display = 'none';
        if (profileSection) profileSection.style.display = 'block';
        if (navAvatar) navAvatar.src = "profile-placeholder.png"; 
    } else {
        // User is logged out: Show "Sign In", Hide Photo
        if (signinLink) signinLink.style.display = 'block';
        if (profileSection) profileSection.style.display = 'none';
    }
}

// --- 8. GLOBAL HELPERS ---
window.checkArea = function(select) {
    const box = document.getElementById('manualAreaBox');
    if (box) box.style.display = (select.value === 'other') ? 'block' : 'none';
};

const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('userLoggedIn'); // Remove the login "key"
        window.location.reload(); // Refresh the page to show "Sign In" again
    });
}

// Example logic for your script.js
function handleSignIn(email, password) {
    const adminEmail = "khojdor@gmail.com.com";
    const adminPassword = "afanalikhan123456789";

    if (email === adminEmail && password === adminPassword) {
        // Redirect to an admin version of the dashboard
        window.location.href = "admin-dashboard.html"; 
        localStorage.setItem("isAdmin", "true");
    } else {
        // Standard user login logic
        localStorage.setItem("isAdmin", "false");
    }
}

// When rendering the listings
function displayHouse(houseData) {
    const tickElement = document.getElementById("adminTick");
    
    // If the data indicates it was uploaded by you
    if (houseData.isAdminUpload === true) {
        tickElement.style.display = "block";
    }
}