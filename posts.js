// DOM Elements for posts
const postsContainer = document.getElementById('posts-container')
const profilePostsContainer = document.getElementById('profile-posts-container')
const postButton = document.getElementById('post-button')
const postContent = document.getElementById('post-content')

// Post functionality
postButton.addEventListener('click', () => {
    if (!postContent.value.trim()) return

    const currentUser = window.appState.currentUser
    const newPost = {
        content: postContent.value,
        authorId: currentUser.uid,
        authorName: currentUser.displayName || currentUser.email,
        createdAt: new Date(),
        likes: 0,
        likedBy: []
    }

    db.collection('posts')
        .add(newPost)
        .then(() => {
            postContent.value = ''
            loadPosts()
        })
        .catch((error) => {
            console.error('Error adding post: ', error)
        })
})

// Load posts for timeline (all posts by the current user)
function loadPosts() {
    postsContainer.innerHTML = ''
    const currentUser = window.appState.currentUser
    if (!currentUser) return

    db.collection('posts')
        .where('authorId', '==', currentUser.uid)
        .orderBy('createdAt', 'desc')
        .get()
        .then((snapshot) => {
            if (snapshot.empty) {
                postsContainer.innerHTML =
                    '<p>No posts yet. Create your first post!</p>'
                return
            }

            snapshot.forEach((doc) => {
                const post = doc.data()
                const postElement = createPostElement(doc.id, post)
                postsContainer.appendChild(postElement)
            })
        })
        .catch((error) => {
            console.error('Error loading posts: ', error)
        })
}

// Load posts for profile page
function loadUserPosts() {
    profilePostsContainer.innerHTML =
        '<div class="loading">Loading your posts...</div>'
    const currentUser = window.appState.currentUser
    if (!currentUser) return

    db.collection('posts')
        .where('authorId', '==', currentUser.uid)
        .orderBy('createdAt', 'desc')
        .get()
        .then((snapshot) => {
            profilePostsContainer.innerHTML = ''

            // Add post count to profile heading
            const profileHeading = document.querySelector('#profile h3')
            const postCountBadge = document.createElement('span')
            postCountBadge.className = 'post-count'
            postCountBadge.textContent = snapshot.size

            // Remove any existing badge before adding a new one
            const existingBadge = profileHeading.querySelector('.post-count')
            if (existingBadge) {
                existingBadge.remove()
            }

            profileHeading.appendChild(postCountBadge)

            if (snapshot.empty) {
                profilePostsContainer.innerHTML =
                    '<p>No posts yet. Create your first post from the home page!</p>'
                return
            }

            snapshot.forEach((doc) => {
                const post = doc.data()
                const postElement = createPostElement(doc.id, post)
                profilePostsContainer.appendChild(postElement)
            })

            // Update navigation highlight - safely check for function existence
            if (typeof window.updateNavHighlight === 'function') {
                window.updateNavHighlight('profile')
            }
        })
        .catch((error) => {
            console.error('Error loading user posts: ', error)
            profilePostsContainer.innerHTML =
                '<p>Error loading posts. Please try again later.</p>'
        })
}

// Helper function to create a post element
function createPostElement(postId, post) {
    const postDiv = document.createElement('div')
    postDiv.className = 'post'
    postDiv.id = `post-${postId}`

    const date = post.createdAt.toDate
        ? post.createdAt.toDate()
        : new Date(post.createdAt)
    const formattedDate = date.toLocaleString()

    postDiv.innerHTML = `
        <div class="post-header">
            <span class="post-author">${post.authorName}</span>
            <span class="post-date">${formattedDate}</span>
        </div>
        <div class="post-content">${post.content}</div>
        <div class="post-actions">
            <button class="like-button" data-post-id="${postId}">❤️ ${post.likes}</button>
            <button class="reply-button" data-post-id="${postId}">💬</button>
            <button class="delete-button" data-post-id="${postId}">🗑️ Delete</button>
        </div>
        <div class="reply-form" id="reply-form-${postId}">
            <input type="text" placeholder="Write a reply..." id="reply-input-${postId}">
            <button class="submit-reply" data-post-id="${postId}">Reply</button>
        </div>
        <div class="replies" id="replies-${postId}"></div>
    `

    // Add event listeners
    setTimeout(() => {
        // Like button
        postDiv
            .querySelector('.like-button')
            .addEventListener('click', function () {
                handleLike(postId)
            })

        // Reply button
        postDiv
            .querySelector('.reply-button')
            .addEventListener('click', function () {
                const replyForm = document.getElementById(
                    `reply-form-${postId}`
                )
                const repliesContainer = document.getElementById(
                    `replies-${postId}`
                )

                if (replyForm.style.display === 'block') {
                    replyForm.style.display = 'none'

                    // Only hide replies if they're already visible
                    if (
                        repliesContainer.children.length > 0 &&
                        repliesContainer.style.display !== 'none'
                    ) {
                        repliesContainer.style.display = 'none'
                    }
                } else {
                    replyForm.style.display = 'block'
                    repliesContainer.style.display = 'block'
                    loadReplies(postId)
                }
            })

        // Submit reply
        postDiv
            .querySelector('.submit-reply')
            .addEventListener('click', function () {
                handleReply(postId)
            })

        // Delete button
        postDiv
            .querySelector('.delete-button')
            .addEventListener('click', function () {
                handleDeletePost(postId)
            })

        // Check if post has replies and update UI
        checkPostReplies(postId)
    }, 0)

    return postDiv
}

function handleLike(postId) {
    const currentUser = window.appState.currentUser
    const postRef = db.collection('posts').doc(postId)

    db.runTransaction((transaction) => {
        return transaction.get(postRef).then((doc) => {
            const post = doc.data()
            const likedBy = post.likedBy || []
            const userLiked = likedBy.includes(currentUser.uid)

            if (userLiked) {
                // Unlike
                transaction.update(postRef, {
                    likes: post.likes - 1,
                    likedBy: likedBy.filter((id) => id !== currentUser.uid)
                })
            } else {
                // Like
                transaction.update(postRef, {
                    likes: post.likes + 1,
                    likedBy: [...likedBy, currentUser.uid]
                })
            }
        })
    }).then(() => {
        // Refresh posts
        if (timeline.style.display === 'block') {
            loadPosts()
        } else {
            loadUserPosts()
        }
    })
}

function handleDeletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        db.collection('posts')
            .doc(postId)
            .delete()
            .then(() => {
                // Also delete all replies to this post
                db.collection('replies')
                    .where('postId', '==', postId)
                    .get()
                    .then((snapshot) => {
                        snapshot.forEach((doc) => {
                            doc.ref.delete()
                        })
                    })

                // Refresh posts
                if (timeline.style.display === 'block') {
                    loadPosts()
                } else {
                    loadUserPosts()
                }
            })
            .catch((error) => {
                console.error('Error deleting post: ', error)
            })
    }
}

// Make functions available globally
window.loadPosts = loadPosts
window.loadUserPosts = loadUserPosts
