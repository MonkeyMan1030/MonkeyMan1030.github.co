import { db } from "./common.js";
import {collection, orderBy, query, getDocs, addDoc} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js';

const postsRef = collection(db, 'posts');

const postList = document.querySelector('#post-list');
const newPostForm = document.querySelector('#new-post-form');

// display all posts
getDocs(query(postsRef, orderBy('date', 'desc'))).then(snapshot => {
    snapshot.forEach(doc => {
        const post = doc.data();
        const li = document.createElement('li');
        const div = document.createElement("div");
            
        div.textContent = `${post.name ?? "Anonymous"} - `;
        const link = document.createElement("a");
        link.href = `/forum/post.html?id=${doc.id}`;
        link.textContent = post.title;
        div.appendChild(link);
        li.appendChild(div);
        postList.appendChild(li);
    });
});

// add new post
newPostForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = newPostForm['post-name'].value;
    const title = newPostForm['post-title'].value;
    const content = newPostForm['post-content'].value;

    addDoc(postsRef, {
        name,
        title,
        content,
        date: new Date()
    }).then(() => {
        newPostForm.reset();
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }).catch(error => {
        console.error('Error adding new post:', error);
    });
});