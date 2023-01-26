// Update a post form handler
const updateFormHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute("data-id")) {
    //grab post id
    const id = event.target.getAttribute("data-id");
    // Grab title and post content
    const commentContent = document.querySelector(".form-content").value.trim();
    const response = await fetch(`/api/comments/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        comment_content: commentContent,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // replace url
      document.location.replace("/dashboard");
    } else {
      // console log an error message
      console.log(response.statusText);
    }
  }
};

// Delete a post
const deletePost = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const commentId = event.target.getAttribute("data-id");
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
      body: JSON.stringify({
        id: commentId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // redirect to dashboard
      document.location.href = "/dashboard";
    } else {
      // console log an error message
      console.log(response.statusText);
    }
  }
};

document.querySelector(".delete-btn").addEventListener("click", deletePost);

document
  .querySelector(".update-btn")
  .addEventListener("click", updateFormHandler);
