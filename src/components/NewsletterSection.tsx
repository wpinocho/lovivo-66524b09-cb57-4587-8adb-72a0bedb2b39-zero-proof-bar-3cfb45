import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HeadlessNewsletter } from '@/components/headless/HeadlessNewsletter';
import { Mail } from 'lucide-react';

/**
 * EDITABLE UI COMPONENT - NewsletterSection
 * 
 * Componente UI completamente editable para suscripción a newsletter.
 * El agente IA puede modificar colores, textos, layout, etc.
 * 
 * Consume lógica de HeadlessNewsletter (solo muestra email input).
 */

export const NewsletterSection = () => {
  return (
    <HeadlessNewsletter>
      {(logic) => (
        <section className="bg-muted py-20 border-y border-border relative overflow-hidden">
          <div className="absolute inset-0 cyber-gradient opacity-5"></div>
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            {logic.success ? (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="bg-primary/20 rounded-full p-4 cyber-glow">
                    <Mail className="h-10 w-10 text-primary" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-foreground cyber-text-glow">
                  Thanks for subscribing!
                </h3>
                <p className="text-muted-foreground text-lg">
                  Get ready for exclusive zero-proof recipes and offers
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="space-y-3">
                  <h3 className="text-4xl font-black text-foreground cyber-text-glow">
                    Join The Y2K Revolution
                  </h3>
                  <p className="text-xl text-secondary">
                    Get exclusive recipes, launches & zero-proof lifestyle tips
                  </p>
                </div>
                
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    logic.handleSubscribe();
                  }}
                  className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
                >
                  <Input 
                    type="email"
                    placeholder="your@email.com"
                    value={logic.email}
                    onChange={(e) => logic.setEmail(e.target.value)}
                    disabled={logic.isSubmitting}
                    className="flex-1 h-12 bg-background border-border cyber-border text-lg"
                    required
                  />
                  <Button 
                    type="submit"
                    disabled={logic.isSubmitting}
                    size="lg"
                    className="sm:w-auto cyber-glow animate-pulse-glow font-bold px-8"
                  >
                    {logic.isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </form>
                
                {logic.error && (
                  <p className="text-sm text-destructive font-semibold">
                    {logic.error}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </HeadlessNewsletter>
  );
};