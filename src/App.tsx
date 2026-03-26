import { Layout } from './layout/Layout';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { Certificates } from './sections/Certificates';
import { EducationSection as Education } from './sections/Education';
import { Contact } from './sections/Contact';

function App() {
  return (
    <Layout>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Certificates />
      <Education />
      <Contact />
    </Layout>
  );
}

export default App;
