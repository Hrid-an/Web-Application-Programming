const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Logic", "Home Tool Markup Language"],
        answer: 0
    },
    {
        question: "Which keyword declares a constant in JavaScript?",
        options: ["var", "let", "const", "define"],
        answer: 2
    },
    {
        question: "Which CSS property controls the text size?",
        options: ["text-size", "font-style", "font-size", "text-scale"],
        answer: 2
    },
    {
        question: "What does DOM stand for?",
        options: ["Document Object Model", "Data Output Method", "Display Object Mode", "Dynamic Object Management"],
        answer: 0
    },
    {
        question: "Which method adds an element to the end of an array?",
        options: ["shift()", "unshift()", "pop()", "push()"],
        answer: 3
    },
    {
        question: "Which HTML tag is used for the largest heading?",
        options: ["<h6>", "<heading>", "<h1>", "<head>"],
        answer: 2
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: ["#", "//", "/* */", "--"],
        answer: 1
    },
    {
        question: "What does CSS stand for?",
        options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Syntax", "Coded Style System"],
        answer: 1
    },
    {
        question: "Which event fires when a button is clicked?",
        options: ["onhover", "onchange", "onload", "onclick"],
        answer: 3
    },
    {
        question: "Which method removes the last element of an array?",
        options: ["pop()", "push()", "shift()", "splice()"],
        answer: 0
    }
];

let current_index = 0;
let current_score = 0;
let selected_answers = [];
let answered = false;

const show_screen = (screen_id) => {
    document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
    document.getElementById(screen_id).classList.remove("hidden");
};

const start_quiz = () => {
    current_index = 0;
    current_score = 0;
    selected_answers = [];
    answered = false;
    show_screen("question_screen");
    render_question();
};

const render_question = () => {
    answered = false;
    const q = questions[current_index];
    const total = questions.length;

    document.getElementById("question_counter").textContent = `Question ${current_index + 1} of ${total}`;
    document.getElementById("live_score").textContent = `Score: ${current_score}`;
    document.getElementById("question_text").textContent = q.question;
    document.getElementById("next_button").classList.add("hidden");

    const progress = ((current_index) / total) * 100;
    document.getElementById("progress_bar").style.width = progress + "%";

    const options_list = document.getElementById("options_list");
    options_list.innerHTML = "";

    q.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.classList.add("option_button");
        btn.textContent = option;
        btn.onclick = () => select_answer(index);
        options_list.appendChild(btn);
    });
};

const select_answer = (selected_index) => {
    if (answered) return;
    answered = true;

    const q = questions[current_index];
    const is_correct = selected_index === q.answer;

    if (is_correct) current_score++;

    selected_answers.push({
        question: q.question,
        selected: selected_index,
        correct: q.answer,
        options: q.options,
        is_correct
    });

    const option_buttons = document.querySelectorAll(".option_button");
    option_buttons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === q.answer) btn.classList.add("correct_option");
        else if (index === selected_index) btn.classList.add("wrong_option");
    });

    document.getElementById("live_score").textContent = `Score: ${current_score}`;
    document.getElementById("next_button").classList.remove("hidden");

    if (current_index === questions.length - 1) {
        document.getElementById("next_button").textContent = "See Results";
    } else {
        document.getElementById("next_button").textContent = "Next";
    }
};

const next_question = () => {
    current_index++;
    if (current_index < questions.length) {
        render_question();
    } else {
        show_results();
    }
};

const show_results = () => {
    show_screen("result_screen");

    const total = questions.length;
    const percentage = Math.round((current_score / total) * 100);

    document.getElementById("final_score").textContent = `${current_score} / ${total}`;
    document.getElementById("progress_bar").style.width = "100%";

    let msg = "";
    if (percentage === 100) msg = "Perfect score! Outstanding! 🏆";
    else if (percentage >= 70) msg = "Great job! Well done. 🎉";
    else if (percentage >= 40) msg = "Not bad! Keep practicing. 📚";
    else msg = "Keep trying! You'll get there. 💪";

    document.getElementById("result_msg").textContent = msg;

    const review_list = document.getElementById("review_list");
    review_list.innerHTML = "";

    selected_answers.forEach((entry, index) => {
        const div = document.createElement("div");
        div.classList.add("review_item", entry.is_correct ? "review_correct" : "review_wrong");

        div.innerHTML = `
            <p class="review_question">${index + 1}. ${entry.question}</p>
            <p class="review_answer">
                Your answer: <strong>${entry.options[entry.selected]}</strong>
                ${!entry.is_correct ? `<br>Correct: <strong>${entry.options[entry.correct]}</strong>` : ""}
            </p>
        `;
        review_list.appendChild(div);
    });
};

const restart_quiz = () => {
    show_screen("start_screen");
};