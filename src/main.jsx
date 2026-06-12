import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true));
ScrollTrigger.clearScrollMemory?.();
gsap.globalTimeline.clear();

const heroBackground = '/assets/forlove-hero-bg.jpg';
const forloveLogo = '/assets/forlove-logo.svg';
let heroScrollReady = false;

const sectionTwoMoments = [
  {
    main: <>¿Y si todo fuera por <span>amor</span>?</>,
    support: 'FORLOVE es un proyecto con propósito.',
  },
  {
    main: <>Una experiencia que te interpela</>,
    support: 'A través del amor como valor universal.',
  },
  {
    main: <>Del <span>amor</span> humano al <span>amor</span> divino</>,
    support: (
      <>
        Y también desde una parte esencial del amor: el <span>desamor</span>.
      </>
    ),
    intense: true,
  },
];

function WatercolorTransition() {
  return (
    <div className="watercolorTransition" aria-hidden="true">
      <span className="watercolorTransition__bloom watercolorTransition__bloom--one" />
      <span className="watercolorTransition__bloom watercolorTransition__bloom--two" />
      <span className="watercolorTransition__bloom watercolorTransition__bloom--three" />
      <span className="watercolorTransition__paper" />
      <span className="watercolorTransition__grain" />
    </div>
  );
}

