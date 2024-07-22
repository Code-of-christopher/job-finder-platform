document.addEventListener("DOMContentLoaded", () => {
  const authLinks = document.getElementById("auth-links");
  const employerLinks = document.getElementById("employer-links");
  const seekerLinks = document.getElementById("seeker-links");
  const content = document.getElementById("content");

  // Check if user is logged in
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");
  if (role === "employer") {
    authLinks.style.display = "none";
    seekerLinks.style.display = "none";
    employerLinks.style.display = "block";
    content.innerHTML += `
      <h1>Welcome to Job Finder</h1>
      <h2>Welcome, ${username}</h2>
    `;
  } else if (role === "jobseeker") {
    authLinks.style.display = "none";
    employerLinks.style.display = "none";
    seekerLinks.style.display = "block";
    content.innerHTML += `
      <h1>Welcome to Job Finder</h1>
      <h2>Welcome, ${username}</h2>
    `;
  } else {
    authLinks.style.display = "block";
    seekerLinks.style.display = "none";
    employerLinks.style.display = "none";
    content.innerHTML += `
      <h1>Welcome to Job Finder</h1>
      <h2>This is a market place for jobs</h2>
      <h3>Click <a href='/register'>here</a> to start</h3>
    `;
  }
  document.querySelectorAll(".logout").forEach(logoutButton => {
    logoutButton.addEventListener("click", async (event) => {
      event.preventDefault();
      try {
        const response = await fetch('/api/users/logout', {
          method: 'POST',
          credentials: 'include',
        });
  
        if (response.ok) {
          localStorage.clear();
          window.location.href = '/login';
        } else {
          alert('Failed to log out');
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    });
  });
  
});
