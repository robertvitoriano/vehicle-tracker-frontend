import { renderHook } from "@testing-library/react";
import { act } from "react";
import { useInfiniteScroll } from "./useInfiniteScroll";

describe("useInfiniteScroll Hook", () => {
  it("should call fetchNextPage when scrolled to the bottom", () => {
    const fetchNextPage = jest.fn();
    const hasNextPage = true;
    const isFetchingNextPage = false;

    const container = document.createElement("div");
    container.style.height = "100px";
    container.style.overflow = "auto";
    container.scrollTop = 0;

    Object.defineProperty(container, "scrollHeight", {
      value: 200,
      writable: false,
    });

    document.body.appendChild(container);

    renderHook(() =>
      useInfiniteScroll({
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        containerSelector: "div",
      })
    );

    act(() => {
      container.scrollTop = 100; 
      container.dispatchEvent(new Event("scroll"));
    });

    expect(fetchNextPage).toHaveBeenCalledTimes(1);

    document.body.removeChild(container);
  });
});
