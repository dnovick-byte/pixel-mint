import styles from "./Header.module.css";
export const Header = () => {

    return (
        <nav className={styles.Navbar}>
            <a className={styles.title}href="/">Pixel-Mint</a>
            <div className={styles.menu}>
                <ul className={styles.menuItems}>
                    <li>
                        <a href="wallet">Wallet</a>
                    </li>
                    <li>
                        <a href="learn">Learn</a>
                    </li>
                </ul>
            </div>
        </nav>
    );

};