import { db, formatDate } from './common.js'

const href = new URL(window.location.href)
const postId = href.searchParams.get('id')

const { data: post, error: postError } = await db
    .from('posts')
    .select()
    .eq('id', postId)
    .limit(1)
    .single()

if(postError) {
    alert("Error fetching post!")
}

post.date = new Date(post.date)

const repliesList = document.querySelector("#replies")
const { data: replies, error: repliesError } = await db
    .from('replies')
    .select()
    .eq('post', postId)
    .order('date', {ascending: true})

replies.forEach(reply => {
    const li = document.createElement('li')
    const div = document.createElement("div")
    
    const header = document.createElement("h5")
    const content = document.createElement("p")

    header.textContent = `Replied by ${reply.name ?? "Anonymous"} at ${formatDate(new Date(reply.date))}:`
    content.textContent = reply.content

    div.appendChild(header)
    div.appendChild(content)

    li.appendChild(div)
    repliesList.appendChild(li)
})

const newReplyForm = document.querySelector('#new-reply-form')

newReplyForm.addEventListener('submit', async e => {
    e.preventDefault()

    const name = newReplyForm['reply-name'].value
    const content = newReplyForm['reply-content'].value

    const { error: newReplyError } = await db
        .from('replies')
        .insert({name, content, post: postId})
    
    if(newReplyError) {
        alert('Error creating reply!')
    } else {
        newReplyForm.reset();
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
});

document.querySelector("#title").textContent = post.title;
document.querySelector("#metadata").textContent = `Posted by ${post.name ?? "Anonymous"} at ${formatDate(post.date)}`;
document.querySelector("#content").textContent = post.content;