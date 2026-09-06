import { useEffect, useRef, useState, useCallback } from "react";

const PEN_COLORS = [
  "black",
  "red",
  "yellow",
  "orange",
  "blue",
  "green",
  "greenyellow",
  "violet",
  "brown",
];

function Draw() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const containerRef = useRef(null);
  const isDrawingRef = useRef(false);

  const [color, setColor] = useState("black");
  const [lineWidth, setLineWidth] = useState(3);

  // Initialize and scale canvas to fit container
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = Math.floor(container.clientWidth);
    const height = Math.min(Math.max(window.innerHeight * 0.55, 340), 600);

    // Save existing drawing across resizes
    let tempImage = null;
    if (canvas.width > 0 && canvas.height > 0) {
      tempImage = canvas.toDataURL();
    }

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    // Fill white background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);

    if (tempImage) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
      img.src = tempImage;
    }

    ctxRef.current = ctx;
  }, [color, lineWidth]);

  useEffect(() => {
    initCanvas();

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initCanvas();
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [initCanvas]);

  // Keep strokeStyle updated
  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = color;
    }
  }, [color]);

  // Keep lineWidth updated
  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.lineWidth = Number(lineWidth);
    }
  }, [lineWidth]);

  // Helper to calculate exact coordinates from touch or mouse
  const getCoords = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX = 0;
    let clientY = 0;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if (e.changedTouches && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDrawingAt = (x, y) => {
    if (!ctxRef.current) return;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
    isDrawingRef.current = true;
  };

  const drawTo = (x, y) => {
    if (!isDrawingRef.current || !ctxRef.current) return;
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawingRef.current) return;
    if (ctxRef.current) {
      ctxRef.current.closePath();
    }
    isDrawingRef.current = false;
  };

  // Attach native non-passive touch listeners for mobile phones and tablets
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onTouchStart = (e) => {
      e.preventDefault(); // Prevents phone scrolling while drawing
      const { x, y } = getCoords(e);
      startDrawingAt(x, y);
    };

    const onTouchMove = (e) => {
      e.preventDefault(); // Prevents phone scrolling while drawing
      const { x, y } = getCoords(e);
      drawTo(x, y);
    };

    const onTouchEnd = (e) => {
      e.preventDefault();
      stopDrawing();
    };

    // Use { passive: false } so e.preventDefault() reliably halts touch scrolling
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd, { passive: false });
    canvas.addEventListener("touchcancel", onTouchEnd, { passive: false });

    return () => {
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      canvas.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  // Desktop Mouse Handlers
  const handleMouseDown = (e) => {
    e.preventDefault();
    const { x, y } = getCoords(e);
    startDrawingAt(x, y);
  };

  const handleMouseMove = (e) => {
    const { x, y } = getCoords(e);
    drawTo(x, y);
  };

  const handleMouseUp = () => {
    stopDrawing();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !ctxRef.current) return;
    ctxRef.current.fillStyle = "white";
    ctxRef.current.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="draw-page">
      <div id="btn">
        <div id="pens">
          {PEN_COLORS.map((clr) => (
            <button
              key={clr}
              type="button"
              className={`drbtn ${color === clr ? "active-pen" : ""}`}
              style={{ backgroundColor: clr, color: clr === "yellow" ? "black" : "white" }}
              onClick={() => setColor(clr)}
            >
              {clr.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="brush-controls">
          <label htmlFor="Range">Boldness</label>
          <input
            id="Range"
            type="range"
            min="1"
            max="25"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
          />
          <button
            type="button"
            className={`drbtn ${color === "white" ? "active-pen" : ""}`}
            id="eraser"
            onClick={() => setColor("white")}
          >
            Erase
          </button>
          <button
            type="button"
            className="drbtn clear-btn"
            onClick={clearCanvas}
            title="Clear canvas"
          >
            Clear
          </button>
        </div>
      </div>

      {/* <h2>Draw something</h2> */}
      <div id="main" ref={containerRef}>
        <canvas
          id="space"
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        ></canvas>
      </div>
    </div>
  );
}

export default Draw;