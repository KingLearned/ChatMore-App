export const showFriends = (frdList, userName, sortData, frdChats) => {
    for (let i = 0; i < frdList.length; i++) {
         
        let GenEle = (((`${frdList[i]+userName}`).toLocaleLowerCase()).split('')).sort()
        let Ele = ''; for (let l = 0; l < GenEle.length; l++) {Ele += GenEle[l]} //Generate Unique DOM for displaying last log Dynamically

        for (let n = 0; n < sortData.length; n++) {
            if(sortData[n].username == frdList[i]){
                
                let UserImg = `<img src="${showImg(sortData[n].user_img)}" alt="${sortData[n].user_img}">`
                if(sortData[n].user_img == ''){
                    UserImg = `<img src="../images/avatar.png" alt="avatar.png">`
                }

                const LastMsg = frdChats[i].length > 0 ? frdChats[i][frdChats[i].length-1].Msg : '' //last Message generator

                document.querySelector('friendlist').innerHTML +=`
                <div class="chat_${frdList[i]}">
                    ${UserImg}
                    <display>
                        <chatname>${frdList[i]}</chatname><br>
                        <talk class="last-log${Ele}">${LastMsg}</talk>
                    </display>
                </div>
                `
            }
        }   
    }
}