function HeroSection() {
  const heroRef = useRef(null);
  const posterRef = useRef(null);
  const figuresRef = useRef(null);
  const copyRef = useRef(null);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    ScrollTrigger.clearScrollMemory?.();
    window.scrollTo(0, 0);

    let introFallback;

    const ctx = gsap.context(() => {
      gsap.set('.introReveal', {
        autoAlpha: 0,
        y: 36,
        scale: 0.94,
        filter: 'blur(14px)',
        transformOrigin: 'left center',
      });
      gsap.set('.introReveal--premiereEn', { letterSpacing: '0.62em' });
      gsap.set('.forloveLogo', {
        autoAlpha: 0,
        y: 30,
        scale: 0.88,
        filter: 'drop-shadow(0 16px 32px rgba(58, 31, 18, 0.22)) blur(14px)',
      });
      gsap.set('.heroScrollCue', { autoAlpha: 0, y: 18, scale: 0.94 });
      gsap.set(posterRef.current, { scale: 1.13, xPercent: -2.2, autoAlpha: 0 });
      gsap.set(figuresRef.current, { scale: 1.2, xPercent: 4, yPercent: 1.2, autoAlpha: 0 });
      gsap.set('.heroLightBloom', { autoAlpha: 0, xPercent: -18, scale: 0.82 });
      gsap.set('.heroCurtain', { autoAlpha: 1 });
      gsap.set('.watercolorTransition__bloom', { scale: 0.1, autoAlpha: 0, rotate: -8 });
      gsap.set('.watercolorTransition__paper', { autoAlpha: 0 });
      gsap.set('.watercolorTransition__grain', { autoAlpha: 0 });

      let intro;
      let introComplete = false;
      let scrollCueReady = false;
      let scrollTl;

      const createScrollTimeline = () => {
        if (scrollTl) return;

        scrollTl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: heroRef.current,
            start: 0,
            end: () => window.innerHeight * 1.7,
            scrub: 1.8,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (!scrollCueReady) return;

              const cueVisible = self.progress < 0.02;
              gsap.to('.heroScrollCue', {
                autoAlpha: cueVisible ? 1 : 0,
                y: cueVisible ? 0 : 22,
                scale: cueVisible ? 1 : 0.88,
                filter: cueVisible
                  ? 'drop-shadow(0 0 16px rgba(8,6,4,0.72)) drop-shadow(0 0 18px rgba(201,138,72,0.28)) blur(0px)'
                  : 'drop-shadow(0 0 16px rgba(8,6,4,0.72)) drop-shadow(0 0 18px rgba(201,138,72,0.28)) blur(6px)',
                duration: cueVisible ? 0.5 : 0.35,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            },
          },
        });

        scrollTl
          .to(copyRef.current, { xPercent: -10, autoAlpha: 0.04, filter: 'blur(4px)', ease: 'power2.in' }, 0)
          .to(posterRef.current, { scale: 1.12, xPercent: -2.2, yPercent: -1.6 }, 0)
          .to(figuresRef.current, { scale: 1.2, xPercent: -4, yPercent: 1.8, autoAlpha: 0.82 }, 0)
          .to('.heroLightBloom', { xPercent: 28, yPercent: -10, scale: 1.28, autoAlpha: 0.14 }, 0)
          .to('.heroEdgeDissolve', { autoAlpha: 0.92, scale: 1.12, ease: 'power1.in' }, 0.06)
          .to('.watercolorTransition__bloom--one', { autoAlpha: 1, scale: 6.8, xPercent: 18, yPercent: -7, rotate: 18, ease: 'power1.inOut' }, 0.14)
          .to('.watercolorTransition__bloom--two', { autoAlpha: 0.96, scale: 6.3, xPercent: -12, yPercent: 11, rotate: -28, ease: 'power1.inOut' }, 0.18)
          .to('.watercolorTransition__bloom--three', { autoAlpha: 0.9, scale: 5.9, xPercent: 22, yPercent: 20, rotate: 33, ease: 'power1.inOut' }, 0.24)
          .to('.watercolorTransition__paper', { autoAlpha: 1, ease: 'power2.in' }, 0.42)
          .to('.watercolorTransition__grain', { autoAlpha: 0.68 }, 0.48)
          .to(posterRef.current, { autoAlpha: 0.02, ease: 'power2.in' }, 0.52)
          .to(figuresRef.current, { autoAlpha: 0.02, ease: 'power2.in' }, 0.52)
          .to('.heroWarmOverlay, .heroEdgeDissolve, .heroLightBloom', { autoAlpha: 0, ease: 'power2.in' }, 0.58);

        ScrollTrigger.refresh();
        heroScrollReady = true;
        window.dispatchEvent(new Event('forlove:hero-scroll-ready'));
      };

      const revealIntroFinalState = () => {
        const atTop = window.scrollY < 4;

        if (!introComplete) {
          intro?.kill();
        }

        gsap.set('.heroCurtain', { autoAlpha: 0 });
        gsap.set(posterRef.current, { autoAlpha: 1, scale: 1.025, xPercent: 0, yPercent: 0 });
        gsap.set(figuresRef.current, { autoAlpha: 0.68, scale: 1.035, xPercent: 0, yPercent: 0 });
        gsap.set('.heroLightBloom', { autoAlpha: 0.32, xPercent: 10, yPercent: 0, scale: 1.08 });
        gsap.set('.introReveal', { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)' });
        gsap.set('.introReveal--premiereEn', { letterSpacing: '0.47em' });
        gsap.set('.forloveLogo', {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: 'drop-shadow(0 16px 32px rgba(58, 31, 18, 0.22)) blur(0px)',
        });
        gsap.set('.heroScrollCue', { autoAlpha: atTop ? 1 : 0, y: atTop ? 0 : 28, scale: 1 });
        scrollCueReady = true;
        createScrollTimeline();
      };

      introFallback = window.setTimeout(revealIntroFinalState, 2200);

      intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .to('.heroCurtain', { autoAlpha: 0, duration: 0.7, ease: 'power2.inOut' })
        .to(posterRef.current, { autoAlpha: 1, scale: 1.025, xPercent: 0, duration: 1.1, ease: 'power2.out' }, 0.01)
        .to(figuresRef.current, { autoAlpha: 0.68, scale: 1.035, xPercent: 0, yPercent: 0, duration: 1.2, ease: 'power2.out' }, 0.08)
        .to('.heroLightBloom', { autoAlpha: 0.78, xPercent: 10, scale: 1.08, duration: 0.9, ease: 'sine.out' }, 0.1)
        .to('.heroLightBloom', { autoAlpha: 0.32, duration: 0.8, ease: 'sine.inOut' }, 0.9)
        .to('.introReveal--premiereEs', { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.55, ease: 'power2.out' }, 0.28)
        .to('.introReveal--premiereEn', {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          letterSpacing: '0.47em',
          duration: 0.5,
          ease: 'power2.out',
        }, 0.48)
        .to('.introReveal--statement', { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' }, 0.62)
        .to('.forloveLogo', {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: 'drop-shadow(0 16px 32px rgba(58, 31, 18, 0.22)) blur(0px)',
          duration: 0.65,
          ease: 'power2.out',
        }, 0.88)
        .to('.introReveal--tagline, .introReveal--keywords, .introReveal--soon, .introReveal--miss', {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.45,
          stagger: 0.08,
          ease: 'power2.out',
        }, 1.02)
        .to('.heroScrollCue', { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: 'power2.out' }, 1.4)
        .call(() => {
          introComplete = true;
          window.clearTimeout(introFallback);
          scrollCueReady = true;
          createScrollTimeline();
        });
    }, heroRef);

    return () => {
      window.clearTimeout(introFallback);
      ctx.revert();
    };
  }, []);

  return (
    <section className="heroSection" ref={heroRef} aria-label="FORLOVE Experience — primicia mundial">
      <div className="heroVisual" aria-hidden="true">
        <div className="heroFallbackArt" />
        <img ref={posterRef} className="heroImage heroImage--poster" src={heroBackground} alt="" />
        <img ref={figuresRef} className="heroImage heroImage--figures" src={heroBackground} alt="" />
        <div className="heroLightBloom" />
        <div className="heroWarmOverlay" />
        <div className="heroEdgeDissolve" />
        <div className="heroGrain" />
      </div>

      <div className="heroCopy" ref={copyRef}>
        <div className="premiereBlock">
          <p className="eyebrow introReveal introReveal--premiereEs">Primicia mundial</p>
          <p className="subEyebrow introReveal introReveal--premiereEn">World Premiere</p>
        </div>

        <h1 className="heroStatement introReveal introReveal--statement">
          Desde el principio todo fue por <span>amor</span>
        </h1>

        <img className="forloveLogo" src={forloveLogo} alt="FORLOVE Experience" />

        <p className="tagline introReveal introReveal--tagline">Una experiencia inmersiva que tocará tu corazón</p>
        <p className="keywords introReveal introReveal--keywords">Amor · Experiencia inmersiva · Transformación</p>

        <div className="comingSoon" aria-label="Próximamente, no te lo pierdas">
          <p className="comingSoon__main introReveal introReveal--soon">Próximamente</p>
          <p className="comingSoon__sub introReveal introReveal--miss">No te lo pierdas</p>
        </div>
      </div>

      <div className="heroScrollCue" aria-hidden="true">
        <span className="scrollCue__halo" />
        <span className="scrollCue__label">Desliza</span>
        <span className="scrollCue__track">
          <span className="scrollCue__drop" />
        </span>
        <span className="scrollCue__arrows">
          <span className="scrollCue__arrow scrollCue__arrow--one" />
          <span className="scrollCue__arrow scrollCue__arrow--two" />
        </span>
      </div>

      <WatercolorTransition />
      <div className="heroCurtain" aria-hidden="true" />
    </section>
  );
}

