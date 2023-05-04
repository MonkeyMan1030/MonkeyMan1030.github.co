import { db, formatDate } from './common.js';
import {collection, getDoc, doc, where, orderBy, query, getDocs, addDoc} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js';

const repliesRef = collection(db, 'replies');

const href = new URL(window.location.href); 
const postId = href.searchParams.get('id');
console.log(postId);

const postDoc = doc(db, 'posts', postId);
const post = (await getDoc(postDoc)).data();

const repliesList = document.querySelector("#replies")

getDocs(query(repliesRef, where('post_id', '==', postId), orderBy('date', 'asc'))).then(snapshot => {
    snapshot.forEach(doc => {
        const reply = doc.data();
        const li = document.createElement('li');
        const div = document.createElement("div");
        
        const header = document.createElement("h5");
        const content = document.createElement("p");

        header.textContent = `Replied by ${reply.name ?? "Anonymous"} at ${formatDate(reply.date.toDate())}:`;
        content.textContent = reply.content;

        div.appendChild(header);
        div.appendChild(content);

        li.appendChild(div);
        repliesList.appendChild(li);
    });
});

const newReplyForm = document.querySelector('#new-reply-form');

newReplyForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = newReplyForm['reply-name'].value;
    const content = newReplyForm['reply-content'].value;

    addDoc(repliesRef, {
        name,
        content,
        date: new Date(),
        post_id: postId
    }).then(() => {
        newReplyForm.reset();
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }).catch(error => {
        console.error('Error adding new reply:', error);
    });
});

document.querySelector("#title").textContent = post.title;
document.querySelector("#metadata").textContent = `Posted by ${post.name ?? "Anonymous"} at ${formatDate(post.date.toDate())}`;
document.querySelector("#content").textContent = post.content;