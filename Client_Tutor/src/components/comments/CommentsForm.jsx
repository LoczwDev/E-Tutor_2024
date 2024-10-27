import { BrushRounded } from "@mui/icons-material";
import React, { useState } from "react";

const CommentsForm = ({
  btnLabel,
  formSubmitHanlder,
  formCancel = null,
  contentComment = "",
  loading = false,
}) => {
  const [value, setValue] = useState(contentComment);
  const submitHanlder = (e) => {
    e.preventDefault();
    formSubmitHanlder(value);
    setValue("");
  };
  // console.log(formCancel);
  return (
    <form onSubmit={submitHanlder}>
      <div className="flex flex-col items-end border border-primary rounded-lg p-4 ">
        <textarea
          className="w-full focus:outline-none resize-none dark:bg-base-100 dark:text-dark-light"
          placeholder="Hãy để lại bình luận tại đây..."
          rows="5"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex items-center gap-x-2 pt-2">
          {formCancel && (
            <button
              className="px-6 py-2.5 mt-2 rounded-lg border border-red-500 text-red-500"
              onClick={formCancel}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading || value === ""}
            className="px-6 py-2.5 rounded-lg bg-primary text-white font-semibold mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {btnLabel}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentsForm;
