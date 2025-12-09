import { cva } from "class-variance-authority";
const typography = cva("", {
  variants: {
    size: {
      "headline-1": "md:text-desktop-headline-1",
      "title-1": "md:text-desktop-title-1",
      "title-2": "md:text-desktop-title-2",
      "title-3": "md:text-desktop-title-3",
      "title-4": "md:text-desktop-title-4",
      "title-5": "md:text-desktop-title-5",
      "title-6": "md:text-desktop-title-6",
      "body-1": "md:text-desktop-body-1",
      "body-2": "md:text-desktop-body-2",
      "body-3": "md:text-desktop-body-3",
      "body-4": "md:text-desktop-body-4",
      "label-1": "md:text-label-1",
      "label-2": "md:text-label-2",
      "label-3": "md:text-label-3"
    },
    sizeMobile: {
      "headline-1": "text-mobile-headline-1",
      "title-1": "text-mobile-title-1",
      "title-2": "text-mobile-title-2",
      "title-3": "text-mobile-title-3",
      "title-4": "text-mobile-title-4",
      "title-5": "text-mobile-title-5",
      "title-6": "text-mobile-title-6",
      "body-1": "text-mobile-body-1",
      "body-2": "text-mobile-body-2",
      "body-3": "text-mobile-body-3",
      "body-4": "text-mobile-body-4",
      "label-1": "text-label-1",
      "label-2": "text-label-2",
      "label-3": "text-label-3"
    },
    variant: {
      default: "",
      "prominent-1": "",
      "default-italic": "italic",
      "prominent-1-italic": "italic",
      "prominent-2": "",
      "prominent-2-italic": "italic"
    }
  },
  compoundVariants: [
    {
      size: ["headline-1", "title-1", "title-2", "title-3", "title-4", "title-5", "title-6"],
      className: "font-geist"
    },
    {
      size: ["body-1", "body-2", "body-3", "body-4", "label-1", "label-2", "label-3"],
      className: "font-inter"
    },
    {
      size: [
        "headline-1",
        "title-1",
        "title-2",
        "title-3",
        "title-4",
        "title-5",
        "title-6",
        "label-1",
        "label-2",
        "label-3"
      ],
      variant: ["default", "default-italic"],
      className: "font-medium"
    },
    {
      size: [
        "headline-1",
        "title-1",
        "title-2",
        "title-3",
        "title-4",
        "title-5",
        "title-6",
        "label-1",
        "label-2",
        "label-3"
      ],
      variant: ["prominent-1", "prominent-1-italic"],
      className: "font-semibold"
    },
    {
      size: ["body-1", "body-2", "body-3", "body-4"],
      variant: ["prominent-1", "prominent-1-italic"],
      className: "font-medium"
    },
    {
      size: ["body-1", "body-2", "body-3", "body-4"],
      variant: ["prominent-2", "prominent-2-italic"],
      className: "font-semibold"
    }
  ]
});
export {
  typography
};
