import React, { useState } from 'react'
import { useField, ErrorMessage} from "formik"

const SelectField = ({...props}) => {
  const [field, meta] = useField(props)
  return (
    <div className="form-group position-relative">
      <select
      className={`custom-select
        ${meta.touched && meta.error && 'is-invalid'}
        ${meta.value && !meta.error && 'is-valid'}`
      }
       {...field} {...props}
      >
        <option selected>Open this select menu</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <ErrorMessage component="div" className="error text-danger" name={field.name} />
    </div>
  )
}

export default SelectField;
