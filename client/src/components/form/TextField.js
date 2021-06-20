import { useField, ErrorMessage} from "formik"

const TextField = ({...props}) => {
  const [field, meta] = useField(props)
  const {name} = field;
  console.log(meta)
  return (
    <div className="form-group position-relative">
      <input
      className={`form-control
        ${meta.touched && meta.error && 'is-invalid'}
        ${meta.value && !meta.error && 'is-valid'}`
      }
      {...field} {...props} />
      <ErrorMessage component="div" className="error text-danger" name={field.name}/>
    </div>
  )
}

export default TextField;
