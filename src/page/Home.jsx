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
import News from "../sections/News";
import HeroImage from "../sections/HeroImage";

const Home = ({ currentPath }) => {
  console.log('asdasd',currentPath); 
  return (
    <main className="flex flex-col justify-around ">
      <Navbar currentPath={currentPath} />
      <section className="">
        <Hero currentPath={currentPath} />
        {/* <HeroImage currentPath={currentPath} /> */}
      </section> 
     
      <section className="p-4">
         <Menu currentPath={currentPath} /> {/* masalah */}
      </section>
  
      <section className="p-4">
        <Customers currentPath={currentPath} /> {/* solusi */}
      </section>
           <section className="p-4">
        <Serve currentPath={currentPath} /> {/* produk */}
      </section>
      <section className="p-4">
        <OurClient currentPath={currentPath} /> {/* testimoni */}
      </section>
      <section className="p-4">
        <News currentPath={currentPath} />
      </section>
      <section className="p-4">
        <DownloadApp currentPath={currentPath} /> {/* urgency */}
      </section>
      <section className="p-4">
        <Footer />
      </section>
    </main>
  );
};

export default Home;
