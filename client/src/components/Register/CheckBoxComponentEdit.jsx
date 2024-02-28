import React from "react";
import { Wrapper, CheckBox, Label } from "./CheckBoxComponentEdit.style";

const CheckBoxButtonComponentEdit = ({ name, id, label, arrayHelpers }) => (
  <Wrapper>
    <CheckBox
      type="checkbox"
      name={name}
      id={id}
      onClick={() => {
        let topics = arrayHelpers.form.values.topics;
        if (topics.includes(name)) {
          topics.forEach((tag, index) => {
            if (tag === name) {
              arrayHelpers.remove(index);
            }
          });
        } else {
          arrayHelpers.push(name);
        }
      }}
    />
    <Label htmlFor={id}>{label}</Label>
  </Wrapper>
);

export default CheckBoxButtonComponentEdit;
