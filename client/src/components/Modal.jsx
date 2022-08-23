import React, { useEffect, useState} from 'react'

import ('../styles/Modal.css')

function Modal({open, closeModal, movie}) {

    
    const [ movieData, setMovieData ] = useState('');
    const [movieTrailerUrl, setMovieTrailerUrl ] = useState('');
    
    const convertTimeFormat = (totalTimeInMin) => {
        return Math.floor(totalTimeInMin / 60) + 'hr ' + totalTimeInMin % 60 +'min'
    }

    useEffect(() => { // Initial render, fetch movie data
        fetch(`/api/${movie.id}`, { 
            credentials: 'include'
        })
        .then(response => response.json())
        .then(response => {console.log(response); return response})
        .then(result => setMovieData(result))
        .catch(() => {
            console.log('An error occured.');
            window.location.href = '/login'
        })
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => { // Intial Render &&& Once movie data has been fetched create a trailer url for iframe src
        if(movieData === '' || movieData.videos.results.length === 0) { 
            setMovieTrailerUrl(false);
        } 
        else {
            // Video sources include both Youtube and Vimeo
            const buildTrailerUrl = (movieData.videos.results[0].site === 'YouTube' ? 'https://www.youtube.com/embed/' : 'Vimeo.com/') + movieData.videos.results[0].key; 
            setMovieTrailerUrl(buildTrailerUrl);
        }
        console.log(movieData)
    },[movieData])

    
    if(!open) return null;


    return (
    <div className='modal-overlay' onClick={closeModal}>
        <div className='movie-extended' onClick={(e) => e.stopPropagation() } >
            <div className="iframe-container">
                <iframe height={480} width={853} src={movieTrailerUrl || ""} frameBorder="0" allowFullScreen title='Movie Extended Trailer'/>
            </div>
            <div className='movie-extended-details' >
                <h2 className='movie-details-title'> {movieData.title || movieData.original_name} </h2>
                <div key='movie-data-details'>
                    <span className='modal-movie-etc' >Release <i>{movieData.release_date || movieData.first_air_date} </i></span>
                    <span> · </span>
                    <span className='modal-movie-etc'>Runtime: <i> { convertTimeFormat(movieData.runtime) || convertTimeFormat(movieData.episode_run_time)}</i></span>
                    <span> · </span>
                    <span className='modal-movie-etc' key='genres'>
                        Genres: 
                        {  movieData && movieData.genres.map( (genre, i , arr) => {
                             return <span className='modal-movie-etc' key={genre.name}> 
                                    &nbsp;    
                                    <i>
                                        <u>
                                            {genre.name}
                                        </u>
                                            { i + 1 !== arr.length ? ',' : '' }
                                    </i> 
                                </span> })
                        }
                    </span>
                </div>
                {/* <h2>{movieData.tagline}</h2> */}
                <p className='movie-details-overview'>{movieData.overview}</p>
            </div>
            
        </div>
    </div>
  )
}

export default Modal