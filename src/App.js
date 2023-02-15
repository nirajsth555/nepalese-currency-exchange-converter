import Header from "./layouts/Header";
import CurrencyConverter from "./pages/CurrencyConverter";
import { QueryClient, QueryClientProvider} from 'react-query';
import ConvertCurrency from "./pages/ConvertCurrency";

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <Header />
      <QueryClientProvider client={queryClient}>
        {/* <CurrencyConverter /> */}
        <ConvertCurrency />
      </QueryClientProvider>
    </>
  );
}

export default App;
