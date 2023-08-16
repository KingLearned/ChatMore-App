export const wordCount = (words) => {
    const arr = words.split(' ')
    let fewWords = ''
    for (let i = 0; i < arr.length; i++) {
        fewWords += i < 10 ? `${arr[i]} ` : ''
    }
    
    return [fewWords,arr.length]
    
}