// script.js (fully working with questions loaded)
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-button');
const scoreboard = document.getElementById('scoreboard');
const highScoresList = document.getElementById('high-scores-list');
const feedbackElement = document.getElementById('feedback');
const topicSelect = document.getElementById('topic-select');
const startButton = document.getElementById('start-button');
const progressInfo = document.getElementById('progress-info');

let currentQuestionIndex = 0;
let score = 0;
let currentQuestions = [];

const quizData = {
    dsa: [
        {
        question: "Which data structure uses LIFO?",
        answers: [
        { text: "Queue", correct: false },
        { text: "Stack", correct: true },
        { text: "Array", correct: false },
        { text: "Linked List", correct: false }
        ]
    },
    {
        question: "What is the time complexity of Binary Search?",
        answers: [
        { text: "O(n)", correct: false },
        { text: "O(log n)", correct: true },
        { text: "O(n log n)", correct: false },
        { text: "O(1)", correct: false }
        ]
    },
    {
        question: "Which sorting algorithm is not stable?",
        answers: [
        { text: "Merge Sort", correct: false },
        { text: "Bubble Sort", correct: false },
        { text: "Quick Sort", correct: true },
        { text: "Insertion Sort", correct: false }
        ]
    },
    {
        question: "Which traversal is used for expression trees?",
        answers: [
        { text: "Inorder", correct: false },
        { text: "Postorder", correct: true },
        { text: "Preorder", correct: false },
        { text: "Level Order", correct: false }
        ]
    },
    {
        question: "Which data structure is used in BFS?",
        answers: [
        { text: "Stack", correct: false },
        { text: "Queue", correct: true },
        { text: "Tree", correct: false },
        { text: "Graph", correct: false }
        ]
      }
    ],
    dbms: [
      {
        question: "Which language is used for querying databases?",
        answers: [
          { text: "HTML", correct: false },
          { text: "SQL", correct: true },
          { text: "CSS", correct: false },
          { text: "XML", correct: false }
        ]
      },
      {
        question: "What does ACID stand for?",
        answers: [
          { text: "Add, Create, Inspect, Delete", correct: false },
          { text: "Atomicity, Consistency, Isolation, Durability", correct: true },
          { text: "Atomicity, Check, Index, Durability", correct: false },
          { text: "All Columns in DB", correct: false }
        ]
      },
      {
        question: "Which key uniquely identifies each row in a table?",
        answers: [
          { text: "Foreign key", correct: false },
          { text: "Primary key", correct: true },
          { text: "Candidate key", correct: false },
          { text: "Index", correct: false }
        ]
      },
      {
        question: "Which normal form removes partial dependency?",
        answers: [
          { text: "1NF", correct: false },
          { text: "2NF", correct: true },
          { text: "3NF", correct: false },
          { text: "BCNF", correct: false }
        ]
      },
      {
        question: "What is the result of a JOIN operation?",
        answers: [
          { text: "Single column", correct: false },
          { text: "Combined table", correct: true },
          { text: "Subquery", correct: false },
          { text: "Procedure", correct: false }
        ]
      }
    ],
    os: [
      {
        question: "Which of the following is not an OS?",
        answers: [
          { text: "Windows", correct: false },
          { text: "Linux", correct: false },
          { text: "Oracle", correct: true },
          { text: "MacOS", correct: false }
        ]
      },
      {
        question: "Which scheduling algorithm is non-preemptive?",
        answers: [
          { text: "Round Robin", correct: false },
          { text: "FCFS", correct: true },
          { text: "SJF (Preemptive)", correct: false },
          { text: "Priority (Preemptive)", correct: false }
        ]
      },
      {
        question: "What is a critical section?",
        answers: [
          { text: "Section for critical bugs", correct: false },
          { text: "Section of memory with viruses", correct: false },
          { text: "Section where shared resources are accessed", correct: true },
          { text: "None of these", correct: false }
        ]
      },
      {
        question: "Which system call creates a new process?",
        answers: [
          { text: "exec()", correct: false },
          { text: "fork()", correct: true },
          { text: "exit()", correct: false },
          { text: "wait()", correct: false }
        ]
      },
      {
        question: "What is the full form of DMA?",
        answers: [
          { text: "Direct Memory Access", correct: true },
          { text: "Data Memory Access", correct: false },
          { text: "Direct Machine Access", correct: false },
          { text: "Data Manipulation Access", correct: false }
        ]
      }
    ],
    cn: [
      {
        question: "Which protocol is used to send email?",
        answers: [
          { text: "HTTP", correct: false },
          { text: "SMTP", correct: true },
          { text: "FTP", correct: false },
          { text: "TCP", correct: false }
        ]
      },
      {
        question: "What is the full form of IP?",
        answers: [
          { text: "Internet Packet", correct: false },
          { text: "Internet Protocol", correct: true },
          { text: "Internal Protocol", correct: false },
          { text: "Interface Protocol", correct: false }
        ]
      },
      {
        question: "Which layer is responsible for routing?",
        answers: [
          { text: "Transport", correct: false },
          { text: "Network", correct: true },
          { text: "Data Link", correct: false },
          { text: "Physical", correct: false }
        ]
      },
      {
        question: "Which device connects different networks?",
        answers: [
          { text: "Switch", correct: false },
          { text: "Router", correct: true },
          { text: "Hub", correct: false },
          { text: "Repeater", correct: false }
        ]
      },
      {
        question: "HTTP works on which layer?",
        answers: [
          { text: "Network", correct: false },
          { text: "Transport", correct: false },
          { text: "Application", correct: true },
          { text: "Session", correct: false }
        ]
      }
    ],
    web: [
      {
        question: "What does HTML stand for?",
        answers: [
          { text: "Hyper Text Markup Language", correct: true },
          { text: "Hyper Tool Markup Language", correct: false },
          { text: "Hyperlink Markup Language", correct: false },
          { text: "Hyper Transfer Markup Language", correct: false }
        ]
      },
      {
        question: "Which tag is used for creating a hyperlink?",
        answers: [
          { text: "<link>", correct: false },
          { text: "<a>", correct: true },
          { text: "<href>", correct: false },
          { text: "<p>", correct: false }
        ]
      },
      {
        question: "Which language is used to style web pages?",
        answers: [
          { text: "Java", correct: false },
          { text: "HTML", correct: false },
          { text: "CSS", correct: true },
          { text: "PHP", correct: false }
        ]
      },
      {
        question: "Which one is a JavaScript framework?",
        answers: [
          { text: "Laravel", correct: false },
          { text: "React", correct: true },
          { text: "Django", correct: false },
          { text: "Flask", correct: false }
        ]
      },
      {
        question: "What is the default HTTP port?",
        answers: [
          { text: "20", correct: false },
          { text: "80", correct: true },
          { text: "21", correct: false },
          { text: "443", correct: false }
        ]
      }
    ],
    gk: [
      {
        question: "What is the capital of Japan?",
        answers: [
          { text: "Tokyo", correct: true },
          { text: "Beijing", correct: false },
          { text: "Seoul", correct: false },
          { text: "Bangkok", correct: false }
        ]
      },
      {
        question: "Which is the largest desert in the world?",
        answers: [
          { text: "Sahara", correct: false },
          { text: "Antarctica", correct: true },
          { text: "Gobi", correct: false },
          { text: "Kalahari", correct: false }
        ]
      },
      {
        question: "Who is the author of 'Hamlet'?",
        answers: [
          { text: "Shakespeare", correct: true },
          { text: "Milton", correct: false },
          { text: "Wordsworth", correct: false },
          { text: "Keats", correct: false }
        ]
      },
      {
        question: "What currency is used in the UK?",
        answers: [
          { text: "Euro", correct: false },
          { text: "Pound Sterling", correct: true },
          { text: "Dollar", correct: false },
          { text: "Yen", correct: false }
        ]
      },
      {
        question: "How many continents are there?",
        answers: [
          { text: "5", correct: false },
          { text: "6", correct: false },
          { text: "7", correct: true },
          { text: "8", correct: false }
        ]
      }
    ],
    ca: [
      {
        question: "Who is the current President of India (2025)?",
        answers: [
          { text: "Droupadi Murmu", correct: true },
          { text: "Narendra Modi", correct: false },
          { text: "Amit Shah", correct: false },
          { text: "Venkaiah Naidu", correct: false }
        ]
      },
      {
        question: "Which country won the FIFA World Cup 2022?",
        answers: [
          { text: "France", correct: false },
          { text: "Argentina", correct: true },
          { text: "Brazil", correct: false },
          { text: "Germany", correct: false }
        ]
      },
      {
        question: "Which city hosted G20 in 2023?",
        answers: [
          { text: "Bangalore", correct: false },
          { text: "Delhi", correct: true },
          { text: "Mumbai", correct: false },
          { text: "Chennai", correct: false }
        ]
      },
      {
        question: "Who is the CEO of OpenAI?",
        answers: [
          { text: "Elon Musk", correct: false },
          { text: "Sam Altman", correct: true },
          { text: "Sundar Pichai", correct: false },
          { text: "Satya Nadella", correct: false }
        ]
      },
      {
        question: "What was the Chandrayaan-3 mission about?",
        answers: [
          { text: "Moon landing", correct: true },
          { text: "Sun study", correct: false },
          { text: "Mars orbit", correct: false },
          { text: "Saturn rings", correct: false }
        ]
      }
    ],
    sci: [
      {
        question: "What is the speed of light?",
        answers: [
          { text: "300,000 km/s", correct: true },
          { text: "150,000 km/s", correct: false },
          { text: "1,000 km/s", correct: false },
          { text: "450,000 km/s", correct: false }
        ]
      },
      {
        question: "What is H2O?",
        answers: [
          { text: "Water", correct: true },
          { text: "Oxygen", correct: false },
          { text: "Hydrogen", correct: false },
          { text: "Salt", correct: false }
        ]
      },
      {
        question: "Which organelle is known as the powerhouse of the cell?",
        answers: [
          { text: "Nucleus", correct: false },
          { text: "Mitochondria", correct: true },
          { text: "Ribosome", correct: false },
          { text: "Chloroplast", correct: false }
        ]
      },
      {
        question: "Which planet is called the Red Planet?",
        answers: [
          { text: "Mars", correct: true },
          { text: "Earth", correct: false },
          { text: "Jupiter", correct: false },
          { text: "Venus", correct: false }
        ]
      },
      {
        question: "What gas do plants absorb?",
        answers: [
          { text: "Carbon Dioxide", correct: true },
          { text: "Oxygen", correct: false },
          { text: "Hydrogen", correct: false },
          { text: "Nitrogen", correct: false }
        ]
      }
    ],
    nit: [
      {
        question: "In which state is NIT Durgapur located?",
        answers: [
          { text: "West Bengal", correct: true },
          { text: "Bihar", correct: false },
          { text: "Jharkhand", correct: false },
          { text: "Odisha", correct: false }
        ]
      },
      {
        question: "What is the official fest of NIT Durgapur?",
        answers: [
          { text: "RECstacy", correct: true },
          { text: "Mood Indigo", correct: false },
          { text: "Kshitij", correct: false },
          { text: "Spring Fest", correct: false }
        ]
      },
      {
        question: "Which year was NIT Durgapur established?",
        answers: [
          { text: "1960", correct: true },
          { text: "1980", correct: false },
          { text: "1972", correct: false },
          { text: "1995", correct: false }
        ]
      },
      {
        question: "Which ministry governs NITs?",
        answers: [
          { text: "Ministry of Education", correct: true },
          { text: "Ministry of Technology", correct: false },
          { text: "AICTE", correct: false },
          { text: "NAAC", correct: false }
        ]
      },
      {
        question: "NIT Durgapur was formerly known as?",
        answers: [
          { text: "REC Durgapur", correct: true },
          { text: "IIT Durgapur", correct: false },
          { text: "NIT Kolkata", correct: false },
          { text: "BTech Durgapur", correct: false }
        ]
      }
    ],
    ap: [
      {
        question: "Who is the current Chief Minister of Andhra Pradesh (2025)?",
        answers: [
          { text: "Y. S. Jagan Mohan Reddy", correct: true },
          { text: "Chandrababu Naidu", correct: false },
          { text: "Pawan Kalyan", correct: false },
          { text: "Kiran Kumar Reddy", correct: false }
        ]
      },
      {
        question: "Which party governs Andhra Pradesh (2025)?",
        answers: [
          { text: "YSRCP", correct: true },
          { text: "TDP", correct: false },
          { text: "Congress", correct: false },
          { text: "BJP", correct: false }
        ]
      },
      {
        question: "Which river flows through Amaravati?",
        answers: [
          { text: "Krishna", correct: true },
          { text: "Godavari", correct: false },
          { text: "Kaveri", correct: false },
          { text: "Narmada", correct: false }
        ]
      },
      {
        question: "Which leader is founder of TDP?",
        answers: [
          { text: "N. T. Rama Rao", correct: true },
          { text: "Chiranjeevi", correct: false },
          { text: "Y. S. Rajasekhara Reddy", correct: false },
          { text: "Jagan Mohan Reddy", correct: false }
        ]
      },
      {
        question: "Which city was Andhra capital before 2014?",
        answers: [
          { text: "Hyderabad", correct: true },
          { text: "Amaravati", correct: false },
          { text: "Vijayawada", correct: false },
          { text: "Guntur", correct: false }
        ]
      }
    ]
  };
  

