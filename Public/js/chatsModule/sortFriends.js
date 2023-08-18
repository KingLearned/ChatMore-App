const sortFriends = (mainDB, addFrnds, userName, frndsDB) => {
    for (let i = 0; i < mainDB.length; i++) {
        if((mainDB[i].username).toUpperCase() !== (userName).toUpperCase()){
            addFrnds.push(mainDB[i].username)
        }
    }
    const Friends = frndsDB
    for (let i = 0; i < addFrnds.length; i++) {
        for (let n = 0; n < Friends.length; n++) {
            if((Friends[n] == addFrnds[i])){
            function Rem(comm,Add){
                var index = comm.indexOf(Add)
                if(index > -1){
                comm.splice(index,1)
                }
                return comm
            }Rem(addFrnds,addFrnds[i])
            }
            
        }
    }
}