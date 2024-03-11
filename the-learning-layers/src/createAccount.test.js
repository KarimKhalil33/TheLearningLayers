import React from "react";
import {render,fireEvent,screen} from "@testing-library/react";
import CreateAccount from "./createAccount";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

describe("signup", () => {
    test("validate function should pass on correct input",()=>{

        //get text elements from createAccount
         render(<Router>
            <CreateAccount />
          </Router>
        );
        //get the fields the user enters
        // const usernameInput = screen.getByPlaceholderText("Enter username");
        // const emailInput = screen.getByPlaceholderText("Enter email");
        // const passwordInput = screen.getByPlaceholderText("Password");
        // const repeatPasswordInput = screen.getByPlaceholderText("Repeat password");

        const usernameInput = screen.getByLabelText("Username");
        const emailInput = screen.getByLabelText("Email address");
        const passwordInput = screen.getByLabelText("Password");
        const repeatPasswordInput = screen.getByLabelText("Repeat Password");

        //simulate user input by using made-up variables
        fireEvent.change(usernameInput, { target: { value: "testUser" } });
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.change(repeatPasswordInput, { target: { value: "password123" } });

        

        //Simulate a click event on the create account button
        const createAccountForm = document.querySelector("form");
        fireEvent.submit(createAccountForm);

        //Asserting the form submits... we expect the test to pass
        expect(createAccountForm).toHaveFormValues({
            username: "testUser",
            email: "test@example.com",
            password: "password123",
            repeatPassword: "password123",
          });
    })
})