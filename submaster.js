const parseSRT = require('parse-srt')
const fs = require('fs')

const mainPath = `${__dirname}/public`

const subs = fs.readFileSync(`${mainPath}/shorts3.srt`).toString();

const jsonSubs = parseSRT(subs);

fs.writeFileSync(`${mainPath}/shorts3.json`, JSON.stringify(jsonSubs));