startButton.addEventListener('click', () => {
  const selectedTopic = topicSelect.value;
  if (!quizData[selectedTopic] || quizData[selectedTopic].length === 0) {
    alert('No questions found for this topic.');
    return;
  }
  currentQuestions = [...quizData[selectedTopic]];
  startGame();
});

function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.style.display = 'none';
  scoreContainer.style.display = 'none';
  scoreboard.style.display = 'none';
  document.querySelector('.select-topic').style.display = 'none';
  questionContainer.style.display = 'block';
  shuffleQuestions(currentQuestions);
  showQuestion(currentQuestions[currentQuestionIndex]);
}

function shuffleQuestions(questions) {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  answerButtons.innerHTML = '';
  progressInfo.innerText = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length} | Correct: ${score}`;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    button.addEventListener('click', () => selectAnswer(answer, button));
    answerButtons.appendChild(button);
  });
}

function selectAnswer(answer, selectedButton) {
  const correct = answer.correct;
  showFeedback(correct);
  if (correct) score++;
  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
    const answerText = button.innerText;
    const isCorrect = currentQuestions[currentQuestionIndex].answers.find(a => a.text === answerText)?.correct;
    button.classList.add(isCorrect ? 'correct' : 'incorrect');
  });
  nextButton.style.display = 'block';
}

function showFeedback(correct) {
  feedbackElement.innerText = correct ? 'Correct!' : 'Wrong answer!';
  feedbackElement.classList.add(correct ? 'correct' : 'incorrect');
  feedbackElement.style.display = 'block';
  setTimeout(() => {
    feedbackElement.style.display = 'none';
    feedbackElement.classList.remove('correct', 'incorrect');
  }, 1500);
}

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuestions.length) {
    showQuestion(currentQuestions[currentQuestionIndex]);
    nextButton.style.display = 'none';
  } else {
    endQuiz();
  }
});

function endQuiz() {
  questionContainer.style.display = 'none';
  scoreElement.innerText = `${score} / ${currentQuestions.length}`;
  scoreContainer.style.display = 'block';
  saveScore();
  displayHighScores();
  scoreboard.style.display = 'block';
}

function saveScore() {
  let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  highScores.push(score);
  highScores.sort((a, b) => b - a);
  highScores = highScores.slice(0, 5);
  localStorage.setItem('highScores', JSON.stringify(highScores));
}

function displayHighScores() {
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  highScoresList.innerHTML = '';
  highScores.forEach((score, index) => {
    const li = document.createElement('li');
    li.innerText = `${index + 1}. ${score}`;
    highScoresList.appendChild(li);
  });
}

restartButton.addEventListener('click', () => {
  document.querySelector('.select-topic').style.display = 'block';
  scoreContainer.style.display = 'none';
  questionContainer.style.display = 'none';
});