import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface WaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

const waitlistSteps = [
  "Checking waitlist availability...",
  "Verifying user credentials...",
  "Analyzing booking patterns...",
  "Processing request...",
  "Contacting administrator...",
  "Finalizing registration...",
];

export const WaitlistDialog = ({ open, onOpenChange, onComplete }: WaitlistDialogProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showFinalError, setShowFinalError] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    if (!open) {
      // Reset state when dialog closes
      setCurrentStep(0);
      setShowConfirm(false);
      setShowFinalError(false);
      setCompletedSteps([]);
    }
  }, [open]);

  useEffect(() => {
    if (open && !showConfirm && !showFinalError && currentStep < waitlistSteps.length) {
      const timer = setTimeout(() => {
        setCompletedSteps(prev => [...prev, currentStep]);
        setCurrentStep(prev => prev + 1);
      }, 1500);

      return () => clearTimeout(timer);
    } else if (open && currentStep === waitlistSteps.length && !showConfirm) {
      // All steps complete, show confirmation
      setTimeout(() => setShowConfirm(true), 500);
    }
  }, [open, currentStep, showConfirm, showFinalError]);

  const handleConfirm = () => {
    setShowConfirm(false);
    // Show final error after a brief delay
    setTimeout(() => {
      setShowFinalError(true);
    }, 800);
  };

  const handleClose = () => {
    onOpenChange(false);
    if (showFinalError) {
      onComplete();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card shadow-card border-border">
        {!showConfirm && !showFinalError && (
          <div className="py-8 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">Joining Waitlist</h2>
              <p className="text-sm text-muted-foreground">
                Please wait while we process your request...
              </p>
            </div>

            <div className="space-y-3">
              {waitlistSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  {completedSteps.includes(index) ? (
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  ) : currentStep === index ? (
                    <Loader2 className="h-5 w-5 text-primary animate-spin flex-shrink-0" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
                  )}
                  <span className={`text-sm ${
                    completedSteps.includes(index) 
                      ? "text-foreground font-medium" 
                      : currentStep === index 
                      ? "text-foreground" 
                      : "text-muted-foreground"
                  }`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {showConfirm && !showFinalError && (
          <div className="py-8 space-y-6 animate-fade-in">
            <div className="flex justify-center">
              <div className="rounded-full bg-primary/10 p-3">
                <CheckCircle2 className="h-12 w-12 text-primary" />
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">Almost There!</h2>
              <p className="text-muted-foreground max-w-sm mx-auto">
                You're about to join the waitlist for this date. Please confirm to proceed.
              </p>
            </div>

            <div className="space-y-3">
              <Button 
                className="w-full text-lg py-6"
                onClick={handleConfirm}
              >
                Confirm & Join Waitlist
              </Button>
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {showFinalError && (
          <div className="py-6 space-y-6 animate-shake">
            <div className="flex justify-center">
              <div className="rounded-full bg-destructive/10 p-3">
                <XCircle className="h-12 w-12 text-destructive" />
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">Waitlist Full</h2>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Sorry, you're too late. The waitlist for this date is already full. 
                Please try selecting another date.
              </p>
              <p className="text-xs text-muted-foreground/70 italic pt-2">
                (All dates are full too, by the way)
              </p>
            </div>

            <Button 
              className="w-full"
              onClick={handleClose}
            >
              Try Another Date
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
