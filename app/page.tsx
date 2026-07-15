import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { About } from "@/components/about";
import { Contact, Footer } from "@/components/contact";

export default function Home() {
  return (
    <div className="relative min-h-full bg-mist">
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
