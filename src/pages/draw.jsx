"use client"

import { useState } from "react"
import Link from "next/link"
import { Sparkles, ChevronRight, ArrowLeft, PenTool, Eraser, Download, Share2, Sun, Moon, LayoutGrid, RefreshCw, Pen, Square } from "lucide-react"
import styles from "./draw.module.css"
import { Grid } from "../components/Grid/Grid"
import html2canvas from "html2canvas";
import axios from "axios";



export default function DrawPage() {
  const [activeColor, setActiveColor] = useState("#000000")
  const [bgColor, setBgColor] = useState("#FFFFFF")
  const [tool, setTool] = useState("pen")
  const [step, setStep] = useState("draw")
  const [gridSize, setGridSize] = useState(24)
  const [reset, setReset] = useState(null)
  const [gridLines, setGridLines] = useState(true)
  const [imgUrl, setImgUrl] = useState(null)
  const [apiImg, setApiImg] = useState(null)
  const[name, setName] = useState(null)
  const [description, setDescription] = useState(null)


  
  const mint = async () => {
    console.log( name, description);
    console.log(apiImg);
    await axios.post("/api/mint", {
      filePathRelative: apiImg, // pass the path
      name: name,
      description: description,
    });
  }


  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <Link href="/" className={styles.logoLink}>
              <Sparkles className={styles.logoIcon} />
              <span>PixelMint</span>
            </Link>

            {step !== "draw" && (
              <div className={styles.stepIndicator}>
                <span className={step === "draw" ? styles.activeStep : ""}>Draw</span>
                <ChevronRight className={styles.stepIcon} />
                <span className={step === "preview" ? styles.activeStep : ""}>Preview</span>
                <ChevronRight className={styles.stepIcon} />
                <span className={step === "mint" ? styles.activeStep : ""}>Make It Yours</span>
                <ChevronRight className={styles.stepIcon} />
                <span className={step === "success" ? styles.activeStep : ""}>Done!</span>
              </div>
            )}
          </div>

          {step === "draw" && (
            <button 
              className={styles.nextButton} 
              onClick={async () => {
                setStep("preview");
                const img = document.getElementById("grid"); // Ensure this ID exists
                if (!img) {
                    console.error("Grid element not found!");
                    return;
                }
                
                // Capture the image
                const canvas = await html2canvas(img);
        
                canvas.toBlob(async (blob) => {
                    if (!blob) {
                        console.error("Failed to convert canvas to blob");
                        return;
                    }
                    // Create FormData and append the image
                    const formData = new FormData();
                    formData.append("file", blob, "img.png"); // Name the file
        
        
                    try {
                        const response = await axios.post("/api/upload", formData, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        });
        
                        if (response.data.success) {
                            console.log("File uploaded:", response.data.filePath);
                            console.log("Response Data:", response.data);
                            console.log("Trying to load image from:", response.data.fullPath);
                            const fullUrl = new URL(response.data.filePath, window.location.origin).href;
                            setImgUrl(fullUrl);
                            setApiImg(response.data.filePath);
                        }
                    } catch (error) {
                        console.error("Error uploading image:", error.response?.data || error.message);
                    }
                }, "image/png");
              }
            }>
              Next: Preview
              <ChevronRight className={styles.buttonIcon} />
            </button>
          )}

          {step === "preview" && (
            <div className={styles.navigationButtons}>
              <button className={styles.backButton} onClick={() => setStep("draw")}>
                <ArrowLeft className={styles.buttonIcon} />
                Back to Drawing
              </button>
              <button className={styles.nextButton} onClick={() => setStep("mint")}>
                Next: Make It Yours
                <ChevronRight className={styles.buttonIcon} />
              </button>
            </div>
          )}

          {step === "mint" && (
            <div className={styles.navigationButtons}>
              <button className={styles.backButton} onClick={() => setStep("preview")}>
                <ArrowLeft className={styles.buttonIcon} />
                Back to Preview
              </button>
              <button 
                className={styles.mintButton} 
                onClick={async () => {
                  setStep("success"); 
                  await mint();
                  //await axios.post("/api/clear-uploads"); // Clear uploads after minting

                }}
              >
                Create My Digital Collectible
                <Sparkles className={styles.buttonIcon} />
              </button>
            </div>
          )}

          {step === "success" && (
            <button className={styles.createButton} onClick={() => setStep("draw")}>
              Create Another
            </button>
          )}
        </div>
      </header>

        <main className={styles.main}>
        {step === "draw" && (
            <div className={styles.drawingSection}>
                <div className={styles.toolbox}>
                    <h2 className={styles.toolboxTitle}>Drawing Tools</h2>
                    <p className={styles.toolboxDescription}>Use these tools to create your masterpiece</p>

                    <div className={styles.toolButtons}>
                        <button
                        className={`${styles.toolButton} ${tool === "pen" ? styles.activeToolButton : ""}`}
                        onClick={() => setTool("pen")}
                        >
                        <PenTool className={styles.toolIcon} />
                        Pen
                        </button>
                        <button
                        className={`${styles.toolButton} ${tool === "eraser" ? styles.activeToolButton : ""}`}
                        onClick={() => setTool("eraser")}
                        >
                        <Eraser className={styles.toolIcon} />
                        Eraser
                        </button>
                        <button
                            className={`${styles.toolButton} ${tool === "lighten" ? styles.activeToolButton : ""}`}
                            onClick={() => setTool("lighten")}
                        >
                            <Sun className={styles.toolIcon}/>
                            Lighten
                        </button>
                        <button
                            className={`${styles.toolButton} ${tool === "shade" ? styles.activeToolButton : ""}`}
                            onClick={() => setTool("shade")}
                        >
                            <Moon className={styles.toolIcon}/>
                            Shade
                        </button>
                        <button
                            className={`${styles.toolButton} ${tool === "reset" ? styles.activeToolButton : ""}`}
                            onClick={() => {
                                if (reset) {
                                    setTool("pen");
                                    setGridLines(true);
                                    reset();
                                }
                            }}
                        >
                            <RefreshCw className={styles.toolIcon}/>
                            Reset
                        </button>
                        <button 
                            className={`${styles.toolButton} ${gridLines ? styles.activeToolButton : ""}`} 
                            onClick={() => setGridLines(!gridLines)}
                        >
                            <LayoutGrid className={styles.toolIcon}/>
                            Grid Lines
                        </button>   
                        <div className={styles.toolButton}>
                            <input 
                                type="color" 
                                value={activeColor} 
                                onChange={(e) => setActiveColor(e.target.value)} 
                                className={styles.colorInput}
                            />
                            <Pen className={styles.toolIcon}/>

                        </div>
                        <div className={styles.toolButton}>
                            <input 
                                type="color" 
                                value={bgColor} 
                                onChange={(e) => setBgColor(e.target.value)} 
                                className={styles.colorInput}
                            />
                            <Square className={styles.toolIcon}/>

                        </div>
                        <div className={styles.centeredGridSize}>
                          <input
                            type="range"
                            min="1"
                            max="100"
                            value={gridSize}
                            onChange={(e) => setGridSize(Number(e.target.value))}
                          />
                          <label>Grid Size: {gridSize} x {gridSize}</label>
                        </div>
                    
                    </div>


            

              


                    <div className={styles.tips}>
                        <h3 className={styles.tipsTitle}>Tips</h3>
                        <ul className={styles.tipsList}>
                            <li>Click and drag to draw</li>
                            <li>Use the eraser to remove mistakes</li>
                            <li>Try different colors and brush sizes</li>
                            <li>Keep it simple - sometimes less is more!</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.canvasArea}>
                    <h1 className={styles.canvasTitle}>Create Your Artwork</h1>
                    <p className={styles.canvasDescription}>Let your creativity flow! Draw anything you can imagine.</p>

                    <div className={styles.canvasContainer} id="canvas">
                        <Grid penColor={activeColor} bgColor={bgColor} tool={tool} gridSize={gridSize} setReset={setReset} gridLines={gridLines} />
                    </div>
                </div>
            </div>
        )}

        {step === "preview" && (
          <div className={styles.previewSection}>
            <h1 className={styles.previewTitle}>Preview Your Artwork</h1>
            <p className={styles.previewDescription}>Here's how your creation looks. Happy with it?</p>

            <div className={styles.artworkPreview}>
              <img
                src={imgUrl}
                alt="Your artwork preview"
                className={styles.previewImage}
              />
            </div>

            <div className={styles.previewActions}>
              <button className={styles.downloadButton}>
                <Download className={styles.buttonIcon} />
                Download
              </button>
              <button className={styles.shareButton}>
                <Share2 className={styles.buttonIcon} />
                Share
              </button>
            </div>
          </div>
        )}

        {step === "mint" && (
          <div className={styles.mintSection}>
            <h1 className={styles.mintTitle}>Make Your Artwork Uniquely Yours</h1>
            <p className={styles.mintDescription}>Turn your creation into a digital collectible that only you own</p>

            <div className={styles.mintContent}>
              <div className={styles.artworkPreview}>
                <img
                  src={imgUrl}
                  alt="Your artwork"
                  className={styles.previewImage}
                />
              </div>

              <div className={styles.mintForm}>
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Title Your Artwork</label>
                  <input 
                    type="text" 
                    placeholder="My Amazing Creation" 
                    onChange={(e) => setName(e.target.value)}
                    className={styles.formInput} 
                  />
                </div>

                <div className={styles.formField}>
                  <label className={styles.formLabel}>Description</label>
                  <textarea 
                    placeholder="Tell the story behind your artwork..." 
                    onChange={(e) => setDescription(e.target.value)}
                    className={styles.formTextarea} 
                  />
                </div>

                <div className={styles.mintInfo}>
                  <h3 className={styles.infoTitle}>What happens next?</h3>
                  <p className={styles.infoDescription}>When you create your digital collectible:</p>
                  <ul className={styles.infoList}>
                    <li>Your artwork becomes a unique digital item that only you own</li>
                    <li>It's stored safely and permanently online</li>
                    <li>You can display it in your collection or share it with others</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className={styles.successSection}>
            <div className={styles.successIcon}>
              <Sparkles className={styles.sparklesIcon} />
            </div>

            <h1 className={styles.successTitle}>Congratulations!</h1>
            <p className={styles.successDescription}>Your artwork is now a unique digital collectible</p>

            <div className={styles.successArtwork}>
              <img
                src={imgUrl}
                alt="Your minted artwork"
                className={styles.successImage}
              />
              <div className={styles.artworkDetails}>
                <h3 className={styles.artworkTitle}>{name}</h3>
                <p className={styles.artworkInfo}>Created by You • Just now</p>
              </div>
            </div>

            <p className={styles.collectionInfo}>Your digital collectible is now part of your collection</p>

            <div className={styles.successActions}>
              <button className={styles.viewCollectionButton}>View in My Collection</button>
              <button className={styles.shareButton}>
                <Share2 className={styles.buttonIcon} />
                Share
              </button>
              <button className={styles.createAnotherButton}>Create Another</button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}