import { serverTimestamp } from '../../services/db.service'
import { save, IMedia, mediaStatus } from '../../repositories/media.repository'

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
})