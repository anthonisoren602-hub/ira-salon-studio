import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User, CreditCard, Image, Settings, LogOut, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "profile" | "templates">("overview");

  // Profile form state
  const [formData, setFormData] = useState({
    salon_name: "",
    owner_name: "",
    mobile: "",
    city: "",
    address: "",
    services: "",
  });

  useEffect(() => {
    if (user) {
      fetchData();
    }
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
    const { error } = await supabase
      .from("profiles")
      .update(formData)
      .eq("user_id", user!.id);

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
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: CreditCard },
    { id: "profile" as const, label: "My Profile", icon: User },
    { id: "templates" as const, label: "Templates", icon: Image },
  ];

  return (
    <div className="min-h-[80vh] py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Welcome, {profile?.owner_name || user?.email?.split("@")[0]}
            </h1>
            <p className="font-body text-muted-foreground mt-1">Associate Dashboard</p>
          </div>
          <Button onClick={signOut} variant="outline" className="font-body w-fit">
            <LogOut size={16} className="mr-2" /> Sign Out
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-border pb-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-body text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Subscription Card */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <CreditCard size={20} className="text-primary" /> Your Plan
              </h2>
              {subscription ? (
                <div className="space-y-3">
                  <div className="bg-accent rounded-lg p-4">
                    <p className="font-display text-lg font-bold text-foreground">
                      {subscription.membership_plans.name}
                    </p>
                    <p className="font-body text-2xl font-bold text-primary mt-1">
                      ₹{subscription.membership_plans.price}
                      <span className="text-sm text-muted-foreground font-normal">
                        /{subscription.membership_plans.duration_months} month(s)
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span className="font-body text-sm text-foreground">Status: Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-muted-foreground" />
                    <span className="font-body text-sm text-muted-foreground">
                      Valid until: {new Date(subscription.end_date).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="font-body text-sm font-medium text-foreground mb-2">Benefits:</p>
                    <ul className="space-y-1.5">
                      {(subscription.membership_plans.features as string[]).map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />
                          <span className="font-body text-sm text-muted-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="font-body text-muted-foreground mb-4">No active subscription</p>
                  <Button asChild className="bg-primary text-primary-foreground font-body">
                    <Link to="/plans">View Plans</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Profile Summary */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <User size={20} className="text-primary" /> Profile Summary
              </h2>
              {profile?.salon_name ? (
                <div className="space-y-3">
                  <InfoRow label="Salon Name" value={profile.salon_name} />
                  <InfoRow label="Owner" value={profile.owner_name} />
                  <InfoRow label="Mobile" value={profile.mobile} />
                  <InfoRow label="City" value={profile.city} />
                  <InfoRow label="Address" value={profile.address} />
                  <InfoRow label="Services" value={profile.services} />
                  <Button
                    variant="outline"
                    className="mt-4 font-body"
                    onClick={() => setActiveTab("profile")}
                  >
                    <Settings size={16} className="mr-2" /> Edit Profile
                  </Button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="font-body text-muted-foreground mb-4">Complete your salon profile</p>
                  <Button
                    className="bg-primary text-primary-foreground font-body"
                    onClick={() => setActiveTab("profile")}
                  >
                    Fill Profile
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="max-w-2xl">
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <h2 className="font-display text-xl font-bold text-foreground mb-6">Salon Profile</h2>
              <form onSubmit={handleProfileUpdate} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-body text-sm font-medium text-foreground mb-2 block">Salon Name</label>
                    <input
                      name="salon_name"
                      value={formData.salon_name}
                      onChange={handleChange}
                      placeholder="Enter salon name"
                      className="w-full px-3 py-2 bg-background border border-border rounded-md font-body text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="font-body text-sm font-medium text-foreground mb-2 block">Owner Name</label>
                    <input
                      name="owner_name"
                      value={formData.owner_name}
                      onChange={handleChange}
                      placeholder="Enter owner name"
                      className="w-full px-3 py-2 bg-background border border-border rounded-md font-body text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-body text-sm font-medium text-foreground mb-2 block">Mobile Number</label>
                    <input
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-3 py-2 bg-background border border-border rounded-md font-body text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="font-body text-sm font-medium text-foreground mb-2 block">City</label>
                    <input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                      className="w-full px-3 py-2 bg-background border border-border rounded-md font-body text-sm focus:outline-none focus:border-primary"
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
                    className="w-full px-3 py-2 bg-background border border-border rounded-md font-body text-sm focus:outline-none focus:border-primary resize-none"
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
                    className="w-full px-3 py-2 bg-background border border-border rounded-md font-body text-sm focus:outline-none focus:border-primary resize-none"
                  />
                </div>
                <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 font-body">
                  Save Profile
                </Button>
              </form>
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === "templates" && (
          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-6">Marketing Templates</h2>
            {subscription ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Grand Opening Post", category: "Social Media", desc: "Announce your salon opening" },
                  { title: "Special Offer Banner", category: "Social Media", desc: "Promote special discounts" },
                  { title: "Bridal Package Post", category: "Social Media", desc: "Highlight bridal services" },
                  { title: "Before & After Post", category: "Social Media", desc: "Showcase transformations" },
                  { title: "Festival Greetings", category: "Social Media", desc: "Seasonal greetings template" },
                  { title: "Customer Testimonial", category: "Social Media", desc: "Share customer reviews" },
                  { title: "New Service Launch", category: "Social Media", desc: "Introduce new services" },
                  { title: "Team Spotlight", category: "Social Media", desc: "Feature your stylists" },
                  { title: "Hair Care Tips", category: "Social Media", desc: "Share expert advice" },
                  { title: "Weekend Special", category: "Social Media", desc: "Weekend offer promotions" },
                ].map((template, i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-5 hover:shadow-soft transition-all">
                    <div className="w-full h-32 bg-gradient-hero rounded-lg mb-4 flex items-center justify-center">
                      <Image size={32} className="text-primary/30" />
                    </div>
                    <span className="text-xs font-body bg-accent text-accent-foreground px-2 py-1 rounded-full">
                      {template.category}
                    </span>
                    <h3 className="font-display text-base font-semibold text-foreground mt-2">{template.title}</h3>
                    <p className="font-body text-xs text-muted-foreground mt-1">{template.desc}</p>
                    <Button variant="outline" size="sm" className="mt-3 font-body text-xs w-full">
                      Download Template
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-accent rounded-2xl">
                <Image size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                <p className="font-body text-muted-foreground mb-4">Subscribe to a plan to access marketing templates</p>
                <Button asChild className="bg-primary text-primary-foreground font-body">
                  <Link to="/plans">View Plans</Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string | null }) => (
  <div className="flex justify-between items-center py-2 border-b border-border last:border-0">
    <span className="font-body text-sm text-muted-foreground">{label}</span>
    <span className="font-body text-sm font-medium text-foreground">{value || "—"}</span>
  </div>
);

export default Dashboard;
