import Head from "next/head";
import Image from "next/image";
import Sidebar from "./Sidebar";
import Link from "next/link";
import { useState, useEffect } from "react";
import Card from "../components/Card/card";
import Script from "next/script";

export async function getServerSideProps() {
  const response = await fetch(process.env.POST_ENDPOINT);
  const data = await response.json();
  return {
    props: { 
      data
     }, // will be passed to the page component as props
  };
}

export default function Home({ data}) {
  const [postData, setPostData] = useState(data);
  // Sort int A---Z
  postData.sort((a, b) => new Date(b.published) - new Date(a.published));

  const runIntersectionObserver = () => {
    const cards = document.querySelectorAll(".homepage");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const intersecting = entry.isIntersecting;
          entry.target.classList.toggle("show", intersecting);
          if (intersecting) observer.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    cards.forEach((card) => {
      observer.observe(card);
    });
  };

  useEffect(() => {
    runIntersectionObserver();
  }, []);

  return (
    <>
    <div className="container px-4 py-1" id="custom-cards">
      <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
        {data.slice(0, 3).map((element, index) => {
          return <Card key={index} element={element} />;
        })}
      </div>
    </div>

      <div className="container mt-3">
      <div className="row mb-2">
          {data.slice(0, 2).map((element, index) => {
            const { title, description, slug, published, updated, image } =
              element;
            return (
              <div className="col-md-6" key={index}>
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                  <div className="col p-4 d-flex flex-column position-static">
                    <Link href={`/category/${element.category.category_slug}`}>
                      <strong
                        className={`d-inline-block mb-2 ${
                          index == 0 ? "text-primary" : "text-success"
                        }`}
                      >
                        {element.category.category_name.toUpperCase()}
                      </strong>
                    </Link>
                    <h3 className="mb-0">{title.slice(0, 18)}</h3>
                    <div className="mb-1 text-muted">
                      {updated == null
                        ? new Date(published).toLocaleDateString()
                        : updated}
                    </div>
                    <p className="card-text mb-auto">
                      {description.slice(0, 91)}
                    </p>

                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <Link href={`/post/${slug}`}>
                        <button
                          className="btn btn-primary me-md-2"
                          type="button"
                        >
                          Read More
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="col-auto d-none d-lg-block">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}/image/${image}`}
                      alt="Picture of the author"
                      width={210}
                      height={250}
                      style={{ objectFit: "cover" }}
                      className="bd-placeholder-img"
                      priority
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="row g-5">
          <div className="col-md-8">
            <h3 className="pb-4 mb-4 fst-italic border-bottom">Posts</h3>
            {postData.map((element, index) => {
              const {
                id,
                title,
                slug,
                published,
                updated,
                description,
                image,
                category,
                author,
              } = element;

              return (
                <div
                  className="card mb-3 homepage"
                  style={{ maxWidth: "740px" }}
                  key={index}
                >
                  <div className="row g-0">
                    <div className="col-md-4">
                      {!(image == null) ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BASE_URL}/image/${image}`}
                          alt="..."
                          width={900}
                          height={250}
                          style={{ objectFit: "fill", height: "100%" }}
                          className="img-fluid rounded-start"
                          priority
                        />
                      ) : (
                        <div
                          style={{
                            backgroundColor: "#f4f4f4",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <span
                            style={{ fontFamily: "verdana", fontSize: "20px" }}
                          >
                            No Image
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <Link href={`/category/${category.category_slug}`}>
                          <strong className="d-inline-block mb-2 text-success fw-bold">
                            {category.category_name.toUpperCase()}
                          </strong>
                        </Link>

                        <h5 className="card-title fw-bold fs-3">
                          {title.slice(0, 100)}
                        </h5>
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
                        <p className="card-text">
                          {description.slice(0, 150)}
                          <br></br>
                          <Link href={`/post/${slug}`}>
                            <button
                              type="button"
                              className="btn btn-primary float-end m-3"
                            >
                              Read More
                            </button>
                          </Link>
                        </p>
                        <p className="card-text">
                          <small className="text-body-secondary">
                            {updated == null
                              ? new Date(published).toLocaleDateString()
                              : updated}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>

                  <Script
                    strategy="lazyOnLoad"
                    id="indexRelaoader"
                    onLoad={runIntersectionObserver}
                  ></Script>
                </div>
              );
            })}
          </div>
          <aside className="col-md-4">
            <Sidebar/>
          </aside>
        </div>
      </div>
    </>
  );
}
