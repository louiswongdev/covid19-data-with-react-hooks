import { useState } from 'react';
import useStats from '../utils/useStats';
import Stats from './Stats';

export default function CountrySelector() {
  const { stats: countries, loading, error } = useStats(
    'https://covid19.mathdro.id/api/countries'
  );
  const [selectedCountry, setSelectedCountry] = useState('CAN');
  if (!countries) return <p>Loading...</p>;

  const countriesArray = countries.countries.map((country) => country.name);

  return (
    <div>
      <h2>Currently showing {selectedCountry}</h2>
      <select
        onChange={(e) => {
          setSelectedCountry(e.target.value);
        }}
        value={selectedCountry}
      >
        {countriesArray.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </select>
      <Stats
        url={`https://covid19.mathdro.id/api/countries/${selectedCountry}`}
      ></Stats>
    </div>
  );
}
