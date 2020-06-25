import * as https from 'https'
const imageBuffer = (url: string): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            const bufs: any[] = [];
            res.on('data', function (chunk) {
                bufs.push(chunk)
            });
            res.on('end', function () {
                const data = Buffer.concat(bufs);
                resolve(data);
            });
        }).on("error", reject);
    })
}
const getImageData = async (url: string): Promise<Buffer> => {
    try {
        return await imageBuffer(url)
    } catch (error) {
        throw new error("Error on processing image from URL")
    }
} 

export default getImageData