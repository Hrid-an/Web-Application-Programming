const students = [];
let subject_count = 0;

const generate_subject_inputs = () => {
    const num = parseInt(document.getElementById("num_subjects").value);
    if (isNaN(num) || num < 1 || num > 6) {
        show_error("Enter a valid number of subjects (1–6).");
        return;
    }
    subject_count = num;

    const container = document.getElementById("subject_inputs");
    container.innerHTML = "";

    for (let i = 0; i < num; i++) {
        const div = document.createElement("div");
        div.classList.add("subject_row");

        div.innerHTML = `
            <input type="number" class="subject_marks" min="0" max="100" placeholder="Marks in subject ${i + 1} (0–100)" />
        `;
        container.appendChild(div);
    }
    hide_error();
};

const calculate_grade = (percentage) => {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B+";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C";
    if (percentage >= 40) return "D";
    return "F";
};

const add_student = () => {
    const name = document.getElementById("student_name").value.trim();
    if (!name) { show_error("Please enter a student name."); return; }
    if (subject_count === 0) { show_error("Please generate subject fields first."); return; }

    const marks_inputs = document.querySelectorAll(".subject_marks");

    const marks = []

    for (let i = 0; i < subject_count; i++) {
        const mark = parseFloat(marks_inputs[i].value);
        if (isNaN(mark) || mark < 0 || mark > 100) {
            show_error(`Invalid marks. Enter a value between 0 and 100.`);
            return;
        }
        marks.push(mark);
    }

    const total = marks.reduce((sum, m) => sum + m, 0);
    const percentage = parseFloat((total / (subject_count * 100) * 100).toFixed(2));
    const grade = calculate_grade(percentage);
    const status = percentage >= 40 ? "Pass" : "Fail";

    const student = { name, total, percentage, grade, status };
    students.push(student);

    update_table();
    reset_form();
    hide_error();
};

const update_table = () => {
    const tbody = document.getElementById("table_body");
    tbody.innerHTML = "";

    if (students.length === 0) {
        tbody.innerHTML = `<tr id="empty_row"><td colspan="7" class="empty_msg">No students added yet.</td></tr>`;
        return;
    }

    students.forEach((student, index) => {
        const tr = document.createElement("tr");
        tr.classList.add(student.status === "Pass" ? "pass_row" : "fail_row");

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.total}</td>
            <td>${student.percentage}%</td>
            <td class="grade_cell">${student.grade}</td>
            <td class="status_cell">${student.status}</td>
        `;
        tbody.appendChild(tr);
    });
};

const clear_table = () => {
    students.length = 0;
    update_table();
    reset_form();
    hide_error();
};

const reset_form = () => {
    document.getElementById("student_name").value = "";
    document.getElementById("num_subjects").value = "";
    document.getElementById("subject_inputs").innerHTML = "";
    subject_count = 0;
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