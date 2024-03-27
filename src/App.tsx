import Converter from "./components/Converter";

function App() {
  return (
    <main
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "center",
      }}
    >
      <Converter />
    </main>
  );
}

export default App;
