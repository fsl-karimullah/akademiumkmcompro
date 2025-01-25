import React from "react";
import Logo from "../components/Logo";
import {
  ArrowRightAltOutlined,
  Facebook,
  Instagram,
  Twitter,
  WhatsApp,
} from "@mui/icons-material";


// ✅ **Social Media Links Component**
const SocialMediaLinks = () => (
  <div className="flex gap-4 mt-4 md:mt-0">
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.instagram.com/akademiumkm.id/"
      className="hover:scale-110 transition-transform"
    >
      <Instagram style={{ color: "var(--themeRed)", fontSize: "28px" }} />
    </a>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://wa.me/6285281252199"
      className="hover:scale-110 transition-transform"
    >
      <WhatsApp style={{ color: "var(--themeRed)", fontSize: "28px" }} />
    </a>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.facebook.com/"
      className="hover:scale-110 transition-transform"
    >
      <Facebook style={{ color: "var(--themeRed)", fontSize: "28px" }} />
    </a>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://twitter.com/"
      className="hover:scale-110 transition-transform"
    >
      <Twitter style={{ color: "var(--themeRed)", fontSize: "28px" }} />
    </a>
  </div>
);

// ✅ **Footer Section Component**
const FooterSection = ({ title, links }) => (
  <div className="flex flex-col gap-2 text-center md:text-left">
    <h2 className="font-bold text-lg text-[var(--themeRed)]">{title}</h2>
    <ul className="text-gray-600 text-sm flex flex-col gap-1">
      {links.map((link, index) => (
        <li key={index} className="hover:text-[var(--themeRed)] cursor-pointer">
          {link}
        </li>
      ))}
    </ul>
  </div>
);

// ✅ **Main Footer Component**
const Footer = () => {

  const handleEmailClick = () => {
    // const recipient = "akademiumkm18@gmail.com";
    const recipient = "team@akademiumkm.id";
    const subject = encodeURIComponent("Inquiry About Branding Services");
    const body = encodeURIComponent("Hello, I would like to know more about your services.");

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  return (
    <footer className="bg-gray-50 py-8 px-6 md:px-16 text-gray-700">
      {/* ✅ **Top Section** */}
      <div className="flex flex-col md:flex-row gap-8 justify-between">
        {/* ✅ **Logo & Description Section** */}
        <div className="md:w-1/3 flex flex-col gap-4 items-center md:items-start">
          <Logo />
          <p className="text-sm text-center md:text-left">
            Hubungi kami untuk informasi lebih lanjut. Tekan tombol sosial media
            di bawah untuk terhubung langsung dengan kami.
          </p>
          <SocialMediaLinks />
        </div>

        {/* ✅ **Links Section** */}
        <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-6">
          <FooterSection
            title="About"
            links={["About Us", "Features", "News", "Menu"]}
          />
          <FooterSection
            title="Company"
            links={["Why Akademi Umkm?", "Partner with Us", "FAQ", "Blog"]}
          />
          <FooterSection
            title="Support"
            links={["Account", "Support Center", "Feedback", "Contact Us"]}
          />
          <FooterSection
            title="Get in Touch"
            links={[
              "Have a question?",
              "We'd love to hear from you!",
              "Contact Us",
            ]}
          />
        </div>
      </div>

      {/* ✅ **Bottom Section** */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-8 border-t pt-4 text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Akademi UMKM. All Rights Reserved.</p>
        <button
      onClick={handleEmailClick}
      className="flex items-center gap-2 mt-4 md:mt-0 bg-[var(--themeRed)] text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
    >
      <span>Email Us</span>
      <ArrowRightAltOutlined style={{ fontSize: "20px" }} />
      team@akademiumkm.id
    </button>
      </div>
    </footer>
  );
};

export default Footer;
