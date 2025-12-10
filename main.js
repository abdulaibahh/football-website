document.addEventListener("DOMContentLoaded", () => {
  // Core Initialization
  setupNavigation();
  updateCopyrightYear();
  setupBackToTop();

  // Page-specific setups
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", validateContactForm);
  }

  const playersPage = document.getElementById("players-page");
  if (playersPage) {
    setupPlayerSearchAndDetails();
  }

  // Check for matches page buttons
  if (document.getElementById("download-fixture")) {
    setupMatchesPage();
  }

  // Check for home page news section
  if (document.getElementById("news")) {
    setupHomePageNews();
  }
});

// Ensures preloader is hidden after all content is ready
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const body = document.body;

  // Fade out preloader
  if (preloader) {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500); // Wait for the transition
  }

  // Show body content
  body.style.opacity = "1";
});


// 1. GENERAL & NAVIGATION SETUP

function setupNavigation() {
  const navLinks = document.querySelectorAll(".nav a");
  const path = window.location.pathname;
  const currentPage = path.substring(path.lastIndexOf("/") + 1) || "index.html";

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href").replace("./", "");
    if (linkHref === currentPage) {
      link.classList.add("active");
    }
  });
}

function setupBackToTop() {
  const backToTopButton = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function updateCopyrightYear() {
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}


// 2. CONTACT FORM VALIDATION (contact.html)

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  if (phone === "") return true;
  const phoneRegex = /^[0-9\s-()+]{7,15}$/;
  return phoneRegex.test(phone);
}

