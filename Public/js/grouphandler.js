GroupChats = [] //Groupstorage
$.ajax({
    method:"POST",
    success: (data) => {
        for (let n = 0; n < data.GRPLog.length; n++) { GroupChats.push(data.GRPLog[n]) } //The chat uploader

        const Dis = document.querySelector('grouplist')
        Dis.innerHTML = ''
        //Displaying Of Various Chat Groups
        for (let i = 0; i < data.GRP.length; i++) {
            Dis.innerHTML +=`
                <div class="ChatIn${data.GRP[i].groupid}">
                    <img src="../images/group.jpg" alt="">
                    <display>
                        <groupname>${data.GRP[i].groupname}</groupname><br>
                        </display>
                </div>
                `
                // <chatname></chatname><talk>Last Msg...</talk>
        }
        const GrpHv = $('grouplist div').length > 6 ? 
        document.querySelector('groups').style.height = 'auto' : 
        document.querySelector('groups').style.height = '88vh'
         
        const GrpLog = $('grouplogs')//Group Logs Display
        for (let i = 0; i < data.GRP.length; i++) {
            //Clicking of any Any Group To Get Served
            $(`.ChatIn${data.GRP[i].groupid}`).on('click', () => {
                        document.querySelector('groupchats').style.display = 'flex'
                        document.querySelector('grouplist').style.display = 'none'
                        $('.top_menu').hide()

                        $('groupchats h2').html(data.GRP[i].groupname) // Display Group Name
                        $('.GrpID').val(data.GRP[i].groupid) //Assign Input The Group ID
                        $('.EleDiv').val((data.GRP[i].groupname).split(' ').join(''))

                        //Displaying Of The Group Chats Logs 
                        const Ele = (data.GRP[i].groupname).split(' ').join('')
                        GrpLog.html(`<${Ele}></${Ele}>`)
                        const Log  = document.querySelector(`${Ele}`)
                        Log.style.display = 'flex'
                        Log.style.flexDirection = 'column'

                        for (let n = 0; n < GroupChats.length; n++) {
                            let active = ''
                            let Person = GroupChats[n].from
                            if(GroupChats[n].from == data.PN){
                                active = 'activeme'
                                Person = 'you'
                            }
                            let Maincounter = 0
                            if(GroupChats[n].sento == data.GRP[i].groupid){
                                Maincounter ++
                                Log.innerHTML +=`
                                <article class="${active}" id="${GroupChats[n].Id}">
                                    <logname>@${Person}</logname>
                                    <log>${GroupChats[n].Msg}</log>
                                    <time>${GroupChats[n].time}</time>
                                </article>
                                `
                                // console.log(GroupChats[n].Id)
                                const D = new Date(GroupChats[n].Id)
                                const end = GroupChats.length-1
                                console.log(GroupChats[n+2].Id)
                                if(n == n-1){
                                    // console.log(Number(Math.ceil(GroupChats[n+1].Id/(1000*60*60*24))) , Number(Math.ceil(GroupChats[n].Id/(1000*60*60*24))))
                                    // if(Number(Math.ceil(GroupChats[n].Id/(1000*60*60*24))) < Number(Math.ceil(GroupChats[n+1].Id/(1000*60*60*24)))){
                                    //     const D = new Date(GroupChats[n+1].Id)
                                    //     const Mon = D.getMonth()+1 < 10 ? '0'+(D.getMonth()+1) : D.getMonth()+1
                                    //     const Day = D.getDate() < 10 ? '0'+(D.getDate()) : D.getDate()
                                    //     Log.innerHTML += `<chatdate>${Mon}/${Day}/${D.getFullYear()}</chatdate>`
                                    // }
                                }
                            }
                        }
                        Hview()
            })
        }

            //View Height Main Function
            function Hview(){
                $('.GrpMsg').focus()
                const Scroll = $('grouplogs article').length >= 4 ? 
                document.querySelector('.GrpSend').style.position = 'sticky' :
                document.querySelector('.GrpSend').style.position = 'absolute'

                const Hig = $('grouplogs article').length >= 6 ? 
                document.querySelector('groups').style.height = '100%' : 
                document.querySelector('groups').style.height = '100vh'
                window.scrollTo(0, document.body.scrollHeight)
            }
            
            //Closing Of Group Button Function
            $('groupchats button').on('click', () => {
                window.scrollTo(0, document.body.scrollTop)
                document.querySelector('grouplist').style.display = 'block'
                document.querySelector('groupchats').style.display = 'none'
                $('.top_menu').show()

                const GrpHv = $('grouplist div').length > 6 ? 
                document.querySelector('groups').style.height = 'auto' : 
                document.querySelector('groups').style.height = '100vh'
            })

    }
})
