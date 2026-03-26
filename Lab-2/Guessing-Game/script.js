let secret_number = 0;
let current_score = 100;
let attempt_count = 0;
let best_score = null;
let game_over = false;

const guess_history = [];

const generate_number = () => {
    return Math.floor(Math.random() * 100) + 1;
};

const new_game = () => {
    secret_number = generate_number();
    current_score = 100;
    attempt_count = 0;
    game_over = false;
    guess_history.length = 0;

    document.getElementById("current_score").textContent = current_score;
    document.getElementById("attempt_count").textContent = attempt_count;
    document.getElementById("guess_input").value = "";
    document.getElementById("guess_input").disabled = false;
    document.querySelector(".guess_button").disabled = false;

    set_feedback("Make your first guess!", "neutral");
    hide_error();
    render_history();
};

const submit_guess = () => {
    if (game_over) return;

    const input = document.getElementById("guess_input");
    const guess = parseInt(input.value);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        show_error("Please enter a number between 1 and 100.");
        return;
    }

    hide_error();
    attempt_count++;
    document.getElementById("attempt_count").textContent = attempt_count;

    if (guess < secret_number) {
        current_score = Math.max(0, current_score - 10);
        set_feedback(`Too Low! Try higher. 📉`, "low");
        guess_history.push({ guess, result: "low" });

    } else if (guess > secret_number) {
        current_score = Math.max(0, current_score - 10);
        set_feedback(`Too High! Try lower. 📈`, "high");
        guess_history.push({ guess, result: "high" });

    } else {
        guess_history.push({ guess, result: "correct" });
        handle_win();
        render_history();
        return;
    }

    document.getElementById("current_score").textContent = current_score;

    if (current_score === 0) {
        handle_loss();
    }

    input.value = "";
    render_history();
};

const handle_win = () => {
    game_over = true;

    if (best_score === null || current_score > best_score) {
        best_score = current_score;
        document.getElementById("best_score").textContent = best_score;
    }

    set_feedback(`🎉 Correct! The number was ${secret_number}. Score: ${current_score}`, "correct");
    document.getElementById("current_score").textContent = current_score;
    disable_input();
};

const handle_loss = () => {
    game_over = true;
    set_feedback(`💀 Out of score! The number was ${secret_number}.`, "gameover");
    disable_input();
};

const disable_input = () => {
    document.getElementById("guess_input").disabled = true;
    document.querySelector(".guess_button").disabled = true;
};

const set_feedback = (msg, type) => {
    const el = document.getElementById("feedback_msg");
    el.textContent = msg;
    el.className = `feedback_msg feedback_${type}`;
};

const render_history = () => {
    const container = document.getElementById("history_list");
    container.innerHTML = "";

    if (guess_history.length === 0) {
        container.innerHTML = `<span class="history_empty">No guesses yet.</span>`;
        return;
    }

    guess_history.forEach((entry, index) => {
        const chip = document.createElement("span");
        chip.classList.add("history_chip", `chip_${entry.result}`);
        chip.textContent = entry.guess;
        container.appendChild(chip);
    });
};

const show_error = (msg) => {
    const el = document.getElementById("error_msg");
    el.textContent = msg;
    el.style.display = "block";
};

const hide_error = () => {
    const el = document.getElementById("error_msg");
    el.textContent = "";
    el.style.display = "none";
};

// Allow Enter key to submit guess
document.addEventListener("DOMContentLoaded", () => {
    new_game();
    document.getElementById("guess_input").addEventListener("keydown", (e) => {
        if (e.key === "Enter") submit_guess();
    });
});