import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Checkout from "./pages/Checkout/Checkout";     // caminho correto (ajuste se necessário)
import Plans from "./pages/Checkout/Plans";           // caminho correto

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header />

        <main className="flex-1 pt-20 px-4">
          <Routes>
            {/* Página inicial = lista de planos */}
            <Route path="/" element={<Plans />} />

            {/* Página de pagamento */}
            <Route path="/checkout" element={<Checkout />} />

            {/* Opcional: rota 404 */}
            <Route path="*" element={
              <div className="text-center py-20">
                <h1 className="text-4xl font-bold text-red-600">404</h1>
                <p className="mt-4 text-xl">Página não encontrada</p>
              </div>
            } />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;