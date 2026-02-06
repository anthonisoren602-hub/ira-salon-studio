import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, TrendingUp, Users, Megaphone, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Get professional digital marketing campaigns for your salon",
  },
  {
    icon: TrendingUp,
    title: "Lead Generation",
    description: "Receive potential customer leads directly to grow your business",
  },
  {
    icon: BarChart3,
    title: "Dashboard Access",
    description: "Track your membership, benefits, and marketing templates",
  },
  {
    icon: Users,
    title: "Network Support",
    description: "Join a growing network of salon professionals across India",
  },
];

const steps = [
  { step: "01", title: "Register", desc: "Create your account with email & password" },
  { step: "02", title: "Fill Profile", desc: "Add your salon details and services" },
  { step: "03", title: "Choose Plan", desc: "Select a membership plan that suits you" },
  { step: "04", title: "Start Growing", desc: "Access marketing tools and start receiving leads" },
];

const BecomeAssociate = () => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Become an <span className="text-gradient-gold">Associate</span>
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join the Gauranshi Salons network and grow your salon business with our digital marketing and lead generation support.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-body">
              <Link to="/signup">
                Register Now <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary text-primary font-body">
              <Link to="/plans">View Plans</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Why Join Us?
          </h2>
          <p className="font-body text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            We provide everything you need to grow your salon business
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {benefits.map((b, i) => (
              <div key={i} className="p-6 bg-accent rounded-xl text-center hover:shadow-soft transition-all">
                <div className="w-14 h-14 mx-auto mb-4 bg-gradient-rose rounded-xl flex items-center justify-center">
                  <b.icon size={28} className="text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{b.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            How It Works
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {steps.map((s, i) => (
              <div key={i} className="relative p-6 bg-background rounded-xl text-center">
                <span className="font-display text-4xl font-bold text-primary/20">{s.step}</span>
                <h3 className="font-display text-lg font-semibold text-foreground mt-2 mb-1">{s.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-rose">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Grow Your Salon?
          </h2>
          <p className="font-body text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Register today and start your journey with Gauranshi Salons
          </p>
          <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90 font-body">
            <Link to="/signup">
              Get Started <ArrowRight className="ml-2" size={18} />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default BecomeAssociate;
