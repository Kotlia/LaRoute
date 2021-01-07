export const appTemplate =
`import express from 'express'
import path from 'path';
export const app = express()

app.listen(80)

app.get("/", (req, res) => {
    res.sendFile(path.join(path.resolve() + '/index.html'));
})`

export default appTemplate