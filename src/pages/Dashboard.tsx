import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  User, CreditCard, Image, LogOut, CheckCircle, Clock,
  LayoutDashboard, FileText, TrendingUp, Calendar, Sparkles,
  Store, Phone, MapPin, Scissors, ChevronRight, Download,
  Bell, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logo from "@/assets/ira-logo.jpg";

interface Profile {
  salon_name: string | null;
  owner_name: string | null;
  mobile: string | null;
  city: string | null;
  address: string | null;
  services: string | null;
  is_active: boolean;
}

interface Subscription {
  id: string;
  status: string;
  start_date: string;
  end_date: string;
  membership_plans: {
    name: string;
    price: number;
    duration_months: number;
    features: string[];
  };
}

type TabId = "overview" | "profile" | "templates" | "subscription";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    salon_name: "",
    owner_name: "",
    mobile: "",
    city: "",
    address: "",
    services: "",
  });

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    const [profileRes, subRes] = await Promise.all([
      supabase.from("profiles").select("*").eq("user_id", user!.id).maybeSingle(),
      supabase
        .from("subscriptions")
        .select("*, membership_plans(*)")
        .eq("user_id", user!.id)
        .eq("status", "active")
        .maybeSingle(),
    ]);

    if (profileRes.data) {
      setProfile(profileRes.data);
      setFormData({
        salon_name: profileRes.data.salon_name || "",
        owner_name: profileRes.data.owner_name || "",
        mobile: profileRes.data.mobile || "",
        city: profileRes.data.city || "",
        address: profileRes.data.address || "",
        services: profileRes.data.services || "",
      });
    }
    if (subRes.data) {
      setSubscription(subRes.data as unknown as Subscription);
    }
    setLoading(false);
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.salon_name.trim() || !formData.owner_name.trim()) {
      toast.error("Salon name and owner name are required");
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update(formData)
      .eq("user_id", user!.id);

    setSaving(false);
    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated successfully!");
      fetchData();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
          <p className="font-body text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const daysRemaining = subscription
    ? Math.max(0, Math.ceil((new Date(subscription.end_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  const profileComplete = profile?.salon_name && profile?.owner_name && profile?.mobile && profile?.city;

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: LayoutDashboard },
    { id: "profile" as const, label: "Salon Profile", icon: Store },
    { id: "subscription" as const, label: "My Plan", icon: CreditCard },
    { id: "templates" as const, label: "Marketing", icon: Image },
  ];

  return (
    <div className="min-h-[80vh]">
      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed lg:sticky top-20 left-0 z-40 h-[calc(100vh-5rem)] w-64 bg-card border-r border-border flex flex-col transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="p-5 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-rose flex items-center justify-center text-primary-foreground font-display font-bold text-sm">
                {(profile?.owner_name || user?.email || "A").charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold text-foreground truncate">
                  {profile?.owner_name || "Associate"}
                </p>
                <p className="font-body text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="p-3 border-t border-border">
            <button
              onClick={signOut}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-30 bg-foreground/30 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-[80vh]">
          {/* Top Bar */}
          <div className="sticky top-20 z-20 bg-background/95 backdrop-blur-sm border-b border-border px-4 md:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-lg hover:bg-accent text-muted-foreground"
                >
                  <LayoutDashboard size={20} />
                </button>
                <div>
                  <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">
                    {tabs.find(t => t.id === activeTab)?.label}
                  </h1>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {profile?.is_active ? (
                  <span className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-accent text-accent-foreground rounded-full text-xs font-body font-medium">
                    <Shield size={12} /> Active Associate
                  </span>
                ) : (
                  <span className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-destructive/10 text-destructive rounded-full text-xs font-body font-medium">
                    <Shield size={12} /> Inactive
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 md:p-8">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Welcome Banner */}
                <div className="bg-gradient-rose rounded-2xl p-6 md:p-8 text-primary-foreground">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="font-display text-2xl md:text-3xl font-bold">
                        Welcome back, {profile?.owner_name || "Associate"}! 👋
                      </h2>
                      <p className="font-body text-primary-foreground/80 mt-2">
                        Here's what's happening with your salon partnership today.
                      </p>
                    </div>
                    <img src={logo} alt="Logo" className="h-14 w-auto rounded-xl opacity-90 hidden md:block" />
                  </div>
                </div>

                {/* Alert if profile incomplete */}
                {!profileComplete && (
                  <div className="bg-accent border border-border rounded-xl p-4 flex items-start gap-3">
                    <Bell size={20} className="text-primary shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-body text-sm font-medium text-foreground">Complete your profile</p>
                      <p className="font-body text-xs text-muted-foreground mt-0.5">
                        Fill in your salon details to get listed on our platform and receive leads.
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="font-body text-xs shrink-0"
                      onClick={() => setActiveTab("profile")}
                    >
                      Complete <ChevronRight size={14} />
                    </Button>
                  </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard
                    icon={<CreditCard size={20} />}
                    label="Current Plan"
                    value={subscription?.membership_plans.name || "No Plan"}
                    accent={!!subscription}
                  />
                  <StatCard
                    icon={<Calendar size={20} />}
                    label="Days Remaining"
                    value={subscription ? `${daysRemaining} days` : "—"}
                    accent={daysRemaining > 0}
                  />
                  <StatCard
                    icon={<TrendingUp size={20} />}
                    label="Status"
                    value={profile?.is_active ? "Active" : "Inactive"}
                    accent={profile?.is_active || false}
                  />
                  <StatCard
                    icon={<FileText size={20} />}
                    label="Templates"
                    value={subscription ? "10 Available" : "Locked"}
                    accent={!!subscription}
                  />
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Subscription Summary */}
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                      <Sparkles size={18} className="text-primary" /> Plan Overview
                    </h3>
                    {subscription ? (
                      <div className="space-y-3">
                        <div className="bg-accent rounded-xl p-4">
                          <p className="font-display text-lg font-bold text-foreground">
                            {subscription.membership_plans.name}
                          </p>
                          <p className="font-body text-2xl font-bold text-primary mt-1">
                            ₹{subscription.membership_plans.price}
                            <span className="text-sm text-muted-foreground font-normal ml-1">
                              /{subscription.membership_plans.duration_months} month(s)
                            </span>
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle size={16} className="text-primary" />
                          <span className="font-body text-foreground">Active until {new Date(subscription.end_date).toLocaleDateString("en-IN")}</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="font-body text-xs w-full mt-2"
                          onClick={() => setActiveTab("subscription")}
                        >
                          View Full Details <ChevronRight size={14} className="ml-1" />
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <CreditCard size={40} className="mx-auto text-muted-foreground/30 mb-3" />
                        <p className="font-body text-sm text-muted-foreground mb-4">No active subscription</p>
                        <Button asChild size="sm" className="bg-primary text-primary-foreground font-body">
                          <Link to="/plans">Subscribe Now</Link>
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Profile Card */}
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                      <Store size={18} className="text-primary" /> Salon Info
                    </h3>
                    {profile?.salon_name ? (
                      <div className="space-y-3">
                        <ProfileItem icon={<Store size={15} />} label="Salon" value={profile.salon_name} />
                        <ProfileItem icon={<User size={15} />} label="Owner" value={profile.owner_name} />
                        <ProfileItem icon={<Phone size={15} />} label="Mobile" value={profile.mobile} />
                        <ProfileItem icon={<MapPin size={15} />} label="City" value={profile.city} />
                        <ProfileItem icon={<Scissors size={15} />} label="Services" value={profile.services} />
                        <Button
                          variant="outline"
                          size="sm"
                          className="font-body text-xs w-full mt-2"
                          onClick={() => setActiveTab("profile")}
                        >
                          Edit Profile <ChevronRight size={14} className="ml-1" />
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <Store size={40} className="mx-auto text-muted-foreground/30 mb-3" />
                        <p className="font-body text-sm text-muted-foreground mb-4">Set up your salon profile</p>
                        <Button
                          size="sm"
                          className="bg-primary text-primary-foreground font-body"
                          onClick={() => setActiveTab("profile")}
                        >
                          Fill Profile
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-gradient-rose flex items-center justify-center">
                      <Store size={24} className="text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-bold text-foreground">Salon Profile</h2>
                      <p className="font-body text-xs text-muted-foreground">Update your salon information</p>
                    </div>
                  </div>

                  <form onSubmit={handleProfileUpdate} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="font-body text-sm font-medium text-foreground mb-2 block">
                          Salon Name <span className="text-destructive">*</span>
                        </label>
                        <Input
                          name="salon_name"
                          value={formData.salon_name}
                          onChange={handleChange}
                          placeholder="Enter salon name"
                          className="bg-background border-border font-body"
                        />
                      </div>
                      <div>
                        <label className="font-body text-sm font-medium text-foreground mb-2 block">
                          Owner Name <span className="text-destructive">*</span>
                        </label>
                        <Input
                          name="owner_name"
                          value={formData.owner_name}
                          onChange={handleChange}
                          placeholder="Enter owner name"
                          className="bg-background border-border font-body"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="font-body text-sm font-medium text-foreground mb-2 block">Mobile Number</label>
                        <Input
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          placeholder="+91 XXXXX XXXXX"
                          className="bg-background border-border font-body"
                        />
                      </div>
                      <div>
                        <label className="font-body text-sm font-medium text-foreground mb-2 block">City</label>
                        <Input
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Enter city"
                          className="bg-background border-border font-body"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="font-body text-sm font-medium text-foreground mb-2 block">Address</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Full salon address"
                        rows={2}
                        className="w-full px-3 py-2 bg-background border border-border rounded-md font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm font-medium text-foreground mb-2 block">Services Offered</label>
                      <textarea
                        name="services"
                        value={formData.services}
                        onChange={handleChange}
                        placeholder="e.g. Hair Cutting, Coloring, Facial, Bridal Packages"
                        rows={2}
                        className="w-full px-3 py-2 bg-background border border-border rounded-md font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={saving}
                      className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-body"
                    >
                      {saving ? "Saving..." : "Save Profile"}
                    </Button>
                  </form>
                </div>
              </div>
            )}

            {/* Subscription Tab */}
            {activeTab === "subscription" && (
              <div className="max-w-2xl mx-auto space-y-6">
                {subscription ? (
                  <>
                    <div className="bg-gradient-rose rounded-2xl p-6 md:p-8 text-primary-foreground">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-body text-sm text-primary-foreground/70 uppercase tracking-wide">Current Plan</p>
                          <h2 className="font-display text-2xl md:text-3xl font-bold mt-1">
                            {subscription.membership_plans.name}
                          </h2>
                          <p className="font-body text-3xl font-bold mt-2">
                            ₹{subscription.membership_plans.price}
                            <span className="text-base font-normal text-primary-foreground/70">
                              /{subscription.membership_plans.duration_months} month(s)
                            </span>
                          </p>
                        </div>
                        <span className="bg-primary-foreground/20 px-3 py-1.5 rounded-full text-xs font-body font-medium">
                          Active
                        </span>
                      </div>
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-6">
                      <h3 className="font-display text-lg font-bold text-foreground mb-4">Plan Details</h3>
                      <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        <div className="bg-accent rounded-xl p-4">
                          <p className="font-body text-xs text-muted-foreground">Start Date</p>
                          <p className="font-body text-sm font-semibold text-foreground mt-1">
                            {new Date(subscription.start_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                          </p>
                        </div>
                        <div className="bg-accent rounded-xl p-4">
                          <p className="font-body text-xs text-muted-foreground">End Date</p>
                          <p className="font-body text-sm font-semibold text-foreground mt-1">
                            {new Date(subscription.end_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                          </p>
                        </div>
                      </div>

                      <h4 className="font-body text-sm font-semibold text-foreground mb-3">Benefits Included:</h4>
                      <ul className="space-y-2.5">
                        {(subscription.membership_plans.features as string[]).map((f, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle size={16} className="text-primary shrink-0 mt-0.5" />
                            <span className="font-body text-sm text-muted-foreground">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-accent rounded-2xl p-4 flex items-center gap-3">
                      <Clock size={18} className="text-primary shrink-0" />
                      <p className="font-body text-sm text-foreground">
                        <strong>{daysRemaining} days</strong> remaining in your current plan
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="bg-card border border-border rounded-2xl p-8 text-center">
                    <CreditCard size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                    <h2 className="font-display text-xl font-bold text-foreground mb-2">No Active Plan</h2>
                    <p className="font-body text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                      Subscribe to a membership plan to unlock digital marketing support, lead generation, and social media templates.
                    </p>
                    <Button asChild className="bg-primary text-primary-foreground font-body">
                      <Link to="/plans">View Membership Plans</Link>
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Templates Tab */}
            {activeTab === "templates" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-xl font-bold text-foreground">Marketing Templates</h2>
                    <p className="font-body text-sm text-muted-foreground mt-1">
                      Download ready-to-use social media templates for your salon
                    </p>
                  </div>
                </div>

                {subscription ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[
                      { title: "Grand Opening Post", category: "Social Media", desc: "Announce your salon opening in style" },
                      { title: "Special Offer Banner", category: "Promotion", desc: "Promote special discounts & offers" },
                      { title: "Bridal Package Post", category: "Social Media", desc: "Highlight bridal services" },
                      { title: "Before & After Post", category: "Showcase", desc: "Showcase stunning transformations" },
                      { title: "Festival Greetings", category: "Seasonal", desc: "Seasonal & festival greetings" },
                      { title: "Customer Testimonial", category: "Social Proof", desc: "Share glowing customer reviews" },
                      { title: "New Service Launch", category: "Announcement", desc: "Introduce exciting new services" },
                      { title: "Team Spotlight", category: "Behind Scenes", desc: "Feature your talented stylists" },
                      { title: "Hair Care Tips", category: "Educational", desc: "Share expert beauty advice" },
                      { title: "Weekend Special", category: "Promotion", desc: "Weekend offer promotions" },
                    ].map((template, i) => (
                      <div key={i} className="bg-card border border-border rounded-xl overflow-hidden group hover:shadow-card transition-all">
                        <div className="w-full h-36 bg-gradient-hero flex items-center justify-center relative">
                          <Image size={36} className="text-primary/20" />
                          <div className="absolute top-3 left-3">
                            <span className="text-[10px] font-body bg-background/90 text-foreground px-2 py-1 rounded-full font-medium">
                              {template.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-display text-sm font-semibold text-foreground">{template.title}</h3>
                          <p className="font-body text-xs text-muted-foreground mt-1">{template.desc}</p>
                          <Button variant="outline" size="sm" className="mt-3 font-body text-xs w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <Download size={14} className="mr-1.5" /> Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-accent rounded-2xl">
                    <Image size={56} className="mx-auto text-muted-foreground/20 mb-4" />
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">Templates Locked</h3>
                    <p className="font-body text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                      Subscribe to a membership plan to access 10 premium social media templates every month.
                    </p>
                    <Button asChild className="bg-primary text-primary-foreground font-body">
                      <Link to="/plans">Subscribe Now</Link>
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string; accent: boolean }) => (
  <div className="bg-card border border-border rounded-xl p-4 md:p-5">
    <div className={`h-9 w-9 rounded-lg flex items-center justify-center mb-3 ${accent ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
      {icon}
    </div>
    <p className="font-body text-xs text-muted-foreground">{label}</p>
    <p className={`font-display text-lg font-bold mt-0.5 ${accent ? "text-foreground" : "text-muted-foreground"}`}>{value}</p>
  </div>
);

const ProfileItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | null }) => (
  <div className="flex items-center gap-3 py-2 border-b border-border last:border-0">
    <div className="text-muted-foreground shrink-0">{icon}</div>
    <div className="min-w-0 flex-1">
      <p className="font-body text-[11px] text-muted-foreground">{label}</p>
      <p className="font-body text-sm font-medium text-foreground truncate">{value || "—"}</p>
    </div>
  </div>
);

export default Dashboard;
