const socket = io()
import { addFriends } from "./chatsModule/addFriends.js"
import { showFriends } from "./chatsModule/showFriends.js"
import { sortFriends } from "./chatsModule/sortFriends.js"
import { DeleteMsg } from "./socket.js"
const showImg = (imgName) => { return `https://cloud.appwrite.io/v1/storage/buckets/Chatmoreupload/files/${imgName}/view?project=64c7e9ee17c84cabe3cd&mode=admin` }

export const MainChats = []    //for storing user => user chats

$.ajax({
    method: "POST",
    success: (data) => {
        for (let m = 0; m < data.CHATS.length; m++) { MainChats.push(data.CHATS[m]) }

        $('yourname').html(data.PN)
        data.USER[0].about !== '' ? $('.aboutme').val(data.USER[0].about) : $('.aboutme').val(`Hello, I'm using ChatMore App`) //user about display
        data.USER[0].user_img == '' ? $('dpx').html(`<img src="../images/avatar.png" alt="avatar.png">`) : $('dpx').html(`<img src="${showImg(data.USER[0].user_img)}" alt="${data.USER[0].user_img}">`)
        $('tel').html(data.USER[0].telephone)
        
        
        document.querySelector('friendlist').innerHTML = ''
        
        // WHEN FRIENDS LIST IS EMPTY
        if(data.FRD.length < 1){
            document.querySelector('friendlist').innerHTML =
            `
                <div style="display:block;">
                    <h3 style="text-align: center;">NO FRIENDS YET!</h3>
                    <h5 style="text-align: center;">Add friends from users</h5>
                </div>
            `
        }

        //FOR GETTING OF THE LAST MESSAGE A IN CHAT
        const friendsChat = []
        const userFriends = []
        if(data.FRD.length > 0){ //Checking to know if the user has friends
            data.FRD.forEach(Frd => { friendsChat.push([]); userFriends.push([Frd,data.PN]) })
            for (let i = 0; i < userFriends.length; i++) {
                for (let n = 0; n < data.CHATS.length; n++) {
    
                    if(userFriends[i].some(Ele => Ele == data.CHATS[n].replyto) && userFriends[i].some(Ele => Ele == data.CHATS[n].from)){
                        friendsChat[userFriends.indexOf(userFriends[i])] = data.CHATS[n]
                    }
                }
            }
        }

        //FOR SHOWING OF USER'S FRIENDS
        showFriends(data.FRD, data.PN, data.SORT, friendsChat)

        //FOR SERVING OF THE CHAT LOGs
        const ChatLogs = []
        for (let i = 0; i < data.FRD.length; i++) {
            $(`.chat_${data.FRD[i]}`).on('click', () => {
                document.querySelector('chatlog').style.display = 'flex' //Display Chat With a Friend
                document.querySelector('friendlist').style.display = 'none'//Hide Friends List
                $('.chats_head').hide()

                let FriendImg = `../images/avatar.png`
                for (let p = 0; p < data.SORT.length; p++) {
                    // Change FriendImg 
                    data.FRD[i] == data.SORT[p].username && data.SORT[p].user_img !== '' ? FriendImg =  `${showImg(data.SORT[p].user_img)}` : ''
                    //Display Friends About
                    data.FRD[i] == data.SORT[p].username && $('about').html(data.SORT[p].about)
                }

                const setStatus = localStorage.getItem(data.FRD[i])
                //Status Indicator
                document.querySelector('.imgHead span').innerHTML = 
                `<user_${data.FRD[i]} style='position: absolute; bottom: 0; right: 0; width: 13px; height: 13px; background-color: ${setStatus == 'online' ? 'lime' : 'red'}; border-radius: 100px;'></user_${data.FRD[i]}>`

                document.querySelector('chatlog img').src = FriendImg
                $('chatlog h1').html(`<span style='text-transform:capitalize;'>${data.FRD[i]}</span>`)//Chat Header
                $('chatlog h6').html(data.FRD[i])//Chat Header
                
                for (let m = 0; m < MainChats.length; m++) {
                    if(MainChats[m].replyto == data.FRD[i] && MainChats[m].from == data.PN){
                        ChatLogs.push(MainChats[m]) //Sent To Guest
                    }
                    if(MainChats[m].from == data.FRD[i] && MainChats[m].replyto == data.PN){
                        ChatLogs.push(MainChats[m]) //Sent From Guest
                    }
                }
                
                let GenEle = (((`${data.FRD[i]+data.PN}`).toLocaleLowerCase()).split('')).sort()
                let Ele = ''
                for (let i = 0; i < GenEle.length; i++) {Ele += GenEle[i]}
                
                $('.repto').val(data.FRD[i]) //Reply To User Friend
                $('.EleDiv').val(Ele)//User Display Element Div
                document.querySelector('logs').innerHTML = `<${Ele} style="display:flex; flex-direction:column;"></${Ele}>`
                const Show = document.querySelector(`logs ${Ele}`)

                for (let n = 0; n < ChatLogs.length; n++) {
                    var shift = ''
                    var edit = ''
                    if(ChatLogs[n].replyto !== data.PN){
                        shift = `class="edit ChatID${ChatLogs[n].Id}" style=""`
                        edit = `<make><edit class="fa fa-pen edit${ChatLogs[n].Id}" title="Edit Message"></edit><del class="fa fa-times del${ChatLogs[n].Id}" title="Delete Message"></del></make>`
                    }
                    
                    //Differentiating Between You and Other Users
                    const id = ChatLogs[n].from == data.PN ? 'you' : ChatLogs[n].from

                    Show.innerHTML += ` 
                        <article ${shift} id="ChatID${ChatLogs[n].Id}">
                        <log>${ChatLogs[n].Msg.split('<').join('&lt;')}</log>
                        <time>${ChatLogs[n].time}</time>
                        ${edit}
                        </article>
                        `
                    if(n < ChatLogs.length-1){
                        if(Number(Math.ceil(ChatLogs[n+1].Id/(1000*60*60*24))) > Number(Math.ceil(ChatLogs[n].Id/(1000*60*60*24)))){
                        // if((new Date(ChatLogs[n+1].Id)).getDate() > (new Date(ChatLogs[n].Id)).getDate()){
                            const D = new Date(ChatLogs[n+1].Id)
                            const Mon = D.getMonth()+1 < 10 ? '0'+(D.getMonth()+1) : D.getMonth()+1
                            const Day = D.getDate() < 10 ? '0'+(D.getDate()) : D.getDate()
                            Show.innerHTML += `<chatdate>${Mon}/${Day}/${D.getFullYear()}</chatdate>`
                        }
                    }
                }

                /********************* HEIGHT VIEW FUNCTION    ************************/
                
                const stickyTop = ($('.friends article').length + $('.friends chatdate').length) > 10 ? 
                (document.querySelector('.friends').style.height = 'auto',document.querySelector('.app').style.height = 'auto') :
                document.querySelector('.friends').style.height = '95vh'
                window.scrollTo(0, document.body.scrollHeight)
                
                $('.Msg').focus() //Focusing of Type new Message

                /********************* FOR EDITING OF THE USERS MESSAGES    ************************/
                for (let e = 0; e < ChatLogs.length; e++) {
                    $(`.edit${ChatLogs[e].Id}`).on('click', () => {
                        $('.EditId').val(ChatLogs[e].Id)
                        $('.EdMsg').val(ChatLogs[e].Msg.split('&lt;').join('<'))
                        $('.SendForm').hide()
                        $('.EdForm').show()
                        $('.EdMsg').focus()
                        
                        $(`.EdForm`).on('submit', (e) => {
                            e.preventDefault()
                            $.ajax({
                                method:"POST",
                                data:{
                                    ElementTag: $('.EleDiv').val(),
                                    EditId: $('.EditId').val(),
                                    EditMsg:$('.EdMsg').val()
                                },
                                success:(data) => {
                                    socket.emit('chat message', data.SndMsg)
                                    $('.EdForm').hide()
                                    $('.SendForm').show()
                                    $('.Msg').val(''),$('.GrpMsg').val('')
                                }
                            })
                        })
                    })
                }

                /********************* FOR DELETING OF THE USERS MESSAGE    ************************/
                ChatLogs.forEach(eachMsg => {
                    $(`.del${eachMsg.Id}`).on('click', () => {
                        DeleteMsg(eachMsg.Id)
                    })
                })

                
            })
        }

        //FOR REMOVING OF CHAT LOG
        $('chatlog button').on('click', () => {
            window.scrollTo(0, document.body.scrollTop)
            document.querySelector('chatlog').style.display = 'none'
            document.querySelector('friendlist').style.display = 'block'
            $('.chats_head').show()
            
            $('.EditId').val('')
            $('.locator').val('')
            $('.Msg').val('')
            $('.EdMsg').val('')

            $('.SendForm').show()
            $('.EdForm').hide()

            ChatLogs.length = 0 //For resetting of the chatbox to empty
        })

        $('.logOutBtn').on('click', () => {
            socket.emit('chat message', {Id:'Status', User:data.PN, Status:'offline'})
            localStorage.setItem(data.PN, 'offline')
            window.location = '/Log-User-Out'
        })

        socket.emit('chat message', {Id:'Status', User:data.PN, Status:'online'})

        //ADD OTHER USERS FUNCTIONS
        const Disp = document.querySelector('community')
        Disp.innerHTML = ''
        const Addthem = []

        //SORT FRIENDS LIST
        sortFriends(data.SORT, Addthem, data.PN, data.FRD)

        //ADDING OF FRIENDS & DISPLAY FUNCTION
        addFriends(data.SORT, Addthem, Disp)
    }
})
//Preloader function caller
setInterval(() => {
    const preLoader = $('friendlist div').length > 0 ? document.querySelector('.preloader').style.display = 'none' : document.querySelector('.preloader').style.display = 'flex' 
}, 500);