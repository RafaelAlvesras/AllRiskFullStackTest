import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import styles from './Login.module.css';
import { toast } from 'react-toastify';

function Register() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post('/auth/register', {
        nome,
        email,
        senha,
      });
      toast.success('Cadastro realizado com sucesso! Faça login para continuar.')
      navigate('/');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      toast.error('Erro ao cadastrar usuário.')
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', width: '100vw' }}>
      <div className={styles.container}>
        <div className={styles.formCard}>
          <h2 className={styles.title}>Cadastre-se</h2>

          <form onSubmit={handleRegister} className={styles.form}>
            <input
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Digite aqui seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
