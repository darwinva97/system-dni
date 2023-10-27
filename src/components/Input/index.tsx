import React, { ChangeEvent, HTMLProps } from "react";

export type TInputProps = Omit<HTMLProps<HTMLInputElement>, "onChange"> & {
  label?: string;
  alt?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({ label, alt, ...props }: TInputProps) => {
  return (
    <div className="form-control max-w-xs">
      {(label || alt) && (
        <label className="label">
          {label && <span className="label-text">{label}</span>}
          {alt && <span className="label-text-alt">{alt}</span>}
        </label>
      )}
      <input {...props} className="input input-bordered input-sm" />
      {/* <label className="label">
        <span className="label-text-alt">Bottom Left label</span>
        <span className="label-text-alt">Bottom Right label</span>
      </label> */}
    </div>
  );
};
