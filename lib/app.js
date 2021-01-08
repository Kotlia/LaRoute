import { config } from "../src/util/config.js";

export const appTemplate =
`import express from 'express'
import path from 'path';
export const app = express()

app.listen(${config.port})

app.get("/", (req, res) => {
    res.sendFile(path.join(path.resolve() + '/index.html'));
})`

export default appTemplate