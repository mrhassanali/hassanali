import Link from "next/link";
import Image from "next/image";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {  
    let handleSubmit=  (e)=>{
        e.preventDefault();
        const formData = new FormData();
        const data = new FormData(e.target);
        let dt = {
          name:data.get('name'),
          email:data.get('email'),
          message:data.get('message'),
          address:data.get('address')
        }

        // console.log(dt)
        // const response = await fetch(process.env.SPREADSHEET,{
        //   method:"POST",
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type':'application/json'
        //   },
        //   body:JSON.stringify(dt)
        // });
        
        // const content = await response.json();

  fetch(process.env.SPREADSHEET, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(dt),
  })
    .then((response) => response.json())
    .then((result) => {
      // console.log(result);
      if(result.data.updates.updatedRows == 1){
        toast.success('Your Message Submitted Successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          // console.log(content)
      }else{
        toast.error('Something Went Wrong!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }

    }).catch((error) => console.log(error));

       
        // alert(content.data);
            // console.log(content)

        e.target.reset();
      }



    return (
        <>
        {/* <div className="container mt-3 fs-5">
            <p>If you have any query regrading Site, Advertisement and any other issue, please feel free 
                to contact at email <b>hassanalikhan417@gmail.com</b> or fill blow form.</p>
        </div> */}

        <div className="container my-3 shadow p-3 mb-5 bg-body-tertiary rounded mt-5">
    <form className="row g-3" onSubmit={handleSubmit}>

<h2 className="text-center">Contact Us Form</h2>
<div className="row g-2">
  <div className="col-md">
    <div className="form-floating">
      <input type="text" className="form-control" id="name" name="name" maxLength="100" placeholder="Enter Your Name" required/>
      <label htmlFor="floatingInputGrid">Name</label>
    </div>
  </div>
  <div className="col-md">
    <div className="form-floating">
      <input type="email" className="form-control" id="email" name="email" maxLength="100" placeholder="name@example.com" required/>
      <label htmlFor="emailAddress">Email address</label>
    </div>    
  </div>
</div>
        
<div className="col-12 form-floating">
  <textarea className="form-control" placeholder="Leave a Message here" id="message" name="message" maxLength="500" style={{height:"100px"}}></textarea>
  <label htmlFor="message">Message</label>
</div>


<div className="col-12">
    <label htmlFor="inputAddress" className="form-label">Address</label>
    <input type="text" className="form-control" id="address" name="address" placeholder="1234 Main St"  maxLength="200" required/>
</div>
<div className="col-12">
    <button type="submit" className="btn btn-primary">Submit Form</button>
</div>
    </form>
    </div>
        </>      
    );
}

export default Contact;