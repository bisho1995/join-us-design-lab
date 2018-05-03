
$(document).ready(()=>{
    launchHublOnChatButtonClick()
    launchNotesWindowOnClick()
})

function launchNotesWindowOnClick(){
    let notesButtons = document.getElementsByClassName("notes")
    
    for(let i = 0 ; i < notesButtons.length ; i++){
        notesButtons[i].addEventListener("click", (e)=>{
            let client_id = e.path[0].getAttribute('data-client_id')
            let notesUrl = 'http://localhost:3000/peermotivator-dashboard/notes' + '?client=' + client_id
            
            window.open(notesUrl, Math.random(), "width=420,height=315,resizeable=no,location=no")
        })
    }
}

function launchHublOnChatButtonClick(){
    let links = document.getElementsByClassName("link")
    for(let i = 0 ; i < links.length ; i++){
        links[i].addEventListener("click", function(e){
            let meetingUrl = e.path[0].getAttribute('data-urlMeeting')
            window.open(meetingUrl, Math.random(), "left=600,width=820,height=630,resizeable=yes,location=no")
        })
    }
}