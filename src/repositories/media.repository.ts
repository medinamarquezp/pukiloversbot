import db, { FieldValue } from '../services/db.service'

const save = async (node:string, producer: string, data: IMedia): Promise<boolean> => {
    try {
        const producerDoc = db.collection(node).doc()
        await producerDoc.set(data)
        return true
    } catch (error) {
        throw new Error(`Error on inserting media in database: ${error}`)
    }
}

const get = async (collection: string, producer: string, id: string) => {
    try {
        const repo = db.collection(collection)
        const snapshot = await repo.where('producer', '==', producer).where('producerID', '==', id).get()
        let data;
        snapshot.forEach(doc => { data = doc.data() });
        return data
    } catch (error) {
        throw new Error(`Error on getting media from database: ${error}`)
    }
}

const isPublishedOrRejected = async (collection: string, producer: string, id: string): Promise<boolean> => {
    const data = await get(collection, producer, id)
    if (!data) return false
    return true
}


enum mediaStatus {
    published= 'published',
    rejected= 'rejected'
}

interface IMedia {
    producer: string,
    producerID: string,
    url: string,
    status: mediaStatus,
    ssmm?: string,
    createdAt: FieldValue
}

export {
    get,
    save,
    IMedia,
    mediaStatus,
    isPublishedOrRejected
}

