import * as functions from 'firebase-functions';

import config from './config'
import getContent from './data/content'
import TweetBot from './publishers/tweetbot.publisher'
import randomArrayElement from './services/random.service'
import getProducerInstance from './producers/producers.factory'
import { getImageToPublish, saveIfValidImage } from './services/publisher.service'

export const publish = functions.pubsub.schedule('every 5 minutes').onRun(async () => {
    const randomTerm =  randomArrayElement(config.terms)
    const content = getContent(randomTerm)
    const producerInstance = getProducerInstance()
    const imageToPublish =  await getImageToPublish(randomTerm, producerInstance)
    await new TweetBot().tweetMedia(imageToPublish.imageURL, content)
    await saveIfValidImage(imageToPublish, producerInstance)
    return null
})