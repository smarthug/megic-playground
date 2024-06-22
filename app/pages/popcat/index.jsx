import { useEffect, useRef, useState } from "react";
import "./App.css";

const pops = [
  "pops/pop1.mp3",
  "pops/pop2.mp3",
  "pops/pop3.mp3",
  "pops/pop4.mp3",
];

const App = () => {
  const [catImage, setCatImage] = useState("p");
  const [popCount, setPopCount] = useState(0);
  const [popIndex, setPopIndex] = useState(0);

  const containerRef = useRef(null);

  useEffect(() => {
    const savedPopCount = getCookie("pop_count");
    if (savedPopCount) {
      setPopCount(parseInt(savedPopCount));
    }

    const preloadImage = new Image();
    preloadImage.src = "imgs/op.png";


    const theRef = containerRef.current;
    theRef.addEventListener("pointerup", handlePointerUp);
    theRef.addEventListener("keyup", handlePointerUp);
    theRef.addEventListener("pointerdown", handlePointerDown);
    theRef.addEventListener("keydown", handlePointerDown);

    return () => {
      theRef.removeEventListener("pointerup", handlePointerUp);
      theRef.removeEventListener("keyup", handlePointerUp);
      theRef.removeEventListener("pointerdown", handlePointerDown);
      theRef.removeEventListener("keydown", handlePointerDown);
    };


  }, [popIndex, popCount]);

//   useEffect(() => {

//   }, []);

  const handlePointerDown = () => {
    setCatImage("op");
    playPopSound();
    incrementPopCount();
  };

  const handlePointerUp = () => {
    setTimeout(() => setCatImage("p"), 25);
  };

  const playPopSound = () => {
    const audio = new Audio(pops[popIndex]);
    audio.load();
    audio.play();
    setPopIndex((popIndex + 1) % pops.length);
  };

  const incrementPopCount = () => {
    const newCount = popCount + 1;
    setPopCount(newCount);
    setCookie("pop_count", newCount, 365);
  };

  const getCookie = (cname) => {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  const setCookie = (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };

  return (
    <div
      className="container"
      ref={containerRef}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <img className="title" src="imgs/popcat.svg" alt="POPCAT" />
      <div className={`cat-img ${catImage}`} id={catImage}>
        {popCount > 0 ? popCount : ""}
      </div>
    </div>
  );
};

export default App;
