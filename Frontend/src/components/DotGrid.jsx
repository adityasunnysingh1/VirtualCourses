import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function DotGrid({
  gridSize = 25,     // Distance between dots
  dotSize = 4,       // Size of the dots
  force = 80,        // How hard the dots push away
  range = 150,       // How far the mouse affects dots
  color = "#374151"  // Dark Gray color (Tailwind gray-700)
}) {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear previous dots if any
    container.innerHTML = '';

    // Calculate columns and rows
    const cols = Math.floor(window.innerWidth / gridSize);
    const rows = Math.floor(window.innerHeight / gridSize);
    const totalDots = cols * rows;

    // Create dots
    const dots = [];
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot';
      
      // Styling
      dot.style.width = `${dotSize}px`;
      dot.style.height = `${dotSize}px`;
      dot.style.backgroundColor = color;
      dot.style.position = 'absolute';
      dot.style.borderRadius = '50%';
      
      // Position
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = col * gridSize + (gridSize / 2);
      const y = row * gridSize + (gridSize / 2);
      
      // Store original coordinates for elasticity
      dot.dataset.ox = x;
      dot.dataset.oy = y;
      
      gsap.set(dot, { x, y });
      container.appendChild(dot);
      dots.push(dot);
    }

    // Mouse interaction
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      dots.forEach((dot) => {
        const ox = parseFloat(dot.dataset.ox);
        const oy = parseFloat(dot.dataset.oy);
        
        // Calculate distance between mouse and dot
        const dx = clientX - ox;
        const dy = clientY - oy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < range) {
          // Calculate angle and force
          const angle = Math.atan2(dy, dx);
          const strength = (range - dist) / range; // Stronger when closer
          
          // Move dot away from mouse
          const moveX = Math.cos(angle) * strength * -force;
          const moveY = Math.sin(angle) * strength * -force;
          
          gsap.to(dot, {
            x: ox + moveX,
            y: oy + moveY,
            duration: 0.3,
            ease: "power2.out"
          });
        } else {
          // Return to original position if mouse is far
          gsap.to(dot, {
            x: ox,
            y: oy,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      container.innerHTML = '';
    };
  }, [gridSize, dotSize, force, range, color]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative overflow-hidden bg-white" 
    />
  );
}