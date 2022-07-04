let triggle = $("#triggle"),
    leftMenu = $(".leftMenu"),
    rightMenu = $(".rightMenu"),
    navLi = $(".nav-item li"),
    MenuListItems = $(`.nav-item li a`);

triggle.click(function () {
    let width = $(leftMenu).outerWidth();
    
    if ($(triggle).attr("class") == "open") {
        
        $(triggle).removeClass("open").addClass("close");
        $(leftMenu).animate({"left":"0px"},1000);
        $(rightMenu).animate({"left":`${width}px`},1000);
        for(let i = 1 ; i <= navLi.length ; i++ ){
            $(`.item${i}`).animate({"opacity":"1","padding-top":"20px"},i*200  + 1000);
        }
    } else {

        $(triggle).removeClass("close").addClass("open");
        $(leftMenu).animate({"left":`-${width}px`},1000);
        $(rightMenu).animate({"left":`0px`},1000,function () {
        $(navLi).animate({"opacity":"0","padding-top":"500px"},1000);
        });
    }
});

let movieArr = [];

async function getVideoData(para="now_playing"){
   let movieApi= await fetch(`https://api.themoviedb.org/3/movie/${para}?api_key=8613e4e1776af4e8633cc311d67b3e09&language=en-US&page=1`);
       movieApi = await movieApi.json();
       movieArr = movieApi.results;
       displayVideos();
}
getVideoData()

let imgPath = `https://image.tmdb.org/t/p/w500`
function displayVideos() {
    let videos = '';
    for (let i = 0; i < movieArr.length; i++) {
        videos += `<div class="col-md-4 py-5">

                   <div class="movie-item">
                   <img src="${imgPath+movieArr[i].poster_path}">

                   <div class="layer">
                   <h4>${movieArr[i].title}</h4>
                   <p>${movieArr[i].overview}</p>
                   <mark> Rate : ${movieArr[i].vote_average}</mark>
                   </div>
                   </div>
                   </div>              
                  `
    }
    document.getElementById("movies-container").innerHTML=videos
};

for (let i = 0; i < 4; i++) {
    MenuListItems[i].addEventListener("click",name)
}
function name(){
   let attrName = this.getAttribute("currentmoive");
    getVideoData(attrName)
};

searchByWord = document.getElementById(`searchByWord`);

searchByWord.addEventListener(`keyup`,()=>{SearchByQuery(searchByWord.value)});
movieSearchArr=[];

async function SearchByQuery(query){
    if(query == ""){
        document.getElementById("searchResult").innerHTML=""
        return false
    }
    let movieApi= await fetch(`https://api.themoviedb.org/3/search/movie?api_key=8613e4e1776af4e8633cc311d67b3e09&language=en-US&query=${query}&page=1&include_adult=false`);
    movieApi = await movieApi.json();
    movieSearchArr = movieApi.results;
    displaySearchResult()
}

function displaySearchResult(){
    let videos = '';
    for (let i = 0; i < movieSearchArr.length; i++) {
        videos += `<div class="col-md-4 py-5">

                   <div class="movie-item">
                   <img src="${imgPath+movieSearchArr[i].poster_path}">

                   <div class="layer">
                   <h4>${movieSearchArr[i].title}</h4>
                   <p>${movieSearchArr[i].overview}</p>
                   <mark> Rate : ${movieSearchArr[i].vote_average}</mark>
                   </div>
                   </div>
                   </div>              
                  `
    }
    document.getElementById("searchResult").innerHTML=videos
  }


  let search = document.getElementById("search");
function SearchInCurrent(term){
    if(term == ""){
        document.getElementById("searchResult").innerHTML=""
        return false
    }
    let videos = ``;
    for (let i = 0; i < movieArr.length; i++) {
        if(movieArr[i].title.toUpperCase().includes(term.toUpperCase())){
            
            
                videos += `
                            <div class="col-md-4 py-5">
        
                           <div class="movie-item">
                           <img src="${imgPath+movieArr[i].poster_path}">
        
                           <div class="layer">
                           <h4>${movieArr[i].title}</h4>
                           <p>${movieArr[i].overview}</p>
                           <mark> Rate : ${movieArr[i].vote_average}</mark>
                           </div>
                           </div>
                           </div>              
                          `
            
            document.getElementById("searchResult").innerHTML=videos
        }
    }
}
search.addEventListener(`keyup`,()=>{
    SearchInCurrent(search.value)
  });