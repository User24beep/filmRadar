/* 
    <section>
        <img class="cover" src="https://i.pinimg.com/originals/96/a0/0d/96a00d42b0ff8f80b7cdf2926a211e47.jpg">
        <div class="text">
            <div class="row1">
                <h3 class="title">Blade Runner</h3>
                <p class="rating">8.1</p>
                <p class="rating">2002</p>
            </div>
            <div class="row2">
                <p class="length">117min</p>
                <p class="genres">Action,Drama,Sci-fi</p>
                <button class="add-watchlist">+ Watchlist</button>
            </div>
            <p class="description">
                A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.
            </p>
        </div>
    </section>
    <hr>
    
    Api key: bb312ad1
*/

const btnEl = document.getElementById("search")
const spaceEl = document.getElementById("space")
const inputEl = document.getElementById("input")
btnEl.addEventListener("click",searchFilm)

function searchFilm(){
    fetch(`https://www.omdbapi.com/?apikey=bb312ad1&s=${inputEl.value}`)
    .then(res => res.json())
    .then(data => renderData(data))
}

async function renderData(data){
    let arr = data.Search
    let newArr = Promise.all(arr.map(item=>
        fetch(`https://www.omdbapi.com/?apikey=bb312ad1&i=${item.imdbID}`)
        .then(res => res.json())
        .then(data => data)
    )).then(dat => spaceEl.innerHTML=dat.map((it)=> `
    <section>
        <img class="cover" src="${it.Poster}">
        <div class="text">
            <div class="row1">
                <h3 class="title">${it.Title}</h3>
                <p class="rating "><i class="fa-solid fa-star yellow"></i>${it.imdbRating}</p>
                <p class="rating">${it.Year}</p>
            </div>
            <div class="row2">
                <p class="length">${it.Runtime}</p>
                <p class="genres">${it.Genre}</p>
                <button class="add-watchlist"><i class="fa-solid fa-circle-plus"></i> Watchlist</button>
            </div>
            <p class="description">
                ${it.Plot}
            </p>
        </div>
    </section>
    <hr>
    `
        
    ).join(""))

}