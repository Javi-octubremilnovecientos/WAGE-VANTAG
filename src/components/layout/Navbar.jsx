import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/ThemeContext';
import { useUserPlan } from '@/lib/UserPlanContext';
import MobileMenu from './MobileMenu';
import LoginWarnModal from '@/components/modals/LoginWarnModal';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user } = useUserPlan();

  const handleUserClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  const firstName = user?.full_name?.split(' ')[0] || '';

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Left: User avatar / name */}
          <Link
            to={isAuthenticated ? "/dashboard" : "/"}
            onClick={handleUserClick}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="relative flex-shrink-0 w-9 h-9">
              <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center overflow-hidden border border-border">
                {user?.avatar_url ? (
                  <img src={user.avatar_url} alt={firstName} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              {isAuthenticated && (
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-background" />
              )}
            </div>
            {isAuthenticated && firstName && (
              <span className="text-sm font-medium hidden sm:inline">{firstName}</span>
            )}
          </Link>

          {/* Center: Nav links (desktop) */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/plans" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Plans
            </Link>
          </div>

          {/* Right: Theme toggle + Menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-12 h-6 rounded-full bg-muted relative flex items-center px-0.5 transition-colors"
              aria-label="Toggle theme"
            >
              <div className={`w-5 h-5 rounded-full bg-foreground flex items-center justify-center transition-transform duration-300 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`}>
                {theme === 'dark' ? (
                  <Moon className="w-3 h-3 text-background" />
                ) : (
                  <Sun className="w-3 h-3 text-background" />
                )}
              </div>
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden w-9 h-9 flex items-center justify-center"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <LoginWarnModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        message="Sign in to access your account and saved data"
      />
    </>
  );
}