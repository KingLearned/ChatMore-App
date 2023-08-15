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
                        $('.chats_head').hide()

                        $('groupchats h2').html(data.GRP[i].groupname) // Display Group Name
                        $('.GrpID').val(data.GRP[i].groupid) //Assign Input The Group ID
                        $('.EleDiv').val((data.GRP[i].groupname).split(' ').join(''))

                        //Displaying Of The Group Chats Logs 
                        const Ele = (data.GRP[i].groupname).split(' ').join('')
                        GrpLog.html(`<${Ele} style="margin-top:200px"></${Ele}>`)
                        const Log  = document.querySelector(`${Ele}`)
                        Log.style.display = 'flex'
                        Log.style.flexDirection = 'column'

                        const mainConvo = []
                        for (let n = 0; n < GroupChats.length; n++) { const Add = GroupChats[n].sento == data.GRP[i].groupid ? mainConvo.push(GroupChats[n]) : '' }

                        for (let n = 0; n < mainConvo.length; n++) {
                            let active = ''
                            let Person = `<logname>@${mainConvo[n].from}</logname>`
                            if(mainConvo[n].from == data.PN){ active = 'activeme', Person = '' }

                            Log.innerHTML +=`
                            <article class="${active}" id="${mainConvo[n].Id}">
                                ${Person}
                                <log>${mainConvo[n].Msg.split('<').join('&lt;')}</log>
                                <time>${mainConvo[n].time}</time>
                            </article>
                            `

                            if(n < mainConvo.length-1){
                                if(Number(Math.ceil(mainConvo[n].Id/(1000*60*60*24))) < Number(Math.ceil(mainConvo[n+1].Id/(1000*60*60*24)))){
                                    const D = new Date(mainConvo[n+1].Id)
                                    const Mon = D.getMonth()+1 < 10 ? '0'+(D.getMonth()+1) : D.getMonth()+1
                                    const Day = D.getDate() < 10 ? '0'+(D.getDate()) : D.getDate()
                                    Log.innerHTML += `<chatdate>${Mon}/${Day}/${D.getFullYear()}</chatdate>`
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
                (document.querySelector('groups').style.height = '100%',document.querySelector('.app').style.height = '100%') : 
                document.querySelector('groups').style.height = '100vh'
                window.scrollTo(0, document.body.scrollHeight)
            }
            
            //Closing Of Group Button Function
            $('groupchats button').on('click', () => {
                window.scrollTo(0, document.body.scrollTop)
                document.querySelector('grouplist').style.display = 'block'
                document.querySelector('groupchats').style.display = 'none'
                $('.chats_head').show()

                const GrpHv = $('grouplist div').length > 6 ? 
                document.querySelector('groups').style.height = 'auto' : 
                document.querySelector('groups').style.height = '100vh'
            })

    }
})
