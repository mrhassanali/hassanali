import { useState,useEffect } from "react";
import Image from "next/image";


import { useRouter } from "next/router";
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import { getSession } from "next-auth/react";
// import withSession from '../lib/session'

export default function AddPost() {
  const {user, authenticated  } = useContext(AppContext);
  const router= useRouter();

  const [content, setContent] = useState('');
  const [InputImage, setInputImage] = useState();
  
  const [keywordcount,setkeywordcount] = useState(0);
  const [descriptioncount,setdescriptioncount] = useState(0);

  
    useEffect(()=>{
    let UploadImage = document.getElementById('UploadImage');
    let PreviewImage = document.getElementById('PreviewImage');
    UploadImage.addEventListener('change', function (event) {
    //check file is upload or not
    if (event.target.files.length == 0) {
        return;
    } else {
        var url = URL.createObjectURL(event.target.files[0]);
        // console.log(url);
        PreviewImage.setAttribute('src', url);
        // PreviewImage.setAttribute('style', 'width:300px;height:300px;');
    }
},[]);



const textareas = document.querySelectorAll(".letter-counter");

textareas.forEach(textarea => {
  const charCount = textarea.nextElementSibling; // get the p element next to textarea
  textarea.addEventListener("input", () => {
    const length = textarea.value.length;
    charCount.textContent = length;
    if (length > 160) {
      charCount.style.color = "red"; // set color to red if length is greater than 160
    } else {
      charCount.style.color = "green"; // set color back to initial if length is less than or equal to 160
    }
  });
});



    },[]);




  
  const handleSubmit = (e)=>{
    e.preventDefault(); 

    const formData = new FormData();
    const data = new FormData(e.target);
    const fileField = document.querySelector('input[type="file"]');
    formData.append('title', data.get('title'));
    formData.append('keyword', data.get('keywords'));
    formData.append('description', data.get('description'));
    formData.append('slug', (data.get('slug').trim()).toLowerCase());
    formData.append('status', 'Published');
    formData.append('content', document.getElementById("postContent").value);
    formData.append('image', InputImage);
    formData.append('category_id', 1);
    formData.append('authorID', 46);
    
    
    fetch('/api/post/newpost',{
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

    e.target.reset();
  }

  return (
    <>
<div className="container mt-5">
  <form className="needs-validation" noValidate="" onSubmit={handleSubmit}>
     <div className="row g-5">
       <div className="col-md-7 col-lg-8">
 
 
 
 
     <div className="row g-3">
       <div className="mb-3">
           <label htmlFor="postTitle" className="form-label fs-3 fw-bold">Post Title</label>
           <input type="text" className="form-control fs-4" id="title" name="title" placeholder="Post Title"/>
       </div>
       <div className="d-flex justify-content-between">
           <h3 className="fw-bold">Post Content</h3>
         </div>
 
         {/* Content is Placed Here */}
         <div id="content">
         <div className="form-floating">
   <textarea className="form-control fs-4 border border-primary" placeholder="Start Writing Post" id="postContent" style={{height: "600px"}}></textarea>
   <label htmlFor="postContent">Start Writing Post</label>
 </div>
         </div>
     </div>
       </div>
       {/* Side */}
       <div className="col-md-5 col-lg-4 order-md-last">
       <ul className="list-group mb-4">
         <li className="list-group-item">
             <div className="d-flex justify-content-between align-items-center">
               <h6 className="my-0 fs-4">Post</h6>
               <div className="d-grid gap-1 d-md-flex justify-content-md-end">
                 <button className="btn btn-secondary" type="button">Draft</button>
                 <button className="btn btn-success" type="submit">Publish</button>
               </div>
             </div>
           </li>
       </ul>
 
 
         <h4 className="d-flex justify-content-between align-items-center mb-3">
           <span className="text-primary">SEO</span>
           <span className="badge bg-primary rounded-pill">3</span>
         </h4>
         <ul className="list-group mb-4">
         <li className="list-group-item">
             <div className="d-flex justify-content-between align-items-center">
               <h6 className="my-0">Status</h6>
               <small className="d-inline-flex px-2 py-1 fw-semibold text-success-emphasis bg-success-subtle border border-success-subtle rounded-2">Draft</small>
             </div>
           </li>
 
           <li className="list-group-item">
             <div>
               <h6 className="my-0">Meta Keyword</h6>
               <textarea className="form-control mt-2 letter-counter" id="keywords" name="keywords" placeholder="Enter meta tag keywords"
               onChange={(e)=>setkeywordcount(e.target.value.length)}></textarea>
               <p style={{float:"right"}}>{keywordcount}</p>
             </div>
           </li>
           <li className="list-group-item">
             <div>
               <h6 className="my-0">Meta Description</h6>
               <textarea className="form-control mt-2 letter-counter" id="description" name="description" placeholder="Enter meta tag keywords"
               onChange={(e)=>setdescriptioncount(e.target.value.length)}></textarea>
               <p style={{float:"right"}}>{descriptioncount}</p>
             </div>
           </li>
           
           <li className="list-group-item">
             <div>
               <h6 className="my-0">Post Slug</h6>
               <input type="text" className="form-control fs-7 mt-2" id="slug" name="slug" placeholder="post-slug"/>
             </div>
           </li>
           
           <li className="list-group-item">
             <div>
               <h6 className="my-0">Select Category</h6>
               <select className="form-select mt-2" defaultValue={"DEFAULT"} name="category" aria-label="Default select example">
                 <option value="DEFAULT" disabled>Open this select menu</option>
                 <option value="1">One</option>
                 <option value="2">Two</option>
                 <option value="3">Three</option>
                 </select>
             </div>
           </li>

           <li className="list-group-item">
             <div>
               <h6 className="my-0">Author</h6>
               <select className="form-select mt-2" defaultValue={"DEFAULT"} name="authorID" aria-label="Default select example">
                 <option value="DEFAULT" disabled>SELECT Author</option>
                 <option value="46" >Hassan Ali</option>
                 
                 </select>
             </div>
           </li>

         </ul>
         
 
         <div>
             <h3>Featured Image</h3>
             <div className="input-group mb-3">
             <label className="input-group-text" htmlFor="inputGroupFile01">Upload</label>
             <input type="file" className="form-control" name="post_featured_image" id="UploadImage" accept="image"
             onChange={(e)=>setInputImage(e.target.files[0])}/>
         </div>
 
         <ul className="list-group mb-4">
           <li className="list-group-item">
               <div><Image id="PreviewImage" alt="preview" width="100%" height="100%"/> </div>
           </li>
         </ul>
         </div>
       </div>
     </div>
     </form>
 </div>
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
        destination: '/',
        permanent: false,
      },
    }
  }


  return {
    props: {session},
  };
}


