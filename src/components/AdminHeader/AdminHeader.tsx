// src/components/AdminHeader/AdminHeader.tsx
"use client";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { 
  Menu, 
  X, 
  Package, 
  PlusCircle, 
  Home, 
  List,
  LayoutDashboard,
  LogOut,
  User,
  Settings,
  ChevronDown,
  Bell,
  Search,
  
} from "lucide-react";

interface AdminHeaderProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
    role?: string;
  };
  onLogout: () => void;
  unreadNotifications?: number;
}

export default function AdminHeader({ 
  user, 
  onLogout,
  unreadNotifications = 0 
}: AdminHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  // Fechar menus ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target as Node)) {
        setMobileSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Travar scroll quando menu mobile está aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const isActive = (path: string) => location.pathname === path;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setMobileSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  // Menu principal
  const mainMenuItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/products", label: "Lista de Produtos", icon: List },
    { path: "/products/new", label: "Novo Produto", icon: PlusCircle },
  ];

  // Notificações mock
  const notifications = [
    { id: 1, text: "Novo produto adicionado", time: "5 min atrás", read: false },
    { id: 2, text: "Estoque baixo: Camiseta Preta", time: "1 hora atrás", read: false },
    { id: 3, text: "Pedido #1234 confirmado", time: "2 horas atrás", read: true },
  ];

  return (
    <header className="w-full bg-gradient-to-r from-gray-900 to-gray-800 fixed top-0 left-0 z-50 border-b border-indigo-500/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* LOGO / Marca - SEMPRE VISÍVEL */}
          <Link
            to="/"
            className="flex items-center gap-2 md:gap-3 font-bold text-white hover:text-indigo-300 transition"
            aria-label="Dashboard"
          >
            <div className="bg-indigo-600 p-1.5 md:p-2 rounded-lg">
              <Package size={20} className="md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-sm md:text-base font-semibold truncate max-w-[120px] sm:max-w-none">
              Gestão de Produtos
            </span>
          </Link>

          {/* Barra de busca - Desktop */}
          <form onSubmit={handleSearch} className="hidden lg:block flex-1 max-w-md mx-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar produtos..."
                className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-600"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </form>

          {/* Ícones e Menu do Usuário - Desktop */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            {/* Botão de busca mobile (aparece só em tablet) */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-indigo-400 hover:bg-gray-700 rounded-lg transition"
            >
              <Search size={20} />
            </button>

            {/* Notificações */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 text-gray-300 hover:text-indigo-400 hover:bg-gray-700 rounded-lg transition"
              >
                <Bell size={20} />
                {unreadNotifications > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                    {unreadNotifications}
                  </span>
                )}
              </button>
            </div>

            {/* Menu do Usuário */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1.5 text-gray-300 hover:text-indigo-400 hover:bg-gray-700 rounded-lg transition"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border-2 border-indigo-500"
                  />
                ) : (
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                )}
                <span className="hidden lg:inline text-sm max-w-[100px] truncate">
                  {user?.name || "Admin"}
                </span>
                <ChevronDown size={14} className={`hidden lg:block transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Botão Ver Loja */}
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex items-center gap-2 bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition text-sm"
            >
              <Home size={16} />
              <span>Loja</span>
            </a>
          </div>

          {/* Ações Mobile - Ícones à direita */}
          <div className="flex md:hidden items-center gap-2">
            {/* Botão de busca mobile */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="p-2 text-indigo-400 hover:text-indigo-300"
            >
              <Search size={22} />
            </button>

            {/* Botão do usuário mobile simplificado */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-indigo-400 hover:text-indigo-300"
            >
              <User size={22} />
            </button>

            {/* BOTÃO HAMBURGER MOBILE */}
            <button
              className="p-2 text-indigo-400 hover:text-indigo-300 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Barra de busca mobile expansível */}
        {mobileSearchOpen && (
          <div ref={mobileSearchRef} className="md:hidden py-3 border-t border-gray-700 animate-slideDown">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar produtos..."
                className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-600"
                autoFocus
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <button
                type="button"
                onClick={() => setMobileSearchOpen(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* MENU MOBILE - Drawer fullscreen melhorado */}
      {mobileMenuOpen && (
        <>
          {/* Overlay escuro */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeMobileMenu}
          />
          
          {/* Drawer deslizante */}
          <div className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-gray-900 z-50 md:hidden overflow-y-auto shadow-2xl animate-slideIn">
            {/* Cabeçalho do drawer */}
            <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-600 p-2 rounded-lg">
                  <Package size={24} className="text-white" />
                </div>
                <span className="text-white font-bold">Menu</span>
              </div>
              <button
                onClick={closeMobileMenu}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
              >
                <X size={24} />
              </button>
            </div>

            {/* Perfil do usuário */}
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center gap-3">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full border-2 border-indigo-500" />
                ) : (
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                    <User size={24} className="text-white" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-white font-medium">{user?.name || "Administrador"}</p>
                  <p className="text-sm text-gray-400">{user?.email || "admin@exemplo.com"}</p>
                  {user?.role && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-indigo-600 text-xs text-white rounded">
                      {user.role}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Menu items */}
            <div className="p-4 space-y-1">
              {mainMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      isActive(item.path)
                        ? "bg-indigo-600 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-indigo-400"
                    }`}
                    onClick={closeMobileMenu}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Links adicionais */}
            <div className="p-4 border-t border-gray-800 space-y-1">
              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition"
                onClick={closeMobileMenu}
              >
                <User size={20} />
                <span>Meu Perfil</span>
              </Link>

              <Link
                to="/settings"
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition"
                onClick={closeMobileMenu}
              >
                <Settings size={20} />
                <span>Configurações</span>
              </Link>

              <a
                href="http://localhost:5173"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition"
                onClick={closeMobileMenu}
              >
                <Home size={20} />
                <span>Ver Loja</span>
              </a>
            </div>

            {/* Botão de logout */}
            <div className="p-4 border-t border-gray-800">
              <button
                onClick={() => {
                  closeMobileMenu();
                  onLogout();
                }}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
              >
                <LogOut size={20} />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Dropdown de notificações (movido para fora do fluxo) */}
      {notificationsOpen && (
        <div className="absolute right-4 mt-2 w-80 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden z-50">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-white font-semibold">Notificações</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 border-b border-gray-700 hover:bg-gray-700 cursor-pointer ${
                  !notif.read ? 'bg-indigo-900/20' : ''
                }`}
              >
                <p className="text-sm text-white">{notif.text}</p>
                <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-gray-700">
            <button className="text-sm text-indigo-400 hover:text-indigo-300 w-full text-center">
              Ver todas
            </button>
          </div>
        </div>
      )}

      {/* Dropdown do usuário (movido para fora do fluxo) */}
      {userMenuOpen && (
        <div className="absolute right-4 mt-2 w-56 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden z-50">
          <div className="p-4 border-b border-gray-700">
            <p className="text-white font-medium">{user?.name || "Administrador"}</p>
            <p className="text-xs text-gray-400 mt-1">{user?.email || "admin@exemplo.com"}</p>
          </div>
          
          <Link
            to="/profile"
            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-indigo-400 transition"
            onClick={() => setUserMenuOpen(false)}
          >
            <User size={18} />
            <span>Meu Perfil</span>
          </Link>

          <Link
            to="/settings"
            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-indigo-400 transition"
            onClick={() => setUserMenuOpen(false)}
          >
            <Settings size={18} />
            <span>Configurações</span>
          </Link>

          <div className="border-t border-gray-700">
            <button
              onClick={() => {
                setUserMenuOpen(false);
                onLogout();
              }}
              className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 w-full transition"
            >
              <LogOut size={18} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      )}

      {/* CSS para animações */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </header>
  );
}