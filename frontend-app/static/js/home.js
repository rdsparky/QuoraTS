// Check if user is logged in
function isLoggedIn() {
  const userId = localStorage.getItem('userId');
  const email = localStorage.getItem('email');
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return userId && email && accessToken && refreshToken;
}

// Render navbar links based on login status
function renderNavbar() {
  const navbarRight = document.getElementById('navbar-right');
  const listSection = document.getElementById('list-section'); // <== grab the section

  if (isLoggedIn()) {
    // Render logged in links
    const html = `
      <a href="/my-posts.html" class="nav-link">My Posts</a>
      <a href="/my-answers.html" class="nav-link">My Answers</a>
      <a href="#" class="nav-link" id="logout-link">Logout</a>
    `;
    navbarRight.innerHTML = html;

    if (listSection) listSection.style.display = 'block'; // <== show search if logged in

    document.getElementById('logout-link').addEventListener('click', () => {
      localStorage.removeItem('userId');
      localStorage.removeItem('email');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/';
    });
  } else {
    // Render logged out links
    const html = `
      <a href="/signup.html" class="nav-link">Sign Up</a>
      <a href="/login.html" class="nav-link">Login</a>
    `;
    navbarRight.innerHTML = html;

    if (listSection) listSection.style.display = 'none'; // <== hide search if not logged in
  }
}

// Render navbar links on page load
renderNavbar();
