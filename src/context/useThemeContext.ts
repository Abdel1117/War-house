import { useContext } from 'react';
import { themeContext } from './ThemeContext';

const useThemeContext = () => {
  const context = useContext(themeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export default useThemeContext;