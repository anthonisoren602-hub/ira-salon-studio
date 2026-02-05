 import { Scissors, Star, CheckCircle } from "lucide-react";
 import { Link } from "react-router-dom";
 import { Button } from "@/components/ui/button";
 import iraStudio from "@/assets/ira-studio.jpg";
 import iraLaSalon from "@/assets/ira-la-salon.jpg";
 
 const Brands = () => {
   return (
     <div className="flex flex-col">
       {/* Hero Section */}
       <section className="py-20 bg-gradient-hero">
         <div className="container mx-auto px-4">
           <div className="max-w-3xl mx-auto text-center">
             <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
               Our <span className="text-gradient-gold">Brands</span>
             </h1>
             <p className="font-body text-lg text-muted-foreground">
               Two unique salon concepts designed to meet every customer's needs
             </p>
           </div>
         </div>
       </section>
 
       {/* IRA Studio */}
       <section className="py-20 bg-background">
         <div className="container mx-auto px-4">
           <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
             <div className="order-2 lg:order-1 space-y-6">
               <div className="inline-flex items-center gap-2 bg-accent px-4 py-2 rounded-full">
                 <Scissors size={16} className="text-gold" />
                 <span className="text-sm font-body text-accent-foreground">Compact Format</span>
               </div>
               <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                 IRA Studio
               </h2>
               <p className="font-body text-lg text-muted-foreground leading-relaxed">
                 IRA Studio is our compact, efficient salon format designed for the modern, 
                 busy individual. In just 200 sq. ft., we deliver quick yet quality unisex 
                 salon services without compromising on excellence.
               </p>
               <div className="bg-gold-light/50 p-4 rounded-lg inline-block">
                 <span className="font-display text-2xl font-bold text-gold">200</span>
                 <span className="font-body text-muted-foreground ml-2">sq. ft.</span>
               </div>
               <ul className="space-y-3">
                 {[
                   "Quick & efficient services",
                   "Ideal for express grooming",
                   "Space-optimized design",
                   "All essential services available",
                 ].map((feature, idx) => (
                   <li key={idx} className="flex items-center gap-3">
                     <CheckCircle size={18} className="text-primary shrink-0" />
                     <span className="font-body text-muted-foreground">{feature}</span>
                   </li>
                 ))}
               </ul>
             </div>
             <div className="order-1 lg:order-2">
               <div className="relative rounded-2xl overflow-hidden shadow-card">
                 <img
                   src={iraStudio}
                   alt="IRA Studio"
                   className="w-full h-[400px] object-cover"
                 />
                 <div className="absolute top-4 right-4 bg-gold text-foreground px-4 py-2 rounded-full font-body text-sm font-semibold">
                   Compact
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>
 
       {/* IRA La Salon */}
       <section className="py-20 bg-accent">
         <div className="container mx-auto px-4">
           <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
             <div>
               <div className="relative rounded-2xl overflow-hidden shadow-card">
                 <img
                   src={iraLaSalon}
                   alt="IRA La Salon"
                   className="w-full h-[400px] object-cover"
                 />
                 <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-body text-sm font-semibold">
                   Premium
                 </div>
               </div>
             </div>
             <div className="space-y-6">
               <div className="inline-flex items-center gap-2 bg-background px-4 py-2 rounded-full">
                 <Star size={16} className="text-gold" />
                 <span className="text-sm font-body text-foreground">Premium Format</span>
               </div>
               <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                 IRA La Salon
               </h2>
               <p className="font-body text-lg text-muted-foreground leading-relaxed">
                 IRA La Salon is our flagship premium salon format. Spread across 2000 sq. ft., 
                 it offers a luxurious salon experience with comprehensive beauty and grooming 
                 services in an elegant, spacious environment.
               </p>
               <div className="bg-rose-light p-4 rounded-lg inline-block">
                 <span className="font-display text-2xl font-bold text-primary">2000</span>
                 <span className="font-body text-muted-foreground ml-2">sq. ft.</span>
               </div>
               <ul className="space-y-3">
                 {[
                   "Full luxury salon experience",
                   "Comprehensive service menu",
                   "Spacious & elegant interiors",
                   "Bridal & special occasion packages",
                 ].map((feature, idx) => (
                   <li key={idx} className="flex items-center gap-3">
                     <CheckCircle size={18} className="text-gold shrink-0" />
                     <span className="font-body text-muted-foreground">{feature}</span>
                   </li>
                 ))}
               </ul>
             </div>
           </div>
         </div>
       </section>
 
       {/* CTA */}
       <section className="py-16 bg-foreground">
         <div className="container mx-auto px-4 text-center">
           <h2 className="font-display text-2xl md:text-3xl text-background mb-6">
             Ready to Experience IRA?
           </h2>
           <Button asChild size="lg" className="bg-gold text-foreground hover:bg-gold/90 font-body">
             <Link to="/contact">Book Your Appointment</Link>
           </Button>
         </div>
       </section>
     </div>
   );
 };
 
 export default Brands;