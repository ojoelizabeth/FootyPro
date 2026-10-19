function showPlan(position) {
    const plans = {
        AMF: {
            title: "Attacking Midfielder Training",
            drills: [
                "10 minutes: Ball control",
                "10 minutes: Short and long passing",
                "10 minutes: Scanning and turning",
                "10 minutes: Through-ball practice",
                "10 minutes: Shooting from outside the box"
            ]
        },

        Winger: {
            title: "Winger Training",
            drills: [
                "10 minutes: Ball control",
                "10 minutes: Acceleration practice",
                "10 minutes: Dribbling past cones",
                "10 minutes: Crossing practice",
                "10 minutes: Finishing from wide areas"
            ]
        },

        Striker: {
            title: "Striker Training",
            drills: [
                "10 minutes: Ball control",
                "10 minutes: First-touch practice",
                "10 minutes: Finishing practice",
                "10 minutes: Movement into space",
                "10 minutes: Passing and link-up play"
            ]
        },

        Defender: {
            title: "Defender Training",
            drills: [
                "10 minutes: Passing practice",
                "10 minutes: Defensive positioning",
                "10 minutes: Footwork and agility",
                "10 minutes: Interception practice",
                "10 minutes: Aerial-ball technique"
            ]
        },

        Goalkeeper: {
            title: "Goalkeeper Training",
            drills: [
                "10 minutes: Catching technique",
                "10 minutes: Footwork",
                "10 minutes: Positioning",
                "10 minutes: Distribution practice",
                "10 minutes: Reaction drills"
            ]
        }
    };

    const selectedPlan = plans[position];
    const level = document.getElementById("player-level").value;

let levelAdvice = "";

if (level === "Beginner") {
    levelAdvice = "Start slowly, focus on correct technique, and rest between drills.";
} else if (level === "Intermediate") {
    levelAdvice = "Focus on consistency, improve your technique, and gradually increase difficulty.";
} else if (level === "Advanced") {
    levelAdvice = "Challenge yourself with game-like drills while maintaining good technique and recovery.";
}

    const planHTML = `
    <h2>${selectedPlan.title}</h2>
    <p><strong>Your training advice:</strong> ${levelAdvice}</p>
    `;

    document.getElementById("training-plan").innerHTML = planHTML;
}
// Weekly football training schedule
const weeklySchedule = [
    {
        day: "Monday",
        activity: "Ball Control and Passing",
        duration: "30 minutes"
    },
    {
        day: "Tuesday",
        activity: "Speed and Acceleration",
        duration: "25 minutes"
    },
    {
        day: "Wednesday",
        activity: "Shooting and Finishing",
        duration: "30 minutes"
    },
    {
        day: "Thursday",
        activity: "Agility and Footwork",
        duration: "25 minutes"
    },
    {
        day: "Friday",
        activity: "Position-Specific Practice",
        duration: "30 minutes"
    },
    {
        day: "Saturday",
        activity: "Light Ball Work and Technique",
        duration: "20 minutes"
    },
    {
        day: "Sunday",
        activity: "Rest and Recovery",
        duration: "Rest day"
    }
];

// Load saved progress
let completedSessions = JSON.parse(
    localStorage.getItem("footyProProgress") || "[]"
);

// Display the weekly schedule
function displayWeeklySchedule() {
    const scheduleContainer =
        document.getElementById("weekly-schedule");

    scheduleContainer.innerHTML = weeklySchedule.map((session, index) => `
        <div class="session-card">
            <h3>${session.day}</h3>
            <p>${session.activity}</p>
            <p>${session.duration}</p>

            <label>
                <input
                    type="checkbox"
                    ${completedSessions.includes(index) ? "checked" : ""}
                    onchange="toggleSession(${index}, this.checked)"
                >
                Mark as completed
            </label>
        </div>
    `).join("");

    updateProgress();
}

// Mark a session as completed or incomplete
function toggleSession(index, isCompleted) {
    if (isCompleted && !completedSessions.includes(index)) {
        completedSessions.push(index);
    }

    if (!isCompleted) {
        completedSessions = completedSessions.filter(
            sessionIndex => sessionIndex !== index
        );
    }

    localStorage.setItem(
        "footyProProgress",
        JSON.stringify(completedSessions)
    );

    updateProgress();
}

// Update the progress counter
function updateProgress() {
    document.getElementById("completed-count").textContent =
        completedSessions.length;function updateProgress() {
    // Update the weekly session counter
    document.getElementById("completed-count").textContent =
        completedSessions.length;

    // Update the dashboard statistic
    document.getElementById("dashboard-completed").textContent =
        completedSessions.length;

    // Update the green progress bar
    const percentage = (completedSessions.length / weeklySchedule.length) * 100;

    document.getElementById("progress-bar").style.width =
        percentage + "%";
}
}

// Reset weekly progress
function resetProgress() {
    completedSessions = [];

    localStorage.removeItem("footyProProgress");

    displayWeeklySchedule();
}

// Display the schedule when the page loads
displayWeeklySchedule();
// Load the saved player profile
function loadProfile() {
    const savedProfile = JSON.parse(
        localStorage.getItem("footyProProfile") || "null"
    );

    if (savedProfile) {
        document.getElementById("player-name").value =
            savedProfile.name;

        document.getElementById("player-position").value =
            savedProfile.position;

        document.getElementById("player-level").value =
            savedProfile.level;

        document.getElementById("profile-message").textContent =
            "Welcome back, " + savedProfile.name + "!";

            showPlan(savedProfile.position);
    }
}

// Save the player profile
function saveProfile() {
    const name = document.getElementById("player-name").value.trim();

    const position =
        document.getElementById("player-position").value;

    const level =
        document.getElementById("player-level").value;

    if (!name) {
        document.getElementById("profile-message").textContent =
            "Please enter your name first.";

        return;
    }

    const profile = {
        name: name,
        position: position,
        level: level
    };

    localStorage.setItem(
        "footyProProfile",
        JSON.stringify(profile)
    );

    document.getElementById("profile-message").textContent =
        "Profile saved successfully! Welcome, " + name + "!";

    document.getElementById("dashboard-name").textContent = name;
    // Automatically show the player's preferred training plan
    showPlan(position);
}

// Load profile when the page opens
loadProfile();