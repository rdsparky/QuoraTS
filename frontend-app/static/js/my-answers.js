document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");

    if (!userId) {
        console.error("User ID not found in localStorage");
        return;
    }

    fetch(`http://localhost:8000/api/answers/?user=${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        }})
        .then((response) => response.json())
        .then((data) => {
            const container = document.getElementById("answer-list");

            if (!data.length) {
                container.innerHTML = `
                    <div class="bg-white p-4 shadow rounded text-center text-gray-500">
                        You haven’t posted any answers yet.
                    </div>`;
                return;
            }

            data.forEach((answer) => {
    const card = document.createElement("div");
    card.className =
        "bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition border border-gray-100";

    const answeredAt = new Date(answer.created_at).toLocaleString();

    card.innerHTML = `
        <div class="space-y-3">
            <!-- Question Title -->
            <h2 class="text-lg font-semibold text-gray-900">
                ${answer.question_title || "Untitled Question"}
            </h2>

            <!-- Answer Body -->
            <p class="text-gray-700 text-sm leading-relaxed">
                ${answer.content}
            </p>

            <!-- Meta Info -->
            <div class="flex justify-between items-center text-xs text-gray-500 pt-2 border-t">
                <span><strong>Answered on:</strong> ${answeredAt}</span>
                <span><strong>By:</strong> ${answer.user_email}</span>
            </div>
        </div>
    `;

                card.onclick = () => {
                    window.location.href = `/questions/${answer.question?.id}`;
                };

                container.appendChild(card);
            });
        })
        .catch((err) => {
            console.error("Error loading answers:", err);
        });
});
