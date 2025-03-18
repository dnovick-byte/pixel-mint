import { Header } from "../components/Header/Header";
import axios from "axios";
import { useEffect, useState } from 'react';

export default function WalletPage() {
    const [walletData, setWalletData] = useState([]); // maybe add loading screen for when walletdata is null, and if the function returns an error make the loading screen an error screen

    useEffect(() => {
        console.log('yi');
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/wallet");
                //console.log("Type of response.data:", typeof response.data); // Logs type (object, array, etc.)
                //console.log(response.data);
                setWalletData(response.data.nfts || []);
            } catch (error) {
                console.error("Error fetching wallet data:", error); 
            }
        };
        fetchData();

    }, []);

    const processWalletItem = (item) => {
        console.log("Processing:", item);
    };

    return (
        <div>
            <Header />
            This is the wallet page.
            {walletData && (
                <pre>{JSON.stringify(walletData, null, 2)}</pre>
            )}
            {walletData && walletData.map(processWalletItem)}
        </div>
    );
}