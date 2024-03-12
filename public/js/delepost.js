const delButton = document.querySelector('#delPost-btn');
const blogpostId = document.querySelector('input[name="blogPostId"]').value;

const deleteHandler = async () => {
    const response = await fetch(`/api/post/${postId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Something went wrong deleting post')
    }
};

if(delButton!=null){
    delButton.addEventListener('click', deleteHandler);
}