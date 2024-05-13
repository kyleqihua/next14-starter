import Image from "next/image"
import styles from "./singlePost.module.css"
// import { Post } from "@/lib/models"
import PostUser from "@/components/postUser/postUser"
import { Suspense } from "react"

// fetch data from an API
// const getData = async (slug) => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`)

//   if (!res.ok) {
//     throw new Error("Something went wrong")
//   }

//   return res.json()
// }

const SinglePostPage = async ({ params }) => {
  const { slug } = params
  // const post = await getData(slug)
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src="https://images.pexels.com/photos/250591/pexels-photo-250591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="post image"
          fill
          className={styles.img}
        />
      </div>

      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          <Image
            className={styles.avatar}
            src="https://images.pexels.com/photos/250591/pexels-photo-250591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="avatar imgage"
            width={50}
            height={50}
          />
          <Suspense fallback={<div>Loading...</div>} />
          <PostUser userId={post.userId} />
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.dateValue}>01.01.2024</span>
          </div>
        </div>
        <div className={styles.content}>{post.body}</div>
      </div>
    </div>
  )
}

export default SinglePostPage
