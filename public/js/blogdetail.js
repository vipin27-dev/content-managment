blogForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const categories = Array.from(
    document.getElementById("categories").selectedOptions
  ).map((option) => option.value);

  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in to create a blog.");
    return;
  }
  
  try {
    const response = await axios.post(
      "http://localhost:4000/api/blogs",
      {
        title,
        content,
        categories,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 201) {
      alert("Blog created successfully!");
      window.location.href = "/dashboard";
    } else {
      alert("Failed to create blog. Please try again.");
    }
  } catch (error) {
    console.error("Error creating blog:", error.response?.data || error);
    alert("An error occurred while creating the blog.");
  }
  
});
