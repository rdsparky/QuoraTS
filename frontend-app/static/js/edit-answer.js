document.addEventListener("DOMContentLoaded", function () {
    let answerId = new URLSearchParams(window.location.search).get("id") 
    || sessionStorage.getItem("lastAnswerId");
    const accessToken = localStorage.getItem("accessToken");

    if (!answerId || !accessToken) {
        document.getElementById("answer-error-message").textContent =
            "Invalid answer or unauthorized access.";
        return;
    }

    const answerField = document.getElementById("answer");
    const errorDiv = document.getElementById("answer-error-message");

    // Load existing answer
    fetch(`http://localhost:8000/api/answers/${answerId}/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    })
        .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch answer");
            return res.json();
        })
        .then((data) => {
            answerField.value = data.content || "";
        })
        .catch((err) => {
            console.error("Error loading answer:", err);
            errorDiv.textContent = "Failed to load the answer.";
        });

    // Update on submit
    document.getElementById("edit-answer-form").addEventListener("submit", function (e) {
        e.preventDefault();
        errorDiv.textContent = "";

        const updatedContent = answerField.value.trim();

        if (!updatedContent) {
            errorDiv.textContent = "Answer cannot be empty.";
            return;
        }

        fetch(`http://localhost:8000/api/answers/${answerId}/`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ content: updatedContent })
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to update answer.");
                return res.json();
            })
            .then(() => {
                // Redirect back to the question or post detail page
                const questionId = sessionStorage.getItem("lastQuestionId");
                window.location.href = `/post-detail.html?id=${questionId}`;
            })
            .catch((err) => {
                console.error("Error updating answer:", err);
                errorDiv.textContent = "Could not update the answer. Try again.";
            });
    });
});
