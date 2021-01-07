#!/usr/bin/env node

import fs from 'fs'
import fse from 'fs-extra'
import { execSync } from 'child_process'
import packageTemplace from "../lib/package.js";
import appTemplate from "../lib/app.js";
import { writeFile } from "./fs/writeFile.js";
import {getFileList} from "./util/sourceEnlister.js";

(async() => {
    await writeFile("package.json", JSON.stringify(packageTemplace))
    await writeFile("app.js", appTemplate)
    execSync("npm install")
    execSync("npm run start")
    const list = await getFileList()
})()