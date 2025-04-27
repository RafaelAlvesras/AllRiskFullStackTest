import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import styles from './Login.module.css';
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', { email, senha });
      const { token } = response.data;

      localStorage.setItem('token', token);
      window.dispatchEvent(new Event('storage'));

      navigate('/home');
    } catch (error) {
      console.error('Erro no login:', error);
      toast.error('Email ou senha inválidos!')
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', width: '100vw' }}>
      <div className={styles.container}>
        <div className={styles.formCard}>
          <h2 className={styles.title}>Login</h2>

          <form onSubmit={handleLogin} className={styles.form}>
            <input
              type="email"
              placeholder="Digite seu email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Digite sua senha..."
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
