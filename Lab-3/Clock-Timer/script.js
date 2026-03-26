const pad = (num) => String(num).padStart(2, "0");

const update_clock = () => {
    const now = new Date();
    document.getElementById("clock_hours").textContent = pad(now.getHours());
    document.getElementById("clock_minutes").textContent = pad(now.getMinutes());
    document.getElementById("clock_seconds").textContent = pad(now.getSeconds());

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    document.getElementById("clock_date").textContent =
        `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()} ${now.getFullYear()}`;
};

setInterval(update_clock, 1000);
update_clock();


let timer_interval = null;
let remaining_seconds = 0;
let is_running = false;

const get_input_seconds = () => {
    const h = parseInt(document.getElementById("input_hours").value) || 0;
    const m = parseInt(document.getElementById("input_minutes").value) || 0;
    const s = parseInt(document.getElementById("input_seconds").value) || 0;
    return (h * 3600) + (m * 60) + s;
};

const render_timer = (total_seconds) => {
    const h = Math.floor(total_seconds / 3600);
    const m = Math.floor((total_seconds % 3600) / 60);
    const s = total_seconds % 60;
    document.getElementById("timer_hours").textContent = pad(h);
    document.getElementById("timer_minutes").textContent = pad(m);
    document.getElementById("timer_seconds").textContent = pad(s);
};

const set_timer_state = (running) => {
    is_running = running;
    document.getElementById("start_button").disabled = running;
    document.getElementById("pause_button").disabled = !running;
};

const start_timer = () => {
    if (is_running) return;

    if (remaining_seconds === 0) {
        const total = get_input_seconds();
        if (total <= 0) { show_error("Please enter a time greater than zero."); return; }
        if (total > 359999) { show_error("Maximum time is 99 hours 59 minutes 59 seconds."); return; }
        remaining_seconds = total;
    }

    hide_error();
    set_timer_state(true);
    document.querySelector(".timer_display").classList.remove("timer_done");

    timer_interval = setInterval(() => {
        remaining_seconds--;
        render_timer(remaining_seconds);

        if (remaining_seconds <= 0) {
            clearInterval(timer_interval);
            timer_interval = null;
            set_timer_state(false);
            trigger_alert();
        }
    }, 1000);
};

const pause_timer = () => {
    if (!is_running) return;
    clearInterval(timer_interval);
    timer_interval = null;
    set_timer_state(false);
};

const reset_timer = () => {
    clearInterval(timer_interval);
    timer_interval = null;
    remaining_seconds = 0;
    set_timer_state(false);
    render_timer(0);
    hide_error();
    document.querySelector(".timer_display").classList.remove("timer_done");
    document.getElementById("input_hours").value = "";
    document.getElementById("input_minutes").value = "";
    document.getElementById("input_seconds").value = "";
};

const trigger_alert = () => {
    document.querySelector(".timer_display").classList.add("timer_done");
    setTimeout(() => alert("Time's up!"), 100);
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