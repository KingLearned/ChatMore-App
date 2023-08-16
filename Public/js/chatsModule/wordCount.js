export const wordCount = (words) => {
    const arr = words.split(' ')
    let fewWords = ''
    for (let i = 0; i < arr.length; i++) {
        fewWords = arr.length < 10 ? arr : +`${arr[i]} `
    }
    return fewWords 
}