import { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  LogOut, 
  Menu, 
  X,
  Store,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ChangePasswordModal from './ChangePasswordModal';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the admin panel.",
    });
    navigate('/admin/login');
  };

  const navItems = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/products', label: 'Products', icon: Package },
    { to: '/admin/orders', label: 'Orders', icon: ShoppingCart },
    { to: '/admin/users', label: 'Users', icon: Users },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary text-primary-foreground transform transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent rounded-xl">
              <Store className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Hamza Store</h1>
              <p className="text-sm text-primary-foreground/80">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="px-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                isActive(item.to)
                  ? 'bg-accent text-accent-foreground'
                  : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6 space-y-2">
          <Button 
            variant="ghost" 
            onClick={() => setChangePasswordOpen(true)}
            className="w-full justify-start text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <Settings className="h-5 w-5 mr-3" />
            Change Password
          </Button>
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full justify-start text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-background border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <Button
              variant="ghost"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                ← Back to Store
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal 
        open={changePasswordOpen} 
        onOpenChange={setChangePasswordOpen} 
      />
    </div>
  );
};

export default AdminLayout;