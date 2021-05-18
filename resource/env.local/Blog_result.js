window.addEventListener('load', () => {

    let title = document.getElementById("title")
    let def_sec = document.getElementById("def_sec")
    let included = document.getElementById("included")
    let para = document.getElementById("para")

    let name = localStorage.getItem('blog_title')
    let def = localStorage.getItem('blog_def')
    let cont = localStorage.getItem('blog_cont_info')
    let para_one = localStorage.getItem('blog_para_one')
    let incl = JSON.parse(localStorage.getItem("included"))


    // console.log("Full Blog", blog)
    console.log("meow ", name, def, cont, "para", para_one, "yoo")
    console.log("Object oyoo - ", incl)

    title.innerHTML = name
    def_sec.innerHTML = def
    included.innerHTML = incl[2]

})