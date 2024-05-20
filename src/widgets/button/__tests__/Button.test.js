import React from 'react';

import { Button } from '..';

describe('Button', () => {
  it('should render the button with the correct text', () => {
    const { getByText } = render(<Button text="Click me" />);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('should call the onClick function when the button is clicked', () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button text="Click me" onClick={onClick} />);
    fireEvent.click(getByText('Click me'));
    expect(onClick).toHaveBeenCalled();
  });
});
