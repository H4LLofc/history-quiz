// Função para embaralhar as perguntas e alternativas
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let score = 0;
let rightAnswers = 0;
let questionsAnswered = 0;

const quizContainer = document.getElementById("quiz-container");
const calculateButton = document.getElementById("calculateScore");
const scoreDisplay = document.getElementById("scoreDisplay");

// Perguntas do quiz (perguntas em português, respostas todas em inglês)
const questions = [
  {
    question: "Quem foi o responsável pela independência dos Estados Unidos?",
    answers: [
      "George Washington",
      "Thomas Jefferson",
      "Abraham Lincoln",
      "Benjamin Franklin"
    ],
    correct: 0
  },
  {
    question: "Em que ano aconteceu a queda do Muro de Berlim?",
    answers: [
      "1989",
      "1991",
      "1987",
      "1990"
    ],
    correct: 0
  },
  {
    question: "Qual foi a principal causa da Primeira Guerra Mundial?",
    answers: [
      "Imperialism",
      "Nationalism",
      "Assassination of Archduke Franz Ferdinand",
      "Industrial Revolution"
    ],
    correct: 2
  },
  {
    question: "Quem foi o líder da Revolução Francesa?",
    answers: [
      "Napoleon Bonaparte",
      "Maximilien Robespierre",
      "Louis XVI",
      "Jean-Paul Marat"
    ],
    correct: 1
  },
  {
    question: "Qual foi a principal consequência da Revolução Industrial?",
    answers: [
      "Increase in agriculture",
      "Growth of cities and industry",
      "End of colonialism",
      "Advances in medicine"
    ],
    correct: 1
  },
  {
    question: "Em que ano ocorreu a Revolução Russa?",
    answers: [
      "1917",
      "1905",
      "1920",
      "1914"
    ],
    correct: 0
  },
  {
    question: "Quem foi o presidente do Brasil durante a ditadura militar?",
    answers: [
      "Getúlio Vargas",
      "Juscelino Kubitschek",
      "Costa e Silva",
      "Tancredo Neves"
    ],
    correct: 2
  },
  {
    question: "Qual evento iniciou a Segunda Guerra Mundial?",
    answers: [
      "Assassination of Archduke Franz Ferdinand",
      "Invasion of Poland by Germany",
      "Attack on Pearl Harbor",
      "Invasion of France by Germany"
    ],
    correct: 1
  },
  {
    question: "Quem foi o líder do regime nazista na Alemanha?",
    answers: [
      "Joseph Stalin",
      "Benito Mussolini",
      "Adolf Hitler",
      "Franz von Papen"
    ],
    correct: 2
  },
  {
    question: "Em que ano foi assinada a Carta Magna na Inglaterra?",
    answers: [
      "1215",
      "1492",
      "1776",
      "1066"
    ],
    correct: 0
  },
  {
    question: "Quem foi o imperador romano que legalizou o cristianismo?",
    answers: [
      "Julius Caesar",
      "Nero",
      "Constantine",
      "Augustus"
    ],
    correct: 2
  },
  {
    question: "Em que ano ocorreu a Primeira Guerra Mundial?",
    answers: [
      "1912",
      "1914",
      "1920",
      "1939"
    ],
    correct: 1
  },
  {
    question: "Qual foi o nome da embarcação que afundou em 1912?",
    answers: [
      "Titanic",
      "Britannic",
      "Lusitania",
      "Olympic"
    ],
    correct: 0
  },
  {
    question: "Quem foi o líder da Revolução Russa?",
    answers: [
      "Vladimir Lenin",
      "Joseph Stalin",
      "Nikita Khrushchev",
      "Leon Trotsky"
    ],
    correct: 0
  },
  {
    question: "Em que ano ocorreu o ataque a Pearl Harbor?",
    answers: [
      "1939",
      "1941",
      "1943",
      "1945"
    ],
    correct: 1
  },
  {
    question: "Quem foi o responsável pela unificação da Alemanha?",
    answers: [
      "Otto von Bismarck",
      "Kaiser Wilhelm I",
      "Adolf Hitler",
      "Karl Marx"
    ],
    correct: 0
  },
  {
    question: "Qual foi a principal causa da Guerra Civil Americana?",
    answers: [
      "Economic disputes",
      "Abolition of slavery",
      "Civil rights disagreements",
      "Territorial issues"
    ],
    correct: 1
  },
  {
    question: "Quem foi o primeiro presidente dos Estados Unidos?",
    answers: [
      "Thomas Jefferson",
      "George Washington",
      "Abraham Lincoln",
      "John Adams"
    ],
    correct: 1
  },
  {
    question: "Qual evento marcou o fim da Idade Média?",
    answers: [
      "Fall of Constantinople",
      "Discovery of America",
      "French Revolution",
      "Protestant Reformation"
    ],
    correct: 0
  },
  {
    question: "Em que ano começou a Revolução Francesa?",
    answers: [
      "1789",
      "1792",
      "1795",
      "1800"
    ],
    correct: 0
  }
];

