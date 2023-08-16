export const convertTime = (Time) => {
    const [Hrs, Mins] = Time.split(':')
    
    return Number(Hrs) >= 12 ? Hrs > 12 ? `${Hrs-12}:${Mins} PM` : `${Number(Hrs)}:${Mins} PM` : `${Number(Hrs)}:${Mins} AM`
}