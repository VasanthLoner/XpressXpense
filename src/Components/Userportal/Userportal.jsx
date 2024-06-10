import { useState } from "react";
import Input from "../Input/Input";
import "./style.css";
import Button from "../Button/Button";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
const Userportal = () => {
    const [fullName , setFullName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [confirmpassword , setConfirmpassword] = useState('');
    const [isloading , setIsloading] = useState(false);
    const [loginform , setLoginform] = useState(false);
 
    function signupWithEmail() {
        setIsloading(true);
        if( fullName !== '' , email !== '' , password !== '' , confirmpassword !== ''){
            if(password == confirmpassword){
                createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  // Signed up 
                  const user = userCredential.user;
                //   console.log(user);
                  toast.success('user created');
                  createDoc(user);
                    setFullName('');
                    setEmail('');
                    setPassword('');
                    setConfirmpassword('');

                  setIsloading(false);
                  // ...
                })
                .catch((error) => {
                  const errorCode = error.code;
                //   const errorMessage = ;
                  // ..
                  toast.error(error.message);
                  setIsloading(false);
              
                });
            }
            else{
                toast.error("please verify password & confirm password ");
                setIsloading(false);

            }

  
    }
    else{
        setIsloading(false);
     toast.error('all fields are mandatory');
    }
    function createDoc(user) {
        
    }

}


return(
    <div className="Login_wrapper">
        {loginform ? (
            <>
       <h2 className="title">Login to <span style={{color:"var(--theme)"}}> XpressXpense</span></h2>
    <form action="">
        <Input type={'email'} label={'Email'} state={email} setState={setEmail} placeholder={'abc@xyz.com'}/>
        <Input type={'password'} label={'Passsword'} state={password} setState={setPassword} placeholder={'********'}/>
        <Button disabled={isloading} text={isloading ? 'Loading...' : 'login using Email/Password'} />  {/* onClick={loginWithEmail} */}
        <Button disabled={isloading} text={isloading ? "Loading..." : 'login using Google'} green={true} />
        <div className="p-login" onClick={()=> setLoginform(!loginform)}>Don't have an account ? Click here.</div>
    </form>
</>) :
        (
<>
       <h2 className="title">Signup on <span style={{color:"var(--theme)"}}> XpressXpense</span></h2>
    <form action="">
        <Input type={'text'} label={'Full Name'} state={fullName} setState={setFullName} placeholder={'Name'}/>
        <Input type={'email'} label={'Email'} state={email} setState={setEmail} placeholder={'abc@xyz.com'}/>
        <Input type={'password'} label={'Passsword'} state={password} setState={setPassword} placeholder={'********'}/>
        <Input type={'password'} label={'Confirm Password'} state={confirmpassword} setState={setConfirmpassword} placeholder={'********'}/>
        <Button disabled={isloading} text={isloading ? 'Loading...' : 'signup using Email/Password'} onClick={signupWithEmail}/>
        <div style={{margin:'15px auto 0 auto',textAlign:'center'}}>or</div>
        <Button disabled={isloading} text={isloading ? "Loading..." : 'signup using Google'} green={true} />
        <div className="p-login" onClick={()=> setLoginform(!loginform)}>Already have an account ? Click here.</div>
    </form>
</>
)}
    </div>
)
}
export default Userportal