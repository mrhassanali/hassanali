import Image from "next/image";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useState,useEffect } from "react";
import Link from "next/link";
import Script from "next/script";


export async function getStaticPaths() {
  const response = await fetch(`${process.env.NEXTJS_SERVER_PORT}/api/category?key=${process.env.API_KEY}`);
  const data = await response.json();

  const paths = data.map((category) => ({
    params: { slug: category.category_slug },
  }));
 
  return {
    paths,
    fallback: true, // can also be true or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const {slug } = params;
  const response = await fetch(`${process.env.NEXTJS_SERVER_PORT}/api/category/${slug}?key=${process.env.SECRET}`);
  const post = await response.json();

  return {
    props: { post },
  }
}


const Slug = ({post}) => {
  const[category,setcategory] = useState(post);


  const runIntersectionObserver = () => {
    const cards = document.querySelectorAll(".homepage");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const intersecting = entry.isIntersecting;
        entry.target.classList.toggle("show", intersecting);
        if(intersecting) observer.unobserve(entry.target);
      })
    }, { threshold: 0.6 });
    cards.forEach(card => {
      observer.observe(card);
    });
  }
  
  useEffect(() => {
    runIntersectionObserver();
  }, []);






  return (
    <>
<div className="container mt-4">
<div  className="row g-5">
    <div className="col-md-8">
      <h3 className="pb-4 mb-4 fst-italic border-bottom">
        {
          // postCateoryShow()
          !(post.length == 0)?(post[0].category.category_name):("Not Found Any Post...")
        }
      </h3>
        {
          post.map((element,index)=>{
            return (
              <div className="card mb-3 homepage" key={index} style={{maxWidth: "740px"}}>
              <div className="row g-0">
                <div className="col-md-4">
                  {
                    !(element.image == null)?<Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/image/${element.image}`}  alt="..." 
                    width={900}
                    height={250}
                    style={{objectFit:"fill",height:"100%"}}
                    className="img-fluid rounded-start" priority
                    />:<div style={{backgroundColor:"#f4f4f4",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <span style={{fontFamily:"verdana",fontSize:"20px"}}>No Image</span>
                    </div>
                  }
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                  <Link href={`/category/${category.category_slug}`}>
                        <strong className="d-inline-block mb-2 text-success fw-bold">{(category.category_name)}</strong>
                      </Link>
        
                    <h5 className="card-title fw-bold fs-3">{element.title.slice(0,100)}</h5>
                    <div className="d-flex flex-row mb-3">
                      <Image 
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/image/${element.author.image}`} 
                        alt="..." 
                        width={30}
                        height={30}
                        className="float-start rounded"
                      />
                      &nbsp;
                      <h6 className="lh-base">{element.author.name}</h6>
                    </div>
                    <p className="card-text">{element.description.slice(0,150)}<br></br>
                    <Link href={`/post/${element.slug}`}>
                      <button type="button" className="btn btn-primary float-end m-3">Read More</button>
                    </Link>
                    </p>
                    <p className="card-text">
                      <small className="text-body-secondary">
                        {element.updated==null?new Date(element.published).toLocaleDateString():element.updated}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            )})
        }

<Script strategy="lazyOnLoad" id="intersectionObserver" onLoad={runIntersectionObserver}></Script>

      </div>
      <aside className="col-md-4"><Sidebar/></aside>
  </div>
  </div>
    </>
  );
};
export default Slug;
