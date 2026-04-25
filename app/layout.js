export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* This is the 3D Engine "Brain" */}
        <script 
          type="module" 
          src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
        ></script>
      </head>
      <body className="bg-black">
        {children} {/* This is where page.js gets injected */}
      </body>
    </html>
  );
}
