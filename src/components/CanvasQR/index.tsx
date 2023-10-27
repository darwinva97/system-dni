import { generateQR } from "@/utils/qr";
import type { Dni } from "@prisma/client";
import { HTMLProps, useEffect, useRef } from "react";

export const CanvasQR = ({
  dni,
  ...props
}: { dni: Dni } & HTMLProps<HTMLCanvasElement>) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    generateQR(dni, canvas);
  }, [canvasRef.current, dni]);

  return <canvas ref={canvasRef} {...props}></canvas>;
};
