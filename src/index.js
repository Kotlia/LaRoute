#!/usr/bin/env node

import fs from 'fs'
import fse from 'fs-extra'
import { execSync } from 'child_process'
import packageTemplace from "../lib/package.js";
import appTemplate from "../lib/app.js";
import getTemplate from '../lib/getTemplate.js';
import { writeFile } from "./fs/writeFile.js";
import {getFileList} from "./util/sourceEnlister.js";

(async() => {
    await writeFile("package.json", JSON.stringify(packageTemplace))
    await writeFile("app.js", appTemplate)
    const list = await getFileList()
    for (const route of list) {
        fs.appendFile("app.js", getTemplate.replace(new RegExp(/ROUTE_HERE/g), route), () => {
            if (route === list[list.length - 1]) {
                execSync("npm install")
                execSync("npm run start")
                console.log("finish")
            }
        })
    }
})()