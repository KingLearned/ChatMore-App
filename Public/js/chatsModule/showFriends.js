import { wordCount } from "./wordCount.js";

const showImg = (imgName) => {
    return `https://cloud.appwrite.io/v1/storage/buckets/Chatmoreupload/files/${imgName}/view?project=64c7e9ee17c84cabe3cd&mode=admin`
}
export const showFriends = (frdList, userName, sortData, frdChats) => {
    for (let i = 0; i < frdList.length; i++) {
         
        const genEle = (((`${frdList[i]+userName}`).toLocaleLowerCase()).split('')).sort()
        let Ele = ''; for (let l = 0; l < genEle.length; l++) {Ele += genEle[l]} //Generate Unique DOM for displaying last log Dynamically

        for (let n = 0; n < sortData.length; n++) {
            if(sortData[n].username == frdList[i]){

                sortData[n].status == 1 ? localStorage.setItem(frdList[i], 'online') : localStorage.setItem(frdList[i], 'offline')
                //friendImg
                const userImg = sortData[n].user_img == '' ? `<img src="../images/avatar.png" alt="avatar.png">` : `<img src="${showImg(sortData[n].user_img)}" alt="${sortData[n].user_img}">`
                //Last Msg
                const lastMsg = frdChats[i].length !== 0 ? frdChats[i].Msg : '' //last Message generator
                const wordExced = wordCount(lastMsg)[1] > 10 ? '...':''

                document.querySelector('friendlist').innerHTML +=`
                <div class="chat_${frdList[i]}">
                    ${userImg}
                    <display>
                        <chatname>${frdList[i]}</chatname><br>
                        <talk class="last-log${Ele}">${wordCount(lastMsg)[0].trim()+wordExced}</talk>
                    </display>
                </div>
                `
            }
        }   
    }
}