import config from '../config'
import getContent from '../data/content'
import Recognition from './recognition.service'
import TweetBot from '../publishers/tweetbot.publisher'
import { serverTimestamp } from '../services/db.service'
import randomArrayElement from '../services/random.service'
import getProducerInstance from '../producers/producers.factory'
import IProducer, { IImageObject } from '../producers/IProducer'
import { save, isPublishedOrRejected, IMedia, mediaStatus } from '../repositories/media.repository'

export const getImageToPublish = async (randomTerm: string, producerInstance: IProducer): Promise<IImageObject> => {
    let media, mediaObject = media = { id: '', imageURL: '' }
    let imageFound = false
    do {
        try {
            media = await producerInstance.getMediaByTerm(randomTerm) as IImageObject
        } catch (err) {
            console.error(err)
            continue
        }
        const existsImage = await isPublishedOrRejected('media', producerInstance.getType(), media.id)
        if (!existsImage) {
            const validImage = await isValidImage(media.imageURL)
            if (!validImage) {
                await rejectIfInvalidImage({
                    producer: producerInstance.getType(),
                    producerID: media.id.toString(),
                    url: media.imageURL,
                    status: mediaStatus.rejected,
                    createdAt: serverTimestamp
                })
                continue
            } else {
                mediaObject = media
                imageFound = true
            }
        } else { continue }
    } while (!imageFound);
    return mediaObject
}

export const isValidImage = async(url: string): Promise<boolean> => {
    return await new Recognition().validateImageRecognition(url)
}

export const rejectIfInvalidImage = async (rejectedMedia: IMedia): Promise<boolean> => {
    if (!isValidImage(rejectedMedia.url)) {
        await save('media', rejectedMedia.producer, rejectedMedia) 
        return true
    }
    return false
}

export const saveIfValidImage = async (media: IImageObject, producerInstance: IProducer): Promise<boolean> => {
    await save('media', producerInstance.getType(), {
        producer: producerInstance.getType(),
        producerID: media.id.toString(),
        url: media.imageURL,
        status: mediaStatus.published,
        createdAt: serverTimestamp
    })
    return true
}

export const publish = async () => {
    const producerInstance = getProducerInstance()
    const randomTerm =  randomArrayElement(config.terms)
    const content = getContent(randomTerm, producerInstance.getType())
    const imageToPublish =  await getImageToPublish(randomTerm, producerInstance)
    await new TweetBot().tweetMedia(imageToPublish.imageURL, content)
    await saveIfValidImage(imageToPublish, producerInstance)
}