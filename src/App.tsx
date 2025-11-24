import { Navbar } from "./components/Navbar";
import { SEO } from "./components/SEO";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";   // 👈 import routing
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <SEO />
      <Navbar />
      <main className="pt-20" role="main">
        <Routes>
          <Route
            path="/"
            element={
              <section id="home" aria-labelledby="home-heading">
                <h1 id="home-heading" className="text-3xl font-bold">
                  Home
                </h1>
                <p className="text-(--color-text-primary)">
                  Explore Jerry's expertise in Java, Spring Boot, microservices,
                  and scalable backend architecture.
                </p>
              </section>
            }
          />
          {/* routes*/}
          <Route
            path="/about"
            element={
              <section id="about" aria-labelledby="about-heading">
                <h1 id="about-heading" className="text-3xl font-bold">
                  About
                </h1>
                <p className="text-(--color-text-primary)">
                  Learn more about Jerry’s background and projects.
                </p>
              </section>
            }
          />
        </Routes>
      </main>
      <ToastContainer position="top-right" autoClose={800} />
    </>
  );
}

export default App;
