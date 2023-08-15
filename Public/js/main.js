const NavBar = [document.querySelector('.chat'), document.querySelector('.group'), document.querySelector('.community')]
const NavDisplay = [document.querySelector('.friends'), document.querySelector('groups'), document.querySelector('community')]
const HeightEle = ['.friends', 'groups', 'community']
NavBar[0].style.color = 'black'
NavBar.forEach(eachNav => {
   eachNav.addEventListener('click', () => {
        for (let i = 0; i < NavBar.length; i++) {
            const Navigator = eachNav == NavBar[i] ? 
            (eachNav.style.color = 'black', NavDisplay[NavBar.indexOf(eachNav)].style.display = 'block' ) : 
            (NavBar[i].style.color = '', NavDisplay[i].style.display = 'none')

            const viewHeight = $(`${HeightEle[NavBar.indexOf(eachNav)]} div`).length > 6 ? 
            NavDisplay[NavBar.indexOf(eachNav)].style.height = 'auto' :
            NavDisplay[NavBar.indexOf(eachNav)].style.height = '88vh'
        }  
    })
})
//CHANGING OF USER PROFILE IMAGE
function Submit(){
    $('.CImg').html($('#userimage').val())
    document.querySelector('.fa-upload').style.display = 'block'
    document.querySelector('.fa-pen').style.display = 'none'
}

//APP EMOJIS FUNCTIONALITIES
const Smiles = ['😎', '😡', '😊','😍', '😅', '😁', '💓','💔', '😒', '😜','☕', '🏃',]
let SmileCount = 0
$('smile').on('click', () => {
    $('emojis').html('')
    for (let i = 0; i < Smiles.length; i++) {
        $('emojis').html($('emojis').html() + `<emo>${Smiles[i]}</emo>`)
    }
    const Emoji = SmileCount == 0 ? ($('emojis').show(),SmileCount=1) : ($('emojis').hide(),SmileCount=0)

    const Emo = document.querySelectorAll('emo')
    for (let i = 0; i < Emo.length; i++) {
        Emo[i].addEventListener('click',() => {
            $('.EdMsg').val($('.EdMsg').val()+Emo[i].innerHTML)
            $('.EdMsg').focus()
            $('.Msg').val($('.Msg').val()+Emo[i].innerHTML)
            $('.Msg').focus()
            $('.GrpMsg').val($('.GrpMsg').val()+Emo[i].innerHTML)
            $('.GrpMsg').focus()
        }) 
    }
})

