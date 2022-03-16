import React, { useEffect, useState } from "react";
import Character from "./components/Character";
import LoadingMask from "./components/LoadingMask";
import Subscription from "./components/Subscription";

const url = "https://demoapi.com/api/series/howimetyourmother";

const fetchSeries = async () => {
  const res = await fetch(url);
  return res.json();
};

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSeries().then((chars) => {
      setCharacters(chars);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1>Series Api</h1>
      {loading ? (
        <LoadingMask />
      ) : (
        characters.map((char) => <Character key={char.name} {...char} />)
      )}
      <Subscription />
    </div>
  );
};

export default App;
