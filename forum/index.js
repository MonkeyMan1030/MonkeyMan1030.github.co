import { db } from "./common.js";

const postList = document.querySelector('#post-list');
const newPostForm = document.querySelector('#new-post-form');

const { data: posts, error } = await db
  .from('posts')
  .select()
  .order('date', { ascending: false })

if(error) {
    alert(error)
}

posts.forEach(post => {
    const li = document.createElement('li');
    const div = document.createElement("div");
        
    div.textContent = `${post.name ?? "Anonymous"} - `;
    const link = document.createElement("a");
    link.href = `/forum/post.html?id=${post.id}`;
    link.textContent = post.title;
    div.appendChild(link);
    li.appendChild(div);
    postList.appendChild(li);
});

// add new post
newPostForm.addEventListener('submit', async e => {
    e.preventDefault();

    const name = newPostForm['post-name'].value;
    const title = newPostForm['post-title'].value;
    const content = newPostForm['post-content'].value;

    const {error} = await db 
        .from('posts')
        .insert({name, title, content})

    if(error) {
        alert(error);
    }
    
    newPostForm.reset();
    setTimeout(() => {
        window.location.reload();
    }, 1000);
});