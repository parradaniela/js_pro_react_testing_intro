import { screen, render } from "@testing-library/react";
import WelcomeBanner from "./WelcomeBanner";

describe("WelcomeBanner", () => {
  //   it("greets a user that has a first name and is returning", () => {
  //     render(<WelcomeBanner firstName="Jack" isReturning={true} />);
  //     // we should see the following greeting "Welcome Back, Jack"
  //     expect(screen.getByText("Welcome Back, Jack")).toBeInTheDocument();
  //     expect(screen.getByTestId("greeting")).toBeInTheDocument();
  //   });
  //   it("greets a user that has a first name but is NOT returning", () => {
  //     render(<WelcomeBanner firstName="Jack" isReturning={false} />);
  //     expect(screen.getByText("Welcome, Jack")).toBeInTheDocument();
  //   });
  //   it("greets a user that has NO first name but IS returning", () => {
  //     render(<WelcomeBanner firstName="" isReturning={true} />);
  //     expect(screen.getByText("Welcome Back!")).toBeInTheDocument();
  //   });
  //   it("greets a user that has NO first name and is NOT returning", () => {
  //     render(<WelcomeBanner firstName="" isReturning={false} />);
  //     expect(screen.getByText("Welcome!")).toBeInTheDocument();
  //   });

  it("Gives the correct welcome based on first name and returning status", () => {
    const tests = [
      // [firstName, isReturning, expectedGreeting]
      ["Jack", true, "Welcome Back, Jack"],
      ["Jack", false, "Welcome, Jack"],
      [null, true, "Welcome Back!"],
      [null, false, "Welcome!"],
    ];

    for (let test of tests) {
      const [firstName, isReturning, expectedGreeting] = test;
      render(<WelcomeBanner firstName={firstName} isReturning={isReturning} />);
      expect(screen.getByText(expectedGreeting)).toBeInTheDocument();
    }
  });
});
