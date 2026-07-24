import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';

import './Carousel.css';

export interface CarouselItem {
  id?: number | string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  tags?: string[];
  year?: string;
  role?: string;
  client?: string;
  status?: string;
  metric?: { value: string; label: string };
  arrowIcon?: React.ReactNode;
  logoUrl?: string;
  logoNode?: React.ReactNode;
  impact?: string[];
  category?: string;
}

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = {
  type: 'spring',
  stiffness: 250,
  damping: 28,
  mass: 0.8,
};

const ICON_SLUG_MAP: Record<string, string> = {
  'typescript': 'typescript',
  'node.js': 'nodedotjs',
  'python': 'python',
  'fastapi': 'fastapi',
  'docker': 'docker',
  'react': 'react',
  'tailwind css': 'tailwindcss',
  'prisma': 'prisma',
  'github actions': 'githubactions',
  'github copilot': 'githubcopilot',
  'openai': 'openai',
  'anthropic': 'anthropic',
  'vercel': 'vercel',
  'render': 'render',
  'langgraph': 'langchain',
  'langchain': 'langchain',
};

const DEFAULT_ITEMS: CarouselItem[] = [];

function CarouselItemComponent({ item, index, itemWidth, round, trackItemOffset, x, transition }: {
  item: CarouselItem; index: number; itemWidth: number; round: boolean;
  trackItemOffset: number; x: ReturnType<typeof useMotionValue>; transition: object;
}) {
  const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
  const outputRange = [90, 0, -90];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  return (
    <motion.div
      key={`${item?.id ?? index}-${index}`}
      className={`carousel-item ${round ? 'round' : ''}`}
      style={{
        width: itemWidth,
        height: round ? itemWidth : '100%',
        rotateY: rotateY,
        ...(round && { borderRadius: '50%' })
      }}
      transition={transition}
    >
      <Link to={`/projects/${item.id}`} style={{ textDecoration: 'none', color: 'inherit', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className={`carousel-item-header ${round ? 'round' : ''}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            {item.icon && <span className="carousel-icon-container">{item.icon}</span>}
            {item.year && <span style={{ fontSize: '12px', color: 'var(--ink-soft)', fontWeight: 500 }}>{item.year}</span>}
          </div>
          
          <div className="carousel-item-content" style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              {item.category && <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>{item.category}</span>}
              <div className="carousel-item-title">{item.title}</div>
              <p className="carousel-item-description" style={{ maxWidth: '80%' }}>{item.description}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px', color: 'var(--ink-soft)' }}>
              {item.role && (
                <div><strong style={{ display: 'block', color: 'var(--muted)', fontSize: '10px', textTransform: 'uppercase' }}>Role</strong>{item.role}</div>
              )}
              {item.client && (
                <div><strong style={{ display: 'block', color: 'var(--muted)', fontSize: '10px', textTransform: 'uppercase' }}>Client</strong>{item.client}</div>
              )}
              {item.metric && (
                <div style={{ gridColumn: 'span 2' }}><strong style={{ display: 'block', color: 'var(--muted)', fontSize: '10px', textTransform: 'uppercase' }}>{item.metric.label}</strong>{item.metric.value}</div>
              )}
            </div>

            {item.tags && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', maxWidth: '85%' }}>
                {item.tags.slice(0, 4).map((tag, i) => {
                  const slug = ICON_SLUG_MAP[tag.toLowerCase()];
                  const iconUrl = slug ? `https://cdn.simpleicons.org/${slug}/8a8a8a` : null;
                  return (
                    <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', padding: '4px 8px', background: 'var(--terminal)', color: 'var(--terminal-text)', borderRadius: '4px', fontWeight: 500, whiteSpace: 'nowrap' }}>
                      {iconUrl && <img src={iconUrl} alt="" style={{ width: '12px', height: '12px' }} />}
                      {tag}
                    </span>
                  );
                })}
              </div>
            )}
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 600, fontSize: '14px', marginTop: 'auto' }}>
              View Project
              {item.arrowIcon}
            </div>
          </div>
        </div>

        {(item.logoNode || item.logoUrl) && (
          <div className="carousel-logo-circle">
            {item.logoNode ? (
              <div style={{ width: '80%', height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.logoNode}
              </div>
            ) : (
              <img src={item.logoUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            )}
          </div>
        )}
      </Link>
    </motion.div>
  );
}

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false
}) {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;
  const itemsForRender = useMemo(() => {
    if (!loop) return items;
    if (items.length === 0) return [];
    return [items[items.length - 1], ...items, items[0]];
  }, [items, loop]);

  const [position, setPosition] = useState(loop ? 1 : 0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    
    // Mobile / touch interactions
    const handlePointerDown = () => setIsInteracting(true);
    const handlePointerUp = () => setIsInteracting(false);

    if (pauseOnHover) {
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }
    
    container.addEventListener('touchstart', handlePointerDown, { passive: true });
    container.addEventListener('touchend', handlePointerUp);
    container.addEventListener('mousedown', handlePointerDown);
    container.addEventListener('mouseup', handlePointerUp);
    
    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchstart', handlePointerDown);
      container.removeEventListener('touchend', handlePointerUp);
      container.removeEventListener('mousedown', handlePointerDown);
      container.removeEventListener('mouseup', handlePointerUp);
    };
  }, [pauseOnHover]);

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return undefined;
    if ((pauseOnHover && isHovered) || isInteracting) return undefined;

    // Timer restarts fresh from the exact moment interaction ends
    const timer = setInterval(() => {
      setPosition(prev => Math.min(prev + 1, itemsForRender.length - 1));
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, isInteracting, pauseOnHover, itemsForRender.length]);

  useEffect(() => {
    const startingPosition = loop ? 1 : 0;
    setPosition(startingPosition);
    x.set(-startingPosition * trackItemOffset);
  }, [items.length, loop, trackItemOffset, x]);

  useEffect(() => {
    if (!loop && position > itemsForRender.length - 1) {
      setPosition(Math.max(0, itemsForRender.length - 1));
    }
  }, [itemsForRender.length, loop, position]);

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationStart = () => {
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) {
      setIsAnimating(false);
      return;
    }
    const lastCloneIndex = itemsForRender.length - 1;

    if (position === lastCloneIndex) {
      setIsJumping(true);
      const target = 1;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    if (position === 0) {
      setIsJumping(true);
      const target = items.length;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    setIsAnimating(false);
  };

  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number }; velocity: { x: number } }) => {
    const { offset, velocity } = info;
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0;

    if (direction === 0) return;

    setPosition(prev => {
      const next = prev + direction;
      const max = itemsForRender.length - 1;
      return Math.max(0, Math.min(next, max));
    });
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
          right: 0
        }
      };

  const activeIndex =
    items.length === 0 ? 0 : loop ? (position - 1 + items.length) % items.length : Math.min(position, items.length - 1);

  return (
    <div
      ref={containerRef}
      className={`carousel-container ${round ? 'round' : ''}`}
      style={{
        width: `${baseWidth}px`,
        ...(round && { height: `${baseWidth}px`, borderRadius: '50%' })
      }}
    >
      <motion.div
        className="carousel-track"
        drag={isAnimating ? false : 'x'}
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
          x
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(position * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationStart={handleAnimationStart}
        onAnimationComplete={handleAnimationComplete}
      >
        {itemsForRender.map((item, index) => (
          <CarouselItemComponent
            key={`${item?.id ?? index}-${index}`}
            item={item}
            index={index}
            itemWidth={itemWidth}
            round={round}
            trackItemOffset={trackItemOffset}
            x={x}
            transition={effectiveTransition}
          />
        ))}
      </motion.div>
      <div className={`carousel-indicators-container ${round ? 'round' : ''}`}>
        <div className="carousel-indicators">
          {items.map((_, index) => (
            <motion.button
              type="button"
              key={index}
              className={`carousel-indicator ${activeIndex === index ? 'active' : 'inactive'}`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeIndex === index}
              animate={{
                scale: activeIndex === index ? 1.2 : 1
              }}
              onClick={() => setPosition(loop ? index + 1 : index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
      {autoplay && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'var(--line)', zIndex: 10 }}>
          <motion.div
            key={`${position}-${isInteracting}-${isHovered}`}
            initial={{ width: '0%' }}
            animate={{ width: (isInteracting || (pauseOnHover && isHovered)) ? '0%' : '100%' }}
            transition={{ 
              duration: (isInteracting || (pauseOnHover && isHovered)) ? 0.3 : (autoplayDelay / 1000), 
              ease: 'linear' 
            }}
            style={{ height: '100%', background: 'var(--primary)' }}
          />
        </div>
      )}
    </div>
  );
}
