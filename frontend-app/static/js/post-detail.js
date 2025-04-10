document.addEventListener("DOMContentLoaded", function () {
  let questionId = new URLSearchParams(window.location.search).get("id") 
    || sessionStorage.getItem("lastQuestionId");

  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId"); // Store this during login/signup

  if (!accessToken || !userId) {
    console.warn("User not logged in or missing credentials");
    return;
  }

  fetch(`http://localhost:8000/api/questions/${questionId}/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })
    .then(response => response.json())
    .then(question => {
      const questionDiv = document.getElementById("question-detail");

      const tagsHtml = (question.tag_names || []).map(tag =>
        `<span class="inline-block text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-2">${tag}</span>`
      ).join("");

      questionDiv.innerHTML = `
        <h1 class="text-2xl font-bold mb-2">${question.title}</h1>
        <p class="text-gray-700 mb-4">${question.body}</p>
        <div class="mb-2">${tagsHtml}</div>
        <p class="text-xs text-gray-400">Posted on: ${new Date(question.created_at).toLocaleString()}</p>
      `;

      // Load answers and show answer button
      loadAnswers(questionId, accessToken, userId);
    })
    .catch(error => {
      console.error("Error loading question:", error);
    });
});


function loadAnswers(questionId, accessToken, userId) {
  fetch(`http://localhost:8000/api/answers/?question=${questionId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    }
  })
    .then(response => response.json())
    .then(answers => {
      const container = document.getElementById("answers-list");
      container.innerHTML = "";

      if (answers.length === 0) {
        container.innerHTML = `<p class="text-sm text-gray-500">No answers yet. Be the first to answer!</p>`;
      } else {
        answers.forEach(answer => {
          const card = document.createElement("div");
          card.className = "bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition";

          const answeredAt = new Date(answer.created_at).toLocaleString();

          card.innerHTML = `
            <p class="text-sm text-gray-800 mb-2">${answer.content}</p>
            <div class="text-xs text-gray-500 border-t pt-2">
              Answered by <span class="font-medium">${answer.user_email || "Unknown"}</span>
              on ${answeredAt}
            </div>
          `;

          container.appendChild(card);
        });
      }

      // Show Add/Edit Answer Button
      showAnswerActionButton(answers, userId, questionId);
    })
    .catch(error => {
      console.error("Error loading answers:", error);
    });
}


function showAnswerActionButton(answers, userId, questionId) {
  const actionContainer = document.getElementById("answer-button-container");
  actionContainer.innerHTML = ""; // Reset any existing content

  const userAnswer = answers.find(answer => answer.user_id === userId) || null;;
  console.log("User Answer:", userAnswer, "User ID:", userId,);
  const btn = document.createElement("a");
  btn.className = "inline-block font-semibold py-2 px-4 rounded";

  if (userAnswer) {
    sessionStorage.setItem("lastAnswerId", userAnswer.id);
    btn.href = `/edit-answer.html?id=${userAnswer.id}&question=${questionId}`;
    btn.textContent = "Edit Answer";
    btn.classList.add("bg-yellow-500", "hover:bg-yellow-600", "text-white");
  } else {
    btn.href = `/add-answer.html?id=${questionId}`;
    btn.textContent = "+ Add Answer";
    btn.classList.add("bg-blue-600", "hover:bg-blue-700", "text-white");
  }

  actionContainer.appendChild(btn);
}
