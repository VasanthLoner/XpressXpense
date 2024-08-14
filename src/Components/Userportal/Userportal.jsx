import { useState } from "react";
import Input from "../Input/Input";
import "./style.css";
import Button from "../Button/Button";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db, provider } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore"; 

// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const Userportal = () => {
    const [fullName , setFullName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [confirmpassword , setConfirmpassword] = useState('');
    const [isloading , setIsloading] = useState(false);
    const [loginform , setLoginform] = useState(false);
    const navigate = useNavigate();


    function signupWithEmail() {
        setIsloading(true);
        if( fullName !== '' && email !== '' && password !== '' && confirmpassword !== ''){
            if(password == confirmpassword){
                createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  // Signed up 
                  const user = userCredential.user;
                //   console.log(user);
                  toast.success('user created');
                  setLoginform(true);
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

}
function loginWithEmail() {
console.log(email , password);
if(  email !== '' && password !== ''){
}
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    toast.success('user logged in');
    navigate('/dashboard');

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error('log in failed');

  });

}

async function createDoc(user) {
if (!user) return;

const userRef = doc(db, 'users', user.uid)
const userData = await getDoc(userRef);
if(!userData.exists()){
  try {
     await setDoc(doc(db, "users", user.uid), {  
    name : user.displayname ? user.displayname : fullName ,
    email : email,
    photoURL : user.photoURL ? user.photoURL : '',
    createdAt : new Date()
  })
toast.success('user doc created');
}
  catch(e){
console.log(e.message, 'error');
  }
//   finally{
// console.log('doc created');

//   }
}
else{
  toast.error('user doc already exists')
}
}

function googleAuth(){
try{
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    toast.success('user authenticated!');
    navigate('/dashboard');
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(error.message)
    // The email of the user's account used.
    // const email = error.customData.email;
    // The AuthCredential type that was used.
    // const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}
catch(e){
  toast.error(e.message)
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
        <Button disabled={isloading} onClick={loginWithEmail} text={isloading ? 'Loading...' : 'login using Email/Password'} />  {/**/}
        <Button disabled={isloading} onClick={googleAuth} text={isloading ? "Loading..." : 'login using Google'} green={true} />
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
        <Button disabled={isloading} onClick={googleAuth} text={isloading ? "Loading..." : 'signup using Google'} green={true} />
        <div className="p-login" onClick={()=> setLoginform(!loginform)}>Already have an account ? Click here.</div>
    </form>
</>
)}
    </div>
)
}
export default Userportal