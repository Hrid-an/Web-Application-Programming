let col_count = 0;
let highlight_on = false;

// ── Generate ───────────────────────────────────────────

const generate_table = () => {
    const rows = parseInt(document.getElementById("input_rows").value);
    const cols = parseInt(document.getElementById("input_cols").value);

    if (isNaN(rows) || rows < 1 || rows > 20) { show_error("Enter rows between 1 and 20."); return; }
    if (isNaN(cols) || cols < 1 || cols > 10) { show_error("Enter columns between 1 and 10."); return; }

    hide_error();
    col_count = cols;
    highlight_on = false;

    document.getElementById("highlight_button").textContent = "Highlight Even Rows";

    // Build header
    const thead = document.getElementById("table_head");
    thead.innerHTML = "";
    const header_row = document.createElement("tr");
    for (let c = 1; c <= cols; c++) {
        const th = document.createElement("th");
        th.textContent = `Column ${c}`;
        header_row.appendChild(th);
    }
    thead.appendChild(header_row);

    // Build body
    const tbody = document.getElementById("table_body");
    tbody.innerHTML = "";
    for (let r = 1; r <= rows; r++) {
        tbody.appendChild(create_row(r));
    }

    show_table();
};

// ── Row Helpers ────────────────────────────────────────

const create_row = (row_num) => {
    const tr = document.createElement("tr");
    for (let c = 1; c <= col_count; c++) {
        const td = document.createElement("td");
        td.textContent = `Row ${row_num}, Col ${c}`;
        td.setAttribute("contenteditable", "true");
        tr.appendChild(td);
    }
    return tr;
};

const add_row = () => {
    const tbody = document.getElementById("table_body");
    const new_row_num = tbody.rows.length + 1;
    tbody.appendChild(create_row(new_row_num));
    if (highlight_on) apply_highlight();
    update_row_count();
};

const delete_last_row = () => {
    const tbody = document.getElementById("table_body");
    if (tbody.rows.length === 0) { show_error("No rows left to delete."); return; }
    tbody.deleteRow(tbody.rows.length - 1);
    hide_error();
    update_row_count();
};

// ── Highlight ──────────────────────────────────────────

const toggle_highlight = () => {
    highlight_on = !highlight_on;
    const btn = document.getElementById("highlight_button");
    btn.textContent = highlight_on ? "Remove Highlight" : "Highlight Even Rows";
    apply_highlight();
};

const apply_highlight = () => {
    const rows = document.getElementById("table_body").rows;
    for (let i = 0; i < rows.length; i++) {
        if (highlight_on && (i + 1) % 2 === 0) {
            rows[i].classList.add("even_row");
        } else {
            rows[i].classList.remove("even_row");
        }
    }
};

// ── UI Helpers ─────────────────────────────────────────

const show_table = () => {
    document.getElementById("table_wrap").classList.remove("hidden");
    document.getElementById("action_buttons").classList.remove("hidden");
    document.getElementById("row_count").classList.remove("hidden");
    update_row_count();
};

const update_row_count = () => {
    const count = document.getElementById("table_body").rows.length;
    document.getElementById("row_count").textContent = `Total rows: ${count}`;
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