document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/api/jobs/get");
    const jobs = await res.json();

    const jobsList = document.getElementById("jobs-list");
    jobs.forEach((job) => {
      const jobElement = document.createElement("div");
      jobElement.classList.add("job");
      jobElement.innerHTML = `
          <h2>${job.title}</h2>
          <p>${job.company}</p>
          <p>${job.location}</p>
          <p>${job.type}</p>
          <p>${job.description}</p>
          <a href="/apply?jobId=${job._id}">Apply</a>
        `;
      jobsList.appendChild(jobElement);
    });
  } catch (error) {
    alert("Failed to fetch jobs. Please try again later.");
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
