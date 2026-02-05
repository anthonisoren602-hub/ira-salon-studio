 import { Link } from "react-router-dom";
 import { Mail, Phone, MapPin } from "lucide-react";
 import logo from "@/assets/logo.jpg";
 
 const Footer = () => {
   return (
     <footer className="bg-foreground text-background">
       <div className="container mx-auto px-4 py-16">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
           {/* Brand */}
           <div className="space-y-4">
             <img src={logo} alt="Gauranshi Salons" className="h-16 w-auto rounded-lg" />
             <p className="font-display text-xl font-semibold">
               Gauranshi Salons Pvt. Ltd.
             </p>
             <p className="text-background/70 font-body text-sm italic">
               "Two Concepts. One Standard."
             </p>
           </div>
 
           {/* Quick Links */}
           <div>
             <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
             <ul className="space-y-2">
               {["Home", "About Us", "Our Brands", "Services", "Contact Us"].map(
                 (link) => (
                   <li key={link}>
                     <Link
                       to={`/${link === "Home" ? "" : link.toLowerCase().replace(" ", "-").replace("-us", "")}`}
                       className="text-background/70 hover:text-gold transition-colors font-body text-sm"
                     >
                       {link}
                     </Link>
                   </li>
                 )
               )}
             </ul>
           </div>
 
           {/* Our Brands */}
           <div>
             <h4 className="font-display text-lg font-semibold mb-4">Our Brands</h4>
             <ul className="space-y-2">
               <li>
                 <span className="text-gold font-body text-sm">IRA Studio</span>
                 <p className="text-background/60 text-xs">Compact Unisex Salon</p>
               </li>
               <li>
                 <span className="text-gold font-body text-sm">IRA La Salon</span>
                 <p className="text-background/60 text-xs">Premium Unisex Salon</p>
               </li>
             </ul>
           </div>
 
           {/* Contact Info */}
           <div>
             <h4 className="font-display text-lg font-semibold mb-4">Contact Us</h4>
             <ul className="space-y-3">
               <li className="flex items-start gap-3">
                 <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
                 <span className="text-background/70 font-body text-sm">
                   Sector - 6, Dwarka, New Delhi - 110078
                 </span>
               </li>
               <li className="flex items-center gap-3">
                 <Phone size={18} className="text-gold shrink-0" />
                 <span className="text-background/70 font-body text-sm">
                   +91 XXXXX XXXXX
                 </span>
               </li>
               <li className="flex items-center gap-3">
                 <Mail size={18} className="text-gold shrink-0" />
                 <span className="text-background/70 font-body text-sm">
                   info@irasalon.com
                 </span>
               </li>
             </ul>
           </div>
         </div>
 
         <div className="border-t border-background/20 mt-12 pt-8 text-center">
           <p className="text-background/60 font-body text-sm">
             © {new Date().getFullYear()} Gauranshi Salons Pvt. Ltd. All rights reserved.
           </p>
         </div>
       </div>
     </footer>
   );
 };
 
 export default Footer;