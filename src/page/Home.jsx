import React, { useEffect, useState } from "react";
import Hero from "../sections/Hero";
import Serve from "../sections/Serve";
import Menu from "../sections/Menu";
import Customers from "../sections/Customers";
import DownloadApp from "../sections/DownloadApp";
import Footer from "../sections/Footer";
import Navbar from "../components/Navbar";
import OurClient from "../sections/OurClient";
import { useLocation } from "react-router-dom";

const Home = ({ currentPath }) => {
  console.log(currentPath);
  return (
    <main className="flex flex-col justify-around max-w-screen-xl mx-auto">
      <Navbar currentPath={currentPath} />
      <section className="p-4">
        <Hero currentPath={currentPath} />
      </section>
      <section className="p-4">
        <Serve currentPath={currentPath} />
      </section>
      <section className="p-4">
        <Menu currentPath={currentPath} />
      </section>
      <section className="p-4">
        <Customers currentPath={currentPath} />
      </section>
      <section className="p-4">
        <OurClient currentPath={currentPath} />
      </section>
      <section className="p-4">
        <DownloadApp currentPath={currentPath} />
      </section>
      <section className="p-4">
        <Footer />
      </section>
    </main>
  );
};

export default Home;
