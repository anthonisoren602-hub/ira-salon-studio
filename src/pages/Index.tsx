 import { Link } from "react-router-dom";
 import { ArrowRight, Sparkles, Scissors, Star } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import heroImage from "@/assets/hero-salon.jpg";
 import iraStudio from "@/assets/ira-studio.jpg";
 import iraLaSalon from "@/assets/ira-la-salon.jpg";
 
 const Index = () => {
   return (
     <div className="flex flex-col">
       {/* Hero Section */}
       <section className="relative min-h-[90vh] flex items-center">
         <div
           className="absolute inset-0 bg-cover bg-center"
           style={{ backgroundImage: `url(${heroImage})` }}
         >
           <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
         </div>
         <div className="container relative mx-auto px-4 py-20">
           <div className="max-w-2xl space-y-6 animate-fade-in">
             <div className="inline-flex items-center gap-2 bg-accent px-4 py-2 rounded-full">
               <Sparkles size={16} className="text-gold" />
               <span className="text-sm font-body text-accent-foreground">Premium Salon Experience</span>
             </div>
             <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
               Welcome to{" "}
               <span className="text-gradient-gold">Gauranshi Salons</span>{" "}
               Pvt. Ltd.
             </h1>
             <p className="font-body text-lg md:text-xl text-muted-foreground">
               Two Unique Unisex Salon Concepts – IRA Studio & IRA La Salon
             </p>
             <div className="flex flex-wrap gap-4 pt-4">
               <Button asChild variant="default" size="lg" className="bg-gradient-gold text-foreground hover:opacity-90 font-body">
                 <Link to="/brands">
                   Explore Our Brands <ArrowRight className="ml-2" size={18} />
                 </Link>
               </Button>
               <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-body">
                 <Link to="/contact">Book Appointment</Link>
               </Button>
             </div>
           </div>
         </div>
       </section>
 
       {/* Brands Section */}
       <section className="py-20 bg-gradient-hero">
         <div className="container mx-auto px-4">
           <div className="text-center mb-16">
             <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
               Our Exclusive Brands
             </h2>
             <p className="font-body text-muted-foreground max-w-2xl mx-auto">
               Experience the perfect blend of style and comfort with our two unique salon concepts
             </p>
           </div>
 
           <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
             {/* IRA Studio */}
             <div className="group relative overflow-hidden rounded-2xl shadow-card hover:shadow-gold transition-all duration-500">
               <img
                 src={iraStudio}
                 alt="IRA Studio"
                 className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
               <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
                 <div className="flex items-center gap-2 mb-2">
                   <Scissors size={20} className="text-gold" />
                   <span className="text-gold text-sm font-body">Compact Format</span>
                 </div>
                 <h3 className="font-display text-2xl font-bold mb-2">IRA Studio</h3>
                 <p className="font-body text-sm text-background/80 mb-3">
                   Quick & efficient unisex salon services in a compact 200 sq. ft. space
                 </p>
                 <div className="flex items-center gap-2">
                   <span className="bg-gold/20 text-gold text-xs px-3 py-1 rounded-full font-body">
                     200 sq. ft.
                   </span>
                 </div>
               </div>
             </div>
 
             {/* IRA La Salon */}
             <div className="group relative overflow-hidden rounded-2xl shadow-card hover:shadow-gold transition-all duration-500">
               <img
                 src={iraLaSalon}
                 alt="IRA La Salon"
                 className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
               <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
                 <div className="flex items-center gap-2 mb-2">
                   <Star size={20} className="text-gold" />
                   <span className="text-gold text-sm font-body">Premium Format</span>
                 </div>
                 <h3 className="font-display text-2xl font-bold mb-2">IRA La Salon</h3>
                 <p className="font-body text-sm text-background/80 mb-3">
                   Luxury salon experience in an expansive 2000 sq. ft. premium space
                 </p>
                 <div className="flex items-center gap-2">
                   <span className="bg-gold/20 text-gold text-xs px-3 py-1 rounded-full font-body">
                     2000 sq. ft.
                   </span>
                 </div>
               </div>
             </div>
           </div>
 
           <div className="text-center mt-12">
             <Button asChild variant="outline" size="lg" className="border-gold text-gold hover:bg-gold hover:text-foreground font-body">
               <Link to="/brands">Learn More About Our Brands</Link>
             </Button>
           </div>
         </div>
       </section>
 
       {/* Services Preview */}
       <section className="py-20 bg-background">
         <div className="container mx-auto px-4">
           <div className="text-center mb-16">
             <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
               Our Services
             </h2>
             <p className="font-body text-muted-foreground max-w-2xl mx-auto">
               Professional beauty and grooming services for everyone
             </p>
           </div>
 
           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
             {[
               { title: "Hair Cutting & Styling", icon: "✂️" },
               { title: "Hair Coloring", icon: "🎨" },
               { title: "Facial & Skin Care", icon: "✨" },
               { title: "Beard & Grooming", icon: "💈" },
               { title: "Bridal Packages", icon: "👰" },
               { title: "Groom Packages", icon: "🤵" },
             ].map((service, idx) => (
               <div
                 key={idx}
                 className="group p-6 bg-accent rounded-xl hover:shadow-soft transition-all duration-300 border border-transparent hover:border-primary/20"
               >
                 <span className="text-3xl mb-4 block">{service.icon}</span>
                 <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                   {service.title}
                 </h3>
                 <p className="font-body text-sm text-muted-foreground">
                   Professional {service.title.toLowerCase()} services by expert stylists
                 </p>
               </div>
             ))}
           </div>
 
           <div className="text-center mt-12">
             <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-body">
               <Link to="/services">View All Services</Link>
             </Button>
           </div>
         </div>
       </section>
 
       {/* CTA Section */}
       <section className="py-20 bg-gradient-rose">
         <div className="container mx-auto px-4 text-center">
           <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
             Ready to Transform Your Look?
           </h2>
           <p className="font-body text-primary-foreground/80 max-w-2xl mx-auto mb-8">
             Book an appointment with our expert stylists and experience the Gauranshi difference
           </p>
           <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90 font-body">
             <Link to="/contact">
               Contact Us Today <ArrowRight className="ml-2" size={18} />
             </Link>
           </Button>
         </div>
       </section>
     </div>
   );
 };
 
 export default Index;