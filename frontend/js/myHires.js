document.addEventListener('DOMContentLoaded', () => {
    const hiresContainer = document.getElementById('hires-container');
    const jobId = localStorage.getItem('jobId'); // Assuming the jobId is stored in localStorage
  
    if (jobId) {
      fetch(`/api/applications/getClients/${jobId}`)
        .then(response => response.json())
        .then(clients => {
          if (clients.error) {
            hiresContainer.innerHTML = `<p>${clients.error}</p>`;
          } else {
            if (clients.length === 0) {
              hiresContainer.innerHTML = '<p>No hires found.</p>';
            } else {
              clients.forEach(client => {
                const clientElement = document.createElement('div');
                clientElement.className = 'client';
                clientElement.innerHTML = `
                  <h3>${client.name}</h3>
                  <p>Email: ${client.email}</p>
                  <p>Resume: ${client.resume}</p>
                  <p>Cover Letter: ${client.coverLetter}</p>
                  <p>User ID: ${client.userId}</p>
                `;
                hiresContainer.appendChild(clientElement);
              });
            }
          }
        })
        .catch(error => {
          console.error('Error fetching clients:', error);
          hiresContainer.innerHTML = '<p>Failed to load hires.</p>';
        });
    } else {
      hiresContainer.innerHTML = '<p>No job selected.</p>';
    }
  });
  
  document.querySelector(".logout").addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
  
      if (response.ok) {
        localStorage.clear();
        window.location.href = "/login";
      } else {
        alert("Failed to log out");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  });