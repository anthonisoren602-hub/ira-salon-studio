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
               Gauranshi Salons Pvt. Ltd. is a modern unisex salon company offering high quality 
               grooming and beauty services through two exclusive formats – IRA Studio for quick 
               and compact services, and IRA La Salon for luxury and premium salon experience.
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
                 Redefining Beauty Standards
               </h2>
               <p className="font-body text-muted-foreground leading-relaxed">
                 To become the most trusted name in the Indian salon industry by delivering 
                 exceptional grooming experiences that make every customer feel confident 
                 and beautiful.
               </p>
             </div>
             <div className="space-y-4">
               <div className="inline-flex items-center gap-2 bg-accent px-4 py-2 rounded-full">
                 <Award size={16} className="text-gold" />
                 <span className="text-sm font-body text-accent-foreground">Our Mission</span>
               </div>
               <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                 Excellence in Every Service
               </h2>
               <p className="font-body text-muted-foreground leading-relaxed">
                 To provide world-class beauty and grooming services through our innovative 
                 salon formats, making premium salon experiences accessible to everyone.
               </p>
             </div>
           </div>
         </div>
       </section>
 
       {/* Values */}
       <section className="py-20 bg-accent">
         <div className="container mx-auto px-4">
           <div className="text-center mb-16">
             <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
               Our Core Values
             </h2>
             <p className="font-body text-muted-foreground max-w-2xl mx-auto">
               The principles that guide everything we do
             </p>
           </div>
 
           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
             {[
               {
                 icon: Sparkles,
                 title: "Quality",
                 description: "Premium products and expert techniques for every service",
               },
               {
                 icon: Users,
                 title: "Customer First",
                 description: "Your satisfaction is our top priority",
               },
               {
                 icon: Award,
                 title: "Excellence",
                 description: "Continuously raising the bar in salon standards",
               },
               {
                 icon: Heart,
                 title: "Passion",
                 description: "Love for beauty drives everything we do",
               },
             ].map((value, idx) => (
               <div
                 key={idx}
                 className="p-6 bg-background rounded-xl shadow-soft text-center"
               >
                 <div className="w-12 h-12 mx-auto mb-4 bg-gradient-gold rounded-full flex items-center justify-center">
                   <value.icon size={24} className="text-foreground" />
                 </div>
                 <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                   {value.title}
                 </h3>
                 <p className="font-body text-sm text-muted-foreground">
                   {value.description}
                 </p>
               </div>
             ))}
           </div>
         </div>
       </section>
 
       {/* Tagline */}
       <section className="py-16 bg-foreground">
         <div className="container mx-auto px-4 text-center">
           <p className="font-display text-2xl md:text-3xl text-background italic">
             "Two Concepts. One Standard."
           </p>
         </div>
       </section>
     </div>
   );
 };
 
 export default About;