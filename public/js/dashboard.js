document.addEventListener("DOMContentLoaded", () => {
  const blogsContainer = document.querySelector(".list-group");

  async function fetchBlogs() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("/api/blogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const blogs = response.data;
      blogsContainer.innerHTML = "";

      if (blogs.length === 0) {
        blogsContainer.innerHTML = `<p class="text-muted">No blogs available.</p>`;
        return;
      }

      blogs.forEach((blog) => {
        const blogItem = document.createElement("div");
        blogItem.classList.add("list-group-item");

        // Use name field if username is not present
        const authorName =
          blog.author && blog.author.name ? blog.author.name : "Unknown Author";
        const categories = blog.categories.map((cat) => cat.name).join(", ");

        blogItem.innerHTML = `
          <h5 class="mb-1">${blog.title}</h5>
          <p class="mb-1">${blog.content.substring(
            0,
            100
          )}...</p> <!-- Show first 100 chars -->
          <small>Author: ${authorName}</small><br>
          <small>Categories: ${categories}</small>
          <div class="mt-3">
              <a href="blogdetails.html?id=${
                blog._id
              }" class="btn btn-sm btn-info">Read More</a>
              <button class="btn btn-sm btn-secondary add-comment" data-blog-id="${
                blog._id
              }">Add Comment</button>
          </div>
        `;

        blogsContainer.appendChild(blogItem);
      });

      document.querySelectorAll(".add-comment").forEach((button) => {
        button.addEventListener("click", (event) => {
          const blogId = event.target.getAttribute("data-blog-id");
          window.location.href = `blogdetails.html?id=${blogId}&addComment=true`;
        });
      });
    } catch (error) {
      console.error("Error fetching blogs:", error);
      blogsContainer.innerHTML = `<p class="text-danger">Failed to load blogs. Please try again later.</p>`;
    }
  }

  fetchBlogs();
});