function validateContactForm(event) {
  event.preventDefault();

  const form = event.target;
  const nameInput = form.querySelector('input[placeholder="Name"]');
  const emailInput = form.querySelector('input[placeholder="Email"]');
  const phoneInput = form.querySelector('input[placeholder="Phone"]');
  const messageTextarea = form.querySelector('textarea[placeholder="Message"]');

  let isValid = true;

  const displayError = (input, message) => {
    let errorElement = input.parentNode.querySelector(".error-message");
    if (!errorElement) {
      errorElement = document.createElement("div");
      errorElement.classList.add("error-message");
      input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    errorElement.textContent = message;
    input.style.border = "1.5px solid var(--contrast-accent)";
    isValid = false;
  };

  const clearError = (input) => {
    const errorElement = input.parentNode.querySelector(".error-message");
    if (errorElement) {
      errorElement.remove();
    }
    input.style.border = "1px solid #ccc";
  };

  clearError(nameInput);
  if (nameInput.value.trim().length < 3) {
    displayError(
      nameInput,
      "Name is required and must be at least 3 characters."
    );
  }

  clearError(emailInput);
  if (!isValidEmail(emailInput.value.trim())) {
    displayError(emailInput, "A valid email address is required.");
  }

  clearError(phoneInput);
  if (!isValidPhone(phoneInput.value.trim())) {
    displayError(phoneInput, "Phone number format is invalid.");
  }

  clearError(messageTextarea);
  if (messageTextarea.value.trim().length < 10) {
    displayError(
      messageTextarea,
      "Message must be at least 10 characters long."
    );
  }

  if (isValid) {
    alert(
      "Thank you for your inquiry! Your form has been submitted successfully."
    );
    form.reset();
    [nameInput, emailInput, phoneInput, messageTextarea].forEach(
      (input) => (input.style.border = "1px solid #ccc")
    );
  }
}


// 3. PLAYER DATA & DETAIL LOGIC (players.html)

const playerData = [
  {
    id: "musa-tombo",
    name: "Musa Tombo",
    nickname: "The Wizard",
    position: "Midfielder",
    club: "East End Lions",
    dob: "15 March 2000",
    jerseyNumber: 10,
    ageRange: "21–25",
    image: "./images/musa tombo.jpg",
    bio: `Musa Tombo is one of Sierra Leone's most exciting midfield talents, 
            known for his exceptional vision, passing range, and spectacular long-range goals. 
            Rising through the youth ranks of East End Lions, he quickly established 
            himself as a starter for the national team, becoming a fan favorite. 
            His career trajectory is set for international leagues, and he remains 
            a central figure in SLFA's strategy for the upcoming AFCON and World 
            Cup qualifiers.`,
    stats: { appearances: 32, goals: 14, assists: 9, yellow: 5, red: 1 },
    agent: {
      name: "Alpha Saidu",
      phone: "+232 76 123 456",
      email: "alpha.agent@slfa.com",
    },
  },
  {
    id: "mohamed-kamara",
    name: "Mohamed Kamara",
    nickname: "The Hunter",
    position: "Attacker",
    club: "Mighty Blackpool",
    dob: "28 July 2004",
    jerseyNumber: 9,
    ageRange: "18–20",
    image: "./images/mohamed kamara.jpg",
    bio: `A rapid and agile forward, Mohamed Kamara brings relentless pressure 
            and a clinical finish to the attacking third. Despite his youth, 
            he has shown maturity beyond his years, leading the line for both 
            Mighty Blackpool and the national side. He is viewed as the future 
            of Sierra Leonean attacking football, possessing a natural ability 
            to find space and convert chances.`,
    stats: { appearances: 25, goals: 18, assists: 4, yellow: 2, red: 0 },
    agent: {
      name: "Isata Sorie",
      phone: "+232 78 987 654",
      email: "isata.sorie@slfa.com",
    },
  },
  {
    id: "alhaji-kamara",
    name: "Alhaji Kamara",
    nickname: "The Wall",
    position: "Goal Keeper",
    club: "Kamboi Eagles",
    dob: "05 December 1993",
    jerseyNumber: 1,
    ageRange: "31+",
    image: "./images/Alhaji kamara.jpg",
    bio: `Alhaji Kamara is a veteran goalkeeper whose experience and leadership 
            are invaluable to the squad. Known for his commanding presence in the 
            box and excellent shot-stopping abilities, he anchors the defense. 
            His long career has seen him through many national campaigns, making 
            him a mentor to the younger players and a reliable last line of defense.`,
    stats: { appearances: 40, goals: 0, assists: 1, yellow: 3, red: 0 },
    agent: {
      name: "Amadu Mansaray",
      phone: "+232 77 112 233",
      email: "amadu.m@slfa.com",
    },
  },
  {
    id: "umaru-bangura",
    name: "Umaru Bangura",
    nickname: "The Rock",
    position: "Defender",
    club: "Bo Rangers",
    dob: "07 October 1998",
    jerseyNumber: 5,
    ageRange: "26–30",
    image: "./images/Umaru-Bangura.jpeg",
    bio: `Umaru Bangura is a strong, composed central defender. His ability 
            to read the game, intercept passes, and command the back four makes 
            him an essential part of the Sierra Leone defense. He is known for 
            his professionalism and consistency, rarely making errors and often 
            contributing crucial tackles and blocks in high-pressure situations.`,
    stats: { appearances: 35, goals: 2, assists: 3, yellow: 8, red: 0 },
    agent: {
      name: "Fatmata Davies",
      phone: "+232 75 445 566",
      email: "fat.davies@slfa.com",
    },
  },
];

const createPlayerCardHTML = (player) => {
  return `
      <div
          class="player-card"
          data-player-id="${player.id}"
          data-club="${player.club.toLowerCase()}"
          data-age-range="${player.ageRange}"
          role="region" 
          aria-label="Player profile for ${player.name}"
      >
          <div class="player-img">
              <img src="${player.image}" alt="${player.name}" />
          </div>
          <h3>${player.name}</h3>
          <p class="position">${player.position}</p>
          <button class="profile-btn" data-player-id="${
            player.id
          }" aria-expanded="false" aria-controls="player-profile-detail">View profile</button>
      </div>
  `;
};

const renderPlayerCards = (playersToRender) => {
  const playerGrid = document.querySelector(".player-grid");
  playerGrid.innerHTML = playersToRender.map(createPlayerCardHTML).join("");
  setupProfileToggle(playersToRender);
};

const populatePlayerDetail = (player) => {
  document.getElementById("profile-img-large").src = player.image;
  document.getElementById(
    "profile-img-large"
  ).alt = `Detailed profile image of ${player.name}`;
  document.getElementById(
    "profile-name-detail"
  ).textContent = `${player.name} (${player.nickname})`;
  document.getElementById("profile-position").textContent = player.position;
  document.getElementById("profile-dob").textContent = player.dob;
  document.getElementById("profile-club").textContent = player.club;
  document.getElementById("profile-number").textContent = player.jerseyNumber;
  document.getElementById("profile-bio").textContent = player.bio;

  document.getElementById("stat-appearances").value = player.stats.appearances;
  document.getElementById("stat-goals").value = player.stats.goals;
  document.getElementById("stat-assists").value = player.stats.assists;
  document.getElementById("stat-yellow").value = player.stats.yellow;
  document.getElementById("stat-red").value = player.stats.red;

  document.getElementById("download-cv").dataset.playerId = player.id;
  document.getElementById("contact-agent").dataset.playerId = player.id;
};

let activePlayerId = null;

const setupProfileToggle = (players) => {
  const playerGrid = document.querySelector(".player-grid");
  const profileSection = document.getElementById("player-profile-detail");
  const biographySection = document.querySelector(".biography");
  const statsSection = document.querySelector(".stats-section");

  // Efficiently remove and re-attach listeners for dynamically generated content
  const clone = playerGrid.cloneNode(true);
  playerGrid.parentNode.replaceChild(clone, playerGrid);

  const newPlayerGrid = document.querySelector(".player-grid");

  newPlayerGrid.addEventListener("click", (event) => {
    if (event.target.classList.contains("profile-btn")) {
      event.preventDefault();

      const playerId = event.target.dataset.playerId;
      const player = players.find((p) => p.id === playerId);
      const isAlreadyActive =
        playerId === activePlayerId && profileSection.style.display === "flex";

      document
        .querySelectorAll(".profile-btn")
        .forEach((btn) => btn.setAttribute("aria-expanded", "false"));

      if (isAlreadyActive) {
        profileSection.style.display = "none";
        biographySection.style.display = "none";
        statsSection.style.display = "none";
        activePlayerId = null;
      } else {
        populatePlayerDetail(player);
        profileSection.style.display = "flex";
        biographySection.style.display = "block";
        statsSection.style.display = "block";
        activePlayerId = playerId;

        event.target.setAttribute("aria-expanded", "true");
        profileSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
};

const filterPlayers = () => {
  const searchInput = document.querySelector(".player-search input");
  const positionFilter = document
    .getElementById("position-filter")
    .value.toLowerCase();
  const clubFilter = document.getElementById("club-filter").value.toLowerCase();
  const ageFilter = document.getElementById("age-filter").value.toLowerCase();

  const filteredPlayers = playerData.filter((player) => {
    const playerName = player.name.toLowerCase();
    const playerPosition = player.position.toLowerCase();
    const playerClub = player.club.toLowerCase();
    const playerAgeRange = player.ageRange.toLowerCase();

    const passesSearch = playerName.includes(
      searchInput.value.toLowerCase().trim()
    );
    const passesPosition =
      positionFilter === "all" || playerPosition.includes(positionFilter);
    const passesClub = clubFilter === "all" || playerClub === clubFilter;
    const passesAge = ageFilter === "all" || playerAgeRange === ageFilter;

    return passesSearch && passesPosition && passesClub && passesAge;
  });

  renderPlayerCards(filteredPlayers);
};

const handleDownloadCV = (event) => {
  const playerId = event.target.dataset.playerId;
  const player = playerData.find((p) => p.id === playerId);

  if (player) {
    const cvContent = `
      Player Curriculum Vitae (CV) - SLFA
      ========================================
      Name: ${player.name} (${player.nickname})
      Position: ${player.position}
      D.O.B: ${player.dob}
      Current Club: ${player.club}
      Jersey Number: ${player.jerseyNumber}

      Biography:
      ${player.bio}

      Career Statistics (Current Season):
      - Appearances: ${player.stats.appearances}
      - Goals: ${player.stats.goals}
      - Assists: ${player.stats.assists}
      - Yellow Cards: ${player.stats.yellow}
      - Red Cards: ${player.stats.red}

      ---
      For official verification, contact SLFA management.
      `;

    const blob = new Blob([cvContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${player.name.replace(/\s/g, "_")}_CV.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert(`Downloading CV for ${player.name}...`);
  } else {
    alert("Error: Player data not found for download.");
  }
};

const handleContactAgent = (event) => {
  const playerId = event.target.dataset.playerId;
  const player = playerData.find((p) => p.id === playerId);

  if (player && player.agent) {
    alert(`
      Agent Contact Information for ${player.name}:
      ------------------------------------------
      Agent Name: ${player.agent.name}
      Phone: ${player.agent.phone}
      Email: ${player.agent.email}
      `);
  } else {
    alert("Agent information not available for this player.");
  }
};

function setupPlayerSearchAndDetails() {
  renderPlayerCards(playerData);

  const downloadBtn = document.getElementById("download-cv");
  const contactBtn = document.getElementById("contact-agent");

  if (downloadBtn) downloadBtn.addEventListener("click", handleDownloadCV);
  if (contactBtn) contactBtn.addEventListener("click", handleContactAgent);

  const searchInput = document.querySelector(".player-search input");
  const filterSelects = document.querySelectorAll(".player-filters select");
  if (searchInput) searchInput.addEventListener("input", filterPlayers);
  filterSelects.forEach((select) =>
    select.addEventListener("change", filterPlayers)
  );
}


// 4. MATCHES DATA & BUTTON LOGIC (matches.html)

const fullSeasonFixture = [
  {
    date: "22 Dec 2024",
    opponent: "Bhantal FC",
    type: "League",
    venue: "Home",
    result: "D 0-0",
  },
  {
    date: "04 Jan 2025",
    opponent: "Bo Rangers",
    type: "League",
    venue: "Away",
    result: "L 1-3",
  },
  {
    date: "10 Jan 2025",
    opponent: "East End Lions",
    type: "League",
    venue: "Home",
    result: "W 2-1",
  },
  { date: "25 Jan 2025", opponent: "FC Kallon", type: "League", venue: "Away" },
  {
    date: "08 Feb 2025",
    opponent: "Mighty Blackpool",
    type: "League",
    venue: "Home",
  },
  {
    date: "15 Feb 2025",
    opponent: "Kamboi Eagles",
    type: "Cup Quarter-Final",
    venue: "Away",
  },
  {
    date: "01 Mar 2025",
    opponent: "Wusum Stars",
    type: "League",
    venue: "Home",
  },
  {
    date: "15 Mar 2025",
    opponent: "Diamond Stars",
    type: "League",
    venue: "Away",
  },
  {
    date: "29 Mar 2025",
    opponent: "Old Edwardians",
    type: "League",
    venue: "Home",
  },
];

const handleDownloadFixture = () => {
  let fixtureContent = "SLFA Full Season Match Fixture (2024/2025)\n";
  fixtureContent += "=================================================\n\n";
  fixtureContent +=
    "DATE         | OPPONENT          | TYPE                | VENUE | RESULT\n";
  fixtureContent +=
    "-------------|-------------------|---------------------|-------|---------\n";

  fullSeasonFixture.forEach((match) => {
    const result = match.result ? match.result : "TBD";
    fixtureContent += `${match.date.padEnd(12)}| ${match.opponent.padEnd(
      17
    )} | ${match.type.padEnd(19)} | ${match.venue.padEnd(5)} | ${result}\n`;
  });

  const blob = new Blob([fixtureContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `SLFA_Full_Season_Fixture.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  alert(
    `The full season fixture list is downloading now. (File: SLFA_Full_Season_Fixture.txt)`
  );
};

const handlePurchaseTickets = () => {
  const ticketingURL = "https://www.slfa-tickets.com/buy";

  alert(`
  Ticket Purchase Information:
  ---------------------------------------------
  To purchase tickets for upcoming matches:
  
  1. Visit our official ticketing partner online.
     Link: ${ticketingURL} 
  
  2. Tickets are also available in-person at the
     Sierra Leone National Stadium box office 
     three days prior to match day.
  
  Please ensure you buy from official sources!
  `);
};

function setupMatchesPage() {
  const downloadBtn = document.getElementById("download-fixture");
  const purchaseBtn = document.getElementById("purchase-tickets");

  if (downloadBtn) downloadBtn.addEventListener("click", handleDownloadFixture);
  if (purchaseBtn) purchaseBtn.addEventListener("click", handlePurchaseTickets);
}


// 5. HOME PAGE NEWS MODAL LOGIC (index.html)

const newsData = [
  {
    id: "afcon-qualify",
    title: "Leone Stars Qualify for AFCON 2026!",
    date: "10 December 2025",
    image: "./images/Recent Progress.jpg",
    body: `
          In an historic night at the National Stadium, the Leone Stars secured their place 
          in the African Cup of Nations (AFCON) 2026 tournament with a thrilling 2-1 victory 
          over their rivals. The decisive goal came in the 90th minute from Captain Steven Caulker, 
          sparking scenes of pure jubilation across the capital. This qualification marks a significant 
          milestone for the SLFA's five-year development plan, demonstrating the immense progress 
          made in national team cohesion and training infrastructure. The team is now looking 
          forward to the draw and beginning their intensive preparations for the continental challenge. 
          The nation stands united behind our team!
      `,
  },
  {
    id: "youth-academy",
    title: "SLFA Youth Academy Signs 10 New Talents",
    date: "05 December 2025",
    image: "./images/Future Plans.jpg",
    body: `
          The future of Sierra Leonean football looks bright following the official signing of ten 
          promising young athletes into the SLFA Youth Academy. This induction represents the largest 
          single intake of talent in half a decade, reinforcing the association's commitment to 
          grassroots development. The new recruits, aged between 15 and 17, will benefit from a 
          world-class training regime, educational support, and professional coaching designed to 
          transition them directly into professional football. SLFA President, Ishmael Koroma, stated 
          that this investment is crucial for sustained success on the international stage.
      `,
  },
  {
    id: "stadium-update",
    title: "New Stadium Development Update",
    date: "28 November 2025",
    image: "./images/construct-stadium.jpg",
    body: `
          Progress on the state-of-the-art National Stadium continues to move at an impressive pace. 
          This week marked the successful completion and official laying of the foundation stone for the 
          main grandstand. The new facility, designed to meet FIFA standards, will boast a capacity 
          of 50,000 seats and include modern amenities for players, media, and fans. The project is 
          currently projected to be completed in the third quarter of 2026. The SLFA anticipates 
          that the new stadium will not only provide a superior home ground for the Leone Stars but 
          also act as a major catalyst for hosting international tournaments.
      `,
  },
];


