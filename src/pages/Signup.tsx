import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus, Mail, Lock, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import logo from "@/assets/ira-logo.jpg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (trimmedPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (trimmedPassword !== confirmPassword.trim()) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    const { error } = await signUp(trimmedEmail, trimmedPassword);
    setLoading(false);

    if (error) {
      if (error.message?.includes("already registered")) {
        toast.error("This email is already registered. Please login instead.");
      } else {
        toast.error(error.message || "Registration failed");
      }
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-card">
            <div className="h-16 w-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={32} className="text-primary" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-3">
              Registration Successful!
            </h1>
            <p className="font-body text-sm text-muted-foreground mb-2">
              We've sent a verification email to:
            </p>
            <p className="font-body text-sm font-semibold text-foreground bg-accent px-4 py-2 rounded-lg inline-block mb-6">
              {email}
            </p>
            <p className="font-body text-xs text-muted-foreground mb-6">
              Please check your inbox and click the verification link to activate your account. After verification, you can login to your dashboard.
            </p>
            <Button
              asChild
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body"
            >
              <Link to="/login">Go to Login <ArrowRight size={16} className="ml-1" /></Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card">
          {/* Header Banner */}
          <div className="bg-gradient-gold px-8 py-8 text-center">
            <img src={logo} alt="Gauranshi Salons" className="h-16 w-auto mx-auto rounded-xl shadow-gold" />
            <h1 className="font-display text-2xl font-bold text-foreground mt-4">
              Become an Associate
            </h1>
            <p className="font-body text-sm text-foreground/70 mt-1">
              Join our salon network and grow your business
            </p>
          </div>

          {/* Form */}
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="font-body text-sm font-medium text-foreground mb-2 block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="pl-10 bg-background border-border font-body"
                  />
                </div>
              </div>

              <div>
                <label className="font-body text-sm font-medium text-foreground mb-2 block">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    required
                    className="pl-10 pr-10 bg-background border-border font-body"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <p className="font-body text-[11px] text-muted-foreground mt-1.5">
                  Use at least 6 characters with a mix of letters and numbers
                </p>
              </div>

              <div>
                <label className="font-body text-sm font-medium text-foreground mb-2 block">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                    className="pl-10 bg-background border-border font-body"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body h-11"
                size="lg"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground" />
                    Creating Account...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Create Account <UserPlus size={16} />
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="font-body text-sm text-muted-foreground">
                Already have an account?
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-1 font-body text-sm font-semibold text-primary hover:underline mt-1"
              >
                Sign In <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
