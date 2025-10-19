import { Dialog, DialogContent } from "@/components/ui/dialog";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  username: string;
  message: string;
  attemptCount: number;
}

export const ErrorDialog = ({ open, onOpenChange, username, message, attemptCount }: ErrorDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card shadow-card border-border animate-shake">
        <div className="flex flex-col items-center gap-6 py-6">
          <div className="rounded-full bg-destructive/10 p-3">
            <XCircle className="h-12 w-12 text-destructive" />
          </div>
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">Error</h2>
            <p className="text-muted-foreground max-w-sm">
              {message} <span className="font-mono text-primary">{username}</span>. Try another.
            </p>
          </div>

          {attemptCount >= 5 && (
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                onOpenChange(false);
                setTimeout(() => onOpenChange(true), 500);
              }}
            >
              Join Waitlist for This Date
            </Button>
          )}

          <Button 
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            Try Again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
