let n1, n2;

// 🔄 Generate CAPTCHA
function generateCaptcha() {
    n1 = Math.floor(Math.random() * 10);
    n2 = Math.floor(Math.random() * 10);

    document.getElementById("num1").innerText = n1;
    document.getElementById("num2").innerText = n2;
    document.getElementById("captchaInput").value = "";
    document.getElementById("captchaError").innerText = "";
}

// Generate on page load
generateCaptcha();

document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const captchaValue = document.getElementById("captchaInput").value;

    // ✅ CAPTCHA CHECK
    if (parseInt(captchaValue) !== (n1 + n2)) {
        document.getElementById("captchaError").innerText = "Incorrect captcha ❌";
        generateCaptcha(); // auto refresh
        return;
    }

    // 🔐 Password validation
    const passwordPattern =
        /^[A-Z](?=(?:.*[a-z]){4,6})(?=(?:.*\d){2,})(?=.*[@$!%*?&]).+$/;

    if (!passwordPattern.test(password)) {
        alert(
            "Invalid Password!\n\n" +
            "• Start with 1 capital letter\n" +
            "• 4 to 6 lowercase letters\n" +
            "• Minimum 2 numbers\n" +
            "• At least 1 special character"
        );
        return;
    }

    // 🔗 Backend login
    fetch("http://localhost:8081/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.text())
    .then(data => {
        if (data === "LOGIN_SUCCESS") {
            alert("Login Successful ✅");
            localStorage.setItem("loggedIn", "true");
            window.location.href = "../index.html";
        } else {
            alert(data);
            generateCaptcha();
        }
    })
    .catch(() => alert("Server error ❌"));
});
