// ================== STATE ==================
let lives = 3;
let gameOver = false;
let soundOn = true;
let currentLevel = "easy";
let levelIndex = 0;
let gameMode = "normal";
const QUESTIONS_PER_LEVEL = {
  easy: 5,
  medium: 5,
  hard: 5
};


let correctSound = new Audio("sounds/correct.mp3");
let wrongSound = new Audio("sounds/wrong.mp3");
let timeoutSound = new Audio("sounds/timeout.mp3");
let clutchSound = new Audio("sounds/clutch.mp3");
clutchSound.loop = true;
clutchSound.volume = 0.8; // intense 


let answered = false;
let timeLeft = 10;
let timerInterval;
let score = 0;

// ================== QUESTIONS ==================
let questions = [
 
  // 🟢 EASY (15)
  { q: "Who is the captain of the Straw Hat Pirates?", options: ["Zoro","Luffy","Sanji","Usopp"], answer: 1, level: "easy" },
  { q: "What is Luffy's dream?", options: ["Become Marine","Find All Blue","Become Pirate King","Defeat Shanks"], answer: 2, level: "easy" },
  { q: "Who is the swordsman of the Straw Hat crew?", options: ["Sanji","Zoro","Brook","Franky"], answer: 1, level: "easy" },
  { q: "Which devil fruit did Luffy eat?", options: ["Mera Mera","Gomu Gomu","Ope Ope","Hito Hito"], answer: 1, level: "easy" },
  { q: "Who is the navigator of the Straw Hats?", options: ["Robin","Nami","Vivi","Hancock"], answer: 1, level: "easy" },
  { q: "Who is the cook of the Straw Hat Pirates?", options: ["Usopp","Zoro","Sanji","Franky"], answer: 2, level: "easy" },
  { q: "What is the name of the Straw Hats' ship after Going Merry?", options: ["Red Force","Oro Jackson","Thousand Sunny","Moby Dick"], answer: 2, level: "easy" },
  { q: "Who is Luffy's grandfather?", options: ["Dragon","Roger","Garp","Sengoku"], answer: 2, level: "easy" },
  { q: "Which sea did Luffy start his journey in?", options: ["West Blue","North Blue","East Blue","South Blue"], answer: 2, level: "easy" },
  { q: "Who is the doctor of the Straw Hat crew?", options: ["Robin","Brook","Chopper","Law"], answer: 2, level: "easy" },
  { q: "What is Zoro's goal?", options: ["Pirate King","World's Greatest Swordsman","Find One Piece","Protect Luffy"], answer: 1, level: "easy" },
  { q: "Who is the sniper of the Straw Hat crew?", options: ["Usopp","Franky","Sanji","Brook"], answer: 0, level: "easy" },
  { q: "Which Straw Hat uses a slingshot?", options: ["Zoro","Usopp","Chopper","Nami"], answer: 1, level: "easy" },
  { q: "Who can read Poneglyphs?", options: ["Nami","Robin","Vivi","Hancock"], answer: 1, level: "easy" },
  { q: "Sanji mainly fights using?", options: ["Hands","Swords","Kicks","Guns"], answer: 2, level: "easy" },

  // 🟡 MEDIUM (15)
  { q: "Who was the first member to join Luffy's crew?", options: ["Nami","Usopp","Zoro","Sanji"], answer: 2, level: "medium" },
  { q: "What is Zoro's sword style called?", options: ["Two Sword","Three Sword","Four Sword","One Sword"], answer: 1, level: "medium" },
  { q: "What is Sanji's dream?", options: ["Pirate King","Find All Blue","Defeat Zoro","Open Restaurant"], answer: 1, level: "medium" },
  { q: "Who gave Luffy his straw hat?", options: ["Garp","Shanks","Roger","Dragon"], answer: 1, level: "medium" },
  { q: "Which organization was Robin part of before Straw Hats?", options: ["Marines","Baroque Works","CP9","Revolutionaries"], answer: 1, level: "medium" },
  { q: "What devil fruit did Chopper eat?", options: ["Inu Inu","Hito Hito","Ushi Ushi","Kame Kame"], answer: 1, level: "medium" },
  { q: "Who is the shipwright of the Straw Hats?", options: ["Brook","Franky","Iceburg","Paulie"], answer: 1, level: "medium" },
  { q: "Luffy's bounty after Enies Lobby?", options: ["200M","300M","400M","500M"], answer: 1, level: "medium" },
  { q: "Which arc introduced Gear Second?", options: ["Skypiea","Enies Lobby","Thriller Bark","Marineford"], answer: 1, level: "medium" },
  { q: "Who trained Luffy during the time skip?", options: ["Rayleigh","Garp","Dragon","Kuma"], answer: 0, level: "medium" },
  { q: "What sea comes after Grand Line?", options: ["Calm Belt","New World","East Blue","West Blue"], answer: 1, level: "medium" },
  { q: "Who is the captain of the Heart Pirates?", options: ["Kid","Law","Drake","Apoo"], answer: 1, level: "medium" },
  { q: "Who defeated Enel?", options: ["Zoro","Sanji","Luffy","Wyper"], answer: 2, level: "medium" },
  { q: "Brook's role in the crew?", options: ["Doctor","Musician","Fighter","Navigator"], answer: 1, level: "medium" },
  { q: "Which island is Robin from?", options: ["Ohara","Alabasta","Skypiea","Wano"], answer: 0, level: "medium" },

  // 🔴 HARD (10)
  { q: "What is Gold Roger's real name?", options: ["Gold Roger","Gol D. Roger","Roger D. Gol","Gol Roger"], answer: 1, level: "hard" },
  { q: "Which Warlord defeated Luffy twice in Alabasta?", options: ["Kuma","Crocodile","Doflamingo","Moria"], answer: 1, level: "hard" },
  { q: "Who is Luffy's father?", options: ["Garp","Roger","Dragon","Shanks"], answer: 2, level: "hard" },
  { q: "Name of Gol D. Roger's ship?", options: ["Red Force","Oro Jackson","Thousand Sunny","Moby Dick"], answer: 1, level: "hard" },
  { q: "Which Straw Hat awakened Observation Haki first?", options: ["Luffy","Zoro","Usopp","Sanji"], answer: 2, level: "hard" },
  { q: "Which Ancient Weapon is Poseidon?", options: ["Pluton","Uranus","Sea Kings","Noah"], answer: 2, level: "hard" },
  { q: "Who killed Whitebeard?", options: ["Akainu","Blackbeard","Marines","Blackbeard Pirates"], answer: 3, level: "hard" },
  { q: "Zoro's hometown is?", options: ["Wano","Shimotsuki Village","Ringo","Loguetown"], answer: 1, level: "hard" },
  { q: "Which Yonko was first defeated by Luffy?", options: ["Big Mom","Shanks","Kaido","Blackbeard"], answer: 2, level: "hard" },
  { q: "What does the 'D.' represent?", options: ["Devil","Destiny","Will of D","Dawn"], answer: 2, level: "hard" }
];


