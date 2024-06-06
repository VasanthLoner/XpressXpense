import './style.css';
const Header = () => {
    const logoutClick = () => {
        alert('tata');
    }
return(
    <>
    <div className="navbar">
        <p className='logo' style={{color:'#fff'}}>XpressXpense</p>
        <p className='logout' onClick={logoutClick}>Logout</p>
    </div>
    </>
)
}
export default Header;