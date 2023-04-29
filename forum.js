const postList = document.getElementById('post-list');
const newPostForm = document.getElementById('new-post-form');

let posts = [];

function renderPosts() {
  postList.innerHTML = '';

  posts.forEach((post) => {
    const li = document.createElement('li');
    const title = document.createElement('h3');
    const content = document.createElement('p');
    const upvoteButton = document.createElement('button');
    const downvoteButton = document.createElement('button');
    const replyButton = document.createElement('button');
    const replyForm = document.createElement('form');

    title.innerText = post.title;
    content.innerText = post.content;
    upvoteButton.innerText = 'Upvote';
    downvoteButton.innerText = 'Downvote';
    replyButton.innerText = 'Reply';

    replyForm.innerHTML = `
      <label for="reply-content">Reply:</label>
      <textarea id="reply-content" name="reply-content" required></textarea>
      <button type="submit">Submit</button>
    `;

    upvoteButton.addEventListener('click', () => {
      post.upvotes++;
      renderPosts();
    });

    downvoteButton.addEventListener('click', () => {
      post.downvotes++;
      renderPosts();
    });

    replyForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const replyContent = event.target.elements['reply-content'].value;

      if (replyContent) {
        post.replies.push({
          content: replyContent,
          upvotes: 0,
          downvotes: 0,
        });

        renderPosts();
      }
    });

    li.appendChild(title);
    li.appendChild(content);
    li.appendChild(upvoteButton);
    li.appendChild(downvoteButton);
    li.appendChild(replyButton);
    li.appendChild(replyForm);

    post.replies.forEach((reply) => {
      const replyLi = document.createElement('li');
      const replyContent = document.createElement('p');
      const replyUpvoteButton = document.createElement('button');
      const replyDownvoteButton = document.createElement('button');

      replyContent.innerText = reply.content;
      replyUpvoteButton.innerText = 'Upvote';
      replyDownvoteButton.innerText = 'Downvote';

      replyUpvoteButton.addEventListener('click', () => {
        reply.upvotes++;
        renderPosts();
      });

      replyDownvoteButton.addEventListener('click', () => {
        reply.downvotes++;
        renderPosts();
      });

      replyLi.appendChild(replyContent);
      replyLi.appendChild(replyUpvoteButton);
      replyLi.appendChild(replyDownvoteButton);

      li.appendChild(replyLi);
    });

    postList.appendChild(li);
  });
}

newPostForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const postTitle = event.target.elements['post-title'].value;
  const postContent = event.target.elements['post-content'].value;

  if (postTitle && postContent) {
    posts.push({
      title: postTitle,
      content: postContent,
      upvotes: 0,
      downvotes: 0,
      replies: [],
    });

    event.target.reset();
    renderPosts();
  }
});

renderPosts();