// ================== HELPERS ==================
function getCurrentLevelQuestions() {
  return gameQuestions[currentLevel];
}


function updateLives() {
  document.getElementById("lives").innerText = "❤️".repeat(lives);
}
let gameQuestions = {
  easy: [],
  medium: [],
  hard: []
};

function prepareRandomQuestions() {
  gameQuestions.easy = shuffleArray(
    questions.filter(q => q.level === "easy")
  ).slice(0, QUESTIONS_PER_LEVEL.easy);

  gameQuestions.medium = shuffleArray(
    questions.filter(q => q.level === "medium")
  ).slice(0, QUESTIONS_PER_LEVEL.medium);

  gameQuestions.hard = shuffleArray(
    questions.filter(q => q.level === "hard")
  ).slice(0, QUESTIONS_PER_LEVEL.hard);
}

// ================== LOAD QUESTION ==================
function loadQuestion() {
  resetSlowMo();
  answered = false;
  updateLives();

  const levelQuestions = getCurrentLevelQuestions();
  const q = levelQuestions[levelIndex];

  document.getElementById("progress").innerText =
    currentLevel.toUpperCase() + " — Question " +
    (levelIndex + 1) + " / " + levelQuestions.length;

  document.getElementById("question").innerText = q.q;
  document.getElementById("charImage").src = "images/question.png";

  const buttons = document.getElementsByClassName("option");
  for (let i = 0; i < 4; i++) {
    buttons[i].innerText = q.options[i];
    buttons[i].style.background = "#3a86ff";
    buttons[i].disabled = false;
  }

  startTimer();
}

