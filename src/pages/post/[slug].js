import Head from "next/head";
import Image from "next/image";
import Sidebar from "../../components/Sidebar/Sidebar";

export async function getStaticPaths() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post?key=${process.env.API_KEY}`);
  const data = await response.json();
  const paths = data.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: true, // can also be true or 'blocking'
  }
}

export async function getStaticProps({ params }) {
  const {slug } = params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${slug}?key=${process.env.API_KEY}`);
  const post = await response.json();

  return {
    props: { post },
  }
}


const slug = ({post}) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.keyword} />
      </Head>


      <div className="container mt-4">
   <div className="row g-5">
     <div className="col-md-8">
     {
      !(post.image == null)?<div className="card text-center">
        <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/image/${post.image}`} alt="image"
        width="730" height="400" style={{borderRadius:"8px"}} priority />
      </div>:""
     }
      <h3 className="pb-4 mb-4 fst-italic border-bottom">{post.title}</h3>
      <article className="fs-4">
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    
<div className="p-5 text-center bg-body-tertiary rounded-3 mt-2">
    <h1 className="text-body-emphasis">Basic jumbotron</h1>
    <p className="lead">
      This is a simple Bootstrap jumbotron that sits within a <code>.container</code>, recreated with built-in utility classes.
    </p>
  </div>

    </div>
    <div className="col-md-4">
      <Sidebar/>
    </div>
  </div>
  </div>
    </>
  );
};
export default slug;
