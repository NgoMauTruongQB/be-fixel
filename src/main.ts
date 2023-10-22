declare const module: any

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as bodyParser from 'body-parser'

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {cors: true})

    // use body-parser middleware
    app.use(bodyParser.urlencoded({ extended: true }))

    // use ValidationPipe with mode transform
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    )

    await app.listen(process.env.PORT)

    if (module.hot) {
        module.hot.accept()
        module.hot.dispose(() => app.close())
    }
}
bootstrap()