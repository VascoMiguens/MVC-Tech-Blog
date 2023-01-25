const updateFormHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    const postContent = document.querySelector(".form-content").value.trim();
    const titletUpdate = document.querySelector(".form-title").value.trim();
    const response = await fetch(`/api/post/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: titletUpdate,
        post_content: postContent,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace(`/dashboard`);
    } else {
      alert("Failed to update project");
    }
  }
};

const deletePost = async (event) => {
  const postId = event.target.getAttribute("data-id");
  const response = await fetch(`/api/post/${postId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    window.location.replace("/dashboard");
  } else {
    alert("Failed to delete post");
  }
};

document.querySelector(".delete-btn").addEventListener("click", deletePost);

document
  .querySelector(".update-btn")
  .addEventListener("click", updateFormHandler);
