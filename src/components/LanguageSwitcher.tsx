
import React from 'react';
import { activateLocale } from '@/i18n';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const [currentLocale, setCurrentLocale] = React.useState(() => 
    localStorage.getItem('locale') || 'en'
  );

  const toggleLanguage = () => {
    const newLocale = currentLocale === 'en' ? 'cs' : 'en';
    activateLocale(newLocale);
    setCurrentLocale(newLocale);
    // Force re-render of the app
    window.location.reload();
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={toggleLanguage}
      className="flex items-center gap-1"
    >
      <Globe className="h-4 w-4" />
      <span>{currentLocale === 'en' ? 'English' : 'Čeština'}</span>
    </Button>
  );
};

export default LanguageSwitcher;
