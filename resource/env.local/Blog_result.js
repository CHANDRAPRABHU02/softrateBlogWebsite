const btn_post = document.getElementById("btn_post")
const btn_sign = document.getElementById("btn_sign")
const btn_signOut = document.getElementById("btn_signOut")

const user_img = document.getElementById("user_img")

let user_cmmt = document.getElementById("user_input")
let comments = document.getElementById("comments")
let del = document.getElementById("del_btn")
console.log("ucmmts:", user_cmmt.innerHTML)
console.log("meow")
let header = localStorage.getItem("header")
console.log(header)

btn_sign.addEventListener("click", (e) => {
    e.preventDefault()
    auth.signInWithPopup(provider)
        .then(res =>
            console.log(res.user)
        )
        .catch(err => {
            console.log(err)
        })
})


btn_signOut.addEventListener("click", () => {
    console.log("2meow")
    auth.signOut()
})

console.log("cmmt", user_cmmt)
auth.onAuthStateChanged(user => {
    if (user) {
        console.log("signed in")
        console.log(user)
        console.log("name", user.displayName, "photo", user.photoURL)

        user_img.src = user.photoURL
        let user_name = user.displayName
            //Comment Getting
        db.collection(header)
            .orderBy("time", "desc")
            .onSnapshot(snapshot => {
                get_data(snapshot.docs)
            })


        //----ADDING DATA TO FIREBASE
        let time = new Date().toLocaleTimeString() + ' ' + new Date().toLocaleDateString()
        btn_post.addEventListener("click", (e) => {
            e.preventDefault()
            setTimeout(() => {
                window.location.reload()
            }, 1000)
            db.collection(header).add({
                    cmmt: user_cmmt.value,
                    time: time,
                    user: user_name,
                    profile: user.photoURL
                })
                // user_cmmt.innerHTML = ''
                // window.location.reload(true);
        })


    } else {
        console.log("no user")
        user_img.src = `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F0d%2Fdc%2Fca%2F0ddccae723d85a703b798a5e682c23c1.png&f=1&nofb=1`

        btn_post.addEventListener("click", () => {
            alert("Sign In to Comment")
        })
    }
})

const get_data = (datas) => {
    let html = ``

    datas.map(data => {
            let doc = data.data()
            console.log(doc.cmmt, doc.time, doc.photoURL)
            html =
                `   
            <div id="comment_display">      
            <div class="cmmt_header">
                <div id="cmmtr_info"> 
                    <div id="cmmtr_info_name">
                        <p>${doc.user}</p>
                    </div>
                </div>
                <div id="posted_time">
                    <p>${doc.time}</p>
                </div>
            </div>
            <div id="posted_cmmt">
                <p>${doc.cmmt} </p>
            </div>
            </div>
            `
            comments.innerHTML += html
        })
        // comments.innerHTML += html
}

window.addEventListener("load", () => {

    //LocalStorage

    let title = document.getElementById("title")
    let def_sec = document.getElementById("def_sec")
    let included = document.getElementById("included")
    let para = document.getElementById("para")

    let blog_title = localStorage.getItem('blog_title')
    let def = localStorage.getItem('blog_def')
    let cont = localStorage.getItem('blog_cont_info')
    let para_one = localStorage.getItem('blog_para_one')
    let incl = JSON.parse(localStorage.getItem("included"))

    title.innerText = blog_title
    def_sec.innerHTML = def
    included.innerHTML = incl[2]
    console.log("title", blog_title)

})



// optimistic-joliot-056370