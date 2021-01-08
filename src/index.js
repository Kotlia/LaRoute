#!/usr/bin/env node

import fs from 'fs'
import minify from 'minify'
import { exec, execSync } from 'child_process'
import packageTemplace from "../lib/package.js";
import appTemplate from "../lib/app.js";
import getTemplate from '../lib/getTemplate.js';
import { writeFile } from "./fs/writeFile.js";
import {getFileList} from "./util/sourceEnlister.js";
import ora from 'ora';
import terminalLink from 'terminal-link'
import {config} from "./util/config.js";
import chalk from 'chalk'

(async() => {
    console.log(`\n${chalk.yellow("ʥ")} Welcome to LaRoute!\n`)

    const pjSpinner = ora("Copying package.json...").start()
    await writeFile("package.json", JSON.stringify(packageTemplace))
    pjSpinner.succeed("Copied package.json")

    const installSpinner = ora("Installing dependencies...").start()
    const install = new Promise(resolve => {
        exec("npm install", () => {
            installSpinner.succeed("Successfully installed dependencies")
            resolve()
        })
    })

    const appjsSpinner = ora("Generating app.js...").start()
    await writeFile("app.js", appTemplate)
    const list = await getFileList()
    for (const route of list) {
        fs.appendFile("app.js", getTemplate.replace(new RegExp(/ROUTE_HERE/g), route), () => {
            if (route === list[list.length - 1]) {
                appjsSpinner.succeed("Successfully generated app.js")
                const minifySpinner = ora("Minimizing app.js...")
                minify("app.js").then(r => {
                    fs.writeFileSync("app.js", r)
                    minifySpinner.succeed("Minimized app.js")
                    install.then(() => {
                        console.log(`\n${chalk.redBright("♥")} Thank you for using LaRoute! Use [ ctrl + c ] to stop the server.`)

                        const githubLink = "https://github.com/Kotlia/LaRoute"
                        let githublink = terminalLink(githubLink, githubLink)
                        console.log(`\n${chalk.yellowBright("★")} Star me on GitHub: ${chalk.underline(githublink.substring(0, githublink.indexOf("(") - 1))} \n`)

                        const siteLink = `http://localhost${config.port === 80 ? "" : `:${config.port}`}`
                        let link = terminalLink(siteLink, siteLink)
                        ora(`Your website is ready! Use this link: ${chalk.underline(link.substring(0, link.indexOf("(") - 1))}`).info()
                        console.log()
                        exec("npm run start", () => {
                            ora(`Server has stopped!`).info()
                        })
                    })
                })
            }
        })
    }
})()