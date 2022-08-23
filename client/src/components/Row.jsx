// Modal to show extended movie details
import Modal from "./Modal";

// Unique ID
import { v4 as uuidv4 } from 'uuid';

//https://swiperjs.com/
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules from swiper lib
import { Navigation } from "swiper";

import React, { useState } from 'react';
import ('../styles/Row.css')


export default function Row (props) {

    const baseURL = 'https://image.tmdb.org/t/p/original/';

    // Boolean for Modal
    const [modalState, setModalState] = useState(false);
    // Movie to use in Modal
    const [movie, setMovie ] = useState('');


    return(
    <div key={props.listName +' list'} style={{marginLeft: 10, marginRight: 5}}>
        {
            modalState && <Modal key={uuidv4()} open={modalState} closeModal={() => setModalState(false)} movie={movie} />
        }
        <h2>{ props.listName}</h2>
        {/* 
                Slight performance improvement on resize, due to breakpoints causing browser to hang/rerender on every window size change
            https://github.com/nolimits4web/swiper/issues/4327 
        */}
            <Swiper
               key={props.listName}
               slidesPerView={7}
               slidesPerGroup= {6}
               spaceBetween={30}
                // Break Points causing major lag on browser
                // *especially when resizing multiple times*
                // breakpoints= {{
                //     320: {
                //         slidesPerView: 2,
                //         slidesPerGroup:2
                //     },
                //     768: {
                //         slidesPerView: 5,
                //         slidesPerGroup:5
                //     },
                //     1024: {
                //         slidesPerView: 7,
                //         slidesPerGroup:7,    
                //     }
                // }}
                loop={true}
                loopFillGroupWithBlank={false}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
                lazy={true}
                // rebuildOnUpdate={true}
                // speed={500}
            >
                {   props.movieList.map((movie) => {
                       return (
                       <SwiperSlide key={uuidv4()} onClick={() => { setMovie(movie); setModalState(true) }}>
                            <img style={{ height: 300, minHeight: 300, minWidth: 150}} src={(baseURL + movie.poster_path)} 
                                alt={`${movie.title} Poster`} loading='lazy' /> 
                        </SwiperSlide>
                       )
                    }) 
                }
            </Swiper>
    </div>
    )
}

