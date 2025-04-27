import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { WiDaySunny } from 'react-icons/wi';

function Navbar() {
    const navigate = useNavigate();
    const [logado, setLogado] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        const handleStorageChange = () => {
            setLogado(!!localStorage.getItem('token'));
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        token ? setLogado(true) : setLogado(false);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setLogado(false);
        navigate('/');
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <WiDaySunny size={36} color="white" />


                <nav className={styles.nav}>
                    {logado ? (
                        <>
                            <Link to="/home" className={styles.link}>Home</Link>
                            <Link to="/favorites" className={styles.link}>Favoritos</Link>
                            <button onClick={handleLogout} className={styles.logoutButton}>Sair</button>
                        </>
                    ) : (
                        <>
                            <Link to="/" className={styles.link}>Login</Link>
                            <Link to="/register" className={styles.link}>Cadastro</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
