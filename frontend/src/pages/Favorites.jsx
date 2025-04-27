import { useEffect, useState } from 'react';
import api from '../services/api';
import styles from './Favorites.module.css';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';


function Favorites() {
  const [favoritas, setFavoritas] = useState([]);

  useEffect(() => {
    buscarFavoritas();
  }, []);

  const buscarFavoritas = async () => {
    try {
      const response = await api.get('/cidadesfavoritas');
      const lista = response.data;

      const cidadesComPrevisao = await Promise.all(
        lista.map(async (cidade) => {
          const climaResponse = await api.get(`/weather/${cidade.nome}`);
          const clima = climaResponse.data;
          return {
            id: cidade.id,
            nome: cidade.nome,
            temp: clima.main.temp,
            temp_Min: clima.main.temp_Min,
            temp_Max: clima.main.temp_Max,
            descricao: clima.weather[0].description,
            icon: clima.weather[0].icon,
          };
        })
      );

      setFavoritas(cidadesComPrevisao);
    } catch (error) {
      console.error('Erro ao buscar cidades favoritas:', error);
    }
  };

  const removerFavorita = async (id) => {
    try {
      await api.delete(`/cidadesfavoritas/${id}`);
      buscarFavoritas();
    } catch (error) {
      console.error('Erro ao remover favorita:', error);
      toast.error('Erro ao remover cidade!');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Minhas Cidades Favoritas</h2>
      <div className={styles.box}>
        {favoritas.length === 0 ? (
          <div style={{display:'flex', paddingTop:'6rem',fontWeight:'600'}}>
            <p>Você ainda não favoritou nenhuma cidade.</p>
          </div>
        ) : (
          favoritas.map((cidade) => (
            <div key={cidade.id} className={styles.card}>
              <div className={styles.cardInfo}>
                <span className={styles.cityName}>{cidade.nome}</span>
                <div className={styles.conditions}>
                  <span className={styles.extraInfo}>{cidade.descricao}</span>
                  <img
                    src={`https://openweathermap.org/img/wn/${cidade.icon}@2x.png`}
                    alt="Ícone do clima"
                    className={styles.icon}
                  />
                </div>
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.temperature}>{cidade.temp}°C</span>
                <p className={styles.extraInfo}>Mín:<span>{cidade.temp_Min}°C</span></p>
                <p className={styles.extraInfo}>Máx:<span>{cidade.temp_Max}°C</span></p>
              </div>
              <div className={styles.actions}>
                <div
                  onClick={() => removerFavorita(cidade.id)}
                  className={styles.removeButton}
                >
                  <FaTrash size={20} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Favorites;
