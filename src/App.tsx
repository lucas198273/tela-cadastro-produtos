// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import ListProducts from "./pages/ListProducts";
import ProductCreate from "./pages/ProductCreat";
import ProductEdit from "./pages/ProductEdit";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("adminAuth") === "true";
  });

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("adminAuth", "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuth");
  };

  return { isAuthenticated, login, logout };
};

function App() {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated && (
          <header className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">Gestão de Produtos</h1>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Sair
            </button>
          </header>
        )}

        <main className="p-6">
          <Routes>
            {/* Rota de login - AGORA FUNCIONA! */}
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/products" replace />
                ) : (
                  <Login onLogin={login} />  // <-- ISSO AGORA FUNCIONA!
                )
              }
            />

            <Route
              path="/products"
              element={
                isAuthenticated ? <ListProducts /> : <Navigate to="/login" replace />
              }
            />

            <Route
              path="/products/new"
              element={
                isAuthenticated ? <ProductCreate /> : <Navigate to="/login" replace />
              }
            />        

            <Route
              path="/products/edit/:id"
              element={
                isAuthenticated ? <ProductEdit /> : <Navigate to="/login" replace />
              }
            />

            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;