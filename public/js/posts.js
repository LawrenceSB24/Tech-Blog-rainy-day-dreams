// Handlers for posting, editing, and deleting posts

async function newPostHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('input[name="post-description"]').value;

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_content
        }),

        headers: {'Content-Type': 'application/json'}
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

async function commentFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const comment = document.querySelector('input[name="post-comment"]').value.trim();
    const id = window.location.toString().split('/')[window.location.toString.split('/').length - 1];

    if (comment_content) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'POST',
            body: JSON.stringify({
                title,
                comment,
                content: comment

            }),

            headers: {'Content-Type': 'application/json'}
        });
        if (response.ok) {
            document.location.replace();
        } else {
            alert(response.statusText);
        }
    }
}

async function deletePostHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[window.location.toString.split('/').length - 1];
    
    if (comment_content) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
document.querySelector('delete-post-btn').addEventListener('click', deletePostHandler);