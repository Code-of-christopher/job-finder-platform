document.addEventListener("DOMContentLoaded", () => {
  const createJobForm = document.getElementById("create-job-form");

  createJobForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(createJobForm);
    const jobData = {};

    formData.forEach((value, key) => {
      jobData[key] = value;
    });

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      alert("You need to be logged in to create a job.");
      window.location.href = "/login";
      return;
    }

    jobData.postedBy = userId;

    try {
      const response = await fetch("/api/jobs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Job created successfully!");
        window.location.href = "/myJobs";
      } else {
        alert(`Failed to create job: ${result.error}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  });
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
