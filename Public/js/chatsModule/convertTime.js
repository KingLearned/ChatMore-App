const convertTime = (Time) => {
    const [Hr, Mins] = Time.split(':')
    const Hrs = Number(Hr)+1
    
    return Hrs >= 12 ? Hrs > 12 ? `${Hrs-12}:${Mins} PM` : `${Hrs}:${Mins} PM` : `${Hrs}:${Mins} AM`
}