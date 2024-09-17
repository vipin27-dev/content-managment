document.addEventListener("DOMContentLoaded", () => {
  const editProfileForm = document.querySelector("form");
  const token = localStorage.getItem("token");

  editProfileForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    try {
      const response = await axios.put(
        "http://localhost:4000/api/users/profile", 
        {
          name,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${token}` }, 
        }
      );

      if (response.data.success) {
        window.location.href = "/dashboard"; 
      } else {
        alert(response.data.message); 
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }
  });
});
