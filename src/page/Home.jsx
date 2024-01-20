import React from "react";
import Hero from "../sections/Hero";
import Serve from "../sections/Serve";
import Menu from "../sections/Menu";
import Customers from "../sections/Customers";
import DownloadApp from "../sections/DownloadApp";
import Footer from "../sections/Footer";
import Navbar from "../components/Navbar";
import OurClient from "../sections/OurClient";

const Home = () => {
  return (
    <main className="flex flex-col justify-around max-w-screen-xl mx-auto">
      <Navbar />
      <section className="p-4">
        <Hero />
      </section>
      <section className="p-4">
        <Serve />
      </section>
      <section className="p-4">
        <Menu />
      </section>
      <section className="p-4">
        <Customers />
      </section>
      <section className="p-4">
        <OurClient />
      </section>
      <section className="p-4">
        <DownloadApp />
      </section>
      <section className="p-4">
        <Footer />
      </section>
    </main>
  );
};

export default Home;
