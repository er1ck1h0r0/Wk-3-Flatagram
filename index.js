// Your code goes here
const picUrl = "http://localhost:3000/images";
const commentsUrl = "http://localhost:3000/comments";
//Dog Details
function fetchDogDetails(id) {
    fetch(`${picUrl}/${id}`)
        .then(response => response.json())
        .then(dog => {
            document.getElementById("card-title").innerText = dog.title;
            document.getElementById("card-image").src = dog.image;
            //Likes

            const redHeart = document.getElementById("like-button");
            redHeart.addEventListener("click", () => {
                dog.likes++;
                document.getElementById("like-count").innerText = `${dog.likes} likes`;
            });
        });
}
function makeNewComment() {
    document.getElementById("comment-form").addEventListener("submit", event => {
        event.preventDefault();
        const newCommentDescription = document.getElementById("comment").value;
        if (newCommentDescription) {
            const newComment = document.createElement("li");
            newComment.textContent = newCommentDescription;
            document.getElementById("comments-list").appendChild(newComment);
            event.target.reset();
        }
    });
}

function fetchDogComments() {
    fetch(commentsUrl)
        .then(response => response.json())
        .then(comments => {
            const commentsList = document.getElementById("comments-list");
            commentsList.innerHTML = comments.map(comment => `<li>${comment.content}</li>`).join("");
        });
}

function acquireDogImage() {
    document.getElementById("card-title").addEventListener("click", () => {
        const dogImage = document.getElementById("card-image");
        dogImage.style.display = dogImage.style.display === "none" ? "block" : "none";
    });
}
//Listen for events
document.addEventListener("DOMContentLoaded", () => {
    fetchDogDetails(1);
    fetchDogComments();
    makeNewComment();
    acquireDogImage();
});
