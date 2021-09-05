import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { findByTestAttr } from "../../test/testUtils";
import Login, { AppProps } from "../components/users/Login";

const setup = (props: AppProps) => shallow(<Login {...props} />);

let wrapper: ShallowWrapper;
let MockloginUser = jest.fn();
let MockSetEmail = jest.fn();
let MockSetPhoneNumber = jest.fn();

const props = {
  loginUser: MockloginUser,
  email: "nic@gmail.com",
  setEmail: MockSetEmail,
  phoneNumber: "+33667182291",
  setPhoneNumber: MockSetPhoneNumber,
  loading: false,
  isAuthenticated: false,
};

describe("Login", () => {
  beforeEach(() => {
    wrapper = setup(props);
  });

  test("renders without error", () => {
    const loginComponent = findByTestAttr(wrapper, "component-login");
    expect(loginComponent.length).toBe(1);
  });

  //   test("renders inputs withoud error", () => {
  //     const inputs = findByTestAttr(wrapper, "input-component");
  //     expect(inputs.length).toBe(2);
  //   });

  test("shows submit-button", () => {
    const button = findByTestAttr(wrapper, "submit-button");
    expect(button.length).toBe(1);
  });

  describe("state controle input fields", () => {
    test("Email state change with value of input upon change", () => {
      React.useState = jest.fn(() => ["", MockSetEmail]);
      const inputEmail = findByTestAttr(wrapper, "input-email");
      const mockEvent = { target: { value: "nic@gmail.com" } };
      inputEmail.simulate("change", mockEvent);

      expect(MockSetEmail).toHaveBeenCalledWith("nic@gmail.com");
    });

    test("phoneNumber state updates with value of input upon change", () => {
      React.useState = jest.fn(() => ["", MockSetPhoneNumber]);
      const inputEmail = findByTestAttr(wrapper, "input-phone-number");
      const mockEvent = { target: { value: "+33667182291" } };
      inputEmail.simulate("change", mockEvent);

      expect(MockSetPhoneNumber).toHaveBeenCalledWith("+33667182291");
    });
  });

  describe("loginUser getCalled on button click", () => {
    test("dd", () => {
      const form = findByTestAttr(wrapper, "login-form");

      form.simulate("submit", { preventDefault() {} });
      expect(MockloginUser).toHaveBeenCalled();
    });
  });

  describe("Spinner", () => {
    test("shows spinner when loading is true", () => {
      const wrapper = setup({ ...props, loading: true });
      const spinner = findByTestAttr(wrapper, "spinner");
      expect(spinner.length).toBe(1);
    });

    test("hides spinner when loading is false", () => {
      const wrapper = setup(props);
      const spinner = findByTestAttr(wrapper, "spinner");
      expect(spinner.length).toBe(0);
    });
  });

  describe("redirect page when user is authenticated", () => {
    test("show Login page when user is not authenticated", () => {
      const loginComponent = findByTestAttr(wrapper, "component-login");
      expect(loginComponent.length).toBe(1);
    });

    test("redirect page when user is authenticated", () => {
      const wrapper = setup({ ...props, isAuthenticated: true });
      const loginComponent = findByTestAttr(wrapper, "component-login");
      expect(loginComponent.length).toBe(0);
    });
  });
});
