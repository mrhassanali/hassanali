import React from 'react'
import moment from "moment/moment";
import Link from 'next/link';
import Image from 'next/image';

export default function card(props) {
  const{title,description,slug,published,updated,image,author} = props.element;
  return (
    <div className="col">
    <div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style={{backgroundImage:`url('${process.env.NEXT_PUBLIC_BASE_URL}/image/${image}')`,backgroundSize:"cover"}}>
      <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">

      <Link href={`/post/${slug}`}>
  <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">{title.slice(0,46)}</h3>
  </Link> 
        <ul className="d-flex list-unstyled mt-auto">
          <li className="me-auto">
            <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/image/${author.image}`} alt="author" width="32" height="32" className="rounded-circle border border-white"/>
          </li>
          <li className="d-flex align-items-center me-3">
            <small>{author.name}</small>
          </li>
          <li className="d-flex align-items-center">
            <small>{published? moment(published).fromNow():moment(updated).fromNow()}</small>
          </li>
        </ul>
      </div>
    </div>
</div>
  )
}
