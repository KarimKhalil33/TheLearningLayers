import { render, screen } from '@testing-library/react';
import App from './App';
import CreateAccount from "./createAccount";
import Login from './login';

jest.mock("./createAccount");
jest.mock("./login");

test('renders createAccount and Login on default', () => {
  CreateAccount.mockImplementation(() => <div>CreateAccountMock</div>);
    Login.mockImplementation(() => <div>LoginMock</div>);
});
