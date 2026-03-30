import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../../contexts/CitiesContext";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { cityName: name, emoji, date, id, position } = city;
  const { currentCity, removeCity } = useCities();

  function handleDelete(e) {
    e.preventDefault();
    removeCity(id);
  }

  return (
    <li className={styles.container}>
      <Link
        className={`${styles.cityItem} ${currentCity.id === id ? styles["cityItem--active"] : ""}`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{name}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button onClick={handleDelete} className={styles.deleteBtn}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
