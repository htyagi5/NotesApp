import { useEffect, useRef, useState } from "react";

function Draw() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [color, setColor] = useState("black");
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(2);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.8; // responsive size
    canvas.height = 500;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  }, []);

  // Update color when changed
  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = color;
    }
  }, [color]);

  // Update thickness when changed
  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.lineWidth = lineWidth;
    }
  }, [lineWidth]);

  const startDrawing = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  return (
    <>
      <div id="btn">
        <div id="pens">
          {["red", "yellow", "orange", "blue", "green", "greenyellow", "violet", "brown"].map(
            (clr) => (
              <button
                key={clr}
                className="drbtn"
                style={{ backgroundColor: clr }}
                onClick={() => setColor(clr)}
              >
                {clr.toUpperCase()}
              </button>
            )
          )}
        </div>
        <label>Boldness</label>
        <input
          id="Range"
          type="range"
          min="1"
          max="10"
          value={lineWidth}
          onChange={(e) => setLineWidth(e.target.value)}
        />
        <button className="drbtn" id="eraser" onClick={() => setColor("white")}>
          Erase
        </button>
      </div>

      <h2>Draw something</h2>
      <div id="main">
        <canvas
          id="space"
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          style={{ border: "1px solid black", background: "white" }}
        ></canvas>
      </div>
    </>
  );
}

export default Draw;





// function Draw(){
//     return(
//         <>
//     <div id="btn">
//         <div id="pens">
//             <button  className="drbtn"  id="red" style={{backgroundColor:"red"}}>RED</button>
//             <button className="drbtn"   id="yellow" style={{backgroundColor:"yellow"}}>YELLOW</button>
//             <button className="drbtn"   id="orange" style={{backgroundColor:"orange"}}>Orange</button>
//             <button className="drbtn"   id="blue" style={{backgroundColor: "blue"}}>Blue</button>
//             <button className="drbtn"   id="green" style={{backgroundColor: "green"}}>GREEN</button>
//             <button className="drbtn"   id="greenyellow" style={{backgroundColor: "greenyellow"}}>GreYel</button>
//             <button className="drbtn"   id="violet" style={{backgroundColor: "violet"}}>Violet</button>
//             <button className="drbtn"   id="brown" style={{backgroundColor: "brown"}}>Brown</button>
//         </div>
//         <label>Boldness</label>
//         <input id="Range" type="range" min="1" max="10"/>
//         <button className="drbtn" id="eraser">Erase</button>
//     </div>
//         <h2>Draw something</h2>    
//     <div id="main">
//         <canvas id="space"></canvas>
//     </div>
//     <div id="cursor"></div>
//         </>
//     )

// }
// export default Draw