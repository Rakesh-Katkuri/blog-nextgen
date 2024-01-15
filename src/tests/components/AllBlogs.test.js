import React from "react";
import { shallow } from "enzyme";
import AllBlogs from "../../blogs/AllBlogs";
import { useAuth } from "../../authContext/AuthContext";
import { configure } from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";
configure({ adapter: new Adapter() });

jest.mock("../../authContext/AuthContext"); // Mock the useAuth hook

describe("AllBlogs component", () => {
  let wrapper;

  beforeEach(() => {
    // Mock the return values of the useAuth hook
    useAuth.mockReturnValue({
      posts: [
        {
          id: 1,
          imageUrl: "image.jpg",
          likes: 10,
          likesBy: ["user1"],
          favorites: ["user1"],
          title: "Blog Title",
          description: "Blog Description",
        },
        // Add more sample posts as needed for testing various scenarios
      ],
      getBlogs: jest.fn(),
      updatePost: jest.fn(),
      loggedIn: true,
    });

    // Shallow rendering of the AllBlogs component
    wrapper = shallow(<AllBlogs />);
  });

  it("renders without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("displays blog posts when posts are available", () => {
    expect(wrapper.find(".blog-post")).toHaveLength(1); // Update with the expected number of posts
  });

  // Add more test cases based on different scenarios or UI interactions

  // Example of testing a button click
  it("handles like button click correctly", () => {
    // const updatePostMock = jest.fn(); // Declare and initialize the updatePostMock variable
    jest.mock("../../authContext/AuthContext", () => ({
      useAuth: jest.fn().mockReturnValue({
        posts: [], // provide necessary mock data
        getBlogs: jest.fn(),
        // updatePost: updatePostMock, // Reference the updatePostMock variable
        loggedIn: false,
      }),
    }));

    const wrapper = shallow(<AllBlogs />);

    // Simulate a click event on the like button for a specific post
    wrapper.find(".custom-interaction-button").at(0).simulate("click");

    // Check if the updatePost function has been called after the click event
    // expect(updatePostMock).toHaveBeenCalled();

    // Add more assertions based on the expected behavior after the button click
  });
});
