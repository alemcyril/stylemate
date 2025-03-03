import React from "react";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import About from "../components/landing/About";
import Contact from "../components/landing/Contact";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div id="Home">
        <Hero />
      </div>
      <div id="Features">
        <Features />
      </div>
      <div id="About">
        <About />
      </div>
      <div id="Contact">
        <Contact />
      </div>
    </>
  );
};

export default LandingPage;
