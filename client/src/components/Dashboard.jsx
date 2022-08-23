import { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Row from './Row';
import Modal from './Modal';

import ('../styles/Dashboard.css')

function Billboard (props) {

    // Random movie from 'Popular' variety passed from Dashboard to be used as billboard
    const movie = props.movie;

    const url = 'https://image.tmdb.org/t/p/original' + movie.backdrop_path;
    
    const [modalState, setModalState] = useState(false); 

    return (
        <>
        {
            modalState && <Modal id='billboardModal' open={modalState} closeModal={() => setModalState(false)} movie={movie} />
        }
            {/* Styling for view ports >600px  */}
            <section id='billboard-expanded' className='billboard-container'  style={{ backgroundImage: `url(${url})` , aspectRatio: 3/2 }}>
                <div className='billboard-movie-details'>
                    <h1 className='billboard-movie-title'> {movie.title} </h1>
                    <p className='billboard-movie-description'> {movie.overview} </p>
                    <button className='billboard-buttons' onClick={() => setModalState(true) } style={{width: '30%'}}><h3>Play</h3></button>
                    <span className="divider" style={ {'marginLeft': 25}}></span>
                    <button className='billboard-buttons' onClick={() => setModalState(true) } style={{width: '30%'}}><h3>More Info</h3></button>
                </div>
            </section>
            {/* Only visible on screen sizes under 600px and details are moved underneath billboard image. original details are then hidden */}
            <section id='billboard-collapsed' className='billboard-movie-details-2' >
                    <h1 className='billboard-movie-title-2'> {movie.title} </h1>
                    <p className='billboard-movie-description-2'> {movie.overview} </p>
                    <button className='billboard-buttons' onClick={() => setModalState(true) } style={{width: '30%'}}><h3>Play</h3></button>
                    <span className="divider" style={ {'marginLeft': 25}}></span>
                    <button className='billboard-buttons' onClick={() => setModalState(true) } style={{width: '30%'}}><h3>More Info</h3></button>
            </section>
        </>
    )
}


export default function Dashboard() {

    // Determines number in 'Popular' movie array to be used for billboard info 
    const billboardMovie = Math.floor(Math.random() * 20);

    const [data, setData]  = useState('') ;

    useEffect(() => {
     fetch('/api', { credentials: 'include' })
    .then(response => response.json())
    .then(result => setData(result))
    .catch(() => {
        console.log("Fetch failed, setting redirectURL");
        window.location.href = '/login'
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <>
            <Header></Header>
            {
                data && <Billboard movie={data.Popular[billboardMovie]} ></Billboard>
            }
            { 
                Object.entries(data).map( ([key, value]) => 
                {
                    return <Row key={key} listName={key} movieList={value} /> 
                }) 
            }
        </>
    )
}