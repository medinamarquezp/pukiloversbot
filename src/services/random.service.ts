const randomArrayElement = (items: any[]) => items[ Math.floor(Math.random() * items.length) ]

const randomNumberBetween = (from:number, to:number) => Math.floor(Math.random() * to) + from  

export { 
    randomArrayElement as default,
    randomNumberBetween
}

