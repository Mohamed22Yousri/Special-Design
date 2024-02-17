

let scroll = document.querySelector(".scroll")
let hight = document.documentElement.scrollHeight - document.documentElement.clientHeight

window.addEventListener("scroll", ()=>{
    let scrollTop = document.documentElement.scrollTop
    scroll.style.width = `${(scrollTop / hight)*100}%`
})


let mainColor =   localStorage.getItem("color-option")

if(mainColor !== null){
    document.documentElement.style.setProperty( `--main-color` , mainColor)
    
    document.querySelectorAll(".color-list li").forEach(element=>{
        element.classList.remove("active")
        if(element.dataset.color === mainColor ){
            element.classList.add("active")

        }
    })
}
let backgroundOption = true
let backgroundInterval;
// let backgroundLocalItem = localStorage.getItem("background_option");

// if(backgroundLocalItem !== null){
//     if(backgroundLocalItem === "true"){
//         let backgroundOption = true
        

//     } else{
//         let backgroundOption = false



//     }
//     // console.log(backgroundLocalItem)
//     document.querySelectorAll(".random-background span").forEach(Element=>{
//         Element.classList.remove("active");
//     });
//     if(backgroundLocalItem ==="true"){
//         document.querySelector('.random-background .yes').classList.add("active")

//     } else{
//         document.querySelector(".random-background .no").classList.add("active")



//     }


    
// }



document.querySelector(".toggle .fa-gear").onclick = function(){
    this.classList.toggle("fa-spin");

    document.querySelector(".setting-box").classList.toggle("open");
};







let classLi = document.querySelectorAll('.color-list li')
classLi.forEach(li => {
    li.addEventListener("click" , (e)=>{

        document.documentElement.style.setProperty( `--main-color` , e.target.dataset.color)

        localStorage.setItem("color-option" ,  e.target.dataset.color)
        handleActive(e)
     
    })
    
});


let background = document.querySelectorAll(".random-background span")
  background.forEach(span => {
    span.addEventListener("click" , (e)=>{
        handleActive(e)


        if(e.target.dataset.background === "yes"){
            backgroundOption = true
            localStorage.setItem("background_option" , true)
            randomIamge();

        } else{
            backgroundOption = false
            clearInterval(backgroundInterval)
            localStorage.setItem("background_option" , false)

        }
    })
        
    });

    let page = document.querySelector('.landing-page');

    let imge = ['img-1.jpg','img-2.jpg','img-3.jpg','img-4.jpg','img-5.jpg'];

    function randomIamge (){
        if(backgroundOption === true){
            backgroundInterval =  setInterval(() => {
                let randomNumber = Math.floor(Math.random()* imge.length)
            
                page.style.backgroundImage = `url("image/`+imge[randomNumber]+`")`
            
            
                
            }, 5000);

        }
    }
    randomIamge();


    let ourSkills = document.querySelector(".our-skills")

    window.onscroll = function(){
        let skillOffsetTop = ourSkills.offsetTop
        let skillOffsetHeight = ourSkills.offsetHeight
        let windowHeight = this.innerHeight
        let windowScroll = this.scrollY

        if(windowScroll > (skillOffsetTop + skillOffsetHeight - windowHeight)){

            let allSkills = document.querySelectorAll(" .skills .skill-progress span")

            allSkills.forEach(span => {


                span.style.width = span.dataset.progress
            
          });

          

        }
    };
    let gallery = document.querySelectorAll(".gallery img")

    gallery.forEach(img => {
        img.addEventListener("click" , (e)=>{
            let overlay = document.createElement("div")
            overlay.className = "popup-overlay"
            

            document.body.appendChild(overlay)

            let popupBox = document.createElement("div")
            popupBox.className="popup-box"
            if(img.alt !== null){
                let headingImage = document.createElement("h3")

                let textImage = document.createTextNode(img.alt)

                headingImage.appendChild(textImage)
                popupBox.appendChild(headingImage)
            }
            let popupIamge = document.createElement("img")
            popupIamge.src = img.src

            popupBox.appendChild(popupIamge)

            document.body.appendChild(popupBox)

            let closeButton = document.createElement("div")
            let textButton = document.createTextNode("x")

            closeButton.appendChild(textButton)
            closeButton.className = 'close-button'

            popupBox.appendChild(closeButton)

            document.addEventListener("click" , (e)=>{
                if(e.target.className === "close-button"){
                    // e.target.parentNode.remove()
                    document.querySelector(".popup-box").remove();

                    document.querySelector(".popup-overlay").remove()
                }
                if(e.target.className ==="popup-overlay"){
                    document.querySelector(".popup-overlay").remove();
                    document.querySelector(".popup-box").remove();



                }
            })

         
        })

        
    });



    let btnToggle = document.querySelector(".toggle-menu")
    let tLinks = document.querySelector(".links")
    
    btnToggle.onclick = function (e){
        e.stopPropagation();

        this.classList.toggle('menu-active')
        tLinks.classList.toggle('open')
    }

    document.addEventListener("click" , (e)=>{
        if(e.target !== btnToggle && e.target !== tLinks){
                if(tLinks.classList.contains("open")){
                    btnToggle.classList.toggle('menu-active')
                    tLinks.classList.toggle('open')
                }
        }
    })
    tLinks.onclick = function(e){
        e.stopPropagation();
    }


   const bulltes = document.querySelectorAll(".nav-bullets .bullet")
   const likns = document.querySelectorAll("li a ")

    function scrollToAnyWhere(elements){
        elements.forEach(el => {

            el.addEventListener("click" , (e)=>{
               document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior:"smooth"
               })
            })
            
        });
    }

    scrollToAnyWhere(bulltes)
    scrollToAnyWhere(likns)
  

    function handleActive (el){
        el.target.parentElement.querySelectorAll(".active").forEach(element=>{
            element.classList.remove("active")
           })
           el.target.classList.add("active")
        
    }

     const bulletsSpan = document.querySelectorAll(".bullets-option span")
     const bulletsContainer = document.querySelector(".nav-bullets")

      let bulletLocalItem = localStorage.getItem("bullet")

      if(bulletLocalItem !== null){

        bulletsSpan.forEach(span => {
            span.classList.remove("active")
        });
        if(bulletLocalItem === "block"){
            bulletsContainer.style.display = "block"
            document.querySelector(".bullets-option .yes").classList.add("active")


        } else{
            bulletsContainer.style.display = "none"
            document.querySelector(".bullets-option .no").classList.add("active")



        }

      }

     bulletsSpan.forEach(span => {

     span.addEventListener("click" , (e)=>{
        if(span.dataset.display === "show"){
            bulletsContainer.style.display = "block"
            localStorage.setItem("bullet" , "block")
        } else{
            bulletsContainer.style.display = "none"
            localStorage.setItem("bullet" , "none")

        }
        handleActive(e) 
     })
     });


     document.querySelector(".reset-option").onclick = function (){
        localStorage.clear();
        window.location.reload();
     }