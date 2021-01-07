#!/usr/bin/env node

import packageTemplace from "../lib/package.js";
import { writeFile } from "./fs/writeFile.js";

(async() => {
    await writeFile("package.json", JSON.stringify(packageTemplace))
})()