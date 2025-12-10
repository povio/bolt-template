var DomUtils;
((DomUtils2) => {
  const KEYBOARD_INPUTS = /* @__PURE__ */ new Set(["button", "submit", "checkbox", "file", "image"]);
  DomUtils2.isKeyboardInput = (elem) => {
    return elem.tagName === "INPUT" && !KEYBOARD_INPUTS.has(elem.type) || elem.hasAttribute("contenteditable");
  };
  DomUtils2.isKeyboardEvent = (event) => {
    return event.nativeEvent instanceof KeyboardEvent;
  };
})(DomUtils || (DomUtils = {}));
export {
  DomUtils
};
