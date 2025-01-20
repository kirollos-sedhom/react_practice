import React from "react";

const RandomColor = () => {
  const [Color, setColor] = React.useState("#fff");
  const [colorType,setColorType] = React.useState(null)

  function generateHexColor() {
    let randomColor = Array(6);

    for (let i = 0; i < 6; i++) {
      randomColor[i] = Math.floor(Math.random() * 16).toString(16);
    }
    randomColor = `#${randomColor.join("")}`;
    setColor(randomColor);
    // console.log(hexColor)
    setColorType("Hex Color")
    
  }

  function generateRgbColor(){
    const red = Math.floor(Math.random()*255)
    const green = Math.floor(Math.random()*255)
    const blue = Math.floor(Math.random()*255)
    setColor(`rgb(${red},${green},${blue})`)
    setColorType("RGB Color")
  }

  function generateRandomColor(){
    const options = [generateHexColor, generateRgbColor]
    return options[Math.floor(Math.random()*2)]()
    
  }
  const styles = {
    backgroundColor: `${Color}`,
  };
  return (
    <div className="border-2 h-screen m-0 p-2 flex flex-col" style={styles}>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <button
          className="border-2 p-2 mx-2 bg-slate-200"
          onClick={generateHexColor}
        >
          create hex color
        </button>

        <button className="border-2 p-2 mx-2 bg-slate-200" onClick={generateRgbColor}>
          create rgb color
        </button>
        <button className="border-2 p-2 mx-2 bg-slate-200" onClick={generateRandomColor}>
          generate random color
        </button>
      </div>

        <div className="relative flex-grow m-0 flex flex-col gap-4 items-center text-white text-5xl font-bold">
            <p className="absolute top-24">{colorType}</p>
            <h1 className="m-auto">{Color}</h1>
        </div>

    </div>
  );
};

export default RandomColor;
