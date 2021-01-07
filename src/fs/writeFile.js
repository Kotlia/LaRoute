import fs from 'fs'

export const writeFile = async (name, content) => {
    return new Promise((resolve) => {
        fs.writeFile(name, content, () => {
            resolve()
        })
    })
}