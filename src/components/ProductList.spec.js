import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductList from "./ProductList";

global.fetch = async () =>
  Promise.resolve({
    json: async () =>
      Promise.resolve([
        {
          title: "title",
          id: "id",
          image: "https://www.image1.com",
          price: 123,
        },
        {
          title: "title2",
          id: "id2",
          image: "https://www.image2.com",
          price: 300,
        },
      ]),
  });

describe("Loading ProductList", () => {
  it("shows a loader and some products", async () => {
    render(<ProductList />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(await screen.findByText("$123.00")).toBeInTheDocument();
    expect(await screen.findByText("$300.00")).toBeInTheDocument();
    expect(await screen.findByAltText("title")).toBeInTheDocument();
    expect(await screen.findByAltText("title2")).toBeInTheDocument();
  });
});

describe("Adding to cart", () => {
  it("updates the total when the Add To Cart buttons are pressed", async () => {
    render(<ProductList />);
    const btn1 = await screen.findByTestId("btn-id");
    const btn2 = await screen.findByTestId("btn-id2");
    userEvent.click(btn1);
    expect(await screen.findByText("Your Total: $123.00")).toBeInTheDocument();
    userEvent.click(btn2);
    expect(await screen.findByText("Your Total: $423.00")).toBeInTheDocument();
    userEvent.dblClick(btn2);
    expect(await screen.findByText("Your Total: $1023.00")).toBeInTheDocument();
  });
});

describe("Error when fetching", () => {
  it("shows an error message", async () => {
    global.fetch = async () =>
      Promise.resolve({
        json: async () => Promise.reject(new Error("Oops!")),
      });

    render(<ProductList />);
    expect(
      await screen.findByText("Ruh Roh, there was an error")
    ).toBeInTheDocument();
  });
});

// //Tests when there was a single item in the mock fetch call
// describe("Add to Cart", () => {
//   //Testing using findByRole and single click
//   it("updates the total once when the button is clicked once", async () => {
//     render(<ProductList />);
//     userEvent.click(await screen.findByRole("button"));
//     expect(await screen.findByText("Your Total: $123.00")).toBeInTheDocument();
//   });
//   //Testing using findByText and dblClick
//   it("updates the total twice when the button is clicked twice", async () => {
//     render(<ProductList />);
//     userEvent.dblClick(await screen.findByText("Add To Cart"));
//     expect(await screen.findByText("Your Total: $246.00")).toBeInTheDocument();
//   });
//   //Testing using findByTestID and running single click multiple times
//   it("adds to the total when a user adds to cart", async () => {
//     render(<ProductList />);
//     const btn = await screen.findByTestId("btn-id");
//     //first click
//     userEvent.click(btn);
//     expect(await screen.findByText("Your Total: $123.00")).toBeInTheDocument();
//     //second click
//     userEvent.click(btn);
//     expect(await screen.findByText("Your Total: $246.00")).toBeInTheDocument();
//   });
// });
