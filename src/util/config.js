const argv = {}

process.argv.splice(2).map(it => {
    it = it.replace("--", "").split('=')
    argv[it[0]] = it[1]
})

export const config = {
    port: argv.port || 80
}