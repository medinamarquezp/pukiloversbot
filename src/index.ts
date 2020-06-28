import config from './config'
import * as express from 'express'
import { publish } from './services/publisher.service'

const app = express()

app.get('/publish', async (req, res) => {
    const { token } = req.headers
    if (token && token === config.http_token){
        await publish()
        return res.status(200).json({ status: 200, message: "Content has been published successfully"  })
    }
    return res.status(401).json({ status: 401, message: "Unauthorized"  })
})

app.listen(config.app_port, () => console.log(`Server listen on port ${config.app_port}`))

