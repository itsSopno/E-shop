import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white py-20 px-6 md:px-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <h3 className="font-bebas text-4xl leading-[0.8] uppercase">
              Lando <br /> Norris
            </h3>
            <p className="font-inter text-gray-400 text-sm max-w-xs leading-relaxed">
              Official store for the World Drivers&apos; Champion. Exclusive collections and high-performance tech peripherals.
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-bebas text-xl tracking-widest uppercase text-[#CCFF00]">Shop</h4>
            <ul className="space-y-4 font-inter text-sm">
              <li><Link href="/cart" className="hover:text-[#CCFF00] transition-colors uppercase tracking-wider">All Products</Link></li>
              <li><Link href="/cart" className="hover:text-[#CCFF00] transition-colors uppercase tracking-wider">Champion Collection</Link></li>
              <li><Link href="/cart" className="hover:text-[#CCFF00] transition-colors uppercase tracking-wider">Accessories</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bebas text-xl tracking-widest uppercase text-[#CCFF00]">Company</h4>
            <ul className="space-y-4 font-inter text-sm">
              <li><Link href="/about" className="hover:text-[#CCFF00] transition-colors uppercase tracking-wider">About Us</Link></li>
              <li><Link href="/privacy" className="hover:text-[#CCFF00] transition-colors uppercase tracking-wider">Privacy Policy</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#CCFF00] transition-colors uppercase tracking-wider">Dashboard</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bebas text-xl tracking-widest uppercase text-[#CCFF00]">Connect</h4>
            <ul className="space-y-4 font-inter text-sm">
              <li><a href="#" className="hover:text-[#CCFF00] transition-colors uppercase tracking-wider">Twitter</a></li>
              <li><a href="#" className="hover:text-[#CCFF00] transition-colors uppercase tracking-wider">Instagram</a></li>
              <li><a href="#" className="hover:text-[#CCFF00] transition-colors uppercase tracking-wider">Discord</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-inter text-gray-500 tracking-widest uppercase">
          <div>&copy; {new Date().getFullYear()} LANDO NORRIS. All rights reserved.</div>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Shipping Info</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
