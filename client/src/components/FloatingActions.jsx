import { MessageCircle, ChevronUp } from "lucide-react";

const FloatingActions = ({ showScrollTop, scrollToTop, onOpenConcierge }) => {
  return (
    <>
      {/* Scroll To Top Button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-[72px] right-4 md:bottom-[104px] md:right-8 z-40 bg-white border border-gray-200 text-text w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full shadow-lg hover:bg-primary transition-colors duration-300"
          title="Scroll to Top"
        >
          <ChevronUp className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
        </button>
      )}

      {/* Live Chat Floating Button */}
      <button 
        onClick={onOpenConcierge}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-40 bg-text text-white w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full shadow-2xl hover:bg-accent transition-colors duration-300 group"
        title="Aura Client Concierge"
      >
        <MessageCircle className="h-5 w-5 md:h-6 md:w-6 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
      </button>
    </>
  );
};

export default FloatingActions;
