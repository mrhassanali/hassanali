
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
// import { AppContext } from '../context/AppContext';
// import { useContext } from 'react';

import { getSession, signIn } from "next-auth/react";
import Image from 'next/image';

export default function Login() {
  const router= useRouter();


  const handleSubmit=  (e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        emailAddress:data.get('emailAddress'),
        password:data.get('password')
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      }
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        localStorage.setItem('token',data.token);
        const signFunc = async (response) => {
          let d = await signIn("credentials", {
            redirect: false,
            token:response.token,
            status:response.success
          });
          // console.log(d);
        };
        signFunc(data);
        
        router.push("/");

        if(data.success){
          toast.success('🦄 Login Successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            }); 
            // updateState(data.token);
            // setTimeout(()=>{
              
            // },1000)
        }else{
          toast.error('😡invalid Credential', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }
     
      })
      .catch((error) => console.log(error));
  
  }

  return (
    <div className='myForm'>
    <div className="form-signin w-100 m-auto">
      <form onSubmit={handleSubmit}>
        <Image className="rounded mx-auto d-block" src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
        <h1 className="h3 mx-auto d-block text-center">Please sign in</h1>
    
        <div className="form-floating">
          <input type="email" className="form-control" id="emailAddress" name="emailAddress" placeholder="name@example.com"/>
          <label htmlFor="emailAddress">Email address</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="password" name="password" placeholder="Password"/>
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
      </form>
    </div>
    </div>
  )
}



export async function getServerSideProps({req,res}) {
  const session = await getSession({req});
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {session},
  };
}
