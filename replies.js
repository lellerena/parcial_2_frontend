// Handle reply submission
function handleReply(postId) {
    const replyInput = document.getElementById(`reply-input-${postId}`)
    const replyContent = replyInput.value.trim()
    const currentUser = window.appState.currentUser

    if (!replyContent) return

    const reply = {
        content: replyContent,
        authorId: currentUser.uid,
        authorName: currentUser.displayName || currentUser.email,
        postId: postId,
        createdAt: new Date()
    }

    db.collection('replies')
        .add(reply)
        .then(() => {
            replyInput.value = ''
            loadReplies(postId)
            // Update reply count badge
            updateReplyCount(postId)
        })
        .catch((error) => {
            console.error('Error adding reply: ', error)
        })
}

// Get and update reply count for a post
function updateReplyCount(postId) {
    db.collection('replies')
        .where('postId', '==', postId)
        .get()
        .then((snapshot) => {
            const replyCount = snapshot.size
            const replyButton = document.querySelector(
                `.reply-button[data-post-id="${postId}"]`
            )

            if (replyButton) {
                // Update the reply button text with count
                replyButton.innerHTML = `💬 ${replyCount > 0 ? replyCount : ''}`

                // Add a special class if there are replies
                if (replyCount > 0) {
                    replyButton.classList.add('has-replies')
                } else {
                    replyButton.classList.remove('has-replies')
                }
            }
        })
        .catch((error) => {
            console.error('Error getting reply count: ', error)
        })
}

// Load replies for a post
function loadReplies(postId) {
    const repliesContainer = document.getElementById(`replies-${postId}`)
    repliesContainer.innerHTML =
        '<p class="loading-replies">Loading replies...</p>'

    db.collection('replies')
        .where('postId', '==', postId)
        .orderBy('createdAt', 'asc')
        .get()
        .then((snapshot) => {
            repliesContainer.innerHTML = ''

            if (snapshot.empty) {
                repliesContainer.innerHTML =
                    '<p class="no-replies">No replies yet. Be the first to reply!</p>'
                return
            }

            // Add reply count indicator
            const replyCountHeader = document.createElement('div')
            replyCountHeader.className = 'reply-count-header'
            replyCountHeader.textContent = `${snapshot.size} ${
                snapshot.size === 1 ? 'Reply' : 'Replies'
            }`
            repliesContainer.appendChild(replyCountHeader)

            snapshot.forEach((doc) => {
                const reply = doc.data()
                const date = reply.createdAt.toDate
                    ? reply.createdAt.toDate()
                    : new Date(reply.createdAt)
                const formattedDate = date.toLocaleString()

                const replyDiv = document.createElement('div')
                replyDiv.className = 'reply'
                replyDiv.innerHTML = `
                    <div class="reply-header">
                        <span class="reply-author">${reply.authorName}</span>
                        <span class="reply-date">${formattedDate}</span>
                    </div>
                    <div class="reply-content">${reply.content}</div>
                `

                repliesContainer.appendChild(replyDiv)
            })
        })
        .catch((error) => {
            console.error('Error loading replies: ', error)
            repliesContainer.innerHTML =
                '<p class="error-loading">Error loading replies. Try again later.</p>'
        })
}

// Check if a post has replies and update the UI accordingly
function checkPostReplies(postId) {
    updateReplyCount(postId)
}

// Make functions available globally
window.handleReply = handleReply
window.loadReplies = loadReplies
window.updateReplyCount = updateReplyCount
window.checkPostReplies = checkPostReplies
