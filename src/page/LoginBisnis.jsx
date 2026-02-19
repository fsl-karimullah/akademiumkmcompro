import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import Serve from "../sections/Serve";
import Menu from "../sections/Menu";
import Customers from "../sections/Customers";
import OurClient from "../sections/OurClient";
import DownloadApp from "../sections/DownloadApp";
import DropDown from "../sections/DropDown";
import Footer from "../sections/Footer";

const LoginBisnis = ({ currentPath }) => {
  console.log(currentPath);
  return (
    <main className="flex flex-col justify-around">
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
        <DropDown />
      </section>
      <section className="p-4">
        <Footer />
      </section>
    </main>
  );
};

export default LoginBisnis;
