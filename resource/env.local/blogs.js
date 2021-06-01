var blog = document.getElementById('blog_sec')
var toptitles = document.getElementsByClassName('toptitle')
console.log(toptitles)
console.log(toptitles.length)

for (var i = 0; i < toptitles.length; ++i) {
    var toptitle = toptitles[i]
    console.log("now")
    console.log(toptitle)
    toptitle.addEventListener('click', (e) => {
        console.log("clicked ")
        let toptitle_clicked = e.target
        blog_data_fetch(toptitle_clicked.innerHTML)
    })
}

//Fetching

const blog_data_fetch = async search_text => {
    console.log("Blogs : ", search_text)

    const result = await fetch("../env.local/blogs.json")
    const datas = await result.json()

    let blog_data = datas.filter(data => {
        const regex = new RegExp(`^${search_text}`, 'gi')
        return data.title.match(regex)
    })

    if (blog_data) {
        update_data(blog_data, search_text)
    } else {
        alert("No such Blog")
    }

}

const update_data = (blog_data, search_text) => {

    let blog_cont = blog_data[0]
    console.log("var : ", blog_cont)

    localStorage.setItem("header", search_text)
        //Storing in Local Storage

    localStorage.setItem("blog_title", blog_cont.title)
    localStorage.setItem("blog_def", blog_cont.introduction)
    localStorage.setItem("blog_para_one", blog_cont.paragraph_1.intro)

    //To store object or array type data use JSON.stringify
    localStorage.setItem("included", JSON.stringify(blog_cont.included))

}