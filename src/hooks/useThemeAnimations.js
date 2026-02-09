// hooks/useThemeAnimations.js
import { useTheme } from '../contexts/ThemeContext';

export const useThemeAnimations = () => {
  const { theme } = useTheme();

  const themeTransition = {
    duration: 0.3,
    ease: "easeInOut"
  };

  const pageTransition = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        ...themeTransition,
        delay: 0.1
      }
    },
    exit: { opacity: 0 }
  };

  const cardHover = {
    scale: 1.02,
    transition: themeTransition
  };

  const buttonHover = {
    scale: 1.05,
    transition: themeTransition
  };

  const buttonTap = {
    scale: 0.95,
    transition: themeTransition
  };

  const getThemeColor = (colorType) => {
    const colors = {
      light: {
        primary: '#3b82f6',
        secondary: '#10b981',
        bg: '#ffffff',
        text: '#0f172a'
      },
      dark: {
        primary: '#60a5fa',
        secondary: '#34d399',
        bg: '#0f172a',
        text: '#f8fafc'
      }
    };
    return colors[theme][colorType];
  };

  return {
    theme,
    themeTransition,
    pageTransition,
    cardHover,
    buttonHover,
    buttonTap,
    getThemeColor
  };
};