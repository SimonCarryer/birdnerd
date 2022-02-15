const LOCALSTORAGE_KEY = "birdleStats";

const BASE_STATS = {
  currentDaysStreak: 0,
  maxDaysStreak: 0,
  gamesPlayed: 0,
  averageScore: 0,
  // Arbitrary day from the past to start streak counter from
  lastPlayed: new Date(2022, 0, 1),
  scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0 },
};

const getCurrentStats = () => {
  if (!window.localStorage) {
    console.warn("Could not load window.localStorage");
    setStats(BASE_STATS);
    return BASE_STATS;
  }

  const json = window.localStorage.getItem(LOCALSTORAGE_KEY);
  if (json == null) {
    setStats(BASE_STATS);
    return BASE_STATS;
  }

  try {
    return JSON.parse(json);
  } catch (_) {
    setStats(BASE_STATS);
    return BASE_STATS;
  }
};

const updateStats = (statistics) => {
  const currentStats = getCurrentStats();
  const newStats = {};
  for (const keyName of Object.keys(BASE_STATS)) {
    newStats[keyName] = statistics[keyName] ?? currentStats[keyName];
  }
  setStats(newStats);
};

const setStats = (statistics) => {
  window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(statistics));
}

const updateStatsModal = () => {
  const currentStats = getCurrentStats();
  let statsHtml = "";
  statsHtml += getStatContainer(currentStats.gamesPlayed, "Played");
  statsHtml += getStatContainer(currentStats.averageScore, "Average Score");
  statsHtml += getStatContainer(
    currentStats.currentDaysStreak,
    "Current Streak"
  );
  statsHtml += getStatContainer(currentStats.maxDaysStreak, "Max Streak");

  const statsContent = document.getElementById("statistics");
  statsContent.innerHTML = statsHtml;
};

const getStatContainer = (statValue, statName) => {
  return `
    <div class="statistic-container">
      <div class="statistic">${statValue}</div>
      <div class="label">${statName}</div>
    </div>
    `;
};

const bindStatsButtons = () => {
  const statsModal = document.getElementById("statsModal");
  const statsBtn = document.getElementById("statsButton");
  const closeBtn = document.getElementById("statsClose");

  statsBtn.onclick = () => {
    updateStatsModal();
    statsModal.style.display = "block";
  };

  closeBtn.onclick = () => {
    statsModal.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target == statsModal) {
      statsModal.style.display = "none";
    }
  };
};

const endGameUpdateStats = (finalScore) => {
  const currentStats = getCurrentStats();
  if (isDateToday(new Date(currentStats.lastPlayed))) {
    console.log("Already logged stats today");
    return;
  }
  const newScores = {
      ...currentStats.scores,
      [finalScore]: currentStats.scores[finalScore] + 1
  };
  const newDaysStreak = isOnPlayStreak() ? currentStats.currentDaysStreak + 1 : 1;
  updateStats({
      maxDaysStreak: newDaysStreak > currentStats.maxDaysStreak ? newDaysStreak : currentStats.maxDaysStreak,
      currentDaysStreak: newDaysStreak,
      gamesPlayed: currentStats.gamesPlayed + 1,
      averageScore: calculateAverageFromScores(newScores),
      lastPlayed: new Date(), 
      scores: newScores,
  })
}

const isOnPlayStreak = () => {
  const { lastPlayed } = getCurrentStats();

  return isDateYesterday(new Date(lastPlayed))
}

const setTimeToZero = (date) => {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0, 0);

  return date;
}

const isDateYesterday = (date) => {
  const todayDate = new Date();
  setTimeToZero(todayDate);
  const yesterdayDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() - 1);
  setTimeToZero(yesterdayDate);
  setTimeToZero(date);

  return yesterdayDate.getTime() == date.getTime();
}

const isDateToday = (date) => {
  const todayDate = new Date();

  setTimeToZero(todayDate);
  setTimeToZero(date);

  return todayDate.getTime() == date.getTime();
}

const calculateAverageFromScores = (scores) => {
  const totalGames = Object.keys(scores).reduce(
      (total, score) => total + scores[score]
  , 0);
  const totalScore = Object.keys(scores).reduce(
      (total, score) => total + (score * scores[score])
  , 0);

  return (totalScore / totalGames).toFixed(1);
}

bindStatsButtons();
