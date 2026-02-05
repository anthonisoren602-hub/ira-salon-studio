 import { useState } from "react";
 import { Link, useLocation } from "react-router-dom";
 import { Menu, X } from "lucide-react";
 import logo from "@/assets/logo.jpg";
 
 const navLinks = [
   { name: "Home", path: "/" },
   { name: "About Us", path: "/about" },
   { name: "Our Brands", path: "/brands" },
   { name: "Services", path: "/services" },
   { name: "Contact Us", path: "/contact" },
 ];
 
 const Navbar = () => {
   const [isOpen, setIsOpen] = useState(false);
   const location = useLocation();
 
   return (
     <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
       <div className="container mx-auto px-4">
         <div className="flex items-center justify-between h-20">
           {/* Logo */}
           <Link to="/" className="flex items-center gap-3">
             <img src={logo} alt="Gauranshi Salons" className="h-12 w-auto" />
             <span className="font-display text-lg font-semibold text-foreground hidden sm:block">
               Gauranshi Salons
             </span>
           </Link>
 
           {/* Desktop Navigation */}
           <div className="hidden md:flex items-center gap-8">
             {navLinks.map((link) => (
               <Link
                 key={link.path}
                 to={link.path}
                 className={`font-body text-sm font-medium transition-colors hover:text-primary ${
                   location.pathname === link.path
                     ? "text-primary"
                     : "text-muted-foreground"
                 }`}
               >
                 {link.name}
               </Link>
             ))}
           </div>
 
           {/* Mobile Menu Button */}
           <button
             onClick={() => setIsOpen(!isOpen)}
             className="md:hidden p-2 text-foreground"
             aria-label="Toggle menu"
           >
             {isOpen ? <X size={24} /> : <Menu size={24} />}
           </button>
         </div>
 
         {/* Mobile Navigation */}
         {isOpen && (
           <div className="md:hidden py-4 border-t border-border">
             <div className="flex flex-col gap-4">
               {navLinks.map((link) => (
                 <Link
                   key={link.path}
                   to={link.path}
                   onClick={() => setIsOpen(false)}
                   className={`font-body text-base font-medium transition-colors hover:text-primary px-2 py-2 ${
                     location.pathname === link.path
                       ? "text-primary"
                       : "text-muted-foreground"
                   }`}
                 >
                   {link.name}
                 </Link>
               ))}
             </div>
           </div>
         )}
       </div>
     </nav>
   );
 };
 
 export default Navbar;