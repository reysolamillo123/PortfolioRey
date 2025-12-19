import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2
};

const toCssLength = (value) => 
  typeof value === 'number' ? `${value}px` : (value ?? undefined);

const cx = (...parts) => parts.filter(Boolean).join(' ');

export const LogoLoop = React.memo(({
  logos,
  speed = 120,
  direction = 'left',
  width = '100%',
  logoHeight = 28,
  gap = 32,
  pauseOnHover,
  hoverSpeed,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  renderItem,
  ariaLabel = 'Partner logos',
  className,
  style
}) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const seqRef = useRef(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [seqHeight, setSeqHeight] = useState(0);
  const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed;
    if (pauseOnHover === true) return 0;
    if (pauseOnHover === false) return undefined;
    return 0;
  }, [hoverSpeed, pauseOnHover]);

  const isVertical = direction === 'up' || direction === 'down';

  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed);
    let directionMultiplier;
    if (isVertical) {
      directionMultiplier = direction === 'up' ? 1 : -1;
    } else {
      directionMultiplier = direction === 'left' ? 1 : -1;
    }
    const speedMultiplier = speed < 0 ? -1 : 1;
    return magnitude * directionMultiplier * speedMultiplier;
  }, [speed, direction, isVertical]);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const sequenceRect = seqRef.current?.getBoundingClientRect?.();
    const sequenceWidth = sequenceRect?.width ?? 0;
    const sequenceHeight = sequenceRect?.height ?? 0;
    
    if (isVertical) {
      const parentHeight = containerRef.current?.parentElement?.clientHeight ?? 0;
      if (containerRef.current && parentHeight > 0) {
        const targetHeight = Math.ceil(parentHeight);
        if (containerRef.current.style.height !== `${targetHeight}px`)
          containerRef.current.style.height = `${targetHeight}px`;
      }
      if (sequenceHeight > 0) {
        setSeqHeight(Math.ceil(sequenceHeight));
        const viewport = containerRef.current?.clientHeight ?? parentHeight ?? sequenceHeight;
        const copiesNeeded = Math.ceil(viewport / sequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM;
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
      }
    } else if (sequenceWidth > 0) {
      setSeqWidth(Math.ceil(sequenceWidth));
      const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
    }
  }, [isVertical]);

  useEffect(() => {
    const handleResize = () => updateDimensions();
    window.addEventListener('resize', handleResize);
    updateDimensions();
    return () => window.removeEventListener('resize', handleResize);
  }, [updateDimensions, logos, gap, logoHeight]);

  const rafRef = useRef(null);
  const lastTimestampRef = useRef(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const seqSize = isVertical ? seqHeight : seqWidth;

    if (seqSize > 0) {
      offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
      const transformValue = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`;
      track.style.transform = transformValue;
    }

    const animate = (timestamp) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const target = isHovered && effectiveHoverSpeed !== undefined ? effectiveHoverSpeed : targetVelocity;

      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (seqSize > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
        nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize;
        offsetRef.current = nextOffset;

        const transformValue = isVertical
          ? `translate3d(0, ${-offsetRef.current}px, 0)`
          : `translate3d(${-offsetRef.current}px, 0, 0)`;
        track.style.transform = transformValue;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical]);

  const renderLogoItem = useCallback((item, key) => {
    if (renderItem) {
      return (
        <li key={key} style={{ fontSize: `${logoHeight}px`, marginRight: isVertical ? 0 : `${gap}px`, marginBottom: isVertical ? `${gap}px` : 0 }}>
          {renderItem(item, key)}
        </li>
      );
    }

    const isNodeItem = 'node' in item;

    const content = isNodeItem ? (
      <span style={{ display: 'inline-flex', alignItems: 'center', transition: scaleOnHover ? 'transform 0.3s' : 'none' }}>
        {item.node}
      </span>
    ) : (
      <img
        src={item.src}
        alt={item.alt ?? ''}
        title={item.title}
        style={{ height: `${logoHeight}px`, width: 'auto', display: 'block', objectFit: 'contain', transition: scaleOnHover ? 'transform 0.3s' : 'none' }}
        loading="lazy"
        draggable={false}
      />
    );

    const inner = item.href ? (
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer noopener"
        style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', transition: 'opacity 0.2s', color: 'inherit' }}
        onMouseEnter={(e) => scaleOnHover && (e.currentTarget.querySelector('span, img').style.transform = 'scale(1.2)')}
        onMouseLeave={(e) => scaleOnHover && (e.currentTarget.querySelector('span, img').style.transform = 'scale(1)')}
      >
        {content}
      </a>
    ) : content;

    return (
      <li key={key} style={{ flexShrink: 0, fontSize: `${logoHeight}px`, lineHeight: 1, marginRight: isVertical ? 0 : `${gap}px`, marginBottom: isVertical ? `${gap}px` : 0 }}>
        {inner}
      </li>
    );
  }, [logoHeight, gap, isVertical, scaleOnHover, renderItem]);

  const logoLists = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, copyIndex) => (
        <ul
          key={`copy-${copyIndex}`}
          ref={copyIndex === 0 ? seqRef : undefined}
          style={{ display: 'flex', flexDirection: isVertical ? 'column' : 'row', alignItems: 'center', listStyle: 'none', margin: 0, padding: 0 }}
        >
          {logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
        </ul>
      )),
    [copyCount, logos, renderLogoItem, isVertical]
  );

  return (
    <div 
      ref={containerRef} 
      className={className}
      style={{
        position: 'relative',
        width: toCssLength(width) ?? '100%',
        overflow: isVertical ? 'hidden' : 'hidden',
        height: isVertical ? '100%' : 'auto',
        ...style
      }}
    >
      {fadeOut && (
        <>
          {isVertical ? (
            <>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '80px', background: `linear-gradient(to bottom, ${fadeOutColor || '#1a0508'} 0%, transparent 100%)`, pointerEvents: 'none', zIndex: 10 }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: `linear-gradient(to top, ${fadeOutColor || '#1a0508'} 0%, transparent 100%)`, pointerEvents: 'none', zIndex: 10 }} />
            </>
          ) : (
            <>
              <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '80px', background: `linear-gradient(to right, ${fadeOutColor || '#1a0508'} 0%, transparent 100%)`, pointerEvents: 'none', zIndex: 10 }} />
              <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '80px', background: `linear-gradient(to left, ${fadeOutColor || '#1a0508'} 0%, transparent 100%)`, pointerEvents: 'none', zIndex: 10 }} />
            </>
          )}
        </>
      )}

      <div
        ref={trackRef}
        style={{
          display: 'flex',
          flexDirection: isVertical ? 'column' : 'row',
          width: isVertical ? '100%' : 'max-content',
          height: isVertical ? 'max-content' : 'auto',
          willChange: 'transform',
          userSelect: 'none',
          position: 'relative',
          zIndex: 0
        }}
        onMouseEnter={() => effectiveHoverSpeed !== undefined && setIsHovered(true)}
        onMouseLeave={() => effectiveHoverSpeed !== undefined && setIsHovered(false)}
      >
        {logoLists}
      </div>
    </div>
  );
});

LogoLoop.displayName = 'LogoLoop';

export default LogoLoop;
