import { render, screen } from '@testing-library/react';
import GameArea from './game-area';

describe('GameArea', () => {
  it('renders the game area for marathon mode', () => {
    render(<GameArea gameMode="marathon" />);
    
    // Check if the mode title is rendered
    expect(screen.getByText(/marathon/i)).toBeInTheDocument();

    // Check if the main game board is rendered
    // We can check for the container class or a role
    const gameBoard = screen.getByRole('grid'); // Assuming GameBoard has a role of grid
    expect(gameBoard).toBeInTheDocument();
  });
});
