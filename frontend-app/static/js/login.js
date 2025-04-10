document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMessage = document.getElementById('error-message');

  try {
    const response = await fetch('http://localhost:8000/api/users/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Save login data to localStorage
      localStorage.setItem('userId', data.id);
      localStorage.setItem('email', data.email);
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);

      // Redirect to home or dashboard
      window.location.href = '/';
    } else {
      errorMessage.textContent = data.detail || 'Login failed. Please try again.';
      errorMessage.style.color = 'red';
    }
  } catch (error) {
    errorMessage.textContent = 'An error occurred. Please try again.';
    errorMessage.style.color = 'red';
    console.error(error);
  }
});
