#!/usr/bin/env node

import fs from 'fs'
import fse from 'fs-extra'
import minify from 'minify'
import { exec, execSync } from 'child_process'
import packageTemplace from "../lib/package.js";
import appTemplate from "../lib/app.js";
import getTemplate from '../lib/getTemplate.js';
import { writeFile } from "./fs/writeFile.js";
import {getFileList} from "./util/sourceEnlister.js";

(async() => {
    await writeFile("package.json", JSON.stringify(packageTemplace))
    const install = new Promise(resolve => {
        exec("npm install", () => {
            resolve()
        })
    })
    await writeFile("app.js", appTemplate)
    const list = await getFileList()
    for (const route of list) {
        fs.appendFile("app.js", getTemplate.replace(new RegExp(/ROUTE_HERE/g), route), () => {
            if (route === list[list.length - 1]) {
                minify("app.js").then(r => {
                    fs.writeFileSync("app.js", r)
                    install.then(() => {
                        execSync("npm run start")
                    })
                })
            }
        })
    }
})()