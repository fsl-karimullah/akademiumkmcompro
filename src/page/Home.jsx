import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Serve from "../components/Serve";
import Menu from "../components/Menu";
import Customers from "../components/Customers";
import DownloadApp from "../components/DownloadApp";
import Footer from "../components/Footer";

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
        <DownloadApp />
      </section>
      <section className="p-4">
        <Footer />
      </section>
    </main>
  );
};

export default Home;
