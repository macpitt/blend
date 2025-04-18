import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { X, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDisclosure } from '@/hooks/useDisclosure';

interface LayoutProps {
  children: React.ReactNode;
}

const NavLink = memo(function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link 
      to={to} 
      className="hover:text-spice-vanilla transition-colors"
    >
      {children}
    </Link>
  );
});

const MobileNav = memo(function MobileNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <nav className="flex flex-col bg-spice-cinnamon py-4 px-6 border-t border-spice-vanilla/20 animate-fade-in">
      <NavLink to="/" onClick={onClose}>Home</NavLink>
      <NavLink to="/blends" onClick={onClose}>Blends</NavLink>
      <NavLink to="/create" onClick={onClose}>Create Blend</NavLink>
      <NavLink to="/spices" onClick={onClose}>Spices</NavLink>
    </nav>
  );
});

const Layout = memo(function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();
  const { isOpen, onToggle, onClose } = useDisclosure();
  
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-spice-cinnamon text-white shadow-md">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-serif font-bold">SpiceBlend</Link>
          
          {!isMobile && (
            <nav className="flex space-x-8">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/blends">Blends</NavLink>
              <NavLink to="/create">Create Blend</NavLink>
              <NavLink to="/spices">Spices</NavLink>
            </nav>
          )}
          
          {isMobile && (
            <Button 
              variant="ghost"
              size="icon"
              onClick={onToggle}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          )}
        </div>
        
        {isMobile && <MobileNav isOpen={isOpen} onClose={onClose} />}
      </header>
      
      <main className="flex-grow container mx-auto py-8 px-4">
        {children}
      </main>
      
      <footer className="bg-spice-pepper text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {currentYear} SpiceBlend - A Modern Spice Management App</p>
        </div>
      </footer>
    </div>
  );
});

export default Layout;