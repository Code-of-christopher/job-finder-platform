document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;
  const errorDiv = document.getElementById('error');

  try {
    const res = await fetch('/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password, role })
    });

    const data = await res.json();

    if (res.ok) {
      window.location.href = '/login';
    } else {
      errorDiv.textContent = data.error;
    }
  } catch (error) {
    errorDiv.textContent = 'An error occurred. Please try again.';
  }
});
