import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "../Button/Button";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../../contexts/CitiesContext";
import BackButton from "../BackButton/BackButton";
import { useNavigate } from "react-router-dom";

function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [emoji, setEmoji] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState("");
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const { addCity, isLoading, error } = useCities();

  useEffect(() => {
    if (!lat || !lng)
      return setGeocodingError("Start by clicking somewhere on the map");

    async function fetchCity() {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
        );
        if (!res.ok) throw new Error("Can't fetch data please try again later");
        const data = await res.json();

        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 👆",
          );
        setCityName(data.city || data.locality);
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        console.log(error);
        setGeocodingError(error.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCity();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };
    const hasError = await addCity(newCity);
    if (!hasError) navigate("/app/cities");
  }

  if (isLoadingGeocoding) return <Spinner />;
  if (geocodingError) return <Message message={geocodingError} />;
  if (error) return <Message message={error} />;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
