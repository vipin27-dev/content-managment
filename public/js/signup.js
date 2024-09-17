document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.querySelector("#signup-form");

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    console.log("Form Data:", { name, email, password });

    try {
      const response = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      }, {
        headers: { "Content-Type": "application/json" }
      });

      if (response.data.success) {
        window.location.href = "/login";
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during signup. Please try again.");
    }
  });
});
