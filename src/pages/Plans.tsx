import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Plan {
  id: string;
  name: string;
  plan_type: string;
  price: number;
  duration_months: number;
  features: string[];
}

const Plans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      const { data } = await supabase.from("membership_plans").select("*");
      if (data) setPlans(data as unknown as Plan[]);
      setLoading(false);
    };
    fetchPlans();
  }, []);

  const handleSubscribe = async (plan: Plan) => {
    if (!user) {
      toast.info("Please login to subscribe");
      navigate("/login");
      return;
    }

    setSubscribing(plan.id);
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + plan.duration_months);

    const { error } = await supabase.from("subscriptions").insert({
      user_id: user.id,
      plan_id: plan.id,
      status: "active" as const,
      start_date: new Date().toISOString(),
      end_date: endDate.toISOString(),
    });

    setSubscribing(null);
    if (error) {
      toast.error("Failed to subscribe. Please try again.");
    } else {
      toast.success(`Subscribed to ${plan.name}!`);
      navigate("/dashboard");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Membership <span className="text-gradient-gold">Plans</span>
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan to grow your salon business with digital marketing and lead generation support
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => {
              const isGrowth = plan.plan_type === "growth";
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl border-2 p-8 transition-all hover:shadow-card ${
                    isGrowth ? "border-primary bg-accent" : "border-border bg-card"
                  }`}
                >
                  {isGrowth && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-body font-semibold">
                      Popular
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    {isGrowth ? (
                      <Crown size={28} className="text-primary" />
                    ) : (
                      <Zap size={28} className="text-gold" />
                    )}
                    <h2 className="font-display text-xl font-bold text-foreground">{plan.name}</h2>
                  </div>
                  <div className="mb-6">
                    <span className="font-display text-4xl font-bold text-foreground">₹{plan.price}</span>
                    <span className="font-body text-muted-foreground ml-1">
                      / {plan.duration_months} month{plan.duration_months > 1 ? "s" : ""}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {(plan.features as string[]).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-primary shrink-0 mt-0.5" />
                        <span className="font-body text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => handleSubscribe(plan)}
                    disabled={subscribing === plan.id}
                    className={`w-full font-body ${
                      isGrowth
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-gradient-gold text-foreground hover:opacity-90"
                    }`}
                    size="lg"
                  >
                    {subscribing === plan.id ? "Processing..." : "Subscribe Now"}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Plans;
