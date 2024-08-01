function searchKeywords() {
    // Get the search input
    var input = document.getElementById('searchInput').value.toLowerCase();
    // Get the blog content
    var content = document.getElementById('blogContent');
    // Get all blog posts
    var blogPosts = content.getElementsByClassName('blog-post');

    // Loop through all blog posts and hide those who don't match the search query
    for (var i = 0; i < blogPosts.length; i++) {
        var post = blogPosts[i];
        var text = post.innerText.toLowerCase();

        if (text.includes(input)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    }
}