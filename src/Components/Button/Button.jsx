import './style.css';

const Button = ({text, onClick , green}) =>{
return(
    <div  className={green ? 'btn btn-green' : 'btn' } onClick={onClick}>{text}</div>
)
}
export default Button