import config from '../config'
import getContent from '../data/content'
import Recognition from './recognition.service'
import TweetBot from '../publishers/tweetbot.publisher'
import { serverTimestamp } from '../services/db.service'
import randomArrayElement from '../services/random.service'
import getProducerInstance from '../producers/producers.factory'
import IProducer, { IImageObject } from '../producers/IProducer'
import { save, isPublishedOrRejected, mediaStatus } from '../repositories/media.repository'

export const getImageToPublish = async (randomTerm: string, producerInstance: IProducer): Promise<IImageObject> => {
    let mediaObject = { id: '', imageURL: '' }
    let imageFound = false
    do {       
        const media = await producerInstance.getMediaByTerm(randomTerm) as IImageObject
        console.log('Getting a random media by term: ', media)
        const existsImage = await isPublishedOrRejected('media', producerInstance.getType(), media.id)
        console.log('Checking if image exists: ', existsImage)
        if (!existsImage) {
            const validImage = await isValidImage(media.imageURL)
            console.log('Checking if is a valid image: ', validImage)
            if (!validImage) {
                await saveImage(media, producerInstance, mediaStatus.rejected)
                console.log('Image rejected, getting a new image')
                continue
            } else {
                mediaObject = media
                imageFound = true
                console.log('Media object ready to be published: ', mediaObject)
            }
        } else { continue }
    } while (!imageFound);
    return mediaObject
}

export const isValidImage = async(url: string): Promise<boolean> => {
    return await new Recognition().validateImageRecognition(url)
}

export const saveImage = async (media: IImageObject, producerInstance: IProducer, status: mediaStatus): Promise<boolean> => {
    await save('media', producerInstance.getType(), {
        producer: producerInstance.getType(),
        producerID: media.id.toString(),
        url: media.imageURL,
        status: status,
        createdAt: serverTimestamp
    })
    return true
}

export const publish = async () => {
    const producerInstance = getProducerInstance()
    console.log('Getting a producer instance: ', producerInstance.getType())
    const randomTerm =  randomArrayElement(config.terms)
    console.log('Getting a random term and content: ', randomTerm)
    const content = getContent(randomTerm, producerInstance.getType())
    console.log('Getting image to publish')
    const imageToPublish =  await getImageToPublish(randomTerm, producerInstance)
    console.log('Publishing on SSMM')
    await new TweetBot().tweetMedia(imageToPublish.imageURL, content)
    await saveImage(imageToPublish, producerInstance, mediaStatus.published)
    console.log('Published image saved on DB')
}