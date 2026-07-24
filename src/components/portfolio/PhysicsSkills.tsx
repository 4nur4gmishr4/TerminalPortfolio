import React, { useEffect, useRef } from 'react';
import * as Matter from 'matter-js';
import { portfolioData } from '@/types/portfolio';

// Flatten the skills to get all individual strings
const allSkills = portfolioData.skills.flatMap(group => group.skills);

export const PhysicsSkills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Events = Matter.Events;

    const engine = Engine.create();
    const world = engine.world;
    engine.gravity.y = 0.5;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const render = Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width,
        height,
        background: 'transparent',
        wireframes: false,
        pixelRatio: window.devicePixelRatio || 1,
      }
    });

    const ground = Bodies.rectangle(width / 2, height + 25, width, 50, { isStatic: true, render: { visible: false } });
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, { isStatic: true, render: { visible: false } });
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, { isStatic: true, render: { visible: false } });
    const roof = Bodies.rectangle(width / 2, -500, width * 2, 50, { isStatic: true, render: { visible: false } });

    World.add(world, [ground, leftWall, rightWall, roof]);

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Add physics bodies for skills
    const skillBodies = allSkills.map((skill) => {
      ctx.font = '14px "Inter", sans-serif';
      const textMetrics = ctx.measureText(skill);
      const w = textMetrics.width + 40; // Horizontal padding
      const h = 40; // Fixed height
      
      const x = Math.random() * (width - w) + w/2;
      const y = -Math.random() * 1000 - 50; // Drop from above

      const body = Bodies.rectangle(x, y, w, h, {
        chamfer: { radius: h / 2 },
        restitution: 0.6,
        friction: 0.2,
        frictionAir: 0.02,
        render: {
          visible: false 
        },
        label: skill 
      });
      // Store custom dimensions for rendering
      (body as any).customWidth = w;
      (body as any).customHeight = h;
      
      return body;
    });

    World.add(world, skillBodies);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });

    World.add(world, mouseConstraint);
    render.mouse = mouse;

    Events.on(render, 'afterRender', () => {
      const context = render.context;
      const bodies = Matter.Composite.allBodies(engine.world);

      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.font = '500 14px "Inter", sans-serif';

      bodies.forEach((body) => {
        if (!body.label || body.label === 'Rectangle Body') return;

        const { x, y } = body.position;
        const w = (body as any).customWidth;
        const h = (body as any).customHeight;

        if (!w || !h) return;

        context.save();
        context.translate(x, y);
        context.rotate(body.angle);

        context.beginPath();
        const r = h / 2;
        context.moveTo(-w/2 + r, -h/2);
        context.lineTo(w/2 - r, -h/2);
        context.quadraticCurveTo(w/2, -h/2, w/2, -h/2 + r);
        context.lineTo(w/2, h/2 - r);
        context.quadraticCurveTo(w/2, h/2, w/2 - r, h/2);
        context.lineTo(-w/2 + r, h/2);
        context.quadraticCurveTo(-w/2, h/2, -w/2, h/2 - r);
        context.lineTo(-w/2, -h/2 + r);
        context.quadraticCurveTo(-w/2, -h/2, -w/2 + r, -h/2);
        context.closePath();
        
        // Fill gradient
        const grad = context.createLinearGradient(0, -h/2, 0, h/2);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0.01)');
        context.fillStyle = grad;
        context.fill();

        // Stroke
        context.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        context.lineWidth = 1;
        context.stroke();
        
        // Text
        context.fillStyle = '#e2e8f0'; // slate-200
        context.fillText(body.label, 0, 1);

        context.restore();
      });
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    const handleResize = () => {
      if (!containerRef.current || !render.canvas) return;
      const newWidth = containerRef.current.clientWidth;
      render.canvas.width = newWidth;
      render.options.width = newWidth;
      Matter.Body.setPosition(rightWall, { x: newWidth + 25, y: height / 2 });
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: height + 25 });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      World.clear(world, false);
      if (render.canvas) {
        render.canvas.remove();
      }
      render.canvas = null as any;
      render.context = null as any;
      render.textures = {};
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[500px] relative overflow-hidden rounded-3xl border border-white/10 bg-black/20 backdrop-blur-xl shadow-2xl"
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" 
      />
    </div>
  );
};

export default PhysicsSkills;
