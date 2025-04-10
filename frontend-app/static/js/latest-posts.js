document.addEventListener("DOMContentLoaded", function () {
    const accessToken = localStorage.getItem("accessToken");

    fetch("http://localhost:8000/api/questions/", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch latest posts.");
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById("post-list");

            if (data.length === 0) {
                container.innerHTML = `<p class="text-gray-600">No recent posts found.</p>`;
                return;
            }

            data.forEach(post => {
                const postCard = document.createElement("div");
                postCard.className = "bg-white shadow-md rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition";
                postCard.onclick = () => {
                    sessionStorage.setItem("lastQuestionId", post.id);
                    window.location.href = `/post-detail.html?id=${post.id}`;
                };

                const tags = post.tag_names?.map(tag =>
                    `<span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full mr-1">${tag}</span>`
                ).join("") || "";

                postCard.innerHTML = `
                    <h2 class="text-lg font-semibold text-gray-800 mb-1">${post.title}</h2>
                    <p class="text-sm text-gray-600 mb-2">${post.body}</p>
                    <div class="mb-2">${tags}</div>
                    <p class="text-xs text-gray-400">Posted: ${new Date(post.created_at).toLocaleString()}</p>
                `;

                container.appendChild(postCard);
            });
        })
        .catch(error => {
            console.error("Error loading latest posts:", error);
            document.getElementById("post-list").innerHTML =
                `<p class="text-red-600">Failed to load latest posts. Try again later.</p>`;
        });
});
