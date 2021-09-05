import { shallow, ShallowWrapper } from "enzyme";
import { findByTestAttr } from "../../test/testUtils";
import Map from "../components/googlemap/Map";

const setup = () => shallow(<Map />);

describe("Map", () => {
  //   let wrapper: ShallowWrapper;
  //   beforeEach(() => {
  //     wrapper = setup();
  //   });

  //   const usertoken = localStorage.getItem("user");

  //   test("renders google map without error when is auth", () => {
  //     const wrapper = setup();
  //     const map = findByTestAttr(wrapper, "map");
  //     expect(map.length).toBe(1);
  //   });

  describe("spinner", () => {
    test("shows spinner  when loading", () => {
      const wrapper = setup();
      const spinner = findByTestAttr(wrapper, "spinner");
      expect(spinner.length).toBe(1);
    });

    // test("hides spinner  when is not loading", () => {
    //   const wrapper = setup();
    //   const spinner = findByTestAttr(wrapper, "spinner");
    //   expect(spinner.length).toBe(1);
    // });
  });
});
