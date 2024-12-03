import { db, collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from "./firebase.js";

const postTitle = document.getElementById("postTitle");
const postContent = document.getElementById("postContent");
const postButton = document.getElementById("post");
const getAllPostsButton = document.getElementById("allpost");
const deletePostButton = document.getElementById("delpost");
const updatePostButton = document.getElementById("updpost");
const postsContainer = document.getElementById("postsContainer");

// Collection Reference
const postsCollection = collection(db, "posts");

// 1. Add a new post
postButton.addEventListener("click", async () => {
    const title = postTitle.value.trim();
    const content = postContent.value.trim();

    if (!title || !content) {
        Swal.fire("Error", "Title and Content cannot be empty.", "error");
        return;
    }

    try {
        const docRef = await addDoc(postsCollection, {
            title,
            content,
            createdAt: new Date(),
        });
        Swal.fire("Success", `Post added with ID: ${docRef.id}`, "success");
        postTitle.value = "";
        postContent.value = "";
    } catch (error) {
        Swal.fire("Error", `Failed to add post: ${error.message}`, "error");
    }
});

// 2. Get all posts
getAllPostsButton.addEventListener("click", async () => {
    try {
        const querySnapshot = await getDocs(postsCollection);
        postsContainer.innerHTML = ""; // Clear previous posts
        querySnapshot.forEach((doc) => {
            const post = doc.data();
            const postElement = `
                <div class="bg-white p-4 shadow-md rounded-md mb-4">
                    <h3 class="font-bold text-lg">${post.title}</h3>
                    <p>${post.content}</p>
                    <small class="text-gray-500">ID: ${doc.id}</small>
                </div>
            `;
            postsContainer.innerHTML += postElement;
        });
    } catch (error) {
        Swal.fire("Error", `Failed to retrieve posts: ${error.message}`, "error");
    }
});

// 3. Delete a post by ID
deletePostButton.addEventListener("click", async () => {
    const postId = prompt("Enter the ID of the post to delete:");
    if (!postId) {
        Swal.fire("Error", "Post ID is required.", "error");
        return;
    }

    try {
        await deleteDoc(doc(db, "posts", postId));
        Swal.fire("Success", "Post deleted successfully.", "success");
    } catch (error) {
        Swal.fire("Error", `Failed to delete post: ${error.message}`, "error");
    }
});

// 4. Update a post by ID
updatePostButton.addEventListener("click", async () => {
    const postId = prompt("Enter the ID of the post to update:");
    if (!postId) {
        Swal.fire("Error", "Post ID is required.", "error");
        return;
    }

    const newTitle = prompt("Enter the new title:");
    const newContent = prompt("Enter the new content:");

    if (!newTitle || !newContent) {
        Swal.fire("Error", "Title and Content cannot be empty.", "error");
        return;
    }

    try {
        const postRef = doc(db, "posts", postId);
        await updateDoc(postRef, {
            title: newTitle,
            content: newContent,
            updatedAt: new Date(),
        });
        Swal.fire("Success", "Post updated successfully.", "success");


           // Delay redirection to ensure the success message is displayed
           setTimeout(() => {
            window.location.href = 'index.html'; // Redirect to index.html after success
        }, 1000); // 1.5 seconds delay
    } catch (error) {
        Swal.fire("Error", `Failed to update post: ${error.message}`, "error");


    }
});
