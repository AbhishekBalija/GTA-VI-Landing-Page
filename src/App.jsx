import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
import "remixicon/fonts/remixicon.css";

const App = () => {
  let [showContent, setShowContent] = useState(false);

  // starting animation
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 80,
      ease: "power4.inOut",
      duration: 2.5,
      transformOrigin: "50% 50%",
    }).to(
      ".vi-mask-group",
      {
        scale: 10,
        opacity: 0,
        ease: "expo.inOut",
        duration: 2,
        transformOrigin: "50% 50%",
        onUpdate: function () {
          if (this.progress() >= 0.9) {
            document.querySelector(".svg").remove();
            setShowContent(true);
            this.kill();
          }
        },
      },
      "<+0.5"
    );
  });

  // mouse movement
  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".scene", {
      rotate: 0,
      scale: 1,
      duration: 2,
      delay: -1,
      ease: "expo.easeInOut",
    });
    gsap.to(".sky", {
      rotate: 0,
      scale: 1.1,
      duration: 2,
      delay: -0.8,
      ease: "expo.easeInOut",
    });
    gsap.to(".buildings", {
      rotate: 0,
      scale: 1,
      duration: 2,
      delay: -1,
      ease: "expo.easeInOut",
    });
    gsap.to(".woman", {
      rotate: 0,
      scale: 0.4,
      bottom: 0,
      duration: 2,
      delay: -0.8,
      ease: "expo.InOut",
    });
    gsap.fromTo(
      ".man",
      {
        y: 150, // slide up into view
        x: 150,
        opacity: 0,
        scale: 1.5, // start slightly smaller than final
        rotate: 20, // exaggerated tilt
      },
      {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 0.45,
        rotate: 0,
        duration: 1.8,
        ease: "expo.out",
      }
    );

    gsap.fromTo(
      ".text h1",
      {
        y: -200, // start higher
        opacity: 0, // fade in
        scale: 1.6, // start bigger
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)", // smooth spring bounce
        stagger: 0.2, // each h1 comes after the other
      }
    );

    // floating loop for both characters in second screen
    gsap.to(".limg img", {
      y: "+=10",
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "sine.easeInOut",
      delay: 2,
    });

    const main = document.querySelector(".main");
    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;

      // text animation
      gsap.to(".imagesdiv .text", {
        xPercent: xMove * 0.4,
      });

      // sky animation
      gsap.to(".sky", {
        x: xMove,
      });

      // buildings animation
      gsap.to(".buildings", {
        x: xMove * 1.2,
      });
    });

    gsap.to(".scroll", {
      y: 40,
      duration: 1,
      ease: "bounce.Out",
      repeat: -1,
      yoyo: true,
    });
  }, [showContent]);

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="/buildings2.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && (
        <div className="main w-full">
          <div className="landing overflow-hidden relative w-full h-screen bg-black">
            <div className="scene rotate-[-10deg] scale-[1.7]">
              <div className="navbar absolute top-0 left-0 z-10 w-full px-10 py-10">
                <div className="logo flex items-center gap-6">
                  <div className="lines flex flex-col gap-[5px]">
                    <div className="line w-11 h-[5px] bg-white"></div>
                    <div className="line w-7 h-[5px] bg-white"></div>
                    <div className="line w-4 h-[5px] bg-white"></div>
                  </div>
                  <h3 className="text-3xl text-white -mt-[10px] leading-none">
                    Rockstar
                  </h3>
                </div>
              </div>
              <div className="imagesdiv relative w-full h-screen overflow-hidden">
                {/* background sky */}
                <img
                  className="sky absolute scale-[1.7] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
                  src="/sky1.png"
                  alt="sky"
                />

                {/* buildings */}
                <img
                  className="buildings absolute rotate-[5deg] scale-[1.4] top-0 left-0 w-full h-full object-cover"
                  src="/buildings2.png"
                  alt="building"
                />
                {/* text */}
                <div className="text flex flex-col gap-15 text-white absolute top-10 left-[60%] -translate-x-1/2">
                  <h1 className="text-[9rem] leading-none -ml-40">grand</h1>
                  <h1 className="text-[9rem] leading-none ml-20">theft</h1>
                  <h1 className="text-[9rem] leading-none -ml-20">auto</h1>
                </div>

                {/* woman on the right corner */}
                <img
                  className="woman absolute bottom-[-150%] right-[-10%] scale-70 rotate-[-25deg] origin-bottom-right"
                  src="/women.png"
                  alt="woman"
                />

                {/* man on the left corner */}
                <img
                  className="man absolute bottom-0 left-[-3%] scale-45 origin-bottom-left"
                  src="/man.png"
                  alt="man"
                />
              </div>
            </div>
            <div className="btmbar flex flex-row-reverse justify-between text-white absolute bottom-0 left-0 z-10 w-full px-10 py-5 bg-gradient-to-t from-black to-transparent">
              <div className="scroll flex gap-4 justify-center">
                <i className="text-2xl ri-arrow-down-line"></i>
                <h3 className="font-[Helvatica_now_Display] text-xl">
                  Scroll Down
                </h3>
              </div>
              <img className="h-[45px]" src="/ps5.png" alt="ps5" />
            </div>
          </div>
          <div className="content relative w-full flex px-10 items-center justify-center h-screen overflow-hidden">
            {/* Background video */}
            <video
              src="/city_night.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover scale-[1.1]"
            />

            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Content */}
            <div className="cntnr relative z-10 w-full h-[80%] text-white flex">
              <div className="limg w-1/2 h-full relative">
                <img
                  className="absolute scale-[1.1] top-1/2 left-[30%] px-1 -translate-x-1/2 -translate-y-1/2"
                  src="/man_sitting.png"
                  alt="man sitting"
                />
                <img
                  className="absolute scale-[65%] top-1/2 left-[68%] -translate-x-1/2 -translate-y-1/2"
                  src="/women_sitting.png"
                  alt="woman sitting"
                />
              </div>

              <div className="rimg w-[40%] py-20">
                <h1 className="text-6xl">Still Running,</h1>
                <h1 className="text-6xl">Not Hunting</h1>
                <p className="text-xl mt-15 font-[Helvatica_now_Display]">
                  GTA 6 is a role-playing video game developed by Rockstar North
                  and published by Rockstar Games.
                </p>
                <p className="text-xl mt-5 font-[Helvatica_now_Display]">
                  The game is set in the fictional state of San Andreas, a vast
                  and complex open world.
                </p>
                <p className="text-xl mt-10 font-[Helvatica_now_Display]">
                  Players can customize their characters, buy vehicles, and
                  explore a rich, detailed world.
                </p>
                <button className="bg-yellow-500 text-black px-8 py-7 text-3xl rounded-md mt-10">
                  Download Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
