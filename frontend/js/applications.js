document.addEventListener("DOMContentLoaded", () => {
  const applicationsContainer = document.getElementById(
    "applications-container"
  );
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  if (userId && role === "jobseeker") {
    fetch(`/api/applications/getApplications/${userId}`)
      .then((response) => response.json())
      .then((applications) => {
        if (applications.error) {
          applicationsContainer.innerHTML = `<p>${applications.error}</p>`;
        } else {
          if (applications.length === 0) {
            applicationsContainer.innerHTML = "<p>No applications found.</p>";
          } else {
            applications.forEach((application) => {
              const applicationElement = document.createElement("div");
              applicationElement.className = "application";
              applicationElement.innerHTML = `
                  <h3>${application.name}</h3>
                  <p>Email: ${application.email}</p>
                  <p>Resume: ${application.resume}</p>
                  <p>Cover Letter: ${application.coverLetter}</p>
                `;
              applicationsContainer.appendChild(applicationElement);
            });
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching applications:", error);
        applicationsContainer.innerHTML = "<p>Failed to load applications.</p>";
      });
  } else {
    applicationsContainer.innerHTML = "<p>User not logged in.</p>";
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
