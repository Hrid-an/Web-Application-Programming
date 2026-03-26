// ── Validation Rules ───────────────────────────────────

const validate_name = (value) => {
    if (!value.trim()) return "Full name is required.";
    if (value.trim().length < 3) return "Name must be at least 3 characters.";
    if (value.trim().length > 50) return "Name must be under 50 characters.";
    if (!/^[a-zA-Z\s'-]+$/.test(value.trim())) return "Name can only contain letters, spaces, hyphens, or apostrophes.";
    return "";
};

const validate_email = (value) => {
    if (!value.trim()) return "Email address is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Enter a valid email address.";
    return "";
};

const validate_password = (value) => {
    if (!value) return "Password is required.";
    if (value.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(value)) return "Password must include at least one uppercase letter.";
    if (!/[0-9]/.test(value)) return "Password must include at least one number.";
    if (!/[!@#$%^&*]/.test(value)) return "Password must include at least one special character (!@#$%^&*).";
    return "";
};

const validate_confirm = (value, password) => {
    if (!value) return "Please confirm your password.";
    if (value !== password) return "Passwords do not match.";
    return "";
};

// ── Show / Clear Field Errors ──────────────────────────

const show_field_error = (field_id, message) => {
    document.getElementById(`error_${field_id}`).textContent = message;
    document.getElementById(`group_${field_id}`).classList.add("field_invalid");
    document.getElementById(`group_${field_id}`).classList.remove("field_valid");
};

const clear_field_error = (field_id) => {
    document.getElementById(`error_${field_id}`).textContent = "";
    document.getElementById(`group_${field_id}`).classList.remove("field_invalid");
    document.getElementById(`group_${field_id}`).classList.add("field_valid");
};

const reset_field = (field_id) => {
    document.getElementById(`error_${field_id}`).textContent = "";
    document.getElementById(`group_${field_id}`).classList.remove("field_invalid", "field_valid");
};

// ── Password Strength ──────────────────────────────────

const get_strength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*]/.test(password)) score++;
    return score;
};

const update_strength_ui = (password) => {
    const bar = document.getElementById("strength_bar");
    const label = document.getElementById("strength_label");

    if (!password) {
        bar.style.width = "0%";
        bar.className = "strength_bar";
        label.textContent = "";
        return;
    }

    const score = get_strength(password);
    const levels = [
        { label: "Very Weak", color: "#cc0000", width: "20%" },
        { label: "Weak", color: "tomato", width: "40%" },
        { label: "Fair", color: "#ffc107", width: "60%" },
        { label: "Strong", color: "#4caf50", width: "80%" },
        { label: "Very Strong", color: "#007a3d", width: "100%" }
    ];
    const level = levels[Math.min(score - 1, 4)] || levels[0];

    bar.style.width = level.width;
    bar.style.backgroundColor = level.color;
    label.textContent = level.label;
    label.style.color = level.color;
};

// ── Toggle Password Visibility ─────────────────────────

const toggle_password = () => {
    const input = document.getElementById("input_password");
    const btn = document.getElementById("toggle_pw_button");
    const is_hidden = input.type === "password";
    input.type = is_hidden ? "text" : "password";
    btn.textContent = is_hidden ? "Hide" : "Show";
};

// ── Live Validation (on input) ─────────────────────────

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("input_name").addEventListener("input", () => {
        const val = document.getElementById("input_name").value;
        const err = validate_name(val);
        err ? show_field_error("name", err) : clear_field_error("name");
    });

    document.getElementById("input_email").addEventListener("input", () => {
        const val = document.getElementById("input_email").value;
        const err = validate_email(val);
        err ? show_field_error("email", err) : clear_field_error("email");
    });

    document.getElementById("input_password").addEventListener("input", () => {
        const val = document.getElementById("input_password").value;
        const err = validate_password(val);
        err ? show_field_error("password", err) : clear_field_error("password");
        update_strength_ui(val);

        // Re-validate confirm if already typed
        const confirm_val = document.getElementById("input_confirm").value;
        if (confirm_val) {
            const confirm_err = validate_confirm(confirm_val, val);
            confirm_err ? show_field_error("confirm", confirm_err) : clear_field_error("confirm");
        }
    });

    document.getElementById("input_confirm").addEventListener("input", () => {
        const val = document.getElementById("input_confirm").value;
        const password = document.getElementById("input_password").value;
        const err = validate_confirm(val, password);
        err ? show_field_error("confirm", err) : clear_field_error("confirm");
    });
});

// ── Submit ─────────────────────────────────────────────

const submit_form = () => {
    const name = document.getElementById("input_name").value;
    const email = document.getElementById("input_email").value;
    const password = document.getElementById("input_password").value;
    const confirm = document.getElementById("input_confirm").value;

    const err_name = validate_name(name);
    const err_email = validate_email(email);
    const err_password = validate_password(password);
    const err_confirm = validate_confirm(confirm, password);

    err_name ? show_field_error("name", err_name) : clear_field_error("name");
    err_email ? show_field_error("email", err_email) : clear_field_error("email");
    err_password ? show_field_error("password", err_password) : clear_field_error("password");
    err_confirm ? show_field_error("confirm", err_confirm) : clear_field_error("confirm");

    const has_errors = err_name || err_email || err_password || err_confirm;
    if (has_errors) return;

    document.getElementById("success_msg").classList.remove("hidden");
    document.querySelector(".submit_button").disabled = true;
};