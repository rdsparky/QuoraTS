document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("answer-form");
  const errorMessage = document.getElementById("answer-error-message");

  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");

  const questionId = new URLSearchParams(window.location.search).get("id") 
    || sessionStorage.getItem("lastQuestionId");

  if (!questionId) {
    errorMessage.textContent = "No question specified.";
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const answerContent = document.getElementById("answer").value.trim();

    if (!answerContent) {
      errorMessage.textContent = "Answer cannot be empty.";
      return;
    }

    fetch(`http://localhost:8000/api/answers/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: questionId,
        content: answerContent,
        user: userId
      }),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => {
            throw new Error(data.detail || "Failed to submit answer.");
          });
        }
        return response.json();
      })
      .then(() => {
        // Redirect back to the question detail
        window.location.href = `/post-detail.html?id=${questionId}`;
      })
      .catch(error => {
        errorMessage.textContent = error.message;
      });
  });
});