// ================== ANSWER ==================
function checkAnswer(selected) {
  resetSlowMo();
  if (answered) return;
  answered = true;
  clearInterval(timerInterval);

  const q = getCurrentLevelQuestions()[levelIndex];

  // ✅ img optional
  document.getElementById("charImage").src =
    q.img || "images/question.png";

  const buttons = document.getElementsByClassName("option");
  for (let b of buttons) b.disabled = true;

  if (selected === q.answer) {
    score++;
    if (soundOn) {
      correctSound.currentTime = 0;
      correctSound.play();
    }
    buttons[selected].style.background = "green";
  } else {
    if (soundOn) {
      wrongSound.currentTime = 0;
      wrongSound.play();
    }
    buttons[selected].style.background = "red";
    buttons[q.answer].style.background = "green";

    lives--;
    updateLives();
    if (lives === 1) {
  activateClutchMode();
}
    if (lives === 1 && soundOn) {
  clutchSound.currentTime = 0;
  clutchSound.play();
}

    if (lives === 0) {
      gameOver = true;
      setTimeout(showEndScreen, 700);
      return;
    }
  }

  const scoreEl = document.getElementById("score");
  scoreEl.innerText = "Score: " + score;
  scoreEl.classList.remove("score-pop");
  void scoreEl.offsetWidth;
  scoreEl.classList.add("score-pop");
}

// ================== TIMER ==================
function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 10;
  document.getElementById("timer").innerText = "⏱️ Time: " + timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    const timerEl = document.getElementById("timer");
timerEl.innerText = "⏱️ Time: " + timeLeft;

if (timeLeft <= 3 && timeLeft > 0) {
  timerEl.classList.add("slow-text");
  document.querySelector(".quiz-box").classList.add("slow-mo");
}


    if (timeLeft === 0) {
      clearInterval(timerInterval);
      autoWrong();
    }
  }, 1000);
}

function autoWrong() {
  resetSlowMo();
  if (answered) return;
  answered = true;

  if (soundOn) {
    timeoutSound.currentTime = 0;
    timeoutSound.play();
  }

  lives--;
  updateLives();
  if (lives === 1) {
  activateClutchMode();
}
  if (lives === 1 && soundOn) {
  clutchSound.currentTime = 0;
  clutchSound.play();
}

  const q = getCurrentLevelQuestions()[levelIndex];

  // ✅ img optional
  document.getElementById("charImage").src =
    q.img || "images/question.png";

  const buttons = document.getElementsByClassName("option");
  for (let b of buttons) b.disabled = true;
  buttons[q.answer].style.background = "green";

  if (lives === 0) {
    gameOver = true;
    setTimeout(showEndScreen, 700);
  }
}

