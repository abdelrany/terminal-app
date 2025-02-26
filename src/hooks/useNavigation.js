import { useState, useEffect } from 'react';

export const useNavigation = (elements = []) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.key) {
        case 'ArrowUp':
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : elements.length - 1
          );
          break;
        case 'ArrowDown':
          setSelectedIndex(prev => 
            prev < elements.length - 1 ? prev + 1 : 0
          );
          break;
        case 'Enter':
          const selectedElement = document.querySelector(`[nav-index="${selectedIndex}"]`);
          if (selectedElement) {
            selectedElement.click();
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [elements.length, selectedIndex]);

  return selectedIndex;
};
