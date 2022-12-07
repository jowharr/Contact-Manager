import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

function EditForm({ data, deletedata, submit }) {
  const [editDetails, setEditDetails] = useState({})
  const [update, setUpdate] = useState(false)
  console.log(editDetails);
  useEffect(() => {
    setEditDetails(data[0])
  }, [data])

  const InputEditField = (event) => {
    console.log(event);
    const name = event.target.name
    const value = event.target.value

    setEditDetails({ ...editDetails, [name]: value })
  }
  const updateData = (e) => {
    e.preventDefault()
    deletedata(data[0].name)
    setUpdate(true)

  }
  useEffect(() => {
    if (update == true) {
      submit(editDetails)
      window.location.reload()
    }
  }, [update])
  return (
    <div>
      <div className='main-body d-flex justify-content-center align-items-center'>
        <form onSubmit={updateData}>
          <div className='text-center'>
            <label><h3>UPDATE LIST</h3></label>
          </div>
          <input name='name' value={editDetails.name} type="text" className='form-control form-control-lg' onChange={InputEditField} placeholder='Enter Your Name' />
          <br />
          <br />
          <input name='email' value={editDetails.email} type="email" className='form-control form-control-lg' onChange={InputEditField} placeholder='Enter Your E-mail' />
          <br />
          <br />
          <div className='text-center'>
            <button type="submit" className='btn btn-success'><b>UPDATE</b></button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default EditForm