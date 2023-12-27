import { AppProvider } from "./providers/app";
import { router } from "./routes/";

const App = () => {
  return <AppProvider router={router} />;
};

export default App;
