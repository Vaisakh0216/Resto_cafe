import { useEffect, useState } from "react";
import Header from "./components/Header";
import Options from "./components/Tabs";

function App() {
  const [item, setItems] = useState();

  useEffect(() => {
    fetch("https://run.mocky.io/v3/db0018c8-5982-4d89-a54f-f51fe14d3c89").then(
      (res) => res.json().then((result) => setItems(result.data[0]))
    );
  }, []);

  return (
    <div className="mainContainer">
      <Header item={item} />
      <Options item={item} />
    </div>
  );
}

export default App;
