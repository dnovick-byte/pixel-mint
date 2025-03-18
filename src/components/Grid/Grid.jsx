import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import styles from  './Grid.module.css';
import axios from "axios";


export const Grid = ({ penColor, bgColor, tool, gridSize, setReset, gridLines }) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [preMint, setPreMint] = useState(false);

    const createGrid = () => {
        return Array.from({ length: gridSize * gridSize }, (_, i) => ({ id: i, color: bgColor }));
    };

    const [cells, setCells] = useState(createGrid);

    useEffect(() => {
        setCells(createGrid());
    }, [gridSize, bgColor]);

    useEffect(() => { // i do not understand why i can't just use the setCells(createGrid()); here instead of having the resetBoard function
        setReset(() => resetBoard);
    }, [setReset]);

    const resetBoard = () => {
        setCells(createGrid());
    };

    const handleMouseDown = (index) => {
        setIsDrawing(true);
        updateCellColor(index);
    };

    const handleMouseOver = (index) => {
        if (isDrawing) updateCellColor(index);
    };

    const handleMouseUp = () => setIsDrawing(false);

    const updateCellColor = (index) => {
        setCells((prevCells) =>
            prevCells.map((cell, i) =>
                i === index ? { ...cell, color: getUpdatedColor(cell.color) } : cell
            )
        );
    };

    const getUpdatedColor = (color) => {
        if (tool === "shade") {
            return adjustColor(color, -5);
        } else if (tool === "lighten") {
            return adjustColor(color, 5);
        } else if (tool ==="eraser") {
            return bgColor
        } else { // tool === "pen"
            return penColor;
        }
    };

    const adjustColor = (color, percent) => {
        // Check if the color is in hex format
        if (color.startsWith("#")) {
            // Convert hex to RGB
            color = hexToRgb(color);
        }
    
        // Extract RGB values
        const values = color.match(/\d+/g);
        let r = parseInt(values[0]);
        let g = parseInt(values[1]);
        let b = parseInt(values[2]);
    
        // Adjust each color channel
        const change = Math.floor(255 * (percent / 100));
        r = Math.min(255, Math.max(0, r + change));
        g = Math.min(255, Math.max(0, g + change));
        b = Math.min(255, Math.max(0, b + change));
    
        return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    };
    // Helper function to convert hex to RGB
    const hexToRgb = (hex) => {
        let r = 0, g = 0, b = 0;

        // 3 digits
        if (hex.length === 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        }
        // 6 digits
        else if (hex.length === 7) {
            r = parseInt(hex[1] + hex[2], 16);
            g = parseInt(hex[3] + hex[4], 16);
            b = parseInt(hex[5] + hex[6], 16);
        }

        return `rgb(${r}, ${g}, ${b})`;
    };



    const preMintFunc = () => {
        setPreMint(true);
    }
    

    const getImgUrl = async () => {
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
                console.log(response.data.fullPath);
                return response.data.fullPath;
            } catch(err) {
                console.error("Error capturing image:", err.response?.data || err.message);
            }
        })
    }

    const mint = async () => {

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

                    // Now call the mint API with the file path
                    await axios.post("/api/mint", {
                        fullPath: response.data.fullPath, // pass full path
                        name: "Pixel Mint NFT",
                        description: "An AI-generated pixel NFT",
                    });
                }
            } catch (error) {
                console.error("Error uploading image:", error.response?.data || error.message);
            }
        }, "image/png");
    };


    return (
        <div className={styles.gridContainer}>
            <div id="grid" className={styles.grid} onMouseUp={handleMouseUp} style={{
                display: "grid",
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                gridTemplateRows: `repeat(${gridSize}, 1fr)`
            }}>
                {cells.map((cell, index) => (
                    <div
                        key={cell.id}
                        className={`${styles.cell} ${gridLines ? styles["grid-lines"] : ""}`}
                        style={{ backgroundColor: cell.color }}
                        onMouseDown={() => handleMouseDown(index)}
                        onMouseOver={() => handleMouseOver(index)}
                    />
                ))}
            </div>
        </div>
    );
};