import { useEffect, useState } from 'react';
import './App.css';
import EditForm from './EditForm';

function App() {

  const [storedData, setStoredData] = useState(JSON.parse(localStorage.getItem("contactlist")) || [])
  const [info, setInfo] = useState({})
  const [editForm, setEditForm] = useState(false)
  const [editData, setEditData] = useState([])
  
  const [reload, setReload] = useState(false)



  const submitForm = (e) => {
    e.preventDefault()

    setStoredData([...storedData, { ...info }])
  }
  const submitForms = (data) => {

    setStoredData([...storedData, { ...data }])
    window.location.reload();

  }

  const handleInputChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    const name = e.target.name
    const value = e.target.value

    setInfo({
      ...info,
      [name]: value
    })


  }
  useEffect(() => {
    localStorage.setItem("contactlist", JSON.stringify(storedData))
  }, [storedData])

  const deleteContact = (id) => {
    console.log(id);
    const del = storedData.filter((data) => {
      return data.name !== id
    })
    setStoredData(del);
  }


  const editContact = (change) => {
    console.log(change);
    const edit = storedData.filter((filter) => {
      return filter.name === change
    })
    setEditData(edit)
    console.log(editData);
    setEditForm(true)

  }
  return (
    <div>



      {editForm === true ?
        <EditForm data={editData} deletedata={deleteContact} submit={submitForms} />
        :
        <><div className='main-body d-flex justify-content-center align-items-center'>

          <form className='' onSubmit={submitForm}>
            <div className='text-center'>
              <label><h3>CONTACT LIST</h3></label>
            </div>
            <input name='name' onChange={handleInputChange} type="text" className='form-control form-control-lg' placeholder='Enter Your Name' />
            <br />
            <br />
            <input name='email' onChange={handleInputChange} type="email" className='form-control form-control-lg' placeholder='Enter Your E-mail' />
            <br />
            <br />
            <div className='text-center'>
              <button type="submit" className='btn btn-success'><b>ADD CONTACT</b></button>
            </div>
          </form>
        </div></>}

      {storedData.map(details => (
        <div className='entered-value'>
          <div className='logo'><img className='img' src='https://cdn-icons-png.flaticon.com/512/1177/1177568.png' alt='contact'></img></div>
          <div className='input-value-box'>
            <h3 className='input-value'>Name : {details.name} </h3>
            <h3 className='input-value'>Email : {details.email} </h3>

          </div>
          <div className='logo-edit' ><img className='img' onClick={() => { editContact(details.name) }} src='https://cdn-icons-png.flaticon.com/512/805/805803.png' alt='edit'></img></div>
          <div className='logo-delete'><img className='img' onClick={() => { deleteContact(details.name) }} src='https://cdn-icons-png.flaticon.com/512/3221/3221897.png' alt='dlt' /></div>



        </div>

      ))}
    </div>
  );
}

export default App;