// Embaralha perguntas
shuffle(questions);

// Função para exibir as perguntas no HTML
function displayQuestion(q, index) {
  const questionDiv = document.createElement("div");
  questionDiv.classList.add("question");

  const questionText = document.createElement("h2");
  questionText.textContent = `${index + 1}. ${q.question}`;
  questionDiv.appendChild(questionText);

  const optionsDiv = document.createElement("div");
  optionsDiv.classList.add("options");

  const feedbackText = document.createElement("p");
  feedbackText.classList.add("feedback");

  // Embaralha alternativas e atualiza índice da correta
  const answerPairs = q.answers.map((ans, idx) => ({ text: ans, index: idx }));
  shuffle(answerPairs);
  const shuffledAnswers = answerPairs.map(a => a.text);
  const newCorrectIndex = answerPairs.findIndex(a => a.index === q.correct);
  q.answers = shuffledAnswers;
  q.correct = newCorrectIndex;

  q.answers.forEach((answer, i) => {
    const button = document.createElement("button");
    button.classList.add("option-button");
    const letter = String.fromCharCode(65 + i); // A, B, C, D
    button.textContent = `${letter} - ${answer}`;

    button.addEventListener("click", () => {
      if (optionsDiv.classList.contains("answered")) return;

      optionsDiv.classList.add("answered");

      const buttons = optionsDiv.querySelectorAll("button");
      buttons.forEach((btn, btnIndex) => {
        btn.classList.add("disabled");
        if (btnIndex === q.correct) {
          btn.classList.add("correct");
        } else {
          btn.classList.add("wrong");
        }
      });

      const isCorrect = i === q.correct;
      const feedbackSymbol = isCorrect ? "✅" : "❌";
      feedbackText.textContent = `You chose: ${button.textContent} ${feedbackSymbol}`;
      questionDiv.appendChild(feedbackText);

      if (isCorrect) {
        score += 10;
        rightAnswers++;
      }

      questionsAnswered++;

      if (questionsAnswered === questions.length) {
        calculateButton.style.display = "inline-block";
      }
    });

    optionsDiv.appendChild(button);
  });

  questionDiv.appendChild(optionsDiv);
  quizContainer.appendChild(questionDiv);
}

// Exibe todas as perguntas
questions.forEach((q, index) => {
  displayQuestion(q, index);
});

// Função para calcular e exibir a pontuação
calculateButton.addEventListener("click", () => {
  scoreDisplay.textContent =
    `You scored ${score} out of 200 points!\n` +
    `You got ${rightAnswers} out of 20 questions right!`;

  // Recupera o login do localStorage
  const userLogin = localStorage.getItem("username");

  // Salva a pontuação do usuário
  const userScores = JSON.parse(localStorage.getItem("userScores")) || [];
  userScores.push({ username: userLogin, score, rightAnswers });

  localStorage.setItem("userScores", JSON.stringify(userScores));
});
