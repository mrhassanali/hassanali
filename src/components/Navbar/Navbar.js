import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image';
import { useState,useEffect  } from 'react';
import { AppContext } from '../../context/AppContext';
import { useContext, useTransition } from 'react';

import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const {user, authenticated,Logout  } = useContext(AppContext);
  const router= useRouter();

  const [isLoading, setIsLoading] = useState(true);

  const { data:session,status } = useSession();
  // console.log(data?.user.name);
    // console.log(session.user.name)
    // console.log(status)

    // useEffect(() => {
    //   if (session) {
    //     setIsLoading(false);
    //   }
    // }, [session]);
  
    // if (isLoading) {
    //   return <div>Loading...</div>;
    // }

  
  return ( 
  <header>
    <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          {/* <img src="https://images.unsplash.com/photo-1680363470732-4760c2a2a777" alt="Logo" width="30" height="24" className="d-inline-block align-text-top"/>&nbsp; */}
          <span className='ms-4 fw-bold'>BrainlyMCQs</span>
        </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 fs-5">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/page/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/page/contact">Contact</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/page/privacy" as="/page/privacy-policy" passHref>Privacy Policy</Link>
              </li>
<li className="nav-item dropdown">
<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
Featured
</a>
<div className="dropdown-menu" aria-labelledby="navbarDropdown">
<a className="dropdown-item" href="#">Action</a>
<a className="dropdown-item" href="#">Another action</a>
<div className="dropdown-divider"></div>
<a className="dropdown-item" href="#">Something else here</a>
</div>
</li>
             
{
(status == 'authenticated')?(
  <li className="nav-item dropdown">
  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    Post
  </a>
  <ul className="dropdown-menu">
    <li><Link className="dropdown-item" href="/Post">Posts</Link></li>
    <li><Link className="dropdown-item" href="/Category">Category</Link></li>
    <li><Link className="dropdown-item" href="/AddPost">Add New Post</Link></li>
    <li><hr className="dropdown-divider"/></li>
    <li><Link className="dropdown-item" href="/Users">Users</Link></li>
  </ul>
</li>
):null
}

            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form> &nbsp;
            

 <div className="d-flex">

 {
(status == 'authenticated')? (<button type="button" className="btn btn-primary ms-2" onClick={()=>Logout()}>Logout</button>
):(<Link href="/Login"><button type="button" className="btn btn-primary ms-2">Login</button></Link>
)     
            }

</div>           

          </div>
        </div>
    </nav>
  </header>
  )
}
