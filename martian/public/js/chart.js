const canvas = document.querySelector("#myRoulette");
const context = canvas.getContext("2d");
const drawRoulette = (width, height) => {
  canvas.width = width;
  canvas.height = height;
  const center_x = width / 2;
  const center_y = height / 2;
  const r = width / 2;
  const fillColor = "#f67269";
  const borderColor = "#ddd";

  // draw circle
  context.beginPath();
  context.arc(center_x, center_y, center_y, 0, Math.PI * 2);
  context.strokeStyle = borderColor;
  context.fillStyle = fillColor;
  context.fill();
  context.stroke();

  //   let start = 0;
  const text_center_x = center_x - 5;
  const text_center_y = center_y + 5;
  [...Array(10).keys(), "A", "B", "C", "D", "E", "F"].reduce((start, item) => {
    context.beginPath();
    context.moveTo(center_x, center_y);
    context.arc(center_x, center_y, r, (start * Math.PI) / 180, ((start + 22.5) * Math.PI) / 180);
    context.fillStyle = "black";
    const mid = (start + start + 22.5) / 2;
    context.font = "20px sans-serif";
    context.fillText(item, text_center_x + (r - 25) * Math.cos((mid * Math.PI) / 180), text_center_y + (r - 25) * Math.sin((mid * Math.PI) / 180));
    context.strokeStyle = borderColor;
    context.stroke();
    start += 22.5;
    return start;
  }, 0);
  //   for (let i = 0; i < 16; i++) {
  //     context.beginPath();
  //     context.moveTo(center_x, center_y);
  //     context.arc(center_x, center_y, r, (start * Math.PI) / 180, ((start + 22.5) * Math.PI) / 180);
  //     context.fillStyle = "black";
  //     const mid = (start + start + 22.5) / 2;
  //     context.fillText(
  //       "hello world",
  //       text_center_x + (r - 40) * Math.cos((mid * Math.PI) / 180),
  //       text_center_y + (r - 40) * Math.sin((mid * Math.PI) / 180)
  //     );
  //     context.strokeStyle = borderColor;
  //     context.stroke();
  //     start += 22.5;
  //   }
};

canvas.addEventListener("click", (e) => {
  console.log(e.target);
});

export { drawRoulette };
