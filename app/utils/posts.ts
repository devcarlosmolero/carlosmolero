function getPostImageUrls(markdown: string) {
    const imgMarkdownRegex = /!\[.*?\]\(([^)]+)\)/g
    const urls = []
    let match

    while ((match = imgMarkdownRegex.exec(markdown)) !== null) {
        urls.push(`http:${match[1]}`)
    }

    return urls
}

const PostUtils = {
    getPostImageUrls,
}

export default PostUtils
