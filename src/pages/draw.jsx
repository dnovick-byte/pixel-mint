"use client"

import { useState, useEffect } from "react"
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
  const[name, setName] = useState(null)
  const [description, setDescription] = useState(null)
  const [recipient, setRecipient] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [ipfsUrl, setIpfsUrl] = useState('');
  const [error, setError] = useState(null);
  const [minted, setMinted] = useState(false);


  const mint = async () => {
    setIsLoading(true); // Start loading

    try {
        // Step 1: Call the mint API
        /*const mintResponse = await axios.post("/api/mint", {
            filePath: ipfsUrl, // pass the path
            name: name,
            description: description,
            recipientAddress: recipient,
        });*/
        const mintResponse = await axios.post('https://api.verbwire.com/v1/nft/mint/quickMintFromMetadata', 
          {
            imageUrl: ipfsUrl,
            name: name,
            description: description,
            recipientAddress: recipient,
            data: `[{"trait_type":"Created_On","value":"PixelMint"}]`,
            chain: 'sepolia'
          },
          {
            headers: {
              'X-API-Key': process.env.NEXT_PUBLIC_API_KEY,  // Your API key
              'Content-Type': 'application/json'  // Correct content-type for JSON data
            }
          }
        );

        if (mintResponse.status === 200) {
            // Step 2: If minting is successful, call the DB add API
            const dbAddResponse = await axios.post("/api/db_add", {
                name: name,
                description: description,
                image: ipfsUrl,
            });

            if (dbAddResponse.status === 201) {
                setMinted(true); // Successfully minted and stored in DB
            } else {
                setError('Failed to store NFT in the database');
            }
        } else {
            setError('Failed to mint NFT');
        }
    } catch (error) {
        console.error('Error:', error);
        setError('An error occurred while processing your request');
    } finally {
        setIsLoading(false); // Stop loading after process
    }
  };



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
                setIsLoading(true);
                setStep("preview");
                const captureAndUpload = async () => {
                    const element = document.getElementById('grid'); // Element to capture
                    const canvas = await html2canvas(element);
                    const file = canvas.toDataURL('image/png'); // Convert canvas to base64
            
                    // Send to Next.js API for uploading
                    const response = await fetch('/api/upload', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ file })
                    });
            
                    const data = await response.json();
                    if (data.ipfsUrl) {
                        console.log(data.ipfsUrl)
                        setIpfsUrl(data.ipfsUrl); // Store and display IPFS URL
                        setIsLoading(false);
                    } else {
                        console.error('Upload failed:', data.error);
                    }
                };
                captureAndUpload();
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
                <button className={styles.nextButton} disabled={isLoading} onClick={() => setStep("mint")}>
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
                disabled={isLoading}
                onClick={async () => {
                  setStep("success"); 
                  await mint();
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
                            <li>Try different colors and drawing tools</li>
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

                {isLoading ? (
                    <div className={styles.artworkPreview}>
                      <div className={styles.spinner}></div>
                    </div>
                ) : (
                  <>
                    <div className={styles.artworkPreview}>
                      <img
                        src={ipfsUrl}
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
                  </>
                )
                }
              </div>
            )
          }

        {step === "mint" && (
          <div className={styles.mintSection}>
            <h1 className={styles.mintTitle}>Make Your Artwork Uniquely Yours</h1>
            <p className={styles.mintDescription}>Turn your creation into a digital collectible that only you own</p>

            <div className={styles.mintContent}>
              <div className={styles.artworkPreview}>
                <img
                  src={ipfsUrl}
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
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Recipient Wallet Address</label>
                  <input 
                    type="text" 
                    placeholder="Enter recipient wallet address" 
                    onChange={(e) => setRecipient(e.target.value)}
                    className={styles.formInput} 
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

            {isLoading ? (
              <div className={styles.load}>
                <p className={styles.successDescription}>Minting your NFT...</p>
                <div className={styles.spinner}></div>
              </div>
            ) : minted ? (
              <>
                <h1 className={styles.successTitle}>Congratulations!</h1>
                <p className={styles.successDescription}>Your artwork is now a unique digital collectible</p>

                <div className={styles.successArtwork}>
                  <img
                    src={ipfsUrl}
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
                  <Link href="/gallery" className={styles.viewCollectionButton}>
                    View in Gallery
                  </Link>
                  <button className={styles.shareButton}>
                    <Share2 className={styles.buttonIcon} />
                    Share
                  </button>
                  <button className={styles.createAnotherButton} disabled={isLoading}>Create Another</button>
                </div>
              </>
            ) : null}
          </div>
        )}
      </main>
    </div>
  )
}