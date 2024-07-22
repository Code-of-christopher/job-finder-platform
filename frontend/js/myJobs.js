document.addEventListener("DOMContentLoaded", async () => {
  const myJobListings = document.getElementById("my-job-listings");

  // Check if user is logged in
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  if (!userId) {
    alert("You need to be logged in to view this page.");
    window.location.href = "/login";
    return;
  }

  try {
    if (role !== "employer") {
      alert("Only employers can view this page.");
      window.location.href = "/";
      return;
    }

    const jobsRes = await fetch(`/api/jobs/get/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const jobs = await jobsRes.json();

    if (!jobs || jobs.length === 0) {
      myJobListings.innerHTML = '<p>No jobs found.</p>';
      return;
  }

    jobs.forEach((job) => {
      const jobDiv = document.createElement("div");
      jobDiv.className = "job";
      jobDiv.innerHTML = `
        <h2>${job.title}</h2>
        <p><strong>Company:</strong> ${job.company}</p>
        <p><strong>Location:</strong> ${job.location}</p>
        <p><strong>Type:</strong> ${job.type}</p>
        <p>${job.description}</p>
        <button onclick="deleteJob('${job._id}')">Delete</button>
      `;
      myJobListings.appendChild(jobDiv);
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
});

async function deleteJob(jobId) {
  if (confirm("Are you sure you want to delete this job?")) {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/jobs/delete/${jobId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert("Job deleted successfully");
        window.location.reload();
      } else {
        alert("Failed to delete job");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

document.querySelector(".logout").addEventListener("click", async(event) => {
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
