document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault(); // stop page reload

    const name = document.getElementById("contactName").value;
    const email = document.getElementById("contactEmail").value;
    const message = document.getElementById("contactMessage").value;

    fetch("http://localhost:8081/api/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            message: message
        })
    })
    .then(res => res.text())
    .then(data => {
        if (data === "MESSAGE_SAVED") {
            alert("Message sent successfully ✅");
            document.getElementById("contactForm").reset();
        } else {
            alert("Message not saved ❌");
        }
    })
    .catch(() => {
        alert("Server error ❌");
    });
});
