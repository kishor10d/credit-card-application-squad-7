export const ROLES = {
  USER: 0,
  APPROVER_1: 1,
  APPROVER_2: 2,
  APPROVER_3: 3
};

/**
 * Reusable FormField component for consistent styling and accessibility
 */
export const FormField = ({ label, id, type, name, value, onChange, onBlur, required, min, max, hint, refProp, pattern, title, readOnly }) => (
  <div style={{ marginBottom: '15px' }}>
    <label htmlFor={id} style={{ display: 'block', fontWeight: 'bold' }}>{label}</label>
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
       onBlur={onBlur}
      required={required}
      min={min}
      max={max}
      ref={refProp}
      pattern={pattern}
      title={title}
      readOnly={readOnly}
      aria-describedby={hint ? `${id}-hint` : undefined}
      style={{ 
        width: '100%', padding: '8px', marginTop: '5px', 
        backgroundColor: readOnly ? '#f0f0f0' : 'white',
        border: '1px solid #ccc', borderRadius: '4px' 
      }}
    />
    {hint && <small id={`${id}-hint`} style={{ color: '#666' }}>{hint}</small>}
  </div>
);