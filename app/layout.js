export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* THE 3D ENGINE */}
        <script 
          type="module" 
          src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
        ></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
