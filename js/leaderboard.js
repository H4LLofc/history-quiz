function loadLeaderboard() {
  const leaderboardContainer = document.getElementById("leaderboard-container");
  leaderboardContainer.innerHTML = ""; // limpa conteúdo antigo

  let userScores = JSON.parse(localStorage.getItem("userScores")) || [];

  // Remove duplicatas e mantém a maior pontuação
  const uniqueScores = {};
  userScores.forEach(({ username, score }) => {
    if (!uniqueScores[username] || score > uniqueScores[username]) {
      uniqueScores[username] = score;
    }
  });

  const topScores = Object.entries(uniqueScores)
    .map(([username, score]) => ({ username, score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  if (topScores.length === 0) {
    leaderboardContainer.innerHTML = "<p class='mensagem'>Ainda não há placar registrado.</p>";
    return;
  }

  const table = document.createElement("table");

  const headerRow = document.createElement("tr");
  ["Posição", "Jogador", "Pontuação"].forEach((text) => {
    const th = document.createElement("th");
    th.textContent = text;
    headerRow.appendChild(th);
  });

  table.appendChild(headerRow);

  topScores.forEach((entry, index) => {
    const row = document.createElement("tr");
    [index + 1, entry.username, entry.score].forEach((text) => {
      const td = document.createElement("td");
      td.textContent = text;
      row.appendChild(td);
    });
    table.appendChild(row);
  });

  leaderboardContainer.appendChild(table);
}

document.addEventListener("DOMContentLoaded", loadLeaderboard);
