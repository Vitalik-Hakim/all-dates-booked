import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorDialog } from "@/components/ErrorDialog";
import { WaitlistDialog } from "@/components/WaitlistDialog";
import { generateUsername, generateMessage } from "@/utils/usernameGenerator";
import { CalendarIcon } from "lucide-react";

const Index = () => {
  const [date, setDate] = useState<Date>();
  const [showError, setShowError] = useState(false);
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [attemptCount, setAttemptCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = () => {
    if (!date) return;
    
    const newAttempt = attemptCount + 1;
    setAttemptCount(newAttempt);
    
    // Simulate loading for next month button chaos
    if (newAttempt >= 7) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        const newUsername = generateUsername(newAttempt);
        const newMessage = generateMessage(newAttempt);
        setUsername(newUsername);
        setMessage(newMessage);
        setShowError(true);
      }, 2000);
    } else {
      const newUsername = generateUsername(newAttempt);
      const newMessage = generateMessage(newAttempt);
      setUsername(newUsername);
      setMessage(newMessage);
      setShowError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md shadow-elegant border-border">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <div className="rounded-full bg-primary/10 p-3">
              <CalendarIcon className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">Book Your Date</CardTitle>
          <CardDescription className="text-base">
            Select a date to schedule your appointment
          </CardDescription>
          {attemptCount >= 3 && (
            <p className="text-xs text-muted-foreground italic">
              💡 Tip: Try picking yesterday 😉
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-lg border shadow-sm"
            />
          </div>
          
          <Button 
            className="w-full text-lg py-6 font-semibold"
            onClick={handleConfirm}
            disabled={!date || isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Loading...
              </div>
            ) : (
              "Continue"
            )}
          </Button>

          {attemptCount > 0 && (
            <p className="text-center text-sm text-muted-foreground">
              Attempts: {attemptCount}
            </p>
          )}
        </CardContent>
      </Card>

      <ErrorDialog 
        open={showError}
        onOpenChange={setShowError}
        username={username}
        message={message}
        attemptCount={attemptCount}
        onWaitlistClick={() => setShowWaitlist(true)}
      />

      <WaitlistDialog
        open={showWaitlist}
        onOpenChange={setShowWaitlist}
        onComplete={() => {
          // After waitlist failure, trigger another error
          setTimeout(() => {
            const newUsername = generateUsername(attemptCount);
            const newMessage = generateMessage(attemptCount);
            setUsername(newUsername);
            setMessage(newMessage);
            setShowError(true);
          }, 300);
        }}
      />
    </div>
  );
};

export default Index;
