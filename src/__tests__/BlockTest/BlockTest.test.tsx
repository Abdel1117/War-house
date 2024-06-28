import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Block } from '../../components/Block/Block';
import Wargame from '../../assets/images/Wargame.jpg';


describe('Accueil Component', () => {

it('should render the Block component with the correct props', () => {
    const mockFunction = vi.fn();
    render(
      <Block 
        image={Wargame} 
        textAlt={"Mon image"}
        title={"Notre site"}
        text={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. At quibusdam quia, architecto similique alias, harum debitis non tempora porro asperiores explicabo vel recusandae voluptates dignissimos mollitia saepe sequi tempore quos hic? Aliquid, consequuntur? Laborum quos eius ipsa ea consequuntur repudiandae."}
        callToActionMessage={"Cliquer ici"}
        actionButton={mockFunction} 
      />
    );
// Check if the image is rendered
const image = screen.getByAltText('Mon image');
expect(image).toBeInTheDocument();
expect(image).toHaveAttribute('src', Wargame);

// Check if the title is rendered
const title = screen.getByText('Notre site');
expect(title).toBeInTheDocument();

// Check if the text is rendered
const text = screen.getByText(/Lorem ipsum dolor sit, amet consectetur/i);
expect(text).toBeInTheDocument();

// Check if the call to action message is rendered
const callToAction = screen.getByText('Cliquer ici');
expect(callToAction).toBeInTheDocument();

// Mock the function and check if it is called
    // Simulate button click
    const button = screen.getByText('Cliquer ici');
    button.click();
    expect(mockFunction).toHaveBeenCalled();
  });
})