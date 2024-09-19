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

      blogs.forEach(async (blog) => {
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
              <div class="comment-section mt-3"></div> <!-- Placeholder for comment form -->
          </div>
        `;

        blogsContainer.appendChild(blogItem);

        // Fetch comments for each blog after rendering it
        const comments = await fetchComments(blog._id);
        if (comments.length > 0) {
          const commentsList = comments
            .map((comment) => `<p>${comment.content}</p>`)
            .join("");
          blogItem.querySelector(".comment-section").innerHTML += commentsList;
        } else {
          blogItem.querySelector(
            ".comment-section"
          ).innerHTML += `<p>No comments yet.</p>`;
        }
      });

      document.querySelectorAll(".add-comment").forEach((button) => {
        button.addEventListener("click", (event) => {
          const blogId = event.target.getAttribute("data-blog-id");
          const commentSection =
            event.target.parentElement.querySelector(".comment-section");

          // Display the comment form dynamically
          commentSection.innerHTML = `
            <form class="comment-form">
              <textarea class="form-control mb-2" name="content" rows="3" placeholder="Add a comment..."></textarea>
              <button type="submit" class="btn btn-primary btn-sm">Submit</button>
            </form>
          `;

          // Add event listener for form submission
          const form = commentSection.querySelector(".comment-form");
          form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const content = form.querySelector("textarea").value;

            if (content.trim() === "") {
              alert("Comment cannot be empty");
              return;
            }

            try {
              const token = localStorage.getItem("token");
              await axios.post(
                "/api/comments",
                { content, blogId },
                { headers: { Authorization: `Bearer ${token}` } }
              );
              alert("Comment added successfully!");
              form.reset();
              // Append the new comment dynamically
              const newComment = `<p>${content}</p>`;
              commentSection.innerHTML += newComment;
            } catch (error) {
              console.error("Error adding comment:", error);
              alert("Failed to add comment. Please try again.");
            }
          });
        });
      });
    } catch (error) {
      console.error("Error fetching blogs:", error);
      blogsContainer.innerHTML = `<p class="text-danger">Failed to load blogs. Please try again later.</p>`;
    }
  }

  // Fetch comments for a blog
  async function fetchComments(blogId) {
    try {
      const response = await axios.get(`/api/comments/${blogId}`);
      return response.data.comments;
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
  }

  fetchBlogs();
});
