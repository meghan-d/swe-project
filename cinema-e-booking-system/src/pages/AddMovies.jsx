import React, { useState } from "react";
import "./AddMovies.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddMovies = () => {
    const navigate = useNavigate();
    const[successMessage, setSuccessMessage] = useState();
    const [formData, setFormData] = useState({
        title: "",
        trailerVideo: "",
        moviePoster: "",
        rating: "",
        //category: "Coming Soon",
        category: "",
        director: "",
        producer: "",
        cast: "",
        synopsis: "",
        genre: "",
        duration: ""
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = (e) => { //Occurs when the save button is pressed
        e.preventDefault();

        const newMovie = { title: formData.title, trailerVideo: formData.trailerVideo, moviePoster: formData.moviePoster,
          rating: formData.rating, category : formData.category, director: formData.director,
          producer: formData.producer, cast: formData.cast, synopsis: formData.synopsis, genre: formData.genre, 
          duration: formData.duration}; 
        
        if (!newMovie.title || !newMovie.trailerVideo || !newMovie.moviePoster || !newMovie.rating ||
            !newMovie.director || !newMovie.producer || !newMovie.cast || !newMovie.synopsis || !newMovie.genre ) {
           alert("Please fill in all required fields.");
           return;
        }

        if (!/^https?:\/\/\S+\.\S+$/.test(newMovie.trailerVideo) || !/^https?:\/\/\S+\.\S+$/.test(newMovie.moviePoster)) {
            alert("Please enter a valid trailer link (must start with http:// or https://).");
            return;
        }
        saveMovie(newMovie); 
    };

    const saveMovie = async (newMovie) => { //Sends information to the backend 
        try {
            const response = await axios.post("http://localhost:5000/save-movie", newMovie)
            setSuccessMessage(response.data.message);
            setTimeout(() => {
                navigate("/admin-movies");
              }, 2000);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.message)
            } else {
                alert("An error occurred. Please try again later.");
            }
        }
    }

    return (  
        <div className="addmovies-container">
            <h2 className="title">🎟️ Add Movies</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}

            <form onSubmit={handleSubmit} className="movies-form">
            <div className="form-group">
                <label className="label"> Movie Title *</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="input" required/>
            </div>
            <div className="form-group">
                <label className="label"> Trailer Link *</label>
                <input type="url" name="trailerVideo" value={formData.trailerVideo} onChange={handleChange} className="input" required/>
            </div>
            <div className="form-group">
                <label className="label"> Movie Poster Link *</label>
                <input type="url" name="moviePoster" value={formData.moviePoster} onChange={handleChange} className="input" required/>
            </div>
            <div className="two-column">
                <div className="form-group">
                    <label className="label">Genre *</label>
                    <input type="text" name="genre" value={formData.genre} onChange={handleChange} className="input" required/>
                </div>
                <div className="form-group">
                    <label className="label">Duration *</label>
                    <input type="text" name="duration" value={formData.duration} onChange={handleChange} className="input" required/>
                </div>
                <div className="form-group">
                    <label className="label">MPAA Rating *</label>
                    <select name="rating" value={formData.rating} onChange={handleChange} className="input" required>
                        <option value="">Select Rating</option>
                        <option value="G">G</option>
                        <option value="PG">PG</option>
                        <option value="PG-13">PG-13</option>
                        <option value="R">R</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="label">Category *</label>
                    <select name = "category" value={formData.category} onChange={handleChange} className="input" required>
                        <option value="">Select Category</option>
                        <option value= "Coming Soon">Coming Soon</option>
                        <option value="Currently Running">Currently Running</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="label">Director *</label>
                    <input type="text" name="director" value={formData.director} onChange={handleChange} className="input" required/>
                </div>
                <div className="form-group">
                    <label className="label">Producer *</label>
                    <input type="text" name="producer" value={formData.producer} onChange={handleChange} className="input" required/>
                </div>
            </div>
            <div className="form-group">
                    <label className="label">Cast * </label>
                    <textarea name="cast" className="input" rows="3" value={formData.cast} onChange={handleChange} placeholder="Enter a comma separated cast list"></textarea>
            </div>
            <div className="form-group">
                    <label className="label">Synopsis * </label>
                    <textarea name="synopsis" className="input" rows="3" value={formData.synopsis} onChange={handleChange} placeholder="Enter a synopsis"></textarea>
            </div>
            <div className = "button-group">
                <button type="submit" className="button button-save"> Save Movie</button>
                <button type="button" className="button button-cancel" onClick={() => navigate(-1)}> Cancel </button>
            </div>
            </form>
        </div>
    )
}
export default AddMovies;
