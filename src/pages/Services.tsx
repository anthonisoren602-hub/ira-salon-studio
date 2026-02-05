 import { Scissors, Palette, Sparkles, User, Heart, Crown } from "lucide-react";
 import { Link } from "react-router-dom";
 import { Button } from "@/components/ui/button";
 
 const services = [
   {
     icon: Scissors,
     title: "Hair Cutting & Styling",
     description:
       "Expert haircuts and styling for all hair types. From classic cuts to trendy styles, our skilled stylists create the perfect look for you.",
     features: ["Precision Cuts", "Layered Styling", "Blow Dry", "Hair Spa"],
   },
   {
     icon: Palette,
     title: "Hair Coloring",
     description:
       "Transform your look with our professional hair coloring services. From subtle highlights to bold transformations.",
     features: ["Global Color", "Highlights", "Balayage", "Color Correction"],
   },
   {
     icon: Sparkles,
     title: "Facial & Skin Care",
     description:
       "Rejuvenate your skin with our premium facial treatments. Experience the glow with our customized skincare solutions.",
     features: ["Deep Cleansing", "Anti-Aging", "Brightening", "Hydration"],
   },
   {
     icon: User,
     title: "Beard & Grooming",
     description:
       "Complete grooming services for the modern gentleman. Expert beard styling and maintenance for a polished look.",
     features: ["Beard Trim", "Shaping", "Hot Towel Shave", "Beard Spa"],
   },
   {
     icon: Heart,
     title: "Bridal Packages",
     description:
       "Make your special day unforgettable with our comprehensive bridal beauty packages. Complete makeover for the bride.",
     features: ["Bridal Makeup", "Hair Styling", "Mehendi", "Pre-Bridal Care"],
   },
   {
     icon: Crown,
     title: "Groom Packages",
     description:
       "Look your best on your wedding day with our specialized groom packages. Complete grooming solutions for the groom.",
     features: ["Grooming", "Facial", "Hair Styling", "Manicure & Pedicure"],
   },
 ];
 
 const Services = () => {
   return (
     <div className="flex flex-col">
       {/* Hero Section */}
       <section className="py-20 bg-gradient-hero">
         <div className="container mx-auto px-4">
           <div className="max-w-3xl mx-auto text-center">
             <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
               Our <span className="text-gradient-gold">Services</span>
             </h1>
             <p className="font-body text-lg text-muted-foreground">
               Professional beauty and grooming services tailored for you
             </p>
           </div>
         </div>
       </section>
 
       {/* Services Grid */}
       <section className="py-20 bg-background">
         <div className="container mx-auto px-4">
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
             {services.map((service, idx) => (
               <div
                 key={idx}
                 className="group p-8 bg-background border border-border rounded-2xl hover:shadow-card hover:border-primary/30 transition-all duration-300"
               >
                 <div className="w-14 h-14 mb-6 bg-gradient-rose rounded-xl flex items-center justify-center group-hover:bg-gradient-gold transition-all duration-300">
                   <service.icon size={28} className="text-primary-foreground" />
                 </div>
                 <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                   {service.title}
                 </h3>
                 <p className="font-body text-muted-foreground text-sm mb-4 leading-relaxed">
                   {service.description}
                 </p>
                 <div className="flex flex-wrap gap-2">
                   {service.features.map((feature, fidx) => (
                     <span
                       key={fidx}
                       className="text-xs font-body bg-accent text-accent-foreground px-3 py-1 rounded-full"
                     >
                       {feature}
                     </span>
                   ))}
                 </div>
               </div>
             ))}
           </div>
         </div>
       </section>
 
       {/* Pricing Note */}
       <section className="py-16 bg-accent">
         <div className="container mx-auto px-4 text-center max-w-2xl">
           <h2 className="font-display text-2xl font-bold text-foreground mb-4">
             Customized Pricing
           </h2>
           <p className="font-body text-muted-foreground mb-6">
             Our services are priced based on your specific requirements. Contact us for 
             a personalized quote or visit our salon for a consultation.
           </p>
           <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-body">
             <Link to="/contact">Get a Quote</Link>
           </Button>
         </div>
       </section>
 
       {/* CTA */}
       <section className="py-20 bg-gradient-rose">
         <div className="container mx-auto px-4 text-center">
           <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
             Book Your Appointment Today
           </h2>
           <p className="font-body text-primary-foreground/80 max-w-2xl mx-auto mb-8">
             Experience the difference at Gauranshi Salons
           </p>
           <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90 font-body">
             <Link to="/contact">Contact Us</Link>
           </Button>
         </div>
       </section>
     </div>
   );
 };
 
 export default Services;