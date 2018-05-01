
$(document).ready(()=>{
    launchHublOnChatButtonClick()
})

function launchHublOnChatButtonClick(){
    let links = document.getElementsByClassName("link")
    for(let i = 0 ; i < links.length ; i++){
        links[i].addEventListener("click", function(e){
            let meetingUrl = e.path[0].getAttribute('data-urlMeeting')
            window.open(meetingUrl, Math.random(), "width=820,height=630,resizeable=yes,location=no")
        })
    }
}