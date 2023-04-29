import React from 'react'

export default function index() {
  return (
    <div>
        <div className="container my-5">
  <nav aria-label="breadcrumb">
    <ol className="breadcrumb breadcrumb-custom overflow-hidden text-center bg-body-tertiary border rounded-3">
      <li className="breadcrumb-item">
        <a className="link-body-emphasis fw-semibold text-decoration-none" href="#">
          {/* <svg className="bi" width="16" height="16"><use xlink:href="#house-door-fill"></use></svg> */}
          Home
        </a>
      </li>
      <li className="breadcrumb-item">
        <a className="link-body-emphasis fw-semibold text-decoration-none" href="#">Library</a>
      </li>
      <li className="breadcrumb-item active" aria-current="page">
        Data
      </li>
    </ol>
  </nav>
</div>
    </div>
  )
}
