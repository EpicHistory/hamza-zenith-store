import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { adminApi } from '@/lib/api';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await adminApi.login(credentials);
      localStorage.setItem('adminToken', response.token);
      
      toast({
        title: "Login successful!",
        description: "Welcome to the admin dashboard.",
      });
      
      navigate('/admin/dashboard');
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid username or password.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="card-premium p-8 text-center">
          <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="h-8 w-8 text-accent-foreground" />
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
          <p className="text-muted-foreground mb-8">Sign in to access the admin dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 text-left">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={credentials.username}
                  onChange={handleInputChange}
                  className="pl-10 input-premium"
                  placeholder="Enter username"
                />
              </div>
            </div>

            <div className="space-y-2 text-left">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={credentials.password}
                  onChange={handleInputChange}
                  className="pl-10 input-premium"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="btn-accent w-full"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted/50 rounded-xl">
            <p className="text-sm text-muted-foreground">
              Demo credentials:<br />
              Username: <strong>admin</strong><br />
              Password: <strong>admin123</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;