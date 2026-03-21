const history = [];
const MAX_HISTORY = 5;
let historyIndex = -1;

const add_to_exp = (btn) => {
    let exp = document.getElementById("current_exp").innerHTML;
    exp += btn.value;
    document.getElementById("current_exp").innerHTML = exp;
    historyIndex = -1;
};

const delete_character = () => {
    let exp = document.getElementById("current_exp").innerHTML;
    const arr = exp.split("");
    arr.pop();
    exp = arr.join("");
    document.getElementById("current_exp").innerHTML = exp;
};

const all_clear = () => {
    document.getElementById("current_exp").innerHTML = "";
    document.getElementById("prev_exp").innerHTML = "";
    historyIndex = -1;
};

const evaluate_exp = () => {
    let exp = document.getElementById("current_exp").innerHTML.trim();

    if (!exp) { show_error("No expression entered"); return; }
    if (/[^0-9+\-*/.() ]/.test(exp)) { show_error("Invalid characters"); return; }
    if (/\/\s*0(\.0+)?(?![0-9])/.test(exp)) { show_error("Error: Division by zero"); return; }
    if (/[+\-*/.]$/.test(exp)) { show_error("Incomplete expression"); return; }

    let result;
    try {
        result = Function('"use strict"; return (' + exp + ')')();
    } catch (e) {
        show_error("Invalid expression");
        return;
    }

    if (!isFinite(result)) { show_error("Error: Division by zero"); return; }

    result = parseFloat(result.toFixed(10));

    history.push(`${exp} = ${result}`);
    if (history.length > MAX_HISTORY) history.shift();

    document.getElementById("prev_exp").innerHTML = exp + " =";
    document.getElementById("current_exp").innerHTML = result;
    historyIndex = -1;
};

const show_error = (message) => {
    document.getElementById("prev_exp").innerHTML = document.getElementById("current_exp").innerHTML;
    document.getElementById("current_exp").innerHTML = message;
    setTimeout(() => {
        document.getElementById("current_exp").innerHTML = "";
        document.getElementById("prev_exp").innerHTML = "";
    }, 2000);
};

const show_history_entry = () => {
    const entry = history[historyIndex];
    const eqIndex = entry.lastIndexOf("=");
    document.getElementById("prev_exp").innerHTML = entry.substring(0, eqIndex).trim() + " =";
    document.getElementById("current_exp").innerHTML = entry.substring(eqIndex + 1).trim();
};

document.querySelector(".prev_button").addEventListener("click", () => {
    if (history.length === 0) return;
    if (historyIndex === -1) historyIndex = history.length - 1;
    else if (historyIndex > 0) historyIndex--;
    show_history_entry();
});

document.querySelector(".next_button").addEventListener("click", () => {
    if (history.length === 0 || historyIndex === -1) return;
    if (historyIndex < history.length - 1) {
        historyIndex++;
        show_history_entry();
    } else {
        historyIndex = -1;
        document.getElementById("prev_exp").innerHTML = "";
        document.getElementById("current_exp").innerHTML = "";
    }
});

document.querySelector(".reset_button").addEventListener("click", () => {
    history.length = 0;
    historyIndex = -1;
    document.getElementById("prev_exp").innerHTML = "";
    document.getElementById("current_exp").innerHTML = "";
});