import React, { ChangeEvent, HTMLProps } from "react";

export type TTextareaProps = Omit<
  HTMLProps<HTMLTextAreaElement>,
  "onChange"
> & {
  label?: string;
  alt?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export const Textarea = ({ label, alt, ...props }: TTextareaProps) => {
  return (
    <div className="form-control max-w-xs">
      {(label || alt) && (
        <label className="label">
          {label && <span className="label-text">{label}</span>}
          {alt && <span className="label-text-alt">{alt}</span>}
        </label>
      )}

      <textarea
        className="textarea textarea-bordered textarea-sm"
        {...props}
      ></textarea>
      {/* <label className="label">
        <span className="label-text-alt">Bottom Left label</span>
        <span className="label-text-alt">Bottom Right label</span>
      </label> */}
    </div>
  );
};
