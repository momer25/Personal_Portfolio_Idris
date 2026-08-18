function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function () {
  const isAdmin = localStorage.getItem("isAdmin");
  const adminSection = document.getElementById("admin-section");
  const adminLogin = document.getElementById("admin-login");

  // Show/hide sections based on admin login status
  if (isAdmin === "true") {
    adminSection.style.display = "block";
    adminLogin.style.display = "none";
  } else {
    adminSection.style.display = "none";
    adminLogin.style.display = "block";
  }

  // Fetch blog posts from the server
  fetch("http://localhost:5500/api/posts") // Ensure the correct port
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    })
    .then(data => {
      const blogContainer = document.getElementById("blog-posts");
      blogContainer.innerHTML = "";
      data.posts.forEach(post => {
        const article = document.createElement("article");
        article.classList.add("blog-post");
        article.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p><small>Published on: ${post.date}</small>`;
        blogContainer.appendChild(article);
      });
    })
    .catch(error => console.error("Error loading blog content:", error));

  // Initialize TinyMCE editor
  tinymce.init({
    selector: "#post-content"
  });

  // Publish new blog post
  document.getElementById("publish-post").addEventListener("click", function () {
    const title = document.getElementById("post-title").value;
    const content = tinymce.get("post-content").getContent();

    if (title && content) {
      const newPost = { title, content, date: new Date().toISOString().split("T")[0] };

      // Send POST request to server to save the new post
      fetch("http://localhost:5500/api/posts", { // Ensure correct port
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost)
      })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        // Check if response has content before parsing JSON
        return response.text().then(text => text ? JSON.parse(text) : {});
      })
      .then(data => {
        alert(data.message || "Post published successfully!");
        location.reload(); // Reload the page to see the new post
      })
      .catch(error => alert("Error saving blog post: " + error.message));
    } else {
      alert("Please fill in all fields!");
    }
  });
});

// Rebuild mailto links from data attributes at runtime so the raw
// address isn't sitting in the page source for scrapers to harvest.
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".email-link").forEach(function (link) {
    const user = link.getAttribute("data-user");
    const domain = link.getAttribute("data-domain");
    if (user && domain) {
      link.setAttribute("href", "mailto:" + user + "@" + domain);
    }
  });
});

// Admin login function
function loginAdmin() {
  const password = prompt("Enter admin password:");
  if (password === "your-admin-password") {
    localStorage.setItem("isAdmin", "true");
    location.reload();
  } else {
    alert("Invalid password!");
  }
}
