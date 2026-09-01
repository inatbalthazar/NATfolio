import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import './styles/global.css';
import { initPortfolioScripts } from './main-script';

import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import HeroSection from './components/HeroSection';
import VideoReel from './components/VideoReel';
import StorySection from './components/StorySection';
import AwardsSection from './components/AwardsSection';
import FinalSection from './components/FinalSection';
import PortfolioSection from './components/PortfolioSection';
import ContactSection from './components/ContactSection';
import AdventureFooter from './components/AdventureFooter';
import DrawboxModal from './components/DrawboxModal';
import CboxModal from './components/CboxModal';
import WebsiteInquiryDrawer from './components/WebsiteInquiryDrawer';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const [isDrawboxOpen, setIsDrawboxOpen] = useState(false);
  const [isCboxOpen, setIsCboxOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  useEffect(() => {
    // Run full GSAP / animation / video / accordion script suite after DOM mounts
    const timer = setTimeout(() => {
      initPortfolioScripts();
    }, 100);

    const handleOpenDrawbox = () => setIsDrawboxOpen(true);
    const handleOpenCbox = () => setIsCboxOpen(true);
    const handleOpenInquiry = () => setIsInquiryOpen(true);

    window.addEventListener('open-drawbox', handleOpenDrawbox);
    window.addEventListener('open-cbox', handleOpenCbox);
    window.addEventListener('open-website-inquiry', handleOpenInquiry);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('open-drawbox', handleOpenDrawbox);
      window.removeEventListener('open-cbox', handleOpenCbox);
      window.removeEventListener('open-website-inquiry', handleOpenInquiry);
    };
  }, []);

  return (
    <div className="app-container">
      <div className="ui-gradient-top"></div>
      <div className="ui-gradient-bottom"></div>

      <Preloader />
      <Navbar onOpenInquiry={() => setIsInquiryOpen(true)} />

      {/* UI Overlays */}
      <div className="ui-component" id="coord-bottom-right" data-email="inatbalthazar@gmail.com" data-default="Rayong, Thailand • +66 97149 3909">
        <span className="coord-full">Rayong, Thailand • +66 97149 3909</span>
        <span className="coord-short">Rayong, TH</span>
      </div>
      <div className="ui-component" id="coord-bottom-left" data-email="inatbalthazar@gmail.com" data-default="inatbalthazar@gmail.com">
        <span className="coord-full">inatbalthazar@gmail.com</span>
        <span className="coord-short">EMAIL ME</span>
      </div>
      <div className="copied-notification" id="copied-notification">COPIED</div>

      <HeroSection />
      <VideoReel />
      <div id="gradient-transition"></div>
      <StorySection />
      <FinalSection />
      <AwardsSection />
      <PortfolioSection />
      <ContactSection />
      <AdventureFooter
        onOpenDrawbox={() => setIsDrawboxOpen(true)}
        onOpenCbox={() => setIsCboxOpen(true)}
      />
      <DrawboxModal isOpen={isDrawboxOpen} onClose={() => setIsDrawboxOpen(false)} />
      <CboxModal isOpen={isCboxOpen} onClose={() => setIsCboxOpen(false)} />
      <WebsiteInquiryDrawer isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
    </div>
  );
}

export default App;
