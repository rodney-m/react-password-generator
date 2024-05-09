function Checkbox(props) {
    const { value, name, label, onChange } = props;
  
    return (
      <div className="checkbox-wrapper">
        <input type="checkbox" checked={value} name={name} id={name} onChange={onChange} />
        <label htmlFor={name}>{label}</label>
      </div>
    );
  }
  
  export default Checkbox;