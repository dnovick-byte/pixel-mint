"use client"

import Link from "next/link"
import { ArrowRight, Brush } from "lucide-react"
import styles from "./Hero.module.css"
import { useState, useCallback } from "react";

export const Hero = () => {
  const gridSize = 40
  const [grid, setGrid] = useState(new Array(gridSize * gridSize).fill("#f9fafb"));

  // Generates a random rainbow color
  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100.00%, 70.00%)`;
  };

  // Handles color change on mouse interaction
  const changeGridColor = useCallback((index) => {
    setGrid((prev) => {
      const newGrid = [...prev];
      newGrid[index] = getRandomColor();
      return newGrid;
    });
  }, []);

  // Event handlers with preventDefault to stop potential issues
  const handleMouseOver = (e) => {
    e.preventDefault();
  };

  const handleMouseEnter = (index) => {
    changeGridColor(index);
  };

  return (
    <section 
      className={styles.hero}

    >
      {/* Grid Overlay */}
      <div 
        className={styles.gridOverlay}
      >
        {grid.map((color, index) => (
          <div
            key={index}
            className={styles.gridCell}
            style={{backgroundColor: color}}
            onMouseEnter={() => handleMouseEnter(index)} // for some reason the coloring does not work unless I have both of these
            onMouseOver={handleMouseOver}

          ></div>
        ))}
      </div>

      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Create, Share & Own Your Digital Art</h1>
        <p className={styles.heroSubtitle}>
          Draw anything you can imagine and turn it into a unique digital collectible that only you own. No technical knowledge required.
        </p>
        <div className={styles.heroButtons}>
          <Link href="/draw" className={styles.primaryButton}>
            <Brush className={styles.buttonIcon} />
            Start Drawing
            <ArrowRight className={styles.buttonIcon} />
          </Link>
          <Link href="/gallery" className={styles.secondaryButton}>
            Explore Gallery
          </Link>
        </div>
      </div>
    </section>
  )
};