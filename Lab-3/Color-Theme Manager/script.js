// ── Theme Definitions ──────────────────────────────────

const default_theme = {
    name: "Default",
    bg: "#f0f4ff",
    text: "#111111",
    card: "#003296",
    accent: "#ff6347"     // tomato
};

const preset_themes = [
    { name: "Default", bg: "#f0f4ff", text: "#111111", card: "#003296", accent: "#ff6347" },
    { name: "Midnight", bg: "#0d0d1a", text: "#e0e0ff", card: "#1a1a3e", accent: "#7b61ff" },
    { name: "Forest", bg: "#e8f5e9", text: "#1b3a1f", card: "#2e7d32", accent: "#ff8f00" },
    { name: "Sunset", bg: "#fff3e0", text: "#3e1f00", card: "#bf360c", accent: "#ffd600" },
    { name: "Ocean", bg: "#e0f7fa", text: "#003344", card: "#006064", accent: "#00e5ff" },
    { name: "Rose", bg: "#fce4ec", text: "#4a0010", card: "#880e4f", accent: "#ff4081" },
    { name: "Slate", bg: "#eceff1", text: "#1c2b36", card: "#37474f", accent: "#00acc1" },
    { name: "Neon", bg: "#0a0a0a", text: "#e0ffe0", card: "#001a00", accent: "#39ff14" }
];

// Active theme stored as an object
let active_theme = { ...default_theme };

// ── Apply Theme ────────────────────────────────────────

const apply_theme = (theme) => {
    active_theme = { ...theme };

    document.documentElement.style.setProperty("--bg", theme.bg);
    document.documentElement.style.setProperty("--text", theme.text);
    document.documentElement.style.setProperty("--card", theme.card);
    document.documentElement.style.setProperty("--accent", theme.accent);

    sync_pickers();
    render_theme_info();
    highlight_active_preset();
};

const apply_custom_theme = () => {
    const theme = {
        name: "Custom",
        bg: document.getElementById("pick_bg").value,
        text: document.getElementById("pick_text").value,
        card: document.getElementById("pick_card").value,
        accent: document.getElementById("pick_accent").value
    };
    apply_theme(theme);
};

const reset_theme = () => {
    apply_theme(default_theme);
};

// ── Sync Color Pickers with Active Theme ───────────────

const sync_pickers = () => {
    document.getElementById("pick_bg").value = active_theme.bg;
    document.getElementById("pick_text").value = active_theme.text;
    document.getElementById("pick_card").value = active_theme.card;
    document.getElementById("pick_accent").value = active_theme.accent;
};

// ── Render Theme Info Panel ────────────────────────────

const render_theme_info = () => {
    const grid = document.getElementById("theme_info_grid");
    grid.innerHTML = "";

    const fields = [
        { label: "Theme Name", value: active_theme.name },
        { label: "Background", value: active_theme.bg, swatch: true },
        { label: "Text", value: active_theme.text, swatch: true },
        { label: "Card", value: active_theme.card, swatch: true },
        { label: "Accent", value: active_theme.accent, swatch: true }
    ];

    fields.forEach(field => {
        const row = document.createElement("div");
        row.classList.add("info_row");

        row.innerHTML = `
            <span class="info_label">${field.label}</span>
            <span class="info_value">
                ${field.swatch ? `<span class="color_swatch" style="background-color:${field.value}"></span>` : ""}
                ${field.value}
            </span>
        `;
        grid.appendChild(row);
    });
};

// ── Render Preset Buttons ──────────────────────────────

const render_presets = () => {
    const grid = document.getElementById("preset_grid");
    grid.innerHTML = "";

    preset_themes.forEach(theme => {
        const btn = document.createElement("button");
        btn.classList.add("preset_button");
        btn.id = `preset_${theme.name}`;
        btn.onclick = () => apply_theme(theme);

        btn.innerHTML = `
            <span class="preset_dots">
                <span style="background-color:${theme.bg}"></span>
                <span style="background-color:${theme.card}"></span>
                <span style="background-color:${theme.accent}"></span>
            </span>
            <span class="preset_name">${theme.name}</span>
        `;
        grid.appendChild(btn);
    });
};

const highlight_active_preset = () => {
    document.querySelectorAll(".preset_button").forEach(btn => btn.classList.remove("preset_active"));
    const active_btn = document.getElementById(`preset_${active_theme.name}`);
    if (active_btn) active_btn.classList.add("preset_active");
};

// ── Init ───────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
    render_presets();
    apply_theme(default_theme);
});