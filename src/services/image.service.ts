import * as https from 'https'
const imageBuffer = (url: string): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            const bufs: any[] = [];
            res.on('data', chunk => bufs.push(chunk));
            res.on('end', () => {
                const data = Buffer.concat(bufs);
                resolve(data);
            });
        }).on("error", reject);
    })
}

const getImageSize = (url: string) => {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            resolve(res.headers["content-length"]);
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

const changeImageExtension = (url: string, from: string, to: string): string => {
    if (url.indexOf(`.${from}`) === -1) return url
    return url.replace(`.${from}`, `.${to}`)
}

export {
    getImageData as default,
    getImageSize,
    changeImageExtension
}