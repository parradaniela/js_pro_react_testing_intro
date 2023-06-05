import { screen, render } from "@testing-library/react";
import WelcomeBanner from "./WelcomeBanner";

describe("WelcomeBanner", () => {
  // TODO: write a series of tests for the <WelcomeBannerComponent/>
  it("gives the correct greeting when a first name is present and NOT returning", () => {
    render(<WelcomeBanner firstName="Jack" isReturning={false} />);
    expect(screen.getByText("Welcome, Jack")).toBeInTheDocument();
  });
  it("gives the correct greeting when a first name is present and IS returning", () => {
    render(<WelcomeBanner firstName="Jack" isReturning={true} />);
    expect(screen.getByText("Welcome Back, Jack")).toBeInTheDocument();
  });
  it("gives the correct greeting when NO first name is present and NOT returning", () => {
    render(<WelcomeBanner firstName="" isReturning={false} />);
    expect(screen.getByTestId("greeting")).toBeInTheDocument();
    expect(screen.getByText("Welcome!")).toBeInTheDocument();
  });
  it("gives the correct greeting when NO first name is present and IS returning", () => {
    render(<WelcomeBanner firstName="" isReturning={true} />);
    expect(screen.getByText("Welcome Back!")).toBeInTheDocument();
  });

  // TODO: consolidate the tests above by using a truth table implementation
  describe("WelcomeBanner", () => {
    it("gives the correct welcome", () => {
      const tests = [
        //firstName, isReturning, expectedOutput
        ["Jack", true, "Welcome Back, Jack"],
        ["Jack", false, "Welcome, Jack"],
        ["", true, "Welcome Back!"],
        ["", false, "Welcome!"],
      ];
      tests.forEach((test) => {
        const [firstName, isReturning, expectedOutput] = test;
        render(
          <WelcomeBanner firstName={firstName} isReturning={isReturning} />
        );
        expect(screen.getByText(expectedOutput)).toBeInTheDocument();
      });
    });
  });
});
