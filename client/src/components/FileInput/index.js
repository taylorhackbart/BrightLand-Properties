import React from "react";

const noop = () => {};

const FileInput = ({ value, onChange = noop, ...rest }) => (
  <div>
    {/* {Boolean(value.length) && (
      <div>Selected files: {value.map(f => f.name).join(", ")}</div>
    )} */}
    <label>
      Select your Home Page Image...
      <input
        {...rest}
        // style={{ display: "none" }}
        type="file"
        onChange={e => {
          onChange([...e.target.files]);
          {console.log(e.target.files)}
        }}
      />
    </label>
  </div>
);

export default FileInput;