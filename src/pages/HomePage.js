import Link from "next/link";
import Image from 'next/image'
import { useEffect } from "react";
import Script from "next/script";


export default function HomePage(props) {
  const{id,title,slug,published,updated,description,image,category,author} = props.element;
   
 

  // useEffect(()=>{
  //   const cards =  document.querySelectorAll(".homepage");
  //   const observer = new IntersectionObserver(entries => {
  //     entries.forEach(entry => {
  //       const intersecting = entry.isIntersecting;
  //       entry.target.classList.toggle("show", intersecting);
  //       if(intersecting) observer.unobserve(entry.target);
  //     })
  //   }, { threshold: 0.6 });
  //   cards.forEach(card=>{
  //     observer.observe(card);
  //   });
  //   // console.log(author.Name);
  // }, [])


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
    <div className="card mb-3 homepage" style={{maxWidth: "740px"}}>
      <div className="row g-0">
        <div className="col-md-4">
          {
            !(image == null)?<Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/image/${image}`}  alt="..." 
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
                <strong className="d-inline-block mb-2 text-success fw-bold">{category.category_name.toUpperCase()}</strong>
              </Link>

            <h5 className="card-title fw-bold fs-3">{title.slice(0,100)}</h5>
            <div className="d-flex flex-row mb-3">
              <Image 
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/image/${author.image}`} 
                alt="..." 
                width={30}
                height={30}
                className="float-start rounded"
              />
              &nbsp;
              <h6 className="lh-base">{author.name}</h6>
            </div>
            <p className="card-text">{description.slice(0,150)}<br></br>
            <Link href={`/post/${slug}`}>
              <button type="button" className="btn btn-primary float-end m-3">Read More</button>
            </Link>
            </p>
            <p className="card-text">
              <small  className="text-body-secondary">
                {updated==null?new Date(published).toLocaleDateString():updated}
              </small>
            </p>
          </div>
        </div>
      </div>

        <Script strategy="lazyOnLoad" id="intersectionObserver"  onLoad={runIntersectionObserver}></Script>
    </div>
  )
}


