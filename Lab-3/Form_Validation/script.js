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

const toggle_password = () => {
    const input = document.getElementById("input_password");
    const btn = document.getElementById("toggle_pw_button");
    const is_hidden = input.type === "password";
    input.type = is_hidden ? "text" : "password";
    btn.textContent = is_hidden ? "Hide" : "Show";
};

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