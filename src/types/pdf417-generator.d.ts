declare module "pdf417-generator" {
  function draw(qrText: string, canvas: HTMLCanvasElement): void;
  type PDF417 = {
    draw;
  };
  const toExport = {
    draw,
  };
  export default toExport;
}
