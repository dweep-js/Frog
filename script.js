let currentLevel = 1; // Current game level
const boxesContainer = document.getElementById("boxes-container");
const playButton = document.getElementById("play-button");
const levelBanner = document.getElementById("level-banner");
const hintsToggle = document.getElementById("hints-toggle");
const hintsMessage = document.getElementById("hints-message");

// Function to generate boxes based on the current level
function generateBoxes() {
  boxesContainer.innerHTML = ""; // Clear previous boxes

  let boxCount;
  let frogCount;

  // Determine box and frog counts based on the level
  if (currentLevel <= 5) {
    boxCount = Math.min(currentLevel * 5, 50); // Up to 25 boxes
    frogCount = Math.max(1, Math.floor((100 - currentLevel) / 10)); // Decrease frogs as levels increase
  } else if (currentLevel === 6) {
    boxCount = 5; // Fixed at 5 boxes
    frogCount = 3; // Fixed at 3 frogs
  } else if (currentLevel === 7) {
    boxCount = 10; // Fixed at 10 boxes
    frogCount = 4; // Fixed at 4 frogs
  } else if (currentLevel <= 10) {
    boxCount = 5; // Fixed at 5 boxes
    frogCount = 3; // Fixed at 3 frogs
  } else if (currentLevel === 11) {
    boxCount = 10; // Fixed at 10 boxes
    frogCount = 2; // Fixed at 2 frogs
  } else if (currentLevel <= 15) {
    boxCount = 5; // Fixed at 5 boxes for levels 12 to 15
    frogCount = Math.max(1, 4 - (currentLevel - 10)); // Reduce frogs gradually
  } else if (currentLevel <= 30) {
    boxCount = 10; // Fixed at 10 boxes for levels 16 to 30
    frogCount = Math.max(1, 5 - Math.floor((currentLevel - 15) / 5)); // Gradually reduce frogs
  } else if (currentLevel <= 50) {
    boxCount = 15; // Fixed at 15 boxes for levels 31 to 50
    frogCount = Math.max(1, 5 - Math.floor((currentLevel - 30) / 5)); // Gradually reduce frogs
  } else if (currentLevel <= 75) {
    boxCount = 20; // Fixed at 20 boxes for levels 51 to 75
    frogCount = Math.max(1, 6 - Math.floor((currentLevel - 50) / 5)); // Adjust frogs accordingly
  } else {
    boxCount = 25; // Max 25 boxes for levels 76 to 100
    frogCount = Math.max(1, 7 - Math.floor((currentLevel - 75) / 5)); // Reduce frogs gradually
  }

  const frogIndices = Array.from({ length: boxCount }, (_, i) => i)
    .sort(() => Math.random() - 0.5)
    .slice(0, frogCount); // Random indices for frogs

  for (let i = 0; i < boxCount; i++) {
    const box = document.createElement("div");
    box.className = "gift-box";
    box.onclick = () => toggleBox(i, frogIndices); // Set click event for the box

    box.innerHTML = `
            <div class="box-head"></div>
            <div class="box-below">
                <img src="frog.png" class="frog-icon" style="display: none;">
            </div>
        `;
    boxesContainer.appendChild(box); // Add box to the container
  }

  // Update level banner here
  levelBanner.textContent = `Current Level: ${currentLevel}`; // Show current level
  hintsMessage.textContent = hintsToggle.checked
    ? generateHints(frogIndices)
    : ""; // Show hints if toggled
}

// Function to handle box click
function toggleBox(index, frogIndices) {
  const selectedBox = boxesContainer.children[index]; // Get the clicked box

  // Check if the clicked box has the frog
  if (frogIndices.includes(index)) {
    selectedBox.classList.add("open"); // Open the box lid
    const frogIcon = selectedBox.querySelector(".frog-icon");
    frogIcon.style.display = "block"; // Show the frog
    frogIcon.classList.add("open"); // Animate the frog coming out

    // Proceed to the next level
    currentLevel++; // Increase level
    resetGame(); // Reset the game for the next level
  } else {
    // Fade out the incorrect box but do not disappear other boxes
    selectedBox.classList.add("fade-out"); // Fade out the incorrect box
    levelBanner.textContent = "You Lose!"; // Show lose message

    // Reset to level 1 after a delay
    currentLevel = 1; // Reset level
    setTimeout(() => {
      generateBoxes(); // Reset the game
    }, 2000); // Reset after 2 seconds
  }
}

// Function to reset the game and proceed to the next level
function resetGame() {
  setTimeout(() => {
    generateBoxes(); // Regenerate boxes for the next level
  }, 2000); // Reset after 2 seconds
}

// Event listener for the play button
playButton.onclick = () => {
  playButton.style.display = "none"; // Hide the play button
  generateBoxes(); // Generate boxes for the game
};

// Event listener for hints toggle
hintsToggle.onchange = () => {
  const boxCount = Math.min(currentLevel * 5, 50); // Update box count
  const frogCount = Math.max(1, Math.floor((100 - currentLevel) / 10));
  const frogIndices = Array.from({ length: boxCount }, (_, i) => i)
    .sort(() => Math.random() - 0.5)
    .slice(0, frogCount);
  hintsMessage.textContent = hintsToggle.checked
    ? generateHints(frogIndices)
    : ""; // Show or hide hints
};

function generateHints(frogIndices) {
  return `The frogs are in boxes: ${frogIndices.map((index) => index + 1).join(", ")}.`;
}
