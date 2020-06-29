import config from '../config'
import { NowRequest, NowResponse } from '@vercel/node'
import { publish } from '../services/publisher.service'

export default async (req: NowRequest, res: NowResponse) => {
    const { token } = req.headers
    if (token && token === config.http_token){
        await publish()
        return res.status(200).json({ status: 200, message: "Content has been published successfully"  })
    }
    return res.status(401).json({ status: 401, message: "Unauthorized"  })
}