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
    // reload page and scroll to top
    document.location.reload();
    window.scrollTo(0, 0);
  } else {
    // log an error message
    console.log(response.statusText);
  }
};

document.querySelector(".post-form").addEventListener("submit", newFormHandler);

document.addEventListener("DOMContentLoaded", function () {
  var postElements = document.querySelectorAll(
    ".posts-title, .comments-title, .comments-button"
  );
  postElements.forEach(function (element) {
    element.addEventListener("click", function () {
      //get the post id for scrolling from data-id attribute
      var postId = this.dataset.id;
      console.log(postId);
      var commentId = this.dataset.comment;
      console.log(commentId);
      //check if the element is a posts-title or comments-title
      if (this.classList.contains("posts-title")) {
        //redirect to the edit page
        window.location.href = "/post/" + postId + "/edit";
      } else if (this.classList.contains("comments-title")) {
        //redirect to the post page
        window.location.href = "/comments/" + commentId + "/edit";
      } else if (this.classList.contains("comments-button")) {
        window.location.href =
          "/post/" + postId + "?commentIdForScrolling=" + commentId;
      }
    });
  });
});
