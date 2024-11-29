import React, { useState }  from "react";
import Navbar from "../pageSection/navbar.jsx";
import Footer from "../pageSection/footer.jsx";
import GetStartedSection from "../pageSection/getStarted.jsx";
import WhyUs from "../pageSection/whyUs.jsx";
import Qna from "../pageSection/qna.jsx";
import { useInView } from "react-intersection-observer";
import Testimonial from "../pageSection/testimonial.jsx";

export default function Homepage() {
  const [activeSection, setActiveSection] = useState("");

  const { ref: getStartedRef, inView: getStartedInView } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      if (inView) {
        setActiveSection("get-started-section");
      }
    },
  });

  const { ref: whyUsRef, inView: whyUsInView } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      if (inView) {
        setActiveSection("why-us-section");
      }
    },
  });

  const { ref: qnaRef, inView: qnaInView } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      if (inView) {
        setActiveSection("qna-section");
      }
    },
  });

  const { ref: testimonialRef, inView: testimonialInView } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      if (inView) {
        setActiveSection("testimonial-section");
      }
    },
  });

  return (
    <div>
      <Navbar activeSection={activeSection} />
      <div ref={getStartedRef}>
        <GetStartedSection />
      </div>
      <div ref={whyUsRef}>
        <WhyUs />
      </div>
      <div ref={qnaRef}>
        <Qna />
      </div>
      <div ref={testimonialRef}>
        <Testimonial />
      </div>
      <Footer />
    </div>
  );
}
