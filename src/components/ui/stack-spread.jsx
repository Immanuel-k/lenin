"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
} from "motion/react";

// 8 Glassy Finish High-Resolution Images relating to Real Estate & Mobility Marketplace
const IMG_BASE = "https://images.unsplash.com";

const IMG = {
  // 1. Glass Sunlit Luxury Apartment Interior
  plane: `${IMG_BASE}/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80`,
  // 2. Glass Reflection Luxury Sports SUV / Car
  painting: `${IMG_BASE}/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80`,
  // 3. Sleek Mobility Electric EV Scooter
  breaker: `${IMG_BASE}/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80`,
  // 4. Waterfront Glass Residence / Bachelor PG Hub
  dog: `${IMG_BASE}/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80`,
  // 5. Glassy Penthouse Balcony & Living
  footballer: `${IMG_BASE}/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80`,
  // 6. Modern Glass Mansion Facade
  jacket: `${IMG_BASE}/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80`,
  // 7. Ultra-Modern Glass Villa
  meadow: `${IMG_BASE}/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80`,
  // 8. Glass Architectural High-Rise Skyscraper
  stripes: `${IMG_BASE}/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80`,
};

// per-image rest scale, keyed by img index (1-8). default 1, drop below to shrink.
const SCALE = {
  1: 0.9,
  2: 0.8,
  3: 0.9,
  4: 0.8,
  5: 0.8,
  6: 0.9,
  7: 0.9,
  8: 0.7,
};
const s = (i) => SCALE[i] ?? 1;

// array order = stack order, back (z 2) -> front (z 9)
const CARDS = [
  // top-left stripes (img08) — Glass High-Rise Skyscraper
  {
    item: { src: IMG.stripes, alt: "Glass Architectural High-Rise Apartment", badge: "High-Rise Flat" },
    stackOffset: { x: -8, y: -10 },
    stackRotate: -18,
    target: { x: -20, y: -34, rotate: 0, scale: s(8), w: 17, h: 22 },
    targetSm: { x: -22, y: -40 },
    z: 2,
  },
  // top-right meadow (img07) — Ultra-Modern Glass Villa
  {
    item: { src: IMG.meadow, alt: "Ultra-Modern Glass Villa", badge: "Luxury Villa" },
    stackOffset: { x: 14, y: -10 },
    stackRotate: 20,
    target: { x: 32, y: -30, rotate: 0, scale: s(7), w: 18, h: 32 },
    targetSm: { x: 22, y: -40 },
    z: 3,
  },
  // mid-left jacket (img06) — Glass Mansion Facade
  {
    item: { src: IMG.jacket, alt: "Modern Glass Mansion Facade", badge: "Glass Mansion" },
    stackOffset: { x: -16, y: 0 },
    stackRotate: -4,
    target: { x: -36, y: -2, rotate: 0, scale: s(6), w: 15, h: 32 },
    targetSm: { x: -22, y: -19 },
    z: 4,
  },
  // top-centre footballer (img05) — Glass Penthouse Balcony
  {
    item: { src: IMG.footballer, alt: "Glass Penthouse Balcony & Living", badge: "Penthouse Suite" },
    stackOffset: { x: 1, y: -10 },
    stackRotate: -2,
    target: { x: 6, y: -32, rotate: 0, scale: s(5), w: 25, h: 30 },
    targetSm: { x: 22, y: -19 },
    z: 5,
  },
  // mid-right dog (img04) — Waterfront Glass Residence
  {
    item: { src: IMG.dog, alt: "Waterfront Glass Residence & PG", badge: "Bachelors PG Hub" },
    stackOffset: { x: 18, y: 1 },
    stackRotate: 6,
    target: { x: 37, y: 6, rotate: 0, scale: s(4), w: 18, h: 32 },
    targetSm: { x: -22, y: 20 },
    z: 6,
  },
  // bottom-left breaker (img03) — Electric EV Scooter
  {
    item: { src: IMG.breaker, alt: "Electric EV Scooter", badge: "EV Bike Mobility" },
    stackOffset: { x: -6, y: 10 },
    stackRotate: 6,
    target: { x: -24, y: 34, rotate: 0, scale: s(3), w: 22, h: 25 },
    targetSm: { x: 22, y: 20 },
    z: 7,
  },
  // bottom-centre painting (img02) — Luxury Sports SUV
  {
    item: { src: IMG.painting, alt: "Glass Reflection Luxury Sports SUV", badge: "Luxury SUV Car" },
    stackOffset: { x: 8, y: 7 },
    stackRotate: 3,
    target: { x: 2, y: 36, rotate: 0, scale: s(2), w: 20, h: 26 },
    targetSm: { x: -22, y: 40 },
    z: 8,
  },
  // bottom-right plane (img01) — Sunlit Luxury Interior
  {
    item: { src: IMG.plane, alt: "Glass Sunlit Modern Apartment Interior", badge: "Sunlit Interior" },
    stackOffset: { x: 20, y: 12 },
    stackRotate: -7,
    target: { x: 30, y: 34, rotate: 0, scale: s(1), w: 16, h: 20 },
    targetSm: { x: 22, y: 40 },
    z: 9,
  },
];

