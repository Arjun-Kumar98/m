import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useConfig  from './hooks/useConfig';
import './newMovie.css';

function EditMovie() {
  const [image, setImage] = useState(null);
  const[movie,setMovie] = useState({});
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [imageRemoved, setImageRemoved] = useState(false);
  const { config } = useConfig();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
 const{movieId} = useParams();
 console.log("The movie Id is === "+movieId);
  const onFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const removeImage = () => {
    setImage(null); 
    setImageRemoved(true); // Reset the image state to null
  };

  useEffect(() => {
    const fetchMovieDetails = async()=>{

    try {
        const response = await axios.get(`${config.API_URL }/movie/getMovie`,{
        params:{
          movieId:movieId
        },

      });
      setMovie(response.data);
      setImage(response.data.image);
      setField1(response.data.title);
      setField2(response.data.year);
    }catch(error){
      console.error("Fetching movies",error);
    }
  };

      fetchMovieDetails();
  }, [movieId, API_URL]);


const onSubmit = async (e) => {

  if(!field1||!image||!field2){
    alert("Please fill all the fields.");
    return;
  }
  e.preventDefault();
  const formData = new FormData();
 if(imageRemoved){
  formData.append("image",image);
 }
  formData.append("title", field1);
  formData.append("movieId",movieId)
  formData.append("year", field2);

  try {
      await axios.put(`${config.API_URL } /movie/updateMovie`, formData, {
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
    <label style={{fontSize:'30px',fontFamily: 'Montserrat, sans-serif',color:'#fff'}}>Change the movie</label>
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
           {!imageRemoved?(<img
                    src={`data:image/jpeg;base64,${movie.image}`}
              alt="Selected Preview"
              style={{
                width: '200px',
                height: 'auto',
                marginBottom: '10px',
              }}
            />):(
              <img
              src={URL.createObjectURL(image)}
              alt="Selected Preview"
              style={{
                width: '200px',
                height: 'auto',
                marginBottom: '10px',
              }}
            />)};
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
            value={field1}
            onChange={(e) => setField1(e.target.value)}
          />
          <input
            type="text"
            placeholder="Publishing year"
            value={field2}
            onChange={(e) => setField2(e.target.value)}
        style={{width:'50%'}}  />
          <div >
          <button style={{width:'50%'}}>Cancel</button>
          <button type="submit" style={{width:'50%',backgroundColor:'#2BD17E',color:'#fff'}}>Submit</button>
       
</div>
        </div>
       
      </form>
    </div>
  );
}

export default EditMovie;