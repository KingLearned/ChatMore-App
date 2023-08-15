import { showFriends } from "./chatsModule/showFriends.js"
const showImg = (imgName) => { return `https://cloud.appwrite.io/v1/storage/buckets/Chatmoreupload/files/${imgName}/view?project=64c7e9ee17c84cabe3cd&mode=admin` }

let c = 0
const redo = () => {
    console.log(c)
    c++
    console.log(c)
} 
redo()


const MainChats = []    //for storing user => user chats
$.ajax({
    method: "POST",
    success: (data) => {
        $('yourname').html(data.PN)
        for (let m = 0; m < data.CHATS.length; m++) { MainChats.push(data.CHATS[m]) }
        document.querySelector('friendlist').innerHTML = ''

        const userAbout = data.USER[0].about !== '' ? $('.aboutme').val(data.USER[0].about) : $('.aboutme').val(`Hello, I'm using ChatMore App`) //user about display
        const userPicture = data.USER[0].user_img == '' ? $('dpx').html(`<img src="../images/avatar.png" alt="avatar.png">`) : $('dpx').html(`<img src="${showImg(data.USER[0].user_img)}" alt="${data.USER[0].user_img}">`)
        $('tel').html(data.USER[0].telephone)

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
                        friendsChat[userFriends.indexOf(userFriends[i])].push(data.CHATS[n])
                    }
                }
            }
        }

        //FOR SHOWING OF USER'S FRIENDS
        showFriends(data.FRD, data.PN, data.SORT, friendsChat)

        /*************** FOR REMOVING OF CHAT LOG ******************/
        /*************** FOR REMOVING OF CHAT LOG ******************/
        $('chatlog button').on('click', () => {
            window.scrollTo(0, document.body.scrollTop)
            document.querySelector('chatlog').style.display = 'none'
            document.querySelector('friendlist').style.display = 'block'
            $('.chats_head').show()

            if($('.friends div').length >= 9){
                document.querySelector('.friends').style.height = '100%'
            }else{
                document.querySelector('.friends').style.height = '90vh'
            }

            $('.EditId').val('')
            $('.locator').val('')
            $('.Msg').val('')

            ChatLogs.length = 0 //For resetting of the chatbox to empty
        })

        //FOR CLOSING OF USER'S PROFILE
        $('.user_profile .ClxPrf').on('click', () => {
            document.querySelector('.user_profile').style.display = 'none'
            document.querySelector('.app').style.display = 'block'
        })

        //FOR VIEWING OF USER'S PROFILE
        $('.viewProfile').on('click', () => {
            document.querySelector('.user_profile').style.display = 'flex'
            document.querySelector('.user_profile').style.height = 'auto'
            document.querySelector('.app').style.display = 'none'
        })

        $('.ChngPwd').on('submit', (e) => {
            e.preventDefault()
            $.ajax({
                method:"POST",
                data:{
                    newPWD : $('.newPWD').val(),
                    CnewPWD : $('.CnewPWD').val()
                },
                success: (data) => {
                    $('.ChngPwd h5').html(data.validPwd || data.errPwd)
                    setTimeout(() => { $('.ChngPwd h5').html('') ; const validate = data.validPwd ? window.location = '/' : ''}, 3000)
                    
                }
            })
        })
        /**************************************************************************** */
        
        /************************* FOR SERVING OF THE CHAT LOG *************************/
        /************************* FOR SERVING OF THE CHAT LOG *************************/
        const ChatLogs = []
        for (let i = 0; i < data.FRD.length; i++) {
            $(`.chat_${data.FRD[i]}`).on('click', () => {

                document.querySelector('chatlog').style.display = 'flex' //Display Chat With a Friend
                document.querySelector('friendlist').style.display = 'none'//Hide Friends List
                $('.chats_head').hide()

                let FriendImg = `../images/avatar.png`
                for (let p = 0; p < data.SORT.length; p++) {
                    if(data.FRD[i] == data.SORT[p].username && data.SORT[p].user_img !== ''){
                        FriendImg =  `${showImg(data.SORT[p].user_img)}`
                    }
                    if(data.FRD[i] == data.SORT[p].username){
                        $('about').html(data.SORT[p].about) //For about the user friends
                    }
                }
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
                document.querySelector('logs').innerHTML = `<${Ele}></${Ele}>`
                const Show = document.querySelector(`logs ${Ele}`)
                Show.style.display = 'flex';
                Show.style.flexDirection = 'column'

                for (let n = 0; n < ChatLogs.length; n++) {
                    var shift = ''
                    var edit = ''
                    if(ChatLogs[n].replyto !== data.PN){
                        shift = `class="edit ChatID${ChatLogs[n].Id}" style="align-self:flex-end; background-color: rgb(245, 111, 245); color:white; border-radius:10px 10px 0 10px"`
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

        /************************* COMMUNITY SECTION HANDLER ***************************/
        /************************* COMMUNITY SECTION HANDLER ***************************/
        const Disp = document.querySelector('community')
        Disp.innerHTML = ''
        const Addthem = []
        for (let i = 0; i < data.SORT.length; i++) {
            if((data.SORT[i].username).toUpperCase() !== (data.PN).toUpperCase()){
                Addthem.push(data.SORT[i].username)
            }

            const Friends = data.FRD
            for (let i = 0; i < Addthem.length; i++) {
                for (let n = 0; n < Friends.length; n++) {
                    if((Friends[n] == Addthem[i])){
                    function Rem(comm,Add){
                        var index = comm.indexOf(Add)
                        if(index > -1){
                        comm.splice(index,1)
                        }
                        return comm
                    }Rem(Addthem,Addthem[i])
                    }
                    
                }
            }
        }

        /******************************* ADDING OF FRIENDS DISPLAY FUNCTION ************************/
        for (let i = 0; i < Addthem.length; i++) {
            for (let n = 0; n < data.SORT.length; n++) {
                if(data.SORT[n].username == Addthem[i]){
                    var UserImg = `<img src="${showImg(data.SORT[n].user_img)}" alt="${data.SORT[n].user_img}">`
                    if(data.SORT[n].user_img == ''){
                        UserImg = `<img src="../images/avatar.png" alt="avatar.png">`
                    }
                    Disp.innerHTML +=`
                    <div>
                        ${UserImg}
                        <display>
                            <chatname>${Addthem[i]}</chatname><br>
                            <userabout>${data.SORT[n].about}</userabout>
                        </display>
                        <add class='fa fa-user-plus ${Addthem[i]}' title="add ${Addthem[i]} to your chats"></add>
                    </div>`
                }
            }    
        }

        for (let i = 0; i < data.SORT.length; i++) {
            $(`.${data.SORT[i].username}`).on('click', () => {
                $.ajax({
                    method:"POST",
                    data : {
                        AddFriend : data.SORT[i].username
                    },
                    success : (data) => {
                        window.location = '/'
                    }
                })
            })
        }

        /********************** VIEW LENGTH HANDLE ***********************/
        if($('.friends div').length > 8){
            document.querySelector('.friends').style.height = 'auto'
        }
        if($('groups div').length > 4){
            document.querySelector('groups').style.height = 'auto'
        }
        if($('community div').length > 4){
            document.querySelector('community').style.height = 'auto'
        }
        
    }
})
//Preloader function caller
setInterval(() => {
    const preLoader = $('friendlist div').length > 0 ? document.querySelector('.preloader').style.display = 'none' : document.querySelector('.preloader').style.display = 'flex' 
}, 500);