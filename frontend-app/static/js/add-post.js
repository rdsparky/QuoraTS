document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("post-form");
  const errorMessage = document.getElementById("post-error-message");
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const body = document.getElementById("body").value.trim();
    const tagsInput = document.getElementById("tags").value.trim();

    const tags = tagsInput ? tagsInput.split(",").map(tag => tag.trim()) : [];

    fetch("http://localhost:8000/api/questions/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        body: body,
        tags: tags,
        user: userId,
      }),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => {
            throw new Error(data.detail || "Failed to create post.");
          });
        }
        return response.json();
      })
      .then(data => {
        // Redirect to My Posts or wherever
        window.location.href = "/my-posts.html";
      })
      .catch(error => {
        errorMessage.textContent = error.message;
        errorMessage.style.color = "red";
      });
  });
});
