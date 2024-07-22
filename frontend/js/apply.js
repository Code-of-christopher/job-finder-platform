document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const jobId = urlParams.get("jobId");
  const applyJobForm = document.getElementById("apply-form");
  const userId = localStorage.getItem("userId");


  applyJobForm
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(applyJobForm);
      const applicationData = {};

      formData.forEach((value, key) => {
        applicationData[key] = value;
      });

      applicationData.jobId = jobId;
      applicationData.userId = userId;
      const errorDiv = document.getElementById("error");

      try {
        const res = await fetch("/api/applications/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(applicationData),
        });

        const data = await res.json();

        if (res.ok) {
          alert("Application submitted successfully");
          window.location.href = "/applications";
        } else {
          errorDiv.textContent = data.error;
        }
      } catch (error) {
        errorDiv.textContent = "An error occurred. Please try again.";
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
