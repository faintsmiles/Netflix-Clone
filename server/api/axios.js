const axios = require("axios").default;
const API_KEY = process.env.TMDB_API_KEY;


const popularURL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
const trendingURL = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`
const genreURL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=`




async function fetchDiscoverList(urlToQuery){
    const response = await axios.get(urlToQuery)
    const data = await response.data.results;

    let promiseChain = []; 

    // Remove results that are people instead of movie/show and receive specific details + video urls.
    data.forEach(element => {
        // **Only** Queries that are not limited to movies will have a defined media_type
        if(element.media_type == 'person') {
            return;
        }
        else if (element.media_type == 'tv') {
            promiseChain.push(axios.get(`https://api.themoviedb.org/3/tv/${element.id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`))
        }
        
        else {
            promiseChain.push(axios.get(`https://api.themoviedb.org/3/movie/${element.id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`))
        }
    });

    let movieList = [];

    await Promise.all(promiseChain)
    .then(results => { 
        results.forEach( item => {
            movieList.push(item.data)
        })
    })
    return movieList;
}

async function fetchGenreData(genresToFind) {

    // Fetch list of all genres and their corresponding ID number
    const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    // Retrieve the genres array from data returned ( contains list of genre name and their corresponding ids )
    const genreIDList = await response.data.genres; 
    // Initialize empty array to store the API requests we'll be making;
    let promiseChain = [];

    await genresToFind.forEach( async (genre) => {
        await genreIDList.forEach( ({ name, id }) => {
            if( genre === name) {
                promiseChain.push(axios.get(genreURL + id));
            }
        })
    })

    // Empty object we'll use to store data as key value pairs 
    // in conjuction with the genres we want to find
    let genreData = {};
    // Used to keep track of key name as we add it's corresponding data
    let counter = 0;

    await Promise.all(promiseChain)
    .then(results => {
        results.forEach( item => {
            // Using genre as a key we push it's data to the object
            genreData[genresToFind[counter]] = item.data.results;
            counter++;
       })
    }) 

    return genreData;
}

exports.callAPI = async (req, res, next) => {

    let popularMovies = await fetchDiscoverList(popularURL);    
    let trendingMovies = await fetchDiscoverList(trendingURL);
    let genresToFind = [ // Define genres we wish to find. 
        'Action',
        'Adventure',
        'Animation',
        'Comedy',
        'Drama',
        'Fantasy',
        'Science Fiction'
    ]

    // Pass list and set returned data to corresponding key
    // will transform our array list to an object with key value pairs
    genresToFind = await fetchGenreData(genresToFind);

    return res.json({
        Popular: popularMovies,
        Trending: trendingMovies,
        Action: genresToFind['Action'],
        Adventure: genresToFind['Adventure'],
        Animation: genresToFind['Animation'],
        Comedy: genresToFind['Comedy'],
        Drama: genresToFind['Drama'],
        Fantasy: genresToFind['Fantasy'],
        'Science Fiction': genresToFind['Science Fiction'],

    })
}

exports.getSpecificMovie = async (req, res, next) => {
    const id = req.params.id;
    
    // No way to reliably check media type without performing multiple API calls and dozens of nested if statements.
    // Nested try catch currently cleanest way to perform search atm. May update or revise at a later time.

    try { // Call api for movie data
        response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`)
        movieDetails = await response.data;
    } catch(e) {
        // Error occurred, its possibly a tv show instead
        try{
            response = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`)
            movieDetails = await response.data;
        } catch(e) { 
            // Both Movie and TV fetch calls failed. Possible api server is down or a false request was made. 
            // Whatever the reason, handle gracefully, and prevent server from crashing due to error.
            return res.json({Error: 'An error occurred'})
        }
    } 

    return res.json(movieDetails);
}

//                                          -----       Flow State      ----- 
// Fetch by specifier -- > Parse data.results into array of objects 
// Loop through array & grab movie ID ---> Create new array of Promises for a new API request with movie ID as identifier 
// Re-Fetch data with new ID, in order to receive genre strings and videos by appending the URL (counts as a single call )

//  **** Can also grab top movies by genres later --- https://www.themoviedb.org/talk/5b5aaf8ec3a3686704009b82 ********