// ---------------------------------------------------------------------------
// Mechanism
// ---------------------------------------------------------------------------

const SCATTER_START = 0.12;
const SCATTER_END = 0.9;

const PARALLAX_X = 2.6;
const PARALLAX_Y = 2.2;
const PARALLAX_SPRING = { stiffness: 90, damping: 22, mass: 0.6 };
const parallaxDepth = (i, total) =>
  total <= 1 ? 1 : 0.55 + (i / (total - 1)) * 0.75;

const SUB = "Discover verified luxury apartments, glass villas, bachelor accommodations, bikes, and cars with 0% brokerage.";

const RESPONSIVE = {
  desktop: {
    scale: null,
    small: false,
    colX: null,
    card: null,
  },
  small: {
    scale: 0.72,
    small: true,
    colX: 22,
    card: { w: 40, h: 20 },
  },
};

function useResponsive() {
  const [r, setR] = useState(RESPONSIVE.desktop);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const read = () => setR(mq.matches ? RESPONSIVE.small : RESPONSIVE.desktop);
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);
  return r;
}

function usePointerParallax(active, enabled) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, PARALLAX_SPRING);
  const y = useSpring(rawY, PARALLAX_SPRING);

  useEffect(() => {
    if (!enabled) return;

    if (!active) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const onMove = (event) => {
      rawX.set((event.clientX / window.innerWidth) * 2 - 1);
      rawY.set((event.clientY / window.innerHeight) * 2 - 1);
    };
    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [active, enabled, rawX, rawY]);

  return { x, y };
}

function Card({
  card,
  progress,
  reduce,
  clusterRotation,
  scaleMul,
  isSmall,
  colX,
  fixedCard,
  stackScale,
  cardRadius,
  pointer,
  depth,
}) {
  const { item, target } = card;

  const flat = reduce === true;
  const stackRotate = flat ? 0 : clusterRotation ? card.stackRotate ?? 0 : 0;
  const stackOffset = card.stackOffset ?? { x: 0, y: 0 };
  const restScale = scaleMul ?? target.scale ?? 1;

  const sm = isSmall && card.targetSm ? card.targetSm : null;
  const endX = sm
    ? colX != null
      ? Math.sign(sm.x) * colX
      : sm.x
    : target.x;
  const endY = sm ? sm.y : target.y;
  const endRotate = flat || isSmall ? 0 : target.rotate;

  const translate = useTransform(
    [progress, pointer.x, pointer.y],
    ([p, px, py]) => {
      const tx = stackOffset.x + (endX - stackOffset.x) * p;
      const ty = stackOffset.y + (endY - stackOffset.y) * p;
      const drift = depth * p;
      const dx = tx - px * PARALLAX_X * drift;
      const dy = ty - py * PARALLAX_Y * drift;
      return `calc(-50% + ${dx}vw) calc(-50% + ${dy}vh)`;
    },
  );
  const rotate = useTransform(progress, [0, 1], [stackRotate, endRotate]);
  const scale = useTransform(progress, [0, 1], [stackScale, restScale]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 will-change-transform"
      style={{
        width: `${fixedCard ? fixedCard.w : target.w}vw`,
        height: `${fixedCard ? fixedCard.h : target.h}vh`,
        zIndex: card.z ?? 1,
        translate,
        rotate,
        scale,
      }}
    >
      <CardFace item={item} cardRadius={cardRadius} />
    </motion.div>
  );
}

function CardFace({ item, cardRadius }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden max-md:rounded-[4vw] shadow-2xl border border-white/30 backdrop-blur-md group transition-all duration-300 hover:scale-105"
      style={{ borderRadius: `${cardRadius}px` }}
    >
      <img
        src={item.src}
        alt={item.alt ?? ""}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {/* Glass Glossy Overlay & Specular Highlight */}
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/50 via-transparent to-white/20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.4)_0%,transparent_60%)] pointer-events-none" />
      
      {/* Glass Badge Label */}
      {item.badge && (
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-lg">
          {item.badge}
        </div>
      )}
    </div>
  );
}

