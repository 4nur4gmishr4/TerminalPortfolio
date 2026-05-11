import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { portfolioData } from "@/types/portfolio";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isTransmitting, setIsTransmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please complete all fields before sending.");
      return;
    }

    setIsTransmitting(true);
    toast.info("Preparing message...");

    setTimeout(() => {
      window.location.href = `mailto:${portfolioData.contact.email}?subject=Message from ${formData.name}&body=${formData.message} (%0A%0AFrom: ${formData.email})`;
      setIsTransmitting(false);
      setFormData({ name: "", email: "", message: "" });
      toast.success("Message ready. Opening your email client.");
    }, 1500);
  };

  return (
    <div className="p-gutter lg:p-lg h-full overflow-y-auto">
      <div className="max-w-[800px] mx-auto h-full flex flex-col relative z-10">
        
        <div className="mb-lg">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-sm mb-xs"
          >
            <span className="material-symbols-outlined text-primary text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
            <h1 className="text-display-sm text-on-surface">Contact</h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-on-surface-variant font-data-mono text-data-mono max-w-2xl"
          >
            Looking to collaborate or have a question? Send me a message below.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-secondary tracking-widest flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px]">person</span>
                  YOUR NAME
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={isTransmitting}
                  className="w-full bg-surface-bright/50 border border-white/10 rounded-none p-3 font-data-mono text-data-mono focus:border-primary focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-secondary tracking-widest flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px]">alternate_email</span>
                  YOUR EMAIL
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={isTransmitting}
                  className="w-full bg-surface-bright/50 border border-white/10 rounded-none p-3 font-data-mono text-data-mono focus:border-primary focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-label-caps text-label-caps text-secondary tracking-widest flex items-center gap-2">
                <span className="material-symbols-outlined text-[14px]">chat</span>
                MESSAGE
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                disabled={isTransmitting}
                className="w-full bg-surface-bright/50 border border-white/10 rounded-none p-3 font-data-mono text-data-mono h-32 resize-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50"
                placeholder="What's on your mind?"
              />
            </div>

            <button
              type="submit"
              disabled={isTransmitting}
              className="w-full relative overflow-hidden group bg-primary/10 border border-primary/30 hover:border-primary hover:bg-primary/20 text-primary py-4 font-label-caps tracking-[0.2em] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isTransmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined animate-spin text-[16px]">sync</span>
                  SENDING...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">send</span>
                  SEND MESSAGE
                </div>
              )}
            </button>
          </form>
        </motion.div>
        
      </div>
    </div>
  );
};

export default Contact;