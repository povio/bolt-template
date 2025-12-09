import { jsx } from "react/jsx-runtime";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { Toast } from "./Toast.js";
const useToast = () => {
  const successToast = useCallback((params) => {
    toast.success(
      /* @__PURE__ */ jsx(
        Toast,
        {
          color: "success",
          ...params
        }
      ),
      {
        position: params.position,
        data: {
          variant: params.variant
        }
      }
    );
  }, []);
  const errorToast = useCallback((params) => {
    toast.error(
      /* @__PURE__ */ jsx(
        Toast,
        {
          color: "error",
          ...params
        }
      ),
      {
        position: params.position,
        data: {
          variant: params.variant
        }
      }
    );
  }, []);
  const warningToast = useCallback((params) => {
    toast.warning(
      /* @__PURE__ */ jsx(
        Toast,
        {
          color: "warning",
          ...params
        }
      ),
      {
        position: params.position,
        data: {
          variant: params.variant
        }
      }
    );
  }, []);
  const neutralToast = useCallback((params) => {
    toast.info(
      /* @__PURE__ */ jsx(
        Toast,
        {
          color: "neutral",
          ...params
        }
      ),
      {
        position: params.position,
        data: {
          variant: params.variant
        }
      }
    );
  }, []);
  return {
    successToast,
    errorToast,
    warningToast,
    neutralToast
  };
};
export {
  useToast
};
