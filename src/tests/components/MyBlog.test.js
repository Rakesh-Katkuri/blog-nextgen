import React from "react";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import MyBlog from "../../blogs/MyBlog";
import { useAuth, AuthProvider } from "../../authContext/AuthContext";

import { configure } from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";
configure({ adapter: new Adapter() });

jest.mock("../../authContext/AuthContext", () => ({
  __esModule: true,
  useAuth: jest.fn(),
}));
const mockUseAuth = jest.fn(); // Implement mock behavior here if needed
useAuth.mockImplementation(mockUseAuth);
describe("MyBlog Component", () => {
  it("renders MyBlog component correctly", async () => {
    const posts = [
      // Mock data for posts
      {
        id: 1,
        title: "Post 1",
        imageUrl: "post1.jpg",
        userId: "user1",
        description: "Description 1",
      },
      {
        id: 2,
        title: "Post 2",
        imageUrl: "post2.jpg",
        userId: "user2",
        description: "Description 2",
      },
    ];

    const getMyBlogs = jest.fn(() => Promise.resolve(posts));
    const deletePost = jest.fn();

    // Mock useAuth hook return values
    const mockUseAuth = () => ({
      posts,
      getMyBlogs,
      deletePost,
    });

    // Provide mocked values for useAuth hook
    AuthProvider.useAuth.mockImplementation(mockUseAuth);

    const wrapper = mount(
      <MemoryRouter>
        <MyBlog />
      </MemoryRouter>
    );

    // Wait for posts to be loaded/rendered
    await Promise.resolve();

    wrapper.update();

    expect(wrapper.find(".col-md-4").length).toBe(posts.length);
  });

  // Add more test cases as needed for different scenarios in MyBlog component
});
