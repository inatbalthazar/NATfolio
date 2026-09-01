import React, { useState, useEffect } from 'react';

const rulesData = [
  { id: "001", num: "001.", text: "BE PROLIFIC.", name: "PABLO PICASSO", years: "// (1881-1973)", img: "/images/speakers/001_picasso.jpg" },
  { id: "002", num: "002.", text: "HAVE A POINT OF VIEW.", name: "STEVE JOBS", years: "// (1955-2011)", img: "/images/speakers/002_jobs.jpg" },
  { id: "003", num: "003.", text: "TAKE NO PRISONERS.", name: "SUN TZU", years: "// (544-496 BC)", img: "/images/speakers/003_suntzu.jpg" },
  { id: "004", num: "004.", text: "BE ORIGINAL.", name: "RALPH WALDO EMERSON", years: "// (1803-1882)", img: "/images/speakers/004_emerson.jpg" },
  { id: "005", num: "005.", text: "IF YOU CAN'T BE ORIGINAL, BE BETTER THAN ORIGINAL.", name: "C.S. LEWIS", years: "// (1898-1963)", img: "/images/speakers/005_cslewis.jpg" },
  { id: "006", num: "006.", text: "DON'T TAKE NO SHIT.", name: "CHARLES BUKOWSKI", years: "// (1920-1994)", img: "/images/speakers/006_bukowski.jpg" },
  { id: "007", num: "007.", text: "GREATNESS IS GOOD COMPOUNDED OVER TIME.", name: "WARREN BUFFETT", years: "// (1930-PRES.)", img: "/images/speakers/007_buffett.jpg" },
  { id: "008", num: "008.", text: "CHARGE A LOT BUT GIVE THEM MORE THAN THEY PAY FOR.", name: "DAVID OGILVY", years: "// (1911-1999)", img: "/images/speakers/008_ogilvy.jpg" },
  { id: "009", num: "009.", text: "IT'S NOT CREATIVE UNLESS YOU DO SOMETHING THAT SCARES YOU.", name: "GEORGE LOIS", years: "// (1931-2022)", img: "/images/speakers/009_lois.jpg" },
  { id: "010", num: "010.", text: "IF YOU AREN'T PISSING SOMEONE OFF, YOU'RE DOING SOMETHING WRONG.", name: "DENNIS RODMAN", years: "// (1961-PRES.)", img: "/images/speakers/010_rodman.jpg" },
  { id: "011", num: "011.", text: "ALL CRITICISMS MUST BE ACCOMPANIED BY SUGGESTIONS.", name: "WATCHARINE DUANGSRI", years: "// (N/A-PRES.)", img: "/images/speakers/011_watcharine.jpg" },
  { id: "012", num: "012.", text: "BE YOUR CLIENT'S MOST LOYAL CUSTOMER.", name: "PAUL RAND", years: "// (1914-1996)", img: "/images/speakers/012_rand.jpg" },
  { id: "013", num: "013.", text: "TAKE YOUR WORK SERIOUSLY, YOURSELF LESS SO.", name: "ALAN WATTS", years: "// (1915-1973)", img: "/images/speakers/013_watts.jpg" },
  { id: "014", num: "014.", text: "NEVER ADVERTISE ANYTHING YOU WOULDN'T WANT YOUR KID TO BUY.", name: "DAVID OGILVY", years: "// (1911-1999)", img: "/images/speakers/014_ogilvy.jpg" },
  { id: "015", num: "015.", text: "THERE'S POETRY IN EVERYTHING, FIND IT.", name: "WALT WHITMAN", years: "// (1819-1892)", img: "/images/speakers/015_whitman.jpg" },
  { id: "016", num: "016.", text: "DRESS BETTER THAN YOUR COMPETITION.", name: "TOM FORD", years: "// (1961-PRES.)", img: "/images/speakers/016_ford.jpg" },
  { id: "017", num: "017.", text: "INTERESTING PEOPLE ARE INTERESTED.", name: "DALE CARNEGIE", years: "// (1888-1955)", img: "/images/speakers/017_carnegie.jpg" }
];

function FinalSection() {
  const [activeAuthor, setActiveAuthor] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let ctx;
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
        const gsap = window.gsap;

        ctx = gsap.context(() => {
          const finalHero = document.querySelector('.final-story-hero');
          const finalWords = document.querySelectorAll('.final-story-hero .story-hero-word');

          if (finalHero && finalWords.length > 0) {
            gsap.fromTo(finalWords,
              { opacity: 0, y: 60 },
              {
                opacity: 1,
                y: 0,
                duration: 0.85,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: finalHero,
                  start: "top 80%",
                  toggleActions: "play none none reverse"
                }
              }
            );
          }

          // Animate each quote row line-by-line
          const ruleItems = document.querySelectorAll('#rules .rule-row-item');
          if (ruleItems.length > 0) {
            gsap.fromTo(ruleItems,
              { opacity: 0, y: 24 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.04,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: "#rules",
                  start: "top 85%",
                  toggleActions: "play none none reverse"
                }
              }
            );
          }
        });
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX + 25, y: e.clientY - 70 });
  };

  return (
    <div id="final-section">
      <div className="story-hero final-story-hero">
        <div className="story-hero-inner">
          <h2 className="story-hero-typography final-hero-typography">
            <span className="story-hero-word">Core</span>
            <span className="story-hero-word">Philosophies.</span>
          </h2>
        </div>
      </div>

      <div className="framer-79selz" data-framer-name="rules" id="rules">
        {rulesData.map((rule) => (
          <div
            key={rule.id}
            className="rule-row-item"
            data-framer-name={rule.id}
            onMouseEnter={(e) => {
              setActiveAuthor(rule);
              setCursorPos({ x: e.clientX + 25, y: e.clientY - 70 });
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setActiveAuthor(null)}
          >
            <span className="rule-number">{rule.num}</span>
            <span className="rule-text">{rule.text}</span>
          </div>
        ))}
      </div>

      {activeAuthor && (
        <div
          id="author-popup"
          className="active"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`
          }}
        >
          <img
            className="author-popup-img"
            src={activeAuthor.img}
            alt={activeAuthor.name}
          />
          <div className="author-popup-info">
            <div className="author-popup-name">{activeAuthor.name}</div>
            <div className="author-popup-years">{activeAuthor.years}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FinalSection;