function WatercolorBackgroundLayer() {
  return (
    <div className="sectionTwoWatercolor" aria-hidden="true">
      <span className="sectionTwoWatercolor__wash sectionTwoWatercolor__wash--ivory" />
      <span className="sectionTwoWatercolor__wash sectionTwoWatercolor__wash--amber" />
      <span className="sectionTwoWatercolor__wash sectionTwoWatercolor__wash--red" />
      <span className="sectionTwoWatercolor__wash sectionTwoWatercolor__wash--brown" />
      <span className="sectionTwoWatercolor__wash sectionTwoWatercolor__wash--rose" />
      <span className="sectionTwoWatercolor__veil" />
      <span className="sectionTwoWatercolor__vein sectionTwoWatercolor__vein--one" />
      <span className="sectionTwoWatercolor__vein sectionTwoWatercolor__vein--two" />
      <span className="sectionTwoWatercolor__depth" />
      <span className="sectionTwoWatercolor__paper" />
      <span className="sectionTwoWatercolor__grain" />
    </div>
  );
}

function TextSequenceBlock({ main, support, intense = false, index }) {
  return (
    <div className={`sectionTwoMoment ${intense ? 'sectionTwoMoment--intense' : ''}`} data-moment={index + 1}>
      <div className="sectionTwoMoment__inner">
        <h2>{main}</h2>
        <p>{support}</p>
      </div>
    </div>
  );
}

