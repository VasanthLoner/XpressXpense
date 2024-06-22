import { useEffect } from 'react';
import { auth } from '../../firebase/firebase';
import './style.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

const Header = () => {
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
useEffect(()=>{
    if(user){
        navigate('/dashboard');
    }
},[user,loading])
    const logoutClick = () => {
        try{
            signOut(auth).then(() => {
                // Sign-out successful.
                toast.success('Logged Out Successfully!')
                navigate('/');
              }).catch((error) => {
                toast.error(error.message);

              });
        }
        catch(e){
        toast.error(e.message);
        }
     
    }
return(
    <>
    <div className="navbar">
        <p className='logo' style={{color:'#fff'}}>XpressXpense</p>
{user && 
        <p className='logout' onClick={logoutClick}>Logout</p>
}
    </div>
    </>
)
}
export default Header;