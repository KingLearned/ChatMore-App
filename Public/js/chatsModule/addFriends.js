const showImg = (imgName) => {
    return `https://cloud.appwrite.io/v1/storage/buckets/Chatmoreupload/files/${imgName}/view?project=64c7e9ee17c84cabe3cd&mode=admin`
}

export const addFriends = (frndsDB, newFrnds, Disp) => {
    for (let i = 0; i < newFrnds.length; i++) {
        for (let n = 0; n < frndsDB.length; n++) {
            if(frndsDB[n].username == newFrnds[i]){
                var UserImg = `<img src="${showImg(frndsDB[n].user_img)}" alt="${frndsDB[n].user_img}">`
                if(frndsDB[n].user_img == ''){
                    UserImg = `<img src="../images/avatar.png" alt="avatar.png">`
                }
                Disp.innerHTML +=`
                <div>
                    ${UserImg}
                    <display>
                        <chatname>${newFrnds[i]}</chatname><br>
                        <userabout>${frndsDB[n].about}</userabout>
                    </display>
                    <add class='fa fa-user-plus ${newFrnds[i]}' title="add ${newFrnds[i]} to your chats"></add>
                </div>`
            }
        }    
    }

    for (let i = 0; i < frndsDB.length; i++) {
        $(`.${frndsDB[i].username}`).on('click', () => {
            $.ajax({
                method:"POST",
                data : {
                    AddFriend : frndsDB[i].username
                },
                success : (data) => {
                    window.location = '/'
                }
            })
        })
    }
}