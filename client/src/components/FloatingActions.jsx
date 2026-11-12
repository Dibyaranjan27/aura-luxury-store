import { MessageCircle, ChevronUp } from "lucide-react";

const FloatingActions = ({ showScrollTop, scrollToTop, onOpenConcierge }) => {
  return (
    <>
      {/* Scroll To Top Button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-[104px] right-8 z-40 bg-white border border-gray-200 text-text w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:bg-primary transition-colors duration-300"
          title="Scroll to Top"
        >
          <ChevronUp className="h-6 w-6" strokeWidth={1.5} />
        </button>
      )}

      {/* Live Chat Floating Button */}
      <button 
        onClick={onOpenConcierge}
        className="fixed bottom-8 right-8 z-40 bg-text text-white w-14 h-14 flex items-center justify-center rounded-full shadow-2xl hover:bg-accent transition-colors duration-300 group"
        title="Aura Client Concierge"
      >
        <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
      </button>
    </>
  );
};

export default FloatingActions;
