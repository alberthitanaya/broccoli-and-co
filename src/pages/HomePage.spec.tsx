import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { HomePage } from './HomePage';



function MockTheme({ children }: any) {
  const theme = createMuiTheme({});
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
const mockPost = jest.fn();

describe("HomePage", () => {
  it('Modal pops after click', () => {
    render(<MockTheme><HomePage
      postInvite={mockPost}
      /></MockTheme>);
      fireEvent.click(screen.getByTestId(/request-an-invite/i));
      
    expect(screen.getByTestId(/invite-title/i)).toBeTruthy();
  });
  
  
    it('No input makes no request', () => {
      render(<MockTheme>
        <HomePage postInvite={mockPost}
        /></MockTheme>);
  
    
      fireEvent.click(screen.getByTestId(/request-an-invite/i));
      fireEvent.click(screen.getByTestId(/send-invite/i));
    
      expect(mockPost).not.toBeCalled();
    });
  
    it('Input makes request', async () => {
      render(<MockTheme><HomePage
        postInvite={mockPost}
        /></MockTheme>);
  
    
      fireEvent.click(screen.getByTestId(/request-an-invite/i));
      const nameInput = screen.getByPlaceholderText(/e.g. John Smith/i);
      const emailInput = screen.getByPlaceholderText(/e.g. broccoli@xyz.com/i);
      const emailConfirmationInput = screen.getByPlaceholderText(/Confirm Email Address/i);
  
      fireEvent.change(nameInput, { target: { value: "abc" } });
      fireEvent.change(emailInput, { target: { value: "abc@abc.com" } });
      fireEvent.change(emailConfirmationInput, { target: { value: "abc@abc.com" } });
      fireEvent.click(screen.getByTestId(/send-invite/i));
      fireEvent.submit(screen.getByRole("button"));
      await waitFor(() => expect(mockPost).toHaveBeenCalledTimes(1));
      // expect(getByTestId(/confirmation-error/i)).toBeTruthy();
      expect(mockPost).toBeCalled();

    });
  });


