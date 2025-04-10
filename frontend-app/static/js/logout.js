(async function handleLogout() {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  const logoutStatusEl = document.getElementById('logout-status');

  if (!accessToken) {
    logoutStatusEl.innerText = 'No active session found.';
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
    return;
  }

  try {
    const response = await fetch('http://localhost:8000/api/users/logout/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh: refreshToken,
      }),
    });

    if (!response.ok) {
      logoutStatusEl.innerText = 'Logout failed. Redirecting anyway...';
    } else {
      logoutStatusEl.innerText = 'Successfully logged out!';
    }

    // Clear tokens regardless of response
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  } catch (error) {
    console.error('Logout error:', error);
    logoutStatusEl.innerText = 'An error occurred. Redirecting...';
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  }
})();
