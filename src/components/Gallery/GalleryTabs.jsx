"use client"

import React, { useState } from "react"
import styles from "./GalleryTabs.module.css"

const GalleryTabs = ({ tabs, defaultTab, onTabChange, children }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (onTabChange) {
      onTabChange(tab)
    }
  }

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabsList}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ""}`}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>
        {React.Children.map(children, (child) => {
          // Only render the active tab's content
          if (child.props.value === activeTab) {
            return child
          }
          return null
        })}
      </div>
    </div>
  )
}

export const TabPanel = ({ children, value }) => {
  return <div data-value={value}>{children}</div>
}

export default GalleryTabs
