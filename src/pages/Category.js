import { useState,useEffect } from "react";
import Modal from "../components/Modal/Modal";
import { getSession } from "next-auth/react";



export default function Category({categoryData}) {
  const[category,setcategory] = useState(categoryData);
  const[editcategory,seteditcategory] = useState([]);

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
 
  const setCategoryState = (element)=>{
    seteditcategory(element);
  }

  //Handle Edit Category Submit Form
  const edithandleSubmit=(e)=>{
    e.preventDefault();
    const formData = new FormData();
    const data = new FormData(e.target);
    formData.append('categoryID',data.get('category_id'));
    formData.append('categoryName',data.get('category_name'));
    formData.append('categorySlug',data.get('category_slug'));
    let dt = {
      categoryID:editcategory.category_id,
      categoryName:data.get('category_name'),
      categorySlug:data.get('category_slug')
    }
    // console.log(dt);

    fetch('/api/category',{
      method: 'PUT',
      body: JSON.stringify(dt),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      mode: "cors",
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);

    const updatedCategories = category.map((category) =>
    category.category_id === dt.categoryID ? editcategory : category
    );
    setcategory(updatedCategories);

    
    })
    .catch(error => console.error('Error:', error));

    
  }
  // Edit Category Function
  function editCategoryFunc(){
    return(
      <form onSubmit={edithandleSubmit}>
  <div className="card p-3 shadow-sm p-3 mb-5 bg-body-tertiary rounded">
    <div className="input-group mb-3">
      <span className="input-group-text" id="editcategoryTitleText">Title</span>
      <input type="text" className="form-control" 
      name="category_name" id="category_name" placeholder="Enter category Title" 
      value={editcategory.category_name} onChange={inputEvent} aria-label="category" aria-describedby="basic-addon1"/>
      </div>

  <div className="mb-3">
    <label htmlFor="basic-url" className="form-label">Slug</label>
    <div className="input-group">
      <span className="input-group-text" id="basic-addon3">hassan-ali</span>
      <input type="text" className="form-control" id="category_slug" name="category_slug"
      value={editcategory.category_slug} onChange={inputEvent} />
    </div>
    <div className="form-text" id="basic-addon4">Example help text goes outside the input group.</div>
  </div>
      </div> 
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary">Update</button>
      </div>
    </form>
    )
  }
  function deleteCategoryFunc(deletecategory){
    fetch(`/api/category/${deletecategory}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      mode: "cors",
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // remove category id data and filter then return
      const newCategories = category.filter(
        (category) => category.category_id !== deletecategory
      );
      setcategory(newCategories);

    })
    .catch(error => console.error('Error:', error));
    
  }
 

const handleSubmit=(e)=>{
  e.preventDefault();
  const formData = new FormData();
  const data = new FormData(e.target);
  formData.append('categoryName',data.get('categoryTitle'));
  formData.append('categorySlug',data.get('categorySlug'));
  let dt = {
    categoryName:data.get('categoryTitle'),
    categorySlug:data.get('categorySlug')
  }
  console.log(dt);
  fetch('/api/category',{
    method: 'POST',
    body: JSON.stringify(dt),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // setcategory([...category, data]);
  })
  .catch(error => console.error('Error:', error));

  e.target.reset();

}

  return (
    <div className="container mt-4">

<div className="d-grid gap-2 d-md-flex justify-content-md-end">
  <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#addNewCategoryModal">Add Category</button>
</div>

<table className="table fs-5 mt-3">
  <thead className="bg-success text-white">
    <tr>
      <th scope="col">id</th>
      <th scope="col">Name</th>
      <th scope="col">Slug</th>
      <th scope="col" style={{width:"1rem"}}>Action</th>
    </tr>
  </thead>
  <tbody>
{
    category.map((element,index)=>{
        const{category_id,category_name,category_slug} = element;
        return(
            <tr key={index}>
            <th>{category_id}</th>
            <td>{category_name}</td>
            <td>{category_slug}</td>
            <td>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#editCategoryModal" onClick={()=>setCategoryState(element)}>Edit</button>
        <button className="btn btn-danger" type="button" onClick={()=>deleteCategoryFunc(element.category_id)}>Delete</button>
      </div>
            </td>
          </tr>
        )
    })
}
  </tbody>
</table>






<Modal dataTarget = "addNewCategoryModal" title={"Add New Category"}>
<form onSubmit={handleSubmit}>
  <div className="card p-3 shadow-sm p-3 mb-5 bg-body-tertiary rounded">
    <div className="input-group mb-3">
      <span className="input-group-text" id="categoryTitleText">Title</span>
      <input type="text" className="form-control" 
      name="categoryTitle" id="categoryTitle" placeholder="Enter category Title" aria-label="category" aria-describedby="basic-addon1"/>
      </div>

  <div className="mb-3">
    <label htmlFor="basic-url" className="form-label">Slug</label>
    <div className="input-group">
      <span className="input-group-text" id="basic-addon3">hassan-ali</span>
      <input type="text" className="form-control" id="categorySlugs" name="categorySlug"/>
    </div>
    <div className="form-text" id="basic-addon4">Example help text goes outside the input group.</div>
  </div>
      </div>  
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary">Add Category</button>
      </div>
</form>
</Modal>

<Modal dataTarget = "editCategoryModal"  title={"Update Category"}>
{editcategory && editCategoryFunc()}
</Modal>


    </div>
  )
}






export async function getServerSideProps({req,res}) {
  const session = await getSession({req});


  let response = await fetch('http://localhost:3000/api/category?key=mysecretapikey');
  let categoryData =  await response.json();

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
    props: {
      session,
      categoryData,
    },
  };
}