function StackSpreadStage({
  cards,
  scrollLength = 350,
  bgColor = "#0f172a", // Sleek dark slate glassy theme matching Lenin Tech
  clusterRotation = true,
  stackScale = 0.82,
  cardRadius = 14,
  textColor = "#ffffff",
  textFadeStart = 0.3,
  showScrollHint = true,
  titleText = "Real Estate & Mobility\nThat Inspires.",
  subtitleText = SUB,
}) {
  const wrapRef = useRef(null);
  const reduce = useReducedMotion();
  const { scale: scaleMul, small: isSmall, colX, card: fixedCard } =
    useResponsive();

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const progress = useTransform(
    scrollYProgress,
    [0, SCATTER_START, SCATTER_END, 1],
    [0, 0, 1, 1],
  );

  const [spread, setSpread] = useState(false);
  useMotionValueEvent(progress, "change", (p) => {
    setSpread((was) => (was ? p > 0.985 : p >= 0.999));
  });
  const parallaxEnabled = reduce !== true && !isSmall;
  const pointer = usePointerParallax(spread, parallaxEnabled);

  const noScale = reduce === true;
  const copyOpacity = useTransform(progress, [textFadeStart, textFadeStart + 0.35], [0, 1]);
  const copyScale = useTransform(progress, [textFadeStart, 0.9], [0.85, 1]);

  const hintOpacity = useTransform(progress, [0, SCATTER_START], [1, 0]);

  return (
    <section
      ref={wrapRef}
      className="relative w-full border-t border-b border-slate-800"
      style={{ height: `${scrollLength}vh`, backgroundColor: bgColor }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* centre text */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[5] flex flex-col items-center justify-center px-6 text-center max-md:px-8"
          style={{
            opacity: copyOpacity,
            scale: noScale ? 1 : copyScale,
          }}
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-400 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
            <span>Lenin Real Estate & Mobility Portfolio</span>
          </div>
          <h2
            className="w-full whitespace-pre-line text-[4.2vw] font-black leading-tight tracking-tight max-md:text-[8.5vw]"
            style={{ color: textColor }}
          >
            {titleText.split('\n').map((line, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <br />}
                {line.includes('Inspires') ? (
                  <>
                    {line.replace('Inspires.', '')}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-brand-500 to-amber-400">
                      Inspires.
                    </span>
                  </>
                ) : (
                  line
                )}
              </React.Fragment>
            ))}
          </h2>
          <p
            className="mt-[1.2vw] w-full max-w-[46ch] text-[1.15vw] leading-relaxed tracking-tight max-md:mt-3 max-md:text-[3.6vw] font-medium"
            style={{ color: textColor, opacity: 0.7 }}
          >
            {subtitleText}
          </p>
        </motion.div>

        {/* scattering cards */}
        <div className="absolute inset-0 z-10">
          {cards.map((card, i) => (
            <Card
              key={i}
              card={card}
              progress={progress}
              reduce={reduce}
              clusterRotation={clusterRotation}
              scaleMul={scaleMul}
              isSmall={isSmall}
              colX={colX}
              fixedCard={fixedCard}
              stackScale={stackScale}
              cardRadius={cardRadius}
              pointer={pointer}
              depth={parallaxEnabled ? parallaxDepth(i, cards.length) : 0}
            />
          ))}
        </div>

        {/* scroll hint */}
        {showScrollHint && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-[4vh] z-20 flex flex-col items-center gap-[0.6vh] text-[0.8vw] font-bold uppercase tracking-[0.25em] max-md:bottom-6 max-md:gap-1 max-md:text-[2.8vw] text-slate-300"
            style={{ opacity: hintOpacity }}
          >
            <span>Scroll to Spread Showcase</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FF5A36"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-bounce max-md:h-[4vw] max-md:w-[4vw]"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default function StackSpread({
  scrollLength = 320,
  bgColor = "#0b0f19",
  clusterRotation = true,
  stackScale = 0.82,
  cardRadius = 14,
  textColor = "#ffffff",
  textFadeStart = 0.25,
  showScrollHint = true,
  titleText = "Real Estate & Mobility\nThat Inspires.",
  subtitleText = SUB,
}) {
  return (
    <StackSpreadStage
      cards={CARDS}
      scrollLength={scrollLength}
      bgColor={bgColor}
      clusterRotation={clusterRotation}
      stackScale={stackScale}
      cardRadius={cardRadius}
      textColor={textColor}
      textFadeStart={textFadeStart}
      showScrollHint={showScrollHint}
      titleText={titleText}
      subtitleText={subtitleText}
    />
  );
}
