export const wordCount = (words) => {
    const arr = words.split(' ')
    let fewWords = ''
    for (let i = 0; i < arr.length; i++) {
        i < 10 ? fewWords += `${arr[i]} ` : ''
    }
    return fewWords
}