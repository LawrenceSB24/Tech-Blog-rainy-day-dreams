const newPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const post_content = document.querySelector('#post-description').value.trim();

    if (title && post_content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({title, post_content}),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('failed to create blog');
        }
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.hasAttribute('data-id');

        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('failed to delete blog');
        }
    }
}

document.querySelector('.new-post-form').addEventListener('submit', newPostHandler);
document.querySelector('.post-list').addEventListener('click', delButtonHandler);
