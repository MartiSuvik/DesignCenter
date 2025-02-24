import React from "react";

interface CallToActionProps {
  triggerFooterContact: () => void;
  scrollToProjects: () => void;
}

const HowWeWorkCallToAction: React.FC<CallToActionProps> = ({ triggerFooterContact, scrollToProjects }) => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="relative max-w-4xl mx-auto text-center px-4">
        <h2 className="text-5xl font-serif text-white mb-4">
          Transform Your Vision Into Reality
        </h2>
        <p className="text-xl text-white/60 mb-12">
          Book Your Complimentary Consultation
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button onClick={triggerFooterContact} className="px-8 py-4 bg-[#C4A661] text-black text-lg font-medium rounded hover:scale-105 transition-all duration-300">
            Schedule Consultation
          </button>
          <button onClick={scrollToProjects} className="px-8 py-4 border border-white text-white text-lg font-medium rounded hover:scale-105 transition-all duration-300">
            View Portfolio
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkCallToAction;
