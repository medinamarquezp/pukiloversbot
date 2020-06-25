import config from '../config/main'
import random from '../services/random.service'
import IProducer from './IProducer'
import Giphy from '../producers/giphy/Giphy'
import Pexels from '../producers/pexels/Pexels'
import Unsplash from '../producers/unsplash/Unsplash'

const { producers } = config
const producersList = Object.getOwnPropertyNames(producers)

function getProducerInstance(): IProducer {
    
    const randomProducer = random(producersList)
    let producer: IProducer;

    switch(randomProducer){
        case "pexels":
            producer = new Pexels;
            break;
        case "unsplash":
            producer = new Unsplash;
            break;
        case "giphy":
            producer = new Giphy;
            break;
        default:
            producer = new Pexels;
            break; 
    }

    return producer
}

export default getProducerInstance



