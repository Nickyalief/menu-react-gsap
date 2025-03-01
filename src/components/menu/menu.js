"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import "./menu.css";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const menuLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/work", label: "Work" },
  { path: "/contact", label: "Contact" },
];

function Menu() {
  const container = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tl = useRef();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useGSAP(() => {
    gsap.set(".menu-link-item-holder",{y: 75});

    tl.current = gsap.timeline({paused: true})
    .to(".menu-overlay",{
      duration: 1.25,
      clipPath: "polygon(0 0, 100% 100%, 0% 100%)",
      ease: "power4.inOut",
    })
    .to(".menu-link-item-holder",{
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power4.inOut",
      delay: -0.75,
    })
  }, {scope: container}
);

  useEffect(() => {
    if (isMenuOpen){
      tl.current.play();
    }else{
      tl.current.reverse();
    }
  }, [isMenuOpen]);

  return (
    <div className="menu-container" ref={container}>
      <div className="menu-bar">
        <div className="menu-logo">
          <Link href="/">Nickyalief</Link>
        </div>
        <div className="menu-open" onClick={toggleMenu}>
          <p>menu</p>
        </div>
      </div>
      {isMenuOpen && (
        <div className="menu-overlay">
          <div className="menu-overlay-bar">
            <div className="menu-logo">
              <Link href="/">Nickyalief</Link>
            </div>
            <div className="menu-close" onClick={toggleMenu}>
              <p>Close</p>
            </div>
          </div>
          <div className="menu-close-icon">
            <p>&#x2715;</p>
          </div>
          <div className="menu-copy">
            <div className="menu-links">
              {menuLinks.map((link, index) => (
                <div className="menu-link-item" key={index}>
                  <div className="menu-link-item-holder" onClick={toggleMenu}>
                    <Link href={link.path} className="menu-link">
                      {link.label}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="menu-info">
              <div className="menu-info-col">
                <a href="#" target="_blank" rel="noopener noreferrer">X &#8599;</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Instagram &#8599;</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Github &#8599;</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Email &#8599;</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Dribbble &#8599;</a>
              </div>
              <div className="menu-info-col">
                <p>nickyalief7@gmail.com</p>
                <p>085739226484</p>
              </div>
            </div>
          </div>
          <div className="menu-preview">
            <p>View Showreel</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
