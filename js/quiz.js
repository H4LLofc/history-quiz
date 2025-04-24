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

// Array original de perguntas
const questions = [
  {
    question: "Quem foi o primeiro presidente dos Estados Unidos?",
    answers: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"],
    correct: 1
  },
  {
    question: "Em que ano começou a Segunda Guerra Mundial?",
    answers: ["1945", "1939", "1918", "1941"],
    correct: 1
  },
  {
    question: "Qual império construiu a Muralha da China?",
    answers: ["Mongol Empire", "Chinese Empire", "Roman Empire", "Ottoman Empire"],
    correct: 1
  },
  {
    question: "Onde ocorreu a Revolução Francesa?",
    answers: ["Spain", "Portugal", "France", "Germany"],
    correct: 2
  },
  {
    question: "Quem descobriu o Brasil em 1500?",
    answers: ["Christopher Columbus", "Pedro Álvares Cabral", "Ferdinand Magellan", "Vasco da Gama"],
    correct: 1
  },
  {
    question: "Qual cidade foi destruída por uma erupção do vulcão Vesúvio?",
    answers: ["Athens", "Pompeii", "Carthage", "Rome"],
    correct: 1
  },
  {
    question: "Qual era o nome da guerra entre o Norte e o Sul dos EUA?",
    answers: ["Revolutionary War", "Civil War", "World War I", "Vietnam War"],
    correct: 1
  },
  {
    question: "Quem foi o líder da Alemanha durante a Segunda Guerra Mundial?",
    answers: ["Winston Churchill", "Joseph Stalin", "Adolf Hitler", "Benito Mussolini"],
    correct: 2
  },
  {
    question: "Qual país usou pela primeira vez armas nucleares em guerra?",
    answers: ["Russia", "United States", "Germany", "Japan"],
    correct: 1
  },
  {
    question: "Em que país nasceu Napoleão Bonaparte?",
    answers: ["France", "Italy", "Germany", "Spain"],
    correct: 0
  },
  {
    question: "Quem foi o imperador romano assassinado em 44 a.C.?",
    answers: ["Augustus", "Nero", "Caligula", "Julius Caesar"],
    correct: 3
  },
  {
    question: "O que foi o Renascimento?",
    answers: ["Cultural movement", "Religious protest", "Economic collapse", "Political war"],
    correct: 0
  },
  {
    question: "Em que ano caiu o Muro de Berlim?",
    answers: ["1990", "1989", "1985", "1991"],
    correct: 1
  },
  {
    question: "Quem pintou a Última Ceia?",
    answers: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Donatello"],
    correct: 0
  },
  {
    question: "Quem foi o revolucionário argentino famoso em Cuba?",
    answers: ["Fidel Castro", "Che Guevara", "Hugo Chávez", "Simón Bolívar"],
    correct: 1
  },
  {
    question: "Onde surgiu a democracia antiga?",
    answers: ["Rome", "Egypt", "Babylon", "Greece"],
    correct: 3
  },
  {
    question: "Qual foi o navio famoso que afundou em 1912?",
    answers: ["Lusitania", "Titanic", "Queen Mary", "Britannic"],
    correct: 1
  },
  {
    question: "Qual civilização construiu as pirâmides?",
    answers: ["Mayans", "Romans", "Greeks", "Egyptians"],
    correct: 3
  },
  {
    question: "Qual país colonizou o Brasil?",
    answers: ["Spain", "Portugal", "France", "Netherlands"],
    correct: 1
  },
  {
    question: "Quem foi Martin Luther King Jr.?",
    answers: ["President", "Soldier", "Singer", "Civil rights leader"],
    correct: 3
  }
];

// Embaralha perguntas
shuffle(questions);

questions.forEach((q, index) => {
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
  const originalAnswers = [...q.answers];
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
      feedbackText.textContent = `Você escolheu: ${button.textContent} ${feedbackSymbol}`;
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
});

calculateButton.addEventListener("click", () => {
  scoreDisplay.textContent =
    `Você marcou ${score} pontos de 200 possíveis!\n` +
    `Você acertou ${rightAnswers} de 20 questões!`;
});
