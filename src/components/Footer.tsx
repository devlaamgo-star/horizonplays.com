import { Play, Mail, Phone, MapPin, Facebook, Linkedin, Star } from "lucide-react";

const Footer = () => {
  const companyInfo = {
    name: "HORIZON PLAYS LTD",
    registration: "16701497",
    phone: "+447537167050",
    email: "director@horizonplays.com",
    address: "105 Southwood Rd, London SE9 3QH, United Kingdom",
    founded: "8 September 2025"
  };

  const footerLinks = {
    product: [
      { name: "Game Creator", href: "#" },
      { name: "AI Assistant Ray", href: "#" },
      { name: "Templates", href: "#" },
      { name: "Analytics", href: "#" },
      { name: "Integrations", href: "#" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Games", href: "#games" },
      { name: "Features", href: "#Features" },
      { name: "Contact", href: "/contact" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-service" },
      { name: "Cookie Policy", href: "/cookie-policy" },
      { name: "GDPR Compliance", href: "/gdpr-compliance" },
      { name: "Return Policy", href: "/return-policy" },
    ]
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/horizonplayslyd" },
    { name: "Trustpilot", icon: Star, href: "https://uk.trustpilot.com/review/horizonplays.com" },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold">HORIZON PLAYS</div>
                  <div className="text-sm text-white/80">Educational Games Platform</div>
                </div>
              </div>
              
              <p className="text-white/80 mb-6 leading-relaxed">
                Create engaging educational games in 30 seconds with our AI-powered platform. 
                Trusted by educators worldwide to make learning interactive and fun.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-white/60" />
                  <a href={`mailto:${companyInfo.email}`} className="text-white/80 hover:text-white transition-colors">
                    {companyInfo.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-white/60" />
                  <a href={`tel:${companyInfo.phone}`} className="text-white/80 hover:text-white transition-colors">
                    {companyInfo.phone}
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-white/60 mt-0.5" />
                  <span className="text-white/80">{companyInfo.address}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:col-span-3 gap-8">


              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-white/80 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  {footerLinks.legal.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-white/80 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-white/80">
              © 2025 {companyInfo.name}. All rights reserved. 
              <span className="ml-2">Registration: {companyInfo.registration}</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-white/80">
              <span>Founded {companyInfo.founded}</span>
              <span>GDPR Compliant</span>
              <span>Made in London 🇬🇧</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
