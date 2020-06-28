import Recognition from './recognition.service'
import { serverTimestamp } from '../services/db.service'
import IProducer, { IImageObject } from '../producers/IProducer'
import { save, isPublishedOrRejected, IMedia, mediaStatus } from '../repositories/media.repository'
export const getImageToPublish = async (randomTerm: string, producerInstance: IProducer): Promise<IImageObject> => {
    let mediaObject = { id: '', imageURL: '' }
    let imageFound = false
    do {       
        const media = await producerInstance.getMediaByTerm(randomTerm) as IImageObject
        const existsImage = await isPublishedOrRejected('media', producerInstance.getType(), media.imageURL)
        if (!existsImage) {
            if (!isValidImage(media.imageURL)) {
                await rejectIfInvalidImage({
                    producer: producerInstance.getType(),
                    producerID: media.id,
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
    if(!isValidImage(rejectedMedia.url)) {
        await save('media', rejectedMedia.producer, rejectedMedia) 
        return true
    }
    return false
}

export const saveIfValidImage = async (media: IImageObject, producerInstance: IProducer): Promise<boolean> => {
    await save('media', producerInstance.getType(), {
        producer: producerInstance.getType(),
        producerID: media.id,
        url: media.imageURL,
        status: mediaStatus.published,
        createdAt: serverTimestamp
    })
    return true
}