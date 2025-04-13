
// This file contains TypeScript declarations for custom CSS styles

interface CSSModule {
  readonly [key: string]: string;
}

declare module '*.module.css' {
  const classes: CSSModule;
  export default classes;
}

// Custom animation types
interface Document {
  styleSheets: CSSStyleSheet[];
}

// Extend the global Window interface
interface Window {
  CSS: {
    escape(value: string): string;
    supports(property: string, value?: string): boolean;
  };
}
