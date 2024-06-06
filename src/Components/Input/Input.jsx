import './style.css';

function Input({type, label, state, setState, placeholder }) {
    return (
      <div className='input_wrapper'>
        <p className='label_input'>{label}</p>
        <input
          type={type}
          value={state}
          placeholder={placeholder}
          className='custom_input'
          onChange={(e) => setState(e.target.value)}
        />
      </div>
    );
  }
export default Input 