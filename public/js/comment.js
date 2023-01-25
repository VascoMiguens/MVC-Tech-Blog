// New post form handler
const newFormHandler = async (event) => {
  event.preventDefault();

  const comment_text = document.querySelector(".form-input").value;
  const post_id = document.querySelector(".comment-form").dataset.id;

  if (comment_text) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ comment_content: comment_text, post_id: post_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace(`/post/${post_id}`);
    } else {
      alert("Failed to create post");
    }
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submit", newFormHandler);

// Scroll to comment after clicking comment in dashboard
window.addEventListener("load", function () {
  var commentIdForScrolling = new URLSearchParams(window.location.search).get(
    "commentIdForScrolling"
  );
  var postElement = document.querySelector("#comment-" + commentIdForScrolling);
  postElement.scrollIntoView({ behavior: "smooth", block: "center" });
});
