/**
 * High-performance Canvas Confetti & Ambient Doodle Particle System
 * Self-contained with zero external dependencies.
 */
class ConfettiEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animationId = null;
    this.ambientParticles = [];
    this.ambientCanvas = null;
    this.ambientCtx = null;
    this.ambientAnimationId = null;
    this.init();
  }

  init() {
    // Blast canvas
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'confetti-canvas';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100vw';
    this.canvas.style.height = '100vh';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '9999';
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    // Ambient floating canvas
    this.ambientCanvas = document.createElement('canvas');
    this.ambientCanvas.id = 'ambient-canvas';
    this.ambientCanvas.style.position = 'fixed';
    this.ambientCanvas.style.top = '0';
    this.ambientCanvas.style.left = '0';
    this.ambientCanvas.style.width = '100vw';
    this.ambientCanvas.style.height = '100vh';
    this.ambientCanvas.style.pointerEvents = 'none';
    this.ambientCanvas.style.zIndex = '1';
    document.body.appendChild(this.ambientCanvas);
    this.ambientCtx = this.ambientCanvas.getContext('2d');

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.startAmbient();
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (this.canvas) {
      this.canvas.width = w * dpr;
      this.canvas.height = h * dpr;
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    if (this.ambientCanvas) {
      this.ambientCanvas.width = w * dpr;
      this.ambientCanvas.height = h * dpr;
      this.ambientCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }

  // Draw heart shape
  drawHeart(ctx, x, y, size, color, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = color;
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(0, topCurveHeight);
    // top left curve
    ctx.bezierCurveTo(-size / 2, -topCurveHeight, -size, topCurveHeight / 2, 0, size);
    // top right curve
    ctx.bezierCurveTo(size, topCurveHeight / 2, size / 2, -topCurveHeight, 0, topCurveHeight);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // Draw 5-pointed star
  drawStar(ctx, x, y, r, color, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * r, -Math.sin((18 + i * 72) * Math.PI / 180) * r);
      ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * (r / 2), -Math.sin((54 + i * 72) * Math.PI / 180) * (r / 2));
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // Draw cute sparkle cross
  drawSparkle(ctx, x, y, r, color, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, -r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.quadraticCurveTo(0, 0, 0, r);
    ctx.quadraticCurveTo(0, 0, -r, 0);
    ctx.quadraticCurveTo(0, 0, 0, -r);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // Main confetti blast generator
  blast({
    particleCount = 60,
    spread = 70,
    origin = { x: 0.5, y: 0.5 },
    colors = ['#ff6584', '#ffd166', '#a78bfa', '#6ee7b7', '#f472b6', '#38bdf8', '#fbcfe8'],
    shapes = ['circle', 'square', 'heart', 'star'],
    scalar = 1
  } = {}) {
    const startX = origin.x * window.innerWidth;
    const startY = origin.y * window.innerHeight;

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI / 180) * (origin.angle !== undefined ? origin.angle + (Math.random() - 0.5) * spread : (Math.random() * 360));
      const velocity = 6 + Math.random() * 12;
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];

      this.particles.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * velocity * (0.8 + Math.random() * 0.4),
        vy: (Math.sin(angle) * velocity - (origin.y > 0.6 ? 7 : 2)) * (0.8 + Math.random() * 0.4),
        w: (8 + Math.random() * 8) * scalar,
        h: (8 + Math.random() * 8) * scalar,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        color: color,
        shape: shape,
        alpha: 1,
        decay: 0.008 + Math.random() * 0.012,
        gravity: 0.28
      });
    }

    if (!this.animationId) {
      this.animate();
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.985;
      p.rotation += p.rotationSpeed;
      p.alpha -= p.decay;

      if (p.alpha <= 0 || p.y > window.innerHeight + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);

      if (p.shape === 'heart') {
        this.drawHeart(this.ctx, p.x, p.y, p.w, p.color, (p.rotation * Math.PI) / 180);
      } else if (p.shape === 'star') {
        this.drawStar(this.ctx, p.x, p.y, p.w, p.color, (p.rotation * Math.PI) / 180);
      } else if (p.shape === 'circle') {
        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.w / 2, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        // Flat square / rectangle with 3D tumble flip
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }

      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animationId = requestAnimationFrame(() => this.animate());
    } else {
      this.animationId = null;
      this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  // Huge celebration double cannon blast
  celebrationBlast() {
    // Left cannon
    this.blast({
      particleCount: 50,
      spread: 60,
      origin: { x: 0.1, y: 0.7, angle: -45 },
      shapes: ['heart', 'star', 'circle', 'square']
    });
    // Right cannon
    this.blast({
      particleCount: 50,
      spread: 60,
      origin: { x: 0.9, y: 0.7, angle: -135 },
      shapes: ['heart', 'star', 'circle', 'square']
    });

    // Center sparkles shower
    setTimeout(() => {
      this.blast({
        particleCount: 80,
        spread: 120,
        origin: { x: 0.5, y: 0.4 },
        shapes: ['heart', 'star']
      });
    }, 250);
  }

  // Continuous ambient floating hearts and sparkles
  startAmbient() {
    const ambientColors = ['#ff8fa3', '#ffd166', '#c4b5fd', '#a7f3d0', '#fbcfe8'];
    const ambientShapes = ['heart', 'sparkle', 'star'];

    // Spawn initial pool
    for (let i = 0; i < 24; i++) {
      this.ambientParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vy: -(0.3 + Math.random() * 0.7),
        vx: (Math.random() - 0.5) * 0.4,
        size: 8 + Math.random() * 12,
        color: ambientColors[Math.floor(Math.random() * ambientColors.length)],
        shape: ambientShapes[Math.floor(Math.random() * ambientShapes.length)],
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        alpha: 0.2 + Math.random() * 0.45,
        baseAlpha: 0.2 + Math.random() * 0.45,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulse: Math.random() * Math.PI
      });
    }

    const animateAmbient = () => {
      this.ambientCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let p of this.ambientParticles) {
        p.y += p.vy;
        p.x += p.vx;
        p.angle += p.rotationSpeed;
        p.pulse += p.pulseSpeed;
        const currentAlpha = Math.max(0.05, p.baseAlpha + Math.sin(p.pulse) * 0.15);

        // Respawn when off screen
        if (p.y < -30) {
          p.y = window.innerHeight + 20;
          p.x = Math.random() * window.innerWidth;
        }
        if (p.x < -30) p.x = window.innerWidth + 20;
        if (p.x > window.innerWidth + 30) p.x = -20;

        this.ambientCtx.save();
        this.ambientCtx.globalAlpha = currentAlpha;

        if (p.shape === 'heart') {
          this.drawHeart(this.ambientCtx, p.x, p.y, p.size, p.color, p.angle);
        } else if (p.shape === 'star') {
          this.drawStar(this.ambientCtx, p.x, p.y, p.size, p.color, p.angle);
        } else {
          this.drawSparkle(this.ambientCtx, p.x, p.y, p.size, p.color, p.angle);
        }

        this.ambientCtx.restore();
      }

      this.ambientAnimationId = requestAnimationFrame(animateAmbient);
    };

    animateAmbient();
  }

  // Click/touch burst
  clickBurst(x, y) {
    this.blast({
      particleCount: 14,
      spread: 360,
      origin: { x: x / window.innerWidth, y: y / window.innerHeight },
      shapes: ['heart', 'star', 'circle'],
      scalar: 0.8
    });
  }
}

// Global instance & window.confetti helper for compatibility
document.addEventListener('DOMContentLoaded', () => {
  window.confettiEngine = new ConfettiEngine();
  window.confetti = (opts) => window.confettiEngine.blast(opts);
});

