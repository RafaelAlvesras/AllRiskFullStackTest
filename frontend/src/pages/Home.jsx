import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import api from '../services/api';
import styles from './Home.module.css';
import { toast } from 'react-toastify';

function Home() {
  const [cidade, setCidade] = useState('');
  const [previsao, setPrevisao] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const buscarClima = async (e) => {
    e.preventDefault();

    try {
      const response = await api.get(`/weather/${cidade}`);
      setPrevisao(response.data);
    } catch (error) {
      toast.error('Erro ao buscar previsão do tempo!')
      console.error(error);
    }
  };

  const favoritarCidade = async () => {
    try {
      await api.post('/cidadesfavoritas', {
        nome: previsao.name
      });
      setIsFavorite(true)
      toast.success('Cidade adicionada aos favoritos!')
    } catch (error) {
      console.error('Erro ao favoritar cidade:', error);
      toast.error('Erro ao favoritar!')
    }
  };

  useEffect(() => {
    const verificarFavorita = async () => {
      if (previsao) {
        try {
          const response = await api.get('/cidadesfavoritas');
          const favoritas = response.data;

          const jaFavoritada = favoritas.some(
            (c) => c.nome.toLowerCase() === previsao.name.toLowerCase()
          );

          jaFavoritada ? setIsFavorite(true) : setIsFavorite(false);
        } catch (error) {
          console.error('Erro ao verificar favoritos:', error);
        }
      }
    };

    verificarFavorita();
  }, [previsao]);

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-start', width:'100vw'}}>
      <div className={styles.container}>
        <h2 className={styles.title}>Buscar Clima</h2>

        <form onSubmit={buscarClima} className={styles.boxSearch}>
          <input
            type="text"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            placeholder="Digite a cidade"
            required
            className={styles.inputSearch}
          />
          <div
            type="submit"
            className={styles.buttonSearch}

          >
            Buscar
          </div>
        </form>

        {previsao && (
          <div className={styles.box}>
            <div className={styles.card}>
              <div className={styles.cardInfo}>
                <span className={styles.cityName}>{previsao.name}</span>
                <div className={styles.conditions}>
                  <span className={styles.extraInfo}>{previsao.weather[0].description}</span>
                  <img
                    src={`https://openweathermap.org/img/wn/${previsao.weather[0].icon}@2x.png`}
                    alt="Ícone do clima"
                    className={styles.icon}
                  />
                </div>
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.temperature}>{previsao.main.temp}°C</span>
                <p className={styles.extraInfo}>Mín:<span>{previsao.main.temp_Min}°C</span></p>
                <p className={styles.extraInfo}>Máx:<span>{previsao.main.temp_Max}°C</span></p>
              </div>
              <div className={styles.actions}>
                <div
                  onClick={favoritarCidade}
                  className={styles.removeButton}
                >
                  <FaStar size={20} className={styles.star} color={isFavorite ? '#FFD700' : '#ccc'} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
