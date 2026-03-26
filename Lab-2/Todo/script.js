const tasks = [];
let current_filter = "all";

const add_task = () => {
    const input = document.getElementById("task_input");
    const text = input.value.trim();

    if (!text) { show_error("Please enter a task."); return; }
    if (text.length > 120) { show_error("Task is too long (max 120 characters)."); return; }

    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);
    input.value = "";
    hide_error();
    render_tasks();
};

const delete_task = (id) => {
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) tasks.splice(index, 1);
    render_tasks();
};

const toggle_task = (id) => {
    const task = tasks.find(t => t.id === id);
    if (task) task.completed = !task.completed;
    render_tasks();
};

const set_filter = (filter) => {
    current_filter = filter;

    document.querySelectorAll(".filter_button").forEach(btn => btn.classList.remove("active"));
    document.getElementById(`filter_${filter}`).classList.add("active");

    render_tasks();
};

const get_filtered_tasks = () => {
    if (current_filter === "completed") return tasks.filter(t => t.completed);
    if (current_filter === "pending") return tasks.filter(t => !t.completed);
    return tasks;
};

const render_tasks = () => {
    const list = document.getElementById("task_list");
    const filtered = get_filtered_tasks();

    const completed_count = tasks.filter(t => t.completed).length;
    document.getElementById("completed_count").textContent = completed_count;
    document.getElementById("total_count").textContent = tasks.length;

    list.innerHTML = "";

    if (filtered.length === 0) {
        const li = document.createElement("li");
        li.classList.add("empty_msg");
        li.textContent = tasks.length === 0
            ? "No tasks yet. Add one above!"
            : `No ${current_filter} tasks.`;
        list.appendChild(li);
        return;
    }

    filtered.forEach(task => {
        const li = document.createElement("li");
        li.classList.add("task_item");
        if (task.completed) li.classList.add("task_completed");

        li.innerHTML = `
            <input
                type="checkbox"
                class="task_checkbox"
                ${task.completed ? "checked" : ""}
                onchange="toggle_task(${task.id})"
            />
            <span class="task_text">${task.text}</span>
            <button onclick="delete_task(${task.id})" class="delete_button">✕</button>
        `;
        list.appendChild(li);
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

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("task_input").addEventListener("keydown", (e) => {
        if (e.key === "Enter") add_task();
    });
});