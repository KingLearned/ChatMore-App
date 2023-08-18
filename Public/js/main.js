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

//FOR VIEWING OF USER'S PROFILE
$('.viewProfile').on('click', () => {
    document.querySelector('.user_profile').style.display = 'flex'
    document.querySelector('.app').style.display = 'none'
})
document.querySelector('.user_profile').style.display = 'flex'
document.querySelector('.app').style.display = 'none'

//FOR CLOSING OF USER'S PROFILE
$('.user_profile .ClxPrf').on('click', () => {
    document.querySelector('.user_profile').style.display = 'none'
    document.querySelector('.app').style.display = 'block'
})

//CHANGING OF USER PROFILE IMAGE
const submitImg = () => {
    $('.CImg').html($('#userimage').val())
    document.querySelector('.fa-upload').style.display = 'block'
    document.querySelector('.fa-camera').style.display = 'none'
}
$('.uploadImg').on('submit', (e) => {
    e.preventDefault()
    $('.uploadImg').submit()
    console.log('submitted!')
})

//CHANGE OF PASSWORD
$('.ChngPwd').on('submit', (e) => {
    const displayErr = (errMsg) => { $('.ChngPwd h5').html(`<span style="color:red;">${errMsg}</span>`); setTimeout(() => { $('.ChngPwd h5').html('') }, 3000); return errMsg }
    e.preventDefault()
    
    const validate = $('.newPWD').val().length < 7 ? displayErr('Password must be greater then 6 characters!') : $('.newPWD').val() !== $('.CnewPWD').val() ? displayErr('Mismatched Password') : ''

    if(!validate){
        $.ajax({
            method:"POST",
            data:{
                newPWD : $('.newPWD').val(),
                CnewPWD : $('.CnewPWD').val()
            },
            success: (data) => {
                $('.ChngPwd h5').html(data.validPwd); setTimeout(() => { window.location = '/' }, 3000);               
            }
        })
    }
})

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

