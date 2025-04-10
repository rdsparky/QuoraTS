const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', async (e) => {
e.preventDefault();

const full_name = document.getElementById('fullname').value;
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
const confirmPassword = document.getElementById('confirm-password').value;

if (password !== confirmPassword) {
document.getElementById('error-message').innerText = 'Passwords do not match';
return;
}

try {
const response = await fetch('http://localhost:8000/api/users/signup/', {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify({
full_name,
email,
password
})
});

if (!response.ok) {
const errorData = await response.json();
document.getElementById('error-message').innerText = errorData.message;
return;
}

const data = await response.json();
console.log(data);
const { id: userId, email: userEmail, access: accessToken, refresh: refreshToken } = data;

// Save tokens to local storage
localStorage.setItem('userId', userId);
localStorage.setItem('email', userEmail);
localStorage.setItem('accessToken', accessToken);
localStorage.setItem('refreshToken', refreshToken);

// Redirect to home page or dashboard
window.location.href = '/';
} catch (error) {
console.error(error);
document.getElementById('error-message').innerText = 'Error signing up';
}
});
