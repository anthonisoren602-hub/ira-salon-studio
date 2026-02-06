import { Heart, Award, Users, Sparkles } from "lucide-react";

const About = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              About <span className="text-gradient-gold">Gauranshi Salons</span>
            </h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Gauranshi Salons Pvt. Ltd. is a professional salon company offering a unique associate 
              membership system for salon owners. We help salons grow using digital marketing, lead 
              generation and branding support.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-accent px-4 py-2 rounded-full">
                <Heart size={16} className="text-primary" />
                <span className="text-sm font-body text-accent-foreground">Our Vision</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Empowering Salon Owners
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed">
                To become India's largest salon network by empowering individual salon owners with 
                professional marketing support, lead generation, and branding tools to compete and 
                grow in the modern beauty industry.
              </p>
            </div>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-accent px-4 py-2 rounded-full">
                <Award size={16} className="text-gold" />
                <span className="text-sm font-body text-accent-foreground">Our Mission</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Growth Through Partnership
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed">
                To provide affordable, high-quality digital marketing and lead generation services 
                to salon businesses across India through our associate membership program, helping 
                them thrive in a competitive market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              What We Offer
            </h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              Our associate program is designed to help your salon succeed
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Sparkles, title: "Digital Marketing", description: "Professional campaigns tailored for your salon" },
              { icon: Users, title: "Lead Generation", description: "Get quality customer leads for your business" },
              { icon: Award, title: "Brand Support", description: "Branding and promotional material access" },
              { icon: Heart, title: "Growth Tools", description: "Dashboard, templates, and analytics" },
            ].map((value, idx) => (
              <div key={idx} className="p-6 bg-background rounded-xl shadow-soft text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-gold rounded-full flex items-center justify-center">
                  <value.icon size={24} className="text-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tagline */}
      <section className="py-16 bg-foreground">
        <div className="container mx-auto px-4 text-center">
          <p className="font-display text-2xl md:text-3xl text-background italic">
            "Salon Growth Partner"
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
