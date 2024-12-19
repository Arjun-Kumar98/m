import React, {  useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useConfig  from './hooks/useConfig';
import './newMovie.css';

function AddMovie() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const navigate = useNavigate();
    const { config } = useConfig(); 


 const currentYear = new Date().getFullYear();
  const onFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const removeImage = () => {
    setImage(null);  // Reset the image state to null
  };
  const token = localStorage.getItem('token');
  const onSubmit = async (e) => {

    if(!image||!title||!year){
      alert("Please fill all the fields.");
      return;
    }
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("userId",localStorage.getItem("userId"))
    formData.append("year", year);

      try {
          await axios.post(`${config.API_URL}/movie/registerMovie`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });
      alert('Data uploaded successfully!');
      navigate('/movieList');
    } catch (err) {
      console.error(err);
      alert('Error uploading data');
    }
  };

  return (
    <div className="upload-container">
    <label style={{fontSize:'30px',fontFamily: 'Montserrat, sans-serif',color:'#fff'}}>Add a new movie</label>
      <form className="upload-form" onSubmit={onSubmit}>
        <div className='image-section' style={{width:'50%'}}>
            <label style={{color:'#fff', fontStyle:'montSerrat'}}>Movie Poster</label>
        {/* Conditionally render the image preview or the upload box */}
        {!image ? (
          <div className="upload-box">
            <label htmlFor="imageUpload" className="upload-label">
              Upload Image
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={onFileChange}
            />
          </div>
        ) : (
          <div className="image-preview">
            <img
              src={URL.createObjectURL(image)}
              alt="Selected Preview"
              style={{
                width: '200px',
                height: 'auto',
                marginBottom: '10px',
              }}
            />
          </div>
        )}
        { image && (
        <button  onClick={removeImage} style={{width:'50%',alignSelf:'center'}}>Remove</button>
        )
}
        </div>
        
        <div className="input-fields">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          style={{width:'80%'}}/>
          <input
            type="number"
            placeholder="Release year"
            min="1995"
            max={currentYear}
            value={year}
            onChange={(e) => setYear(e.target.value)}
        style={{width:'50%'}}  />
          <div >
          <button style={{width:'40%'}} onClick={()=>{
            setImage(null);
            setTitle('');
            setYear('');
          }}>Cancel</button>
          <button type="submit" style={{width:'40%',backgroundColor:'#2BD17E',color:'#fff',marginLeft:'5px'}}>Submit</button>
       
</div>
        </div>
       
      </form>
    </div>
  );
}

export default AddMovie;
