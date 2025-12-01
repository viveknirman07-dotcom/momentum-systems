import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = { essential: true, analytics: true, marketing: true };
    setPreferences(allAccepted);
    localStorage.setItem("cookie-consent", JSON.stringify(allAccepted));
    setShowBanner(false);
  };

  const rejectAll = () => {
    const essentialOnly = { essential: true, analytics: false, marketing: false };
    setPreferences(essentialOnly);
    localStorage.setItem("cookie-consent", JSON.stringify(essentialOnly));
    setShowBanner(false);
  };

  const savePreferences = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    setShowBanner(false);
    setShowPreferences(false);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 animate-in slide-in-from-bottom-5 duration-500">
        <div className="container-standard">
          <div className="relative backdrop-blur-xl bg-card/95 border border-border rounded-2xl shadow-2xl p-6 md:p-8">
            <button
              onClick={rejectAll}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="pr-8">
              <h3 className="text-h4 mb-3">We value your privacy</h3>
              <p className="text-body-m text-muted-foreground mb-6 max-w-2xl">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                By clicking "Accept All", you consent to our use of cookies.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <Button onClick={acceptAll} size="lg">
                  Accept All
                </Button>
                <Button onClick={rejectAll} variant="outline" size="lg">
                  Reject All
                </Button>
                <Button
                  onClick={() => setShowPreferences(true)}
                  variant="ghost"
                  size="lg"
                >
                  Customize
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Cookie Preferences</DialogTitle>
            <DialogDescription>
              Manage your cookie settings. Essential cookies cannot be disabled as they are necessary for the site to function.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Essential Cookies */}
            <div className="flex items-start justify-between space-x-4">
              <div className="flex-1">
                <Label htmlFor="essential" className="text-base font-semibold">
                  Essential Cookies
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Required for the website to function properly. These cannot be disabled.
                </p>
              </div>
              <Switch
                id="essential"
                checked={preferences.essential}
                disabled
                className="mt-1"
              />
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-start justify-between space-x-4">
              <div className="flex-1">
                <Label htmlFor="analytics" className="text-base font-semibold">
                  Analytics Cookies
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Help us understand how visitors interact with our website.
                </p>
              </div>
              <Switch
                id="analytics"
                checked={preferences.analytics}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, analytics: checked })
                }
                className="mt-1"
              />
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-start justify-between space-x-4">
              <div className="flex-1">
                <Label htmlFor="marketing" className="text-base font-semibold">
                  Marketing Cookies
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Used to deliver personalized advertisements relevant to you.
                </p>
              </div>
              <Switch
                id="marketing"
                checked={preferences.marketing}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, marketing: checked })
                }
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button onClick={savePreferences} className="flex-1">
              Save Preferences
            </Button>
            <Button onClick={acceptAll} variant="outline" className="flex-1">
              Accept All
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
