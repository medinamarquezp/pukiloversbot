import { serverTimestamp } from '../../services/db.service'
import { save, get, isPublishedOrRejected, IMedia, mediaStatus } from '../../repositories/media.repository'

describe('Media repository tests', () => {
    test('It shoud save a new media on the repository', async() => {
        const data: IMedia = {
            producer: 'pexels',
            producerID: '4639075',
            url: 'https://images.pexels.com/photos/4639075/pexels-photo-4639075.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            status: mediaStatus.rejected,
            createdAt: serverTimestamp
        }
        const saved = save('test','pexels',data)
        expect(saved).toBeTruthy()
    })
    test('It should retrive a media from the repository', async() => {
        const media = await get('test', 'pexels', '4639075')
        const { producer, producerID } = media || { producer: '', producerID: '' }
        expect(producer).toBe('pexels')
        expect(producerID).toBe('4639075')
    })
    test('It should return true if it finds a correct ID on the repository', async() => {
        const found = await isPublishedOrRejected('test', 'pexels', '4639075')
        expect(found).toBeTruthy()
    })
    test('It should return false if it doesn\'t find an ID on the repository', async() => {
        const found = await isPublishedOrRejected('test', 'pexels', '000000')
        expect(found).toBeFalsy()
    })
})