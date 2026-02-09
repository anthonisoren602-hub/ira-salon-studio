import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Users, Megaphone, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-salon.jpg";
import logo from "@/assets/ira-logo.jpg";

const Index = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        </div>
        <div className="container relative mx-auto px-4 py-20">
          <div className="max-w-2xl space-y-6 animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Welcome to{" "}
              <span className="text-gradient-gold">Gauranshi Salon</span>{" "}
              Pvt. Ltd. Associate Program
            </h1>
            <p className="font-body text-lg md:text-xl text-muted-foreground">
              Join our salon network and grow your business with digital marketing and lead generation support.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-body">
                <Link to="/become-associate">
                  Become an Associate <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-body">
                <Link to="/plans">View Plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Join Our Network?
            </h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              We help salon owners grow their business with powerful marketing tools
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Megaphone, title: "Digital Marketing", desc: "Professional campaigns for your salon" },
              { icon: TrendingUp, title: "Lead Generation", desc: "Get new customers for your salon" },
              { icon: BarChart3, title: "Business Dashboard", desc: "Track your growth and benefits" },
              { icon: Users, title: "Salon Network", desc: "Join a growing community of salons" },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-background rounded-xl shadow-soft text-center hover:shadow-card transition-all">
                <div className="w-14 h-14 mx-auto mb-4 bg-gradient-rose rounded-xl flex items-center justify-center">
                  <item.icon size={28} className="text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Affordable Plans
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto mb-12">
            Starting at just ₹999 – choose the plan that fits your salon
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="p-8 border border-border rounded-2xl hover:shadow-card transition-all">
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Monthly Plan</h3>
              <p className="font-display text-3xl font-bold text-primary">₹999<span className="text-sm text-muted-foreground font-body font-normal">/month</span></p>
              <p className="font-body text-sm text-muted-foreground mt-3">Digital marketing, lead generation & dashboard access</p>
            </div>
            <div className="p-8 border-2 border-primary rounded-2xl bg-accent hover:shadow-card transition-all">
              <div className="text-xs font-body font-semibold bg-primary text-primary-foreground px-3 py-1 rounded-full inline-block mb-3">Popular</div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Growth Plan</h3>
              <p className="font-display text-3xl font-bold text-primary">₹999<span className="text-sm text-muted-foreground font-body font-normal">/2 months</span></p>
              <p className="font-body text-sm text-muted-foreground mt-3">Everything in Monthly + promotion support</p>
            </div>
          </div>
          <Button asChild size="lg" className="mt-10 bg-gradient-gold text-foreground hover:opacity-90 font-body">
            <Link to="/plans">View Full Plan Details <ArrowRight className="ml-2" size={18} /></Link>
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-rose">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Grow Your Salon Business?
          </h2>
          <p className="font-body text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Register today and start receiving digital marketing and lead generation support
          </p>
          <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90 font-body">
            <Link to="/signup">
              Register Now <ArrowRight className="ml-2" size={18} />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
