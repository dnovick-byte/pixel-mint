"use client"
import Link from "next/link"
import { Brush } from "lucide-react"
import styles from "./Features.module.css"
import { useEffect, useRef } from "react";


export const Features = () => {
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (textRef.current && imageRef.current) {
        const textRect = textRef.current.getBoundingClientRect();
        const imageRect = imageRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (textRect.top < windowHeight * 0.8) {
          textRef.current.classList.add(styles.show);
        }
        if (imageRect.top < windowHeight * 0.8) {
          imageRef.current.classList.add(styles.show);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run once to check if already in view

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <section className={styles.features}>
      <div className={styles.featuresContent}>
        <div ref={textRef} className={styles.featureText}>
          <div className={styles.featureLabel}>Simple as 1-2-3</div>
          <h2 className={styles.featureTitle}>Create Digital Art in Minutes</h2>
          <p className={styles.featureDescription}>
            No artistic skills? No problem! Our easy-to-use drawing tools make creating fun for everyone.
          </p>
          <div className={styles.featureSteps}>
            <div className={styles.featureStep}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Draw Your Masterpiece</h3>
                <p className={styles.stepDescription}>Use our simple drawing tools to create your unique artwork.</p>
              </div>
            </div>
            <div className={styles.featureStep}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Make It Yours</h3>
                <p className={styles.stepDescription}>
                  Turn your art into a digital collectible with one click. We handle all the technical stuff.
                </p>
              </div>
            </div>
            <div className={styles.featureStep}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Share & Show Off</h3>
                <p className={styles.stepDescription}>Display your creation in our gallery or share it with friends.</p>
              </div>
            </div>
          </div>
          <Link href="/draw" className={styles.primaryButton}>
            <Brush className={styles.buttonIcon} />
            Start Creating Now
          </Link>
        </div>
        <div ref={imageRef} className={styles.featureImage}>
          <img
            src="features.png"
            alt="Drawing canvas preview"
            className={styles.previewImage}
          />
        </div>
      </div>
    </section>
  )
}