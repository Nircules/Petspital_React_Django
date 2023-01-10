import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const MY_SERVER = "http://127.0.0.1:8000/products";

  const [prods, setProds] = useState([]);
  useEffect(() => {
    axios.get(MY_SERVER).then((res) => setProds(res.data));
  }, []);

  return (
    <div>
      <h1>Hello</h1>

      {prods.map((p, i) => (
        <div key={i}> {p.name}</div>
      ))}
    </div>
  );
}

export default App;