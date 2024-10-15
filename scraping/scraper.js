import puppeteer from "puppeteer"

const BASE_URL = `https://1337x.to`

export const getHtmlResults = async (searchQuery) => {
    const searchUrl = `${BASE_URL}/search/${searchQuery}/1/`
    
    const browser = await puppeteer.launch({
        headless: true, 
    })

    const page = await browser.newPage()

    await page.goto(searchUrl, {
        waitUntil: 'domcontentloaded'
    })

    await page.waitForSelector('tr', {timeout: 5_000})

    const rows = await page.$$('tr')

    const result = []

    for (const row of rows) {
        let res = {}
        const name = await row.$('td.name') 
        if (name) {
            const link = await name.$('a:nth-of-type(2)')
            if (link) {
                const linkHref = await link.evaluate(node => node.href)
                const nameText = await link.evaluate(node => node.innerText)
                res['link'] = '<' + linkHref + '>'
                res['name'] = nameText
            }
        }

        const seeds = await row.$('td.seeds')
        if (seeds) {
            const seedText = await seeds.evaluate(node => node.innerText)
            res['seeds'] = seedText
        }

        const leeches = await row.$('td.leeches')
        if (leeches) {
            const leechText = await leeches.evaluate(node => node.innerText)
            res['leeches'] = leechText
        }

        const size = await row.$('td.size')
        if (size) {
            const sizeText = await size.evaluate(node => node.innerText)
            res['size'] = sizeText
        }

        if (res['name'] != undefined) {
            const resultString = `Name: ${res['name']}\nLink: ${res['link']}\nSeeds: ${res['seeds']} |  Leeches: ${res['leeches']} | Size: ${res['size']}\n`
            result.push(resultString)
        }
    }

    await page.close()
    await browser.close()

    let maxOut = 0
    let maxIndex = 0
    for (let i = 0; i < result.length; i ++) {
        if (maxOut >= 2000) {
            break;
        }
        maxOut += result[i].length
        maxIndex = i
    }

    return result.slice(0, maxIndex - 1).join("")
}
