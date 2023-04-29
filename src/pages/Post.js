import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { getSession } from "next-auth/react";

export async function getServerSideProps({req,res}) {
  let response = await fetch(`${process.env.NEXTJS_SERVER_PORT}/api/post?key=${process.env.API_KEY}`);
  let data = await response.json();
  const session = await getSession({req});

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }



  return {
    props: { data,session }, // will be passed to the page component as props
   
  };
}

export default function Post({ data }) {
  const [publishedPost, setpublishedPost] = useState(data);



// Sort int A---Z
publishedPost.sort((a, b) => new Date(b.published) - new Date(a.published));
  

function deletePost(id){
 fetch(`/api/post/${id}`, {
  method: 'DELETE'
})  
.then((data)=>{
  console.log("Post deleted successfully"); 
  const removeDeletedPostRealTime = publishedPost.filter(
    (post) => post.id !== id
  );
  setpublishedPost(removeDeletedPostRealTime);
})
.catch(error => console.error('Error:', error));

  }

  return (
    <div className="container mt-3 fs-5">
      <div className="d-flex flex-row-reverse">
        <div className="p-2">
          <Link href={"/AddPost"}>
            <button type="button" className="btn btn-primary">
              Add New Post
            </button>
          </Link>
        </div>
      </div>
      {publishedPost.map((element, index) => {
        const {
          id,title,slug,published,updated,
          status,content,image,category_id,keyword,description,
        } = element;
        return (
          <div className="card mb-3" key={index}>
            <div className="row g-0">
              <div className="col-md-2">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/image/${image}`}
                  className="img-fluid rounded-start float-start"
                  alt="..."
                  width={900}
                  height={250}
                  style={{ objectFit: "fill", height: "100%" }}
                  priority
                />
              </div>
              <div className="col-md-10">
                <div className="d-flex">
                  <div className="p-2 w-100">
                    <h5
                      className="card-title fs-4 fw-bold"
                      style={{ fontFamily: "arial" }}
                    >
                      {title}
                    </h5>
                    {status == "published" ? (
                      <small className="d-inline-flex mb-3 px-2 py-1 fw-semibold text-success-emphasis bg-success-subtle border border-success-subtle rounded-2">
                        {status}
                      </small>
                    ) : (
                      <small className="d-inline-flex mb-3 px-2 py-1 fw-semibold text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-2">
                        Draft
                      </small>
                    )}

                    <p className="card-text">
                      <small className="text-body-secondary">
                        {new Date(published).toLocaleString()}
                      </small>
                    </p>
                  </div>
                  <div
                    className="p-2 flex-shrink-1"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div className="d-grid gap-1 d-md-flex justify-content-md-end">
                      <button type="button" className="btn btn-primary">
                        Edit
                      </button>
                      <Link href={`/post/${slug}`}>
                        <button className="btn btn-primary " type="button">
                          View
                        </button>
                      </Link>
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => deletePost(id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

