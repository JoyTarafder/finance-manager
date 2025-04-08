namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    readonly NEXT_PUBLIC_APP_URL: string;
  }
}

interface Window {
  localStorage: Storage;
}

declare const window: Window & typeof globalThis;

// Add jsPDF and jspdf-autotable type declarations
declare module "jspdf" {
  export class jsPDF {
    constructor(options?: {
      orientation?: "portrait" | "landscape";
      unit?: "pt" | "mm" | "cm" | "in";
      format?: string | [number, number];
    });
    internal: {
      pageSize: {
        getWidth: () => number;
        getHeight: () => number;
        width?: number;
        height?: number;
      };
      getNumberOfPages: () => number;
    };
    setPage(pageNumber: number): void;
    setFontSize(size: number): void;
    setTextColor(r: number, g: number, b: number): void;
    text(
      text: string,
      x: number,
      y: number,
      options?: {
        align?: "left" | "center" | "right" | "justify";
        maxWidth?: number;
      }
    ): this;
    save(filename: string): void;
    lastAutoTable?: {
      finalY: number;
    };
    autoTable?: any; // autoTable function will be attached at runtime
  }
}

declare module "jspdf-autotable" {
  import { jsPDF } from "jspdf";

  interface AutoTableOptions {
    startY?: number;
    head?: string[][];
    body?: string[][];
    foot?: string[][];
    headStyles?: {
      fillColor?: number[];
      textColor?: number;
      fontStyle?: string;
    };
    footStyles?: {
      fillColor?: number[];
      textColor?: number;
    };
    bodyStyles?: {
      fillColor?: number[];
    };
    alternateRowStyles?: {
      fillColor?: number[];
    };
    theme?: string;
    didDrawCell?: (data: {
      section: string;
      column: { index: number };
      cell: { raw: any };
    }) => void;
  }

  function autoTable(doc: jsPDF, options: AutoTableOptions): void;
  export default autoTable;
}
