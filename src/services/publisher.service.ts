import config from '../config'
import getContent from '../data/content'
import Recognition from './recognition.service'
import TweetBot from '../publishers/tweetbot.publisher'
import { serverTimestamp } from '../services/db.service'
import { getImageSize } from '../services/image.service'
import randomArrayElement from '../services/random.service'
import getProducerInstance from '../producers/producers.factory'
import IProducer, { IImageObject } from '../producers/IProducer'
import { save, isPublishedOrRejected, mediaStatus } from '../repositories/media.repository'

export const publish = async () => {
    let producer: IProducer | undefined
    let randomContent: string | undefined
    let mediaObject: IImageObject | undefined
    let imageFound = false
    do {       
        const { producerInstance, content, media } = await randomMediaContent()
        const existsImage = await isPublishedOrRejected('media', producerInstance.getType(), media.id)
        console.log('Checking if image exists: ', existsImage)
        if (!existsImage) {
            const validImage = await isValidImage(media.imageURL)
            console.log('Checking if is a valid image: ', validImage)
            if (!validImage) {
                await saveMedia(media, producerInstance, mediaStatus.rejected)
                console.log('Image rejected, getting a new image')
                continue
            } else {
                producer = producerInstance
                mediaObject = media
                randomContent = content
                imageFound = true
                console.log('Media object ready to be published: ', mediaObject)
            }
        } else { continue }
    } while (!imageFound);
    if ( mediaObject && randomContent && producer ) {
        await new TweetBot().tweetMedia(mediaObject.imageURL, randomContent)
        await saveMedia(mediaObject, producer, mediaStatus.published)
        console.log('Published on SSMM and saved on DB')
    } else {
        console.log('There has been an issue and the content has not been published correctly')
    }
}

const isValidImage = async(url: string): Promise<boolean> => {
    const limitSizeInBytes = 15000000
    const imageSize = await getImageSize(url) as string
    const isValidSize = parseInt(imageSize) < limitSizeInBytes
    const isValidRecognition = await new Recognition().validateImageRecognition(url)
    return isValidSize && isValidRecognition
}

const saveMedia = async (media: IImageObject, producerInstance: IProducer, status: mediaStatus): Promise<boolean> => {
    await save('media', producerInstance.getType(), {
        producer: producerInstance.getType(),
        producerID: media.id.toString(),
        url: media.imageURL,
        status: status,
        createdAt: serverTimestamp
    })
    return true
}

const randomMediaContent = async (): Promise<IRandomMediaContent> => {
    const producerInstance = getProducerInstance()
    console.log('Getting a producer instance: ', producerInstance.getType())
    const randomTerm =  randomArrayElement(config.terms)
    const content = getContent(randomTerm, producerInstance.getType())
    console.log('Getting a random term and content: ', randomTerm)
    const media = await producerInstance.getMediaByTerm(randomTerm) as IImageObject
    console.log('Getting a random media by term: ', media)
    return {
        producerInstance,
        content,
        media
    }
}

interface IRandomMediaContent {
    producerInstance: IProducer,
    content: string,
    media: IImageObject
}