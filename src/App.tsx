import "./App.css";
import RestaurantPOS from "./components/RestaurantPOS";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div className="App">
        <Toaster />
        <RestaurantPOS />
      </div>
    </>
  );
}

export default App;
