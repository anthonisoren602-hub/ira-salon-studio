 import { useState } from "react";
 import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Textarea } from "@/components/ui/textarea";
 import { toast } from "sonner";
 
 const Contact = () => {
   const [formData, setFormData] = useState({
     name: "",
     email: "",
     phone: "",
     message: "",
   });
 
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     toast.success("Thank you for your message! We'll get back to you soon.");
     setFormData({ name: "", email: "", phone: "", message: "" });
   };
 
   const handleChange = (
     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
   };
 
   return (
     <div className="flex flex-col">
       {/* Hero Section */}
       <section className="py-20 bg-gradient-hero">
         <div className="container mx-auto px-4">
           <div className="max-w-3xl mx-auto text-center">
             <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
               Contact <span className="text-gradient-gold">Us</span>
             </h1>
             <p className="font-body text-lg text-muted-foreground">
               Get in touch with us for appointments, inquiries, or feedback
             </p>
           </div>
         </div>
       </section>
 
       {/* Contact Section */}
       <section className="py-20 bg-background">
         <div className="container mx-auto px-4">
           <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
             {/* Contact Info */}
             <div className="space-y-8">
               <div>
                 <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                   Get In Touch
                 </h2>
                 <p className="font-body text-muted-foreground">
                   We'd love to hear from you. Reach out for appointments, business 
                   inquiries, or any questions about our services.
                 </p>
               </div>
 
               <div className="space-y-6">
                 <div className="flex items-start gap-4 p-4 bg-accent rounded-xl">
                   <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shrink-0">
                     <MapPin size={24} className="text-primary-foreground" />
                   </div>
                   <div>
                     <h3 className="font-display font-semibold text-foreground mb-1">
                       Address
                     </h3>
                     <p className="font-body text-sm text-muted-foreground">
                       Sector - 6, Dwarka<br />
                       New Delhi - 110078
                     </p>
                   </div>
                 </div>
 
                 <div className="flex items-start gap-4 p-4 bg-accent rounded-xl">
                   <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center shrink-0">
                     <Phone size={24} className="text-foreground" />
                   </div>
                   <div>
                     <h3 className="font-display font-semibold text-foreground mb-1">
                       Phone
                     </h3>
                     <p className="font-body text-sm text-muted-foreground">
                       +91 XXXXX XXXXX
                     </p>
                   </div>
                 </div>
 
                 <div className="flex items-start gap-4 p-4 bg-accent rounded-xl">
                   <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shrink-0">
                     <Mail size={24} className="text-primary-foreground" />
                   </div>
                   <div>
                     <h3 className="font-display font-semibold text-foreground mb-1">
                       Email
                     </h3>
                     <p className="font-body text-sm text-muted-foreground">
                       info@irasalon.com
                     </p>
                   </div>
                 </div>
 
                 <div className="flex items-start gap-4 p-4 bg-accent rounded-xl">
                   <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center shrink-0">
                     <Clock size={24} className="text-foreground" />
                   </div>
                   <div>
                     <h3 className="font-display font-semibold text-foreground mb-1">
                       Working Hours
                     </h3>
                     <p className="font-body text-sm text-muted-foreground">
                       Mon - Sun: 10:00 AM - 8:00 PM
                     </p>
                   </div>
                 </div>
               </div>
             </div>
 
             {/* Contact Form */}
             <div className="bg-accent p-8 rounded-2xl">
               <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                 Send Us a Message
               </h2>
               <form onSubmit={handleSubmit} className="space-y-6">
                 <div>
                   <label className="font-body text-sm font-medium text-foreground mb-2 block">
                     Your Name
                   </label>
                   <Input
                     name="name"
                     value={formData.name}
                     onChange={handleChange}
                     placeholder="Enter your name"
                     required
                     className="bg-background border-border focus:border-primary font-body"
                   />
                 </div>
                 <div>
                   <label className="font-body text-sm font-medium text-foreground mb-2 block">
                     Email Address
                   </label>
                   <Input
                     name="email"
                     type="email"
                     value={formData.email}
                     onChange={handleChange}
                     placeholder="Enter your email"
                     required
                     className="bg-background border-border focus:border-primary font-body"
                   />
                 </div>
                 <div>
                   <label className="font-body text-sm font-medium text-foreground mb-2 block">
                     Phone Number
                   </label>
                   <Input
                     name="phone"
                     type="tel"
                     value={formData.phone}
                     onChange={handleChange}
                     placeholder="Enter your phone number"
                     className="bg-background border-border focus:border-primary font-body"
                   />
                 </div>
                 <div>
                   <label className="font-body text-sm font-medium text-foreground mb-2 block">
                     Message
                   </label>
                   <Textarea
                     name="message"
                     value={formData.message}
                     onChange={handleChange}
                     placeholder="How can we help you?"
                     required
                     rows={4}
                     className="bg-background border-border focus:border-primary font-body resize-none"
                   />
                 </div>
                 <Button
                   type="submit"
                   size="lg"
                   className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body"
                 >
                   Send Message <Send className="ml-2" size={18} />
                 </Button>
               </form>
             </div>
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
 
 export default Contact;