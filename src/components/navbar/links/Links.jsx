"use client"
import { useState } from "react"
import styles from "./links.module.css"
import NavLink from "./navLink/NavLink"
import Image from "next/image"
import { handleLogout } from "@/lib/action"

const links = [
  { title: "Homepage", path: "/" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
  { title: "Blog", path: "/blog" },
]

const Links = ({ session }) => {
  const [open, setOpen] = useState(false)

  //temporary data

  const isAdmin = true

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        {/* write a condition for authentication */}
        {session ? (
          <>
            {/* write another condition for admin */}
            {session.user?.isAdmin && (
              <NavLink item={{ title: "Admin", path: "/admin" }} />
            )}
            <form action={handleLogout}>
              <button className={styles.logout}>Logout</button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>
      {/* create a button for the mobile menu. add the set state of open */}

      <Image
        className={styles.menuButton}
        src="/menu.png"
        alt="menu button"
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />
      {/* check if the menu button is open. if open, map again */}
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Links
