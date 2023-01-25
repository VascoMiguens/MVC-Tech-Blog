const newFormHandler = async (event) => {
  event.preventDefault();

  //Get the values of "add-post"
  const title = document.querySelector(".form-title").value;
  const content = document.querySelector(".form-content").value;

  const response = await fetch("api/post", {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    // Display a success message
    document.location.reload();
    window.scrollTo(0, 0);
  } else {
    // Display an error message
    alert(response.statusText);
  }
};

document.querySelector(".post-form").addEventListener("submit", newFormHandler);

document.addEventListener("DOMContentLoaded", function () {
  var postElements = document.querySelectorAll(".posts-title, .comments-title");
  postElements.forEach(function (element) {
    element.addEventListener("click", function () {
      //get the post id for scrolling from data-id attribute
      var postId = this.dataset.id;
      var commentId = this.dataset.comment;
      //check if the element is a posts-title or comments-title
      if (this.classList.contains("posts-title")) {
        //redirect to the edit page
        window.location.href = "/post/" + postId + "/edit";
      } else {
        //redirect to the post page
        window.location.href =
          "/post/" + postId + "?commentIdForScrolling=" + commentId;
      }
    });
  });
});
