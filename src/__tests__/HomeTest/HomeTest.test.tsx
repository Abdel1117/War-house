// Accueil.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect  } from 'vitest';
import Accueil from '../../pages/Accueil/Accueil';

describe('Accueil Component', () => {
    beforeEach(()=>{
        render(<Accueil />)
      })
  it("Should render the homePage", () => {
      const title = screen.getByTestId("HomeApp")
      expect(title).toBeInTheDocument()
  })
});
