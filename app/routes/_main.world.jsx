import Main from "../pages/world";

export default function World() {
  return (
    <div
      style={{
        width: "100vw",
        // height: "50vh",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <h1>World</h1> */}
      <Main />
    </div>
  );
}
