import { useRoutes } from "react-router-dom";
import { Provider } from "react-redux";
import AppRoutes from "./route";
import { store } from "./redux/store";
import "aos/dist/aos.css";
import "@fontsource/inter";

function App() {
  const pages = useRoutes(AppRoutes);

  return <Provider store={store}>{pages}</Provider>;
}

export default App;
