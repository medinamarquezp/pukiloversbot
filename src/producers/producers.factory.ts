import config from '../config'
import IProducer from './IProducer'
import Giphy from '../producers/giphy/Giphy'
import Pexels from '../producers/pexels/Pexels'
import Unsplash from '../producers/unsplash/Unsplash'
import randomArrayElement from '../services/random.service'

const { producers } = config
const producersList = Object.getOwnPropertyNames(producers)

function getProducerInstance(): IProducer {
    
    const randomProducer = randomArrayElement(producersList)
    let producer: IProducer;

    switch (randomProducer){
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