// ================== NEXT ==================
function nextQuestion() {
  if (!answered) {
    alert("Answer first! 🏴‍☠️");
    return;
  }

  const levelQuestions = getCurrentLevelQuestions();

  if (levelIndex < levelQuestions.length - 1) {
    levelIndex++;
    loadQuestion();
  } else {
    if (currentLevel === "easy") {
      currentLevel = "medium";
      levelIndex = 0;
      showLevelMessage("🔥 Medium Level Unlocked!", loadQuestion);
    } else if (currentLevel === "medium") {
      currentLevel = "hard";
      levelIndex = 0;
      showLevelMessage("😈 Hard Level Unlocked!", loadQuestion);
    } else {
      gameOver = false;
      showEndScreen();
    }
  }
}
function activateClutchMode() {
  if (soundOn) {
    clutchSound.currentTime = 0;
    clutchSound.play();
  }

  document.querySelector(".quiz-box").classList.add("shake");
  document.querySelector(".quiz-box").classList.add("clutch-glow");
}
function stopClutchMode() {
  clutchSound.pause();
  clutchSound.currentTime = 0;

  const box = document.querySelector(".quiz-box");
  box.classList.remove("shake");
  box.classList.remove("clutch-glow");
}

// ================== END / RESTART ==================
function showEndScreen() {
  stopClutchMode();

  clutchSound.pause();
clutchSound.currentTime = 0;

  const quiz = document.querySelector(".quiz-box");
  const end = document.getElementById("endScreen");
  const title = end.querySelector("h1");

  quiz.style.display = "none";
  end.style.display = "block";

  end.classList.remove("game-over", "quiz-complete");

  if (gameOver) {
    title.innerText = "💀 Game Over!";
    end.classList.add("game-over");
  } else {
    title.innerText = "🏴‍☠️ Quiz Complete!";
    end.classList.add("quiz-complete");
  }

  const totalPlayed =   
  QUESTIONS_PER_LEVEL.easy +
  QUESTIONS_PER_LEVEL.medium +
  QUESTIONS_PER_LEVEL.hard;

document.getElementById("finalScore").innerText =
  "Final Score: " + score + " / " + totalPlayed;


  let rank =
    score <= 9 ? "Casual Fan 😅" :
    score <= 12 ? "Straw Hat Crew 🏴‍☠️" :
    "Yonko Level 👑🔥";

  document.getElementById("rank").innerText = "Rank: " + rank;
}
function resetSlowMo() {
  document.getElementById("timer").classList.remove("slow-text");
  document.querySelector(".quiz-box").classList.remove("slow-mo");
}

function restartQuiz() {
  score = 0;
  lives = 3;
  currentLevel = "easy";
  levelIndex = 0;
  answered = false;
  gameOver = false;
 clutchSound.pause();
clutchSound.currentTime = 0;
stopClutchMode();


  document.getElementById("score").innerText = "Score: 0";
  document.getElementById("endScreen").style.display = "none";
  document.querySelector(".quiz-box").style.display = "none";
  document.getElementById("modeSelect").style.display = "flex";
}

// ================== SOUND TOGGLE ==================
function toggleSound() {
  soundOn = !soundOn;
  document.getElementById("soundToggle").innerText =
    soundOn ? "🔊" : "🔇";
}

// ================== LEVEL MESSAGE ==================
function showLevelMessage(text, callback) {
  const box = document.getElementById("levelMessage");
  const txt = document.getElementById("levelText");

  txt.innerText = text;
  box.style.display = "flex";

  setTimeout(() => {
    box.style.display = "none";
    callback();
  }, 2000);
}
function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}


// ================== START GAME ==================
function startGame(mode) {
  gameMode = mode;
  lives = (mode === "hardcore") ? 1 : 3;
  updateLives();

  score = 0;
  answered = false;
  currentLevel = "easy";
  levelIndex = 0;

  document.getElementById("modeSelect").style.display = "none";
  document.querySelector(".quiz-box").style.display = "block";
  document.getElementById("score").innerText = "Score: 0";
prepareRandomQuestions();
  loadQuestion();
}

// ================== INITIAL ==================
document.querySelector(".quiz-box").style.display = "none";
document.getElementById("modeSelect").style.display = "flex";
