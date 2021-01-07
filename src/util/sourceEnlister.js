import walk from 'walk'

let fileList = []

export const getFileList = async() => {
    return new Promise(resolve => {
        const walker = walk.walk(".", { followLinks: false })
        walker.on('file', (root, stat, next) => {
            fileList.push(`${root}/${stat.name}`)
            next()
        })
        walker.on('end', () => {
            fileList = fileList
                .filter(it => it.endsWith(".html") && !it.includes("index.html"))
                .map(it => it.replace(new RegExp(/\\/g), "/").replace(new RegExp(/.html/g), "").substring(1))
            resolve(fileList)
        })
    })
}