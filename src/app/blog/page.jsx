import styles from "./blog.module.css"
import PostCard from "@/components/postCard/postCard"
import { getPosts } from "@/lib/data"

// fetch data from an API
// const getData = async () => {
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
//     next: { revalidate: 3600 },
//   })

//   if (!res.ok) {
//     throw new Error("Something went wrong")
//   }

//   return res.json()
// }

const BlogPage = async () => {
  // fetch data from an API
  // const posts = await getData()

  // fetch data without an API
  const posts = await getPosts()
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  )
}

export default BlogPage
