import { jsx } from "react/jsx-runtime";
import { useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { Toast } from "./Toast.js";
const useToast = () => {
  const successToast = useCallback((params, options) => {
    return toast.success(
      /* @__PURE__ */ jsx(
        Toast,
        {
          color: "success",
          ...params
        }
      ),
      {
        ...options,
        position: params.position,
        data: {
          variant: params.variant
        }
      }
    );
  }, []);
  const errorToast = useCallback((params, options) => {
    return toast.error(
      /* @__PURE__ */ jsx(
        Toast,
        {
          color: "error",
          ...params
        }
      ),
      {
        ...options,
        position: params.position,
        data: {
          variant: params.variant
        }
      }
    );
  }, []);
  const warningToast = useCallback((params, options) => {
    return toast.warning(
      /* @__PURE__ */ jsx(
        Toast,
        {
          color: "warning",
          ...params
        }
      ),
      {
        ...options,
        position: params.position,
        data: {
          variant: params.variant
        }
      }
    );
  }, []);
  const neutralToast = useCallback((params, options) => {
    return toast.info(
      /* @__PURE__ */ jsx(
        Toast,
        {
          color: "neutral",
          ...params
        }
      ),
      {
        ...options,
        position: params.position,
        data: {
          variant: params.variant
        }
      }
    );
  }, []);
  const closeToast = useCallback((id) => {
    toast.dismiss(id);
  }, []);
  return useMemo(
    () => ({
      successToast,
      errorToast,
      warningToast,
      neutralToast,
      closeToast
    }),
    [successToast, errorToast, warningToast, neutralToast, closeToast]
  );
};
export {
  useToast
};
