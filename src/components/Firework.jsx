import React, { useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import "./Firework.css";

const Firework = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Fullscreen dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Variables for fireworks
    const fireworks = [];
    const particles = [];
    let hue = 50;

    function random(min, max) {
      return Math.random() * (max - min) + min;
    }

    function calculateDistance(p1x, p1y, p2x, p2y) {
      const xDistance = p1x - p2x;
      const yDistance = p1y - p2y;
      return Math.sqrt(xDistance ** 2 + yDistance ** 2);
    }

    function Firework(sx, sy, tx, ty) {
      this.x = sx;
      this.y = sy;
      this.sx = sx;
      this.sy = sy;
      this.tx = tx;
      this.ty = ty;
      this.distanceToTarget = calculateDistance(sx, sy, tx, ty);
      this.distanceTraveled = 0;
      this.coordinates = Array.from({ length: 3 }).fill([sx, sy]);
      this.angle = Math.atan2(ty - sy, tx - sx);
      this.speed = 2;
      this.acceleration = 1.05;
      this.brightness = random(70, 90);
      this.targetRadius = 1;
    }

    Firework.prototype.update = function (index) {
      this.coordinates.pop();
      this.coordinates.unshift([this.x, this.y]);

      if (this.targetRadius < 8) {
        this.targetRadius += 0.3;
      } else {
        this.targetRadius = 1;
      }

      this.speed *= this.acceleration;
      const vx = Math.cos(this.angle) * this.speed;
      const vy = Math.sin(this.angle) * this.speed;

      this.distanceTraveled = calculateDistance(
        this.sx,
        this.sy,
        this.x + vx,
        this.y + vy
      );

      if (this.distanceTraveled >= this.distanceToTarget) {
        createParticles(this.tx, this.ty);
        fireworks.splice(index, 1);
      } else {
        this.x += vx;
        this.y += vy;
      }
    };

    Firework.prototype.draw = function () {
      ctx.beginPath();
      ctx.moveTo(
        this.coordinates[this.coordinates.length - 1][0],
        this.coordinates[this.coordinates.length - 1][1]
      );
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = `hsl(${hue}, 100%, ${this.brightness}%)`;
      ctx.stroke();
    };

    function Particle(x, y) {
      this.x = x;
      this.y = y;
      this.coordinates = Array.from({ length: 5 }).fill([x, y]);
      this.angle = random(0, Math.PI * 2);
      this.speed = random(1, 10);
      this.friction = 0.95;
      this.gravity = 0.6;
      this.hue = random(40, 60);
      this.brightness = random(70, 90);
      this.alpha = 1;
      this.decay = random(0.0075, 0.009);
    }

    Particle.prototype.update = function (index) {
      this.coordinates.pop();
      this.coordinates.unshift([this.x, this.y]);

      this.speed *= this.friction;
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed + this.gravity;
      this.alpha -= this.decay;

      if (this.alpha <= this.decay) {
        particles.splice(index, 1);
      }
    };

    Particle.prototype.draw = function () {
      ctx.beginPath();
      ctx.moveTo(
        this.coordinates[this.coordinates.length - 1][0],
        this.coordinates[this.coordinates.length - 1][1]
      );
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
      ctx.stroke();
    };

    function createParticles(x, y) {
      let particleCount = 30;
      while (particleCount--) {
        particles.push(new Particle(x, y));
      }
    }

    function loop() {
      requestAnimationFrame(loop);
      hue += 0.5;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let i = fireworks.length;
      while (i--) {
        fireworks[i].draw();
        fireworks[i].update(i);
      }

      let j = particles.length;
      while (j--) {
        particles[j].draw();
        particles[j].update(j);
      }

      if (Math.random() < 0.05) {
        fireworks.push(
          new Firework(
            canvas.width / 2,
            canvas.height,
            random(0, canvas.width),
            random(0, canvas.height / 2)
          )
        );
      }
    }

    loop();
  }, []);

  const handleDownload = () => {
    const element = document.querySelector(".message");
    html2canvas(element).then((canvas) => {
      const link = document.createElement("a");
      link.download = "gift-card-2025.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div className="firework-container">
      <canvas ref={canvasRef}></canvas>
      <div className="message">
        <h3>Chúc Mừng Năm Mới 2025</h3>
        <p>Vạn sự như ý, an khang thịnh vượng!</p>
        <p>Hòa bình, hạnh phúc, lộc tài đầy nhà!</p>
        <p className="gift-message">Mã quà tặng được gửi qua tin nhắn Zalo</p>
        <button className="download-btn" onClick={handleDownload}>
          Tải Gift Card
        </button>
      </div>
    </div>
  );
};

export default Firework;
