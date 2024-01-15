import React from "react";
import { shallow } from "enzyme";
import AddBlog from "../../blogs/AddBlog"; // Replace with the correct path
import { configure } from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";
configure({ adapter: new Adapter() });

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => navigateMock,
}));
jest.mock("../../authContext/AuthContext", () => ({
  useAuth: jest.fn(), // Mock useAuth
}));
describe("AddBlog Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AddBlog />);
  });

  it("renders the form for adding a blog correctly", () => {
    expect(wrapper.find(".form_container")).toHaveLength(1); // Assuming the form_container class exists
    expect(wrapper.find('input[name="imageUrl"]')).toHaveLength(1); // Assuming an input for imageUrl exists
    expect(wrapper.find('input[name="title"]')).toHaveLength(1); // Assuming an input for title exists
    expect(wrapper.find('textarea[name="description"]')).toHaveLength(1); // Assuming a textarea for description exists
    expect(wrapper.find("button").text()).toBe("Post Blog"); // Assuming the button text is 'Post Blog'
  });

  it("updates state on input change", () => {
    const imageUrlInput = wrapper.find('input[name="imageUrl"]');
    imageUrlInput.simulate("change", {
      target: { name: "imageUrl", value: "https://example.com/image.png" },
    });

    const titleInput = wrapper.find('input[name="title"]');
    titleInput.simulate("change", {
      target: { name: "title", value: "Sample Title" },
    });

    const descriptionTextarea = wrapper.find('textarea[name="description"]');
    descriptionTextarea.simulate("change", {
      target: { name: "description", value: "Sample Description" },
    });

    expect(wrapper.state("posts")).toEqual({
      likes: 0,
      likesBy: [],
      favorites: [],
      imageUrl: "https://example.com/image.png",
      title: "Sample Title",
      description: "Sample Description",
    });
  });

  it('calls handlePost when the "Post Blog" button is clicked', () => {
    const handlePostMock = jest.fn();
    wrapper.instance().handlePost = handlePostMock;

    const button = wrapper.find("button");
    button.simulate("click");
    expect(handlePostMock).toHaveBeenCalled();
  });

  it("navigates to /all-blogs after posting the blog", () => {
    const navigateMock = jest.fn();

    const handlePostMock = jest.fn();
    wrapper.instance().handlePost = handlePostMock;

    const button = wrapper.find("button");
    button.simulate("click");
    expect(navigateMock).toHaveBeenCalledWith("/all-blogs");
  });
});
