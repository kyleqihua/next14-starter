import Image from "next/image";
import styles from "./about.module.css";
const AboutPage = () => {
  return (
    <div>
      <div className={styles.imgContainer}>
        <Image
          src="https://images.pexels.com/photos/23221538/pexels-photo-23221538.jpeg"
          alt="about image"
          fill
        />
      </div>
    </div>
  );
};

export default AboutPage;
