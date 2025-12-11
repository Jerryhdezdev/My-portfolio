import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { SEO } from "./components/SEO";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Home } from "./views/Home";
import { About } from "./views/About";
import { Experience } from "./views/Experience";
import { Technologies } from "./views/Technologies";
import { Projects } from "./views/Projects";
import { Contact } from "./views/Contact";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "light"
  );

  const toggleTheme = () => {
    document.documentElement.classList.add("theme-transition");
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 350);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO />

      {/* Pass theme and toggleTheme here */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="pt-20 flex-1 w-full" role="main">
        <div className="w-full max-w-[1400px] mx-auto px-6 ">
          <Home theme={theme} />
          <About theme={theme} />
          <Experience theme={theme}/>
          <Technologies />
          <Projects />
          <Contact />
        </div>
      </main>

      <Footer />

      <ToastContainer
        toastClassName="custom-toast"
        progressClassName="custom-progress-bar"
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
      />
    </div>
  );
}

export default App;
