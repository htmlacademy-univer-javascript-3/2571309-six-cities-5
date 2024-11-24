import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory } from '../../../shared/providers';
import { withStore } from '../../../shared/providers/with-store';
import LoginForm from './ui';
describe('Component: LoginForm', ()=>{
  it('should rendered correctly', ()=>{
    const passwordLabel = 'Password';
    const emailLabel = 'E-mail';
    const btnText = 'Sign in';

    const {withStoreComponent} = withStore(<LoginForm/>,{});
    const componentWithProviders = withHistory(withStoreComponent);

    render(componentWithProviders);

    expect(screen.getByText(emailLabel)).toBeInTheDocument();
    expect(screen.getByText(btnText)).toBeInTheDocument();
    expect(screen.getByText(passwordLabel)).toBeInTheDocument();
  });

  it('should rendered correctly with filled input values', async ()=>{
    const passwordTestId = 'password_input';
    const emailTestId = 'email_input';
    const expectedEmailValue = 'test';
    const expectedPassword = 'test123';

    const {withStoreComponent} = withStore(<LoginForm/>,{});
    const componentWithProviders = withHistory(withStoreComponent);

    render(componentWithProviders);

    await userEvent.type(
      screen.getByTestId(emailTestId),
      expectedEmailValue,
    );
    await userEvent.type(
      screen.getByTestId(passwordTestId),
      expectedPassword,
    );

    expect(screen.getByDisplayValue(expectedEmailValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPassword)).toBeInTheDocument();
  });
});
