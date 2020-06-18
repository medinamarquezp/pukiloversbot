import config from '../config/main'
import contents from '../data/content'

const { terms, producers } = config

const producersList = Object.getOwnPropertyNames(producers)

const random = (items: any[]) => items[ Math.floor(Math.random() * items.length) ]

const randomTerm = random(terms)

const randomProducer = random(producersList)

const randomContent = random(contents)

export { 
    random as default, 
    randomTerm, 
    randomProducer, 
    randomContent 
}

