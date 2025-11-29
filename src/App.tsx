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
  return (
    <div className="min-h-screen flex flex-col">
      <SEO />

      <Navbar />

      <main className="pt-20 flex-1 w-full" role="main">
        <div className="w-full max-w-[1400px] mx-auto px-6 space-y-24">
          {/* Render sections in scroll order */}
          <Home />
          <About />
          <Experience />
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
