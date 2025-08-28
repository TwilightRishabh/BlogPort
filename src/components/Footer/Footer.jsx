import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Logo & Copyright */}
          <div className="md:col-span-1 flex flex-col justify-between">
            <Logo width="120px" />
            <p className="mt-4 text-sm text-gray-500">
              © {new Date().getFullYear()} MegaBlog. All rights reserved.
            </p>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-700 hover:text-black transition-colors">Features</Link></li>
              <li><Link to="/" className="text-gray-700 hover:text-black transition-colors">Pricing</Link></li>
              <li><Link to="/" className="text-gray-700 hover:text-black transition-colors">Affiliate Program</Link></li>
              <li><Link to="/" className="text-gray-700 hover:text-black transition-colors">Press Kit</Link></li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-700 hover:text-black transition-colors">Account</Link></li>
              <li><Link to="/" className="text-gray-700 hover:text-black transition-colors">Help</Link></li>
              <li><Link to="/" className="text-gray-700 hover:text-black transition-colors">Contact Us</Link></li>
              <li><Link to="/" className="text-gray-700 hover:text-black transition-colors">Customer Support</Link></li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-4">Legals</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-700 hover:text-black transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/" className="text-gray-700 hover:text-black transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="text-gray-700 hover:text-black transition-colors">Licensing</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
