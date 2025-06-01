import { render, screen, fireEvent } from '@testing-library/react';
import MedalTable from '../MedalTable';
import { MedalData } from '@/types/medals';

const mockData: MedalData[] = [
  { code: 'USA', gold: 10, silver: 5, bronze: 2, total: 17 },
  { code: 'CAN', gold: 5, silver: 7, bronze: 3, total: 15 },
];

describe('MedalTable', () => {
  it('renders medal table correctly', () => {
    render(<MedalTable data={mockData} sortBy="gold" />);

    expect(screen.getByText('MEDAL COUNT')).toBeInTheDocument();
    expect(screen.getByText('USA')).toBeInTheDocument();
    expect(screen.getByText('CAN')).toBeInTheDocument();
  });

  it('clicks on header and changes sort', () => {
    render(<MedalTable data={mockData} sortBy="gold" />);

    const totalHeader = screen.getByText('TOTAL');
    fireEvent.click(totalHeader);

    // Check if total is now the active sort
    expect(totalHeader).toHaveClass('underline font-bold');
  });
});
