import { RefObject } from "react";
function useDropdownPosition(
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>
) {
  function getDropdownPosition() {
    if (!ref.current) {
      return { top: 0, left: 0 };
    }
    const rect = ref.current.getBoundingClientRect();
    const dropdownWidth = 240; // w-60 / 15rem / 240px

    // calculate the initial position
    let left = rect.left + window.scrollX;
    const top = rect.bottom + window.scrollY;

    // check if the dropdown goes off the right side of the screen
    if (left + dropdownWidth > window.innerWidth) {
      // if it does, align it to the right edge of the parent
      left = rect.right + window.scrollX - dropdownWidth;
      //   if still off-screen, align to the rigt edge of the viewport with some padding

      if (left < 0) {
        left = window.innerWidth - dropdownWidth - 16; // 16px padding
      }
    }

    // ensure dropdown does go off left side of the screen
    if (left < 0) {
      left = 16; // 16px padding
    }

    return { left, top };
  }

  return {
    getDropdownPosition,
  };
}

export default useDropdownPosition;