function SectionTwoExperience() {
  const sceneRef = useRef(null);
  const logoTiltRef = useRef(null);

  useEffect(() => {
    let refreshAfterHero;
    let requestUpdate;
    let handleResize;
    let handlePointerMove;
    let handlePointerLeave;
    let frameId = 0;
    let sectionObserver;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sceneRef);
      const moments = q('.sectionTwoMoment');
      const bridgeWords = q('.sectionTwoBridge__word');
      const finalLogo = q('.sectionTwoFinalLogo')[0];
      const finalLogoOutline = q('.sectionTwoFinalLogo__outline')[0];
      const finalLogoFill = q('.sectionTwoFinalLogo__fill')[0];
      const finalLogoSweep = q('.sectionTwoFinalLogo__sweep')[0];
      const washes = q('.sectionTwoWatercolor__wash');
      const veins = q('.sectionTwoWatercolor__vein');
      const clamp01 = gsap.utils.clamp(0, 1);
      const lerp = gsap.utils.interpolate;
      const easeOut = gsap.parseEase('power2.out');
      const easeInOut = gsap.parseEase('sine.inOut');
      const easeOutSoft = gsap.parseEase('power1.out');

      gsap.set(moments, {
        autoAlpha: 0,
        y: 44,
        scale: 0.9,
        filter: 'blur(20px)',
        transformOrigin: 'center center',
        zIndex: 4,
      });
      gsap.set(bridgeWords, {
        autoAlpha: 0,
        y: 34,
        scale: 0.86,
        filter: 'blur(16px)',
        transformOrigin: 'center center',
      });
      gsap.set(finalLogo, {
        autoAlpha: 0,
        y: 34,
        scale: 0.86,
        filter: 'blur(18px)',
        transformOrigin: 'center center',
      });
      gsap.set(finalLogoOutline, { autoAlpha: 0 });
      gsap.set(finalLogoFill, { autoAlpha: 0, clipPath: 'inset(0% 50% 0% 50%)' });
      gsap.set(finalLogoSweep, { autoAlpha: 0, xPercent: -120 });
      gsap.set(washes, {
        transformOrigin: 'center center',
      });
      gsap.set(veins, { autoAlpha: 0, scaleX: 0.72, transformOrigin: 'center center' });
      gsap.set(q('.sectionTwoWatercolor__veil'), { autoAlpha: 0.72, scale: 1 });

      const washConfigs = [
        { element: q('.sectionTwoWatercolor__wash--ivory'), scale: [1, 1.36], x: [0, -4], y: [0, -3], rotate: [0, -4], opacity: [0.86, 1] },
        { element: q('.sectionTwoWatercolor__wash--amber'), scale: [1, 1.62], x: [0, 7], y: [0, -3], rotate: [0, 8], opacity: [0.6, 0.94] },
        { element: q('.sectionTwoWatercolor__wash--red'), scale: [1, 1.82], x: [0, -7], y: [0, 4], rotate: [0, -8], opacity: [0.48, 0.84] },
        { element: q('.sectionTwoWatercolor__wash--brown'), scale: [1, 1.52], x: [0, 4], y: [0, -6], rotate: [0, 7], opacity: [0.42, 0.72] },
        { element: q('.sectionTwoWatercolor__wash--rose'), scale: [1, 1.56], x: [0, -5], y: [0, -2], rotate: [0, 11], opacity: [0.24, 0.46] },
      ];
      const momentConfigs = [
        { start: 0.03, inEnd: 0.14, holdEnd: 0.30, end: 0.40, entryY: 48, entryScale: 0.92, exitY: -48, exitScale: 1.14, exitBlur: 14 },
        { start: 0.32, inEnd: 0.43, holdEnd: 0.58, end: 0.68, entryY: 48, entryScale: 0.92, exitY: -56, exitScale: 1.16, exitBlur: 16 },
        { start: 0.60, inEnd: 0.72, holdEnd: 0.81, end: 0.88, entryY: 52, entryScale: 0.90, exitY: -64, exitScale: 1.20, exitBlur: 18 },
      ];
      const bridgeMotion = [
        { x: -14, y: -10, scale: 1.08 },
        { x: 15, y: -4, scale: 1.04 },
        { x: -8, y: 13, scale: 1.06 },
        { x: 12, y: 13, scale: 1.08 },
      ];

      const renderMoment = (moment, config, progress) => {
        const inner = moment.querySelector('.sectionTwoMoment__inner');
        let opacity = 0;
        let y = config.entryY;
        let scale = config.entryScale;
        let blur = 18;
        let innerY = 14;
        let innerScale = 0.98;
        let rotate = 0;

        if (progress >= config.start && progress < config.inEnd) {
          const t = easeOut(clamp01((progress - config.start) / (config.inEnd - config.start)));
          opacity = t;
          y = lerp(config.entryY, 0, t);
          scale = lerp(config.entryScale, 1, t);
          blur = lerp(18, 0, t);
          innerY = lerp(14, 0, t);
          innerScale = lerp(0.98, 1, t);
          rotate = lerp(0.6, 0, t);
        } else if (progress >= config.inEnd && progress < config.holdEnd) {
          const t = easeInOut(clamp01((progress - config.inEnd) / (config.holdEnd - config.inEnd)));
          opacity = 1;
          y = lerp(0, -6, t);
          scale = lerp(1, 1.014, t);
          blur = 0;
          innerY = 0;
          innerScale = 1;
          rotate = 0;
        } else if (progress >= config.holdEnd && progress < config.end) {
          const t = easeInOut(clamp01((progress - config.holdEnd) / (config.end - config.holdEnd)));
          opacity = lerp(1, 0, t * t);
          y = lerp(-6, config.exitY, t);
          scale = lerp(1.014, config.exitScale, t);
          blur = lerp(0, config.exitBlur, t);
          innerY = lerp(0, -14, t);
          innerScale = lerp(1, 1.01, t);
          rotate = lerp(0, -0.4, t);
        } else if (progress >= config.end) {
          y = config.exitY;
          scale = config.exitScale;
          blur = config.exitBlur;
          innerY = -14;
          innerScale = 1.01;
        }

        gsap.set(moment, {
          autoAlpha: opacity < 0.01 ? 0 : opacity,
          y,
          scale,
          filter: `blur(${blur}px)`,
          rotate,
        });
        gsap.set(inner, {
          y: innerY,
          scale: innerScale,
        });
      };

      const renderBridge = (progress) => {
        const inT = easeOutSoft(clamp01((progress - 0.79) / 0.06));
        const outT = easeInOut(clamp01((progress - 0.92) / 0.05));
        const opacity = Math.max(0, 0.32 * inT * (1 - outT));
        const blur = lerp(14, 0, inT) + lerp(0, 14, outT);
        const y = lerp(28, 0, inT);
        const drift = easeInOut(clamp01((progress - 0.81) / 0.1));

        bridgeWords.forEach((word, index) => {
          const motion = bridgeMotion[index];
          gsap.set(word, {
            autoAlpha: opacity < 0.01 ? 0 : opacity,
            y,
            xPercent: motion.x * drift,
            yPercent: motion.y * drift,
            scale: lerp(0.86, motion.scale, inT) + (0.08 * outT),
            filter: `blur(${blur}px)`,
          });
        });
      };

      const renderFinalLogo = (progress) => {
        const logoIn = easeOut(clamp01((progress - 0.84) / 0.08));
        const fillIn = easeInOut(clamp01((progress - 0.88) / 0.09));
        const logoOut = easeInOut(clamp01((progress - 0.992) / 0.008));
        const opacity = Math.max(0, logoIn * (1 - logoOut));
        const centerInset = 50 - (fillIn * 50);
        const breathe = Math.sin(Date.now() * 0.001) * 0.008 * fillIn;

        gsap.set(finalLogo, {
          autoAlpha: opacity < 0.01 ? 0 : opacity,
          y: lerp(32, -4, logoIn) - (14 * logoOut),
          scale: lerp(0.86, 1.04, logoIn) + (0.05 * fillIn) + breathe,
          filter: `blur(${lerp(16, 0, logoIn) + lerp(0, 10, logoOut)}px)`,
        });
        gsap.set(finalLogoOutline, {
          autoAlpha: Math.max(0, opacity * (1 - (fillIn * 0.28))),
        });
        gsap.set(finalLogoFill, {
          autoAlpha: opacity * fillIn,
          clipPath: `inset(${centerInset}% ${centerInset}% ${centerInset}% ${centerInset}%)`,
        });
        gsap.set(finalLogoSweep, {
          autoAlpha: opacity * Math.sin(fillIn * Math.PI),
          xPercent: lerp(-120, 120, fillIn),
        });
      };

      let sectionVisible = true;
      sectionObserver = new IntersectionObserver(
        ([entry]) => {
          sectionVisible = entry.isIntersecting;
          if (sectionVisible) requestUpdate();
        },
        { rootMargin: '100px 0px' },
      );
      if (sceneRef.current) sectionObserver.observe(sceneRef.current);

      const update = () => {
        frameId = 0;

        if (!sceneRef.current || !sectionVisible) return;

        const rect = sceneRef.current.getBoundingClientRect();
        const range = Math.max(1, rect.height - window.innerHeight);
        const progress = clamp01(-rect.top / range);
        const washProgress = easeInOut(progress);
        const veinIn = easeOut(clamp01((progress - 0.08) / 0.16));
        const veinOut = easeInOut(clamp01((progress - 0.48) / 0.38));

        washConfigs.forEach((config) => {
          gsap.set(config.element, {
            scale: lerp(config.scale[0], config.scale[1], washProgress),
            xPercent: lerp(config.x[0], config.x[1], washProgress),
            yPercent: lerp(config.y[0], config.y[1], washProgress),
            rotate: lerp(config.rotate[0], config.rotate[1], washProgress),
            autoAlpha: lerp(config.opacity[0], config.opacity[1], washProgress),
          });
        });
        gsap.set(q('.sectionTwoWatercolor__veil'), {
          scale: lerp(1, 1.14, washProgress),
          autoAlpha: lerp(0.72, 0.46, easeInOut(clamp01((progress - 0.72) / 0.24))),
        });
        gsap.set(q('.sectionTwoWatercolor__depth'), {
          scale: lerp(1, 1.22, washProgress),
          autoAlpha: lerp(0.46, 0.62, 1 - Math.abs(progress - 0.58) * 1.2),
        });
        gsap.set(veins, {
          autoAlpha: 0.24 * veinIn * (1 - (0.68 * veinOut)),
          scaleX: lerp(0.72, 1, veinIn),
          xPercent: lerp(0, 8, washProgress),
        });

        moments.forEach((moment, index) => renderMoment(moment, momentConfigs[index], progress));
        renderBridge(progress);
        renderFinalLogo(progress);
      };

      requestUpdate = () => {
        if (frameId) return;
        frameId = window.requestAnimationFrame(update);
      };

      handleResize = () => {
        ScrollTrigger.refresh();
        requestUpdate();
        window.setTimeout(requestUpdate, 120);
      };

      update();

      handlePointerMove = (event) => {
        if (!logoTiltRef.current) return;

        const x = (event.clientX / window.innerWidth) - 0.5;
        const y = (event.clientY / window.innerHeight) - 0.5;

        gsap.to(logoTiltRef.current, {
          x: x * 22,
          y: y * 14,
          rotateY: x * 10,
          rotateX: y * -8,
          duration: 0.7,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        gsap.to(q('.sectionTwoFinalLogo__aura'), {
          xPercent: x * 14,
          yPercent: y * 10,
          scale: 1 + Math.abs(x) * 0.06,
          duration: 0.85,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };

      handlePointerLeave = () => {
        if (!logoTiltRef.current) return;

        gsap.to(logoTiltRef.current, {
          x: 0,
          y: 0,
          rotateY: 0,
          rotateX: 0,
          duration: 1.2,
          ease: 'elastic.out(1, 0.75)',
          overwrite: 'auto',
        });
        gsap.to(q('.sectionTwoFinalLogo__aura'), {
          xPercent: 0,
          yPercent: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      };

      refreshAfterHero = () => {
        handleResize();
        window.setTimeout(requestUpdate, 320);
      };

      window.addEventListener('scroll', requestUpdate, { passive: true });
      window.addEventListener('resize', handleResize);
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      window.addEventListener('pointerleave', handlePointerLeave);

      requestUpdate();
      if (heroScrollReady) refreshAfterHero();
      window.addEventListener('forlove:hero-scroll-ready', refreshAfterHero);
    }, sceneRef);

    return () => {
      if (refreshAfterHero) {
        window.removeEventListener('forlove:hero-scroll-ready', refreshAfterHero);
      }
      if (requestUpdate) {
        window.removeEventListener('scroll', requestUpdate);
      }
      if (handleResize) {
        window.removeEventListener('resize', handleResize);
      }
      if (handlePointerMove) {
        window.removeEventListener('pointermove', handlePointerMove);
      }
      if (handlePointerLeave) {
        window.removeEventListener('pointerleave', handlePointerLeave);
      }
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      if (sectionObserver) sectionObserver.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section className="sectionTwoScene" ref={sceneRef} aria-label="FORLOVE como experiencia">
      <div className="sectionTwoExperience">
        <WatercolorBackgroundLayer />

        <div className="sectionTwoSequence" aria-live="off">
          {sectionTwoMoments.map((moment, index) => (
            <TextSequenceBlock key={index} index={index} {...moment} />
          ))}
        </div>

        <div className="sectionTwoBridge" aria-hidden="true">
          <span className="sectionTwoBridge__word sectionTwoBridge__word--amor">amor</span>
          <span className="sectionTwoBridge__word sectionTwoBridge__word--humano">humano</span>
          <span className="sectionTwoBridge__word sectionTwoBridge__word--divino">divino</span>
          <span className="sectionTwoBridge__word sectionTwoBridge__word--desamor">desamor</span>
        </div>

        <div className="sectionTwoFinalLogo" aria-hidden="true">
          <span className="sectionTwoFinalLogo__aura" />
          <div className="sectionTwoFinalLogo__tilt" ref={logoTiltRef}>
            <span className="sectionTwoFinalLogo__outline" />
            <img className="sectionTwoFinalLogo__fill" src={forloveLogo} alt="" />
            <span className="sectionTwoFinalLogo__sweep" />
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionThreePlaceholder() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="sectionThreePlaceholder" ref={sectionRef} aria-label="Sección 3 pendiente">
      <p>Sección 3 — pendiente de conceptualización</p>
    </section>
  );
}

function App() {
  return (
    <main className="forloveExperience">
      <HeroSection />
      <SectionTwoExperience />
      <SectionThreePlaceholder />
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
