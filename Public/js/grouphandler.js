$.ajax({
    method:"POST",
    success: (data) => {
        const Dis = document.querySelector('grouplist')
        Dis.innerHTML = ''
        //Displaying Of Various Chat Groups
        for (let i = 0; i < data.GRP.length; i++) {
            Dis.innerHTML +=`
                <div class="ChatIn${data.GRP[i].groupid}">
                    <img src="../images/group.jpg" alt="">
                    <display>
                        <groupname>${data.GRP[i].groupname}</groupname><br>
                        <chatname></chatname><talk>Last Msg...</talk>
                        </display>
                </div>
                `
        }
        const GrpHv = $('grouplist div').length > 6 ? 
        document.querySelector('groups').style.height = 'auto' : 
        document.querySelector('groups').style.height = '88vh'
         
        const GrpLog = $('grouplogs')//Group Logs Display
        for (let i = 0; i < data.GRP.length; i++) {
            //Clicking of any Any Group To Get Served
            $(`.ChatIn${data.GRP[i].groupid}`).on('click', () => {
                $.ajax({
                method:"POST",
                success: (data) => {
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

                        for (let n = 0; n < data.GRPLog.length; n++) {
                            var active = ''
                            let Person = data.GRPLog[n].from
                            if(data.GRPLog[n].from == data.PN){
                                active = 'activeme'
                                Person = 'you'
                            }
                            if(data.GRPLog[n].sento == data.GRP[i].groupid){
                                Log.innerHTML +=`
                                <article class="${active}" id="${data.GRPLog[n].Id}">
                                    <logname>@${Person}</logname>
                                    <log>${data.GRPLog[n].Msg}</log>
                                    <time>${data.GRPLog[n].time}</time>
                                </article>
                                `
                                const D = new Date(data.GRPLog[n].Id)
                                if(n < data.GRPLog.length-1){
                                    if(Number(Math.ceil(data.GRPLog[n+1].Id/(1000*60*60*24))) > Number(Math.ceil(data.GRPLog[n].Id/(1000*60*60*24)))){
                                    // if((new Date(data.GRPLog[n+1].Id)).getDate() > (new Date(data.GRPLog[n].Id)).getDate() && (new Date(data.GRPLog[n+1].Id)).getMonth() > (new Date(data.GRPLog[n].Id)).getMonth()){
                                        const D = new Date(data.GRPLog[n+1].Id)
                                        const Mon = D.getMonth()+1 < 10 ? '0'+(D.getMonth()+1) : D.getMonth()+1
                                        const Day = D.getDate() < 10 ? '0'+(D.getDate()) : D.getDate()
                                        Log.innerHTML += `<chatdate>${Mon}/${Day}/${D.getFullYear()}</chatdate>`
                                    }
                                }
                            }
                        }
                        Hview()
                    }
                }) 
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
