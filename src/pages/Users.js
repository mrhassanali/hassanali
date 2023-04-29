import { useEffect, useState } from 'react'
import Modal from '../components/Modal/Modal';
import { getSession } from "next-auth/react";
import Image from 'next/image';

export default function Users() {
    const[userList,setuserList]=useState([]);
    const[InputImage,setInputImage]=useState(); // uploading Image
   const [image, setImage] = useState(null);

    const handleImage = (e) => {
        const file = e.target.files[0];
        setInputImage(file);
        const fileReader = new FileReader();
        fileReader.onload = function (e) {
        //   console.log(e.target.result);
          setImage(e.target.result);
        };
        fileReader.readAsDataURL(file);
      };
      
      useEffect(()=>{
 fetch('/api/user', {
   method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
        // console.log(data);
        setuserList(data);
    }).catch((error) => console.log(error));

    },[]);

    const handleSubmit = (e)=>{
        e.preventDefault();
    }

         // input Event
  const inputEvent = (event) => {
    const { name, value } = event.target;
    seteditcategory((preValue) => {
      return {
        // preValue Return the obj that match to name and value
        ...preValue,
        [name]: value,
      };
    });
  };

  return (
   <>
    <div className='container mt-3'>

<div className="d-grid gap-2 d-md-flex justify-content-md-end">
  <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#addNewUser">Add New User</button>
</div>

        <table className="table fs-5">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Role</th>
      <th scope="col">Email</th>
      <th scope="col">Account Status</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {
        userList.map((element,index)=>{
            return(
                <tr key={index}>
                  <th>{element.userID}</th>
                  <td>{element.userName}</td>
                  <td>{element.role}</td>
                  <td>{element.emailAddress}</td>
                    <td>{element.accountStatus}</td>
                  <td>
                  <button type="button" className="btn btn-primary">Edit</button> &nbsp;
                  <button type="button" className="btn btn-danger">Delete</button>
                  </td>
                </tr>
            )
        })
    }
  </tbody>
</table>
    </div>



    <Modal dataTarget = "addNewUser" title={"Add New User"} modalSize={"modal-xl"}>
<form onSubmit={handleSubmit}>
  <div className="card p-3 shadow-sm p-3 mb-5 bg-body-tertiary rounded">

  <div className="row">
    <div className="col">
        <div className="input-group mb-3">
            <input type="file" className="form-control" id="inputGroupFile02"
            onChange={handleImage}/>
            <label className="input-group-text" htmlFor="inputGroupFile02"
            >Upload</label>
        </div>
    </div>
    <div className="col">{image && <Image src={image} alt="user" width="100px" height="100%" />}</div>
  </div>

  <div className="row">
  <div className="col">
  <label htmlFor="userName" className="form-label">UserName</label>
    <input type="text" className="form-control" id="userName" aria-describedby="userName"/>
</div>
  <div className="col">
  <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" aria-describedby="name"/>
  </div>
</div>

<div className="row">
  <div className="col">
  <label htmlFor="InputEmail1" className="form-label">Select user Role</label>
    <select defaultValue={'DEFAULT'} className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
        <option value={'DEFAULT'} >Select User</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
    </select>
  </div>
  <div className="col">
  <label htmlFor="accountStatus" className="form-label">Account Status</label>
    <select defaultValue={'DEFAULT'}  className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
        <option value={'DEFAULT'} >Select Account Status</option>
        <option value="active">Active</option>
        <option value="disabled">Disabled</option>
    </select>
   </div>
</div>



<div className="row">
  <div className="col">
  <label htmlFor="emailAddress" className="form-label">Email Address</label>
    <input type="email" className="form-control" id="emailAddress" aria-describedby="emailAddress"/>

  </div>
  <div className="col">
  <label htmlFor="password" className="form-label">Password</label>
  <input type="password" className="form-control" id="password" aria-describedby="password"/>

   </div>
</div>

      </div> 
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary">Add User</button>
      </div>
</form>
</Modal>
   </>
  )
}


export async function getServerSideProps({req,res}) {
  const session = await getSession({req});

  // if (!session) {
  //   res.setHeader('location', '/login');
  //   res.statusCode = 302;
  //   res.end();
  // }

  if (!session) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }


  return {
    props: {session},
  };
}