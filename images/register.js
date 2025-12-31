function validateRegister() {

    const fullname = document.getElementById("fullname").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const repassword = document.getElementById("repassword").value;

  
    const namePattern = /^[A-Za-z]+ [A-Za-z]+$/;
    if (!namePattern.test(fullname)) {
        alert("Full Name must contain only alphabets with ONE space (Eg: SHAIK SHAMEER)");
        return false;
    }


    const mobilePattern = /^[6-9][0-9]{9}$/;
    if (!mobilePattern.test(mobile)) {
        alert("Mobile number must start with 6,7,8 or 9 and contain 10 digits.");
        return false;
    }


    if ((email.match(/@/g) || []).length !== 1) {
        alert("Email must contain exactly one '@' symbol.");
        return false;
    }


    const passwordPattern =
        /^[A-Z](?=(?:.*[a-z]){4,6})(?=(?:.*\d){2,})(?=.*[@$!%*?&]).+$/;

    if (!passwordPattern.test(password)) {
        alert(
            "Invalid Password!\n\n" +
            "Rules:\n" +
            "• Start with 1 capital letter\n" +
            "• 4 to 6 lowercase letters\n" +
            "• Minimum 2 numbers\n" +
            "• At least 1 special character"
        );
        return false;
    }


    if (password !== repassword) {
        alert("Create Password and Retype Password must be same.");
        return false;
    }


    fetch("http://localhost:8081/api/register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        fullname: fullname,
        mobile: mobile,
        email: email,
        password: password
    })
})
.then(res => res.text())
.then(data => {
    if (data === "REGISTER_SUCCESS") {
        alert("✅ Registered Successfully! Please login.");
        window.location.href = "login.html";
    } else if (data === "USER_EXISTS") {
        alert("⚠️ Account already exists. Please login.");
        window.location.href = "login.html";
    } else {
        alert("❌ Registration failed");
    }
});
return false;

}
