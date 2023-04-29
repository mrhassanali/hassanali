import React from 'react'
export default function Modal({ isOpen, onClose,children,dataTarget,title,modalSize}) {
  return (
    <div className={`modal fade fs-5 ${modalSize?modalSize:"modal-lg"}`} id={dataTarget} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
    <div className="modal-header">
        <h1 className="modal-title fs-5" id="addnewcategory">{title}</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">{children}</div>
      
    </div>
  </div>
</div>
  )
}
