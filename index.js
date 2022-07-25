import dotenv from 'dotenv/config'
import axios from 'axios'
import cheerio from 'cheerio'
import express from 'express'
import cors from 'cors'
const app = express();

const PORT = process.env.PORT || 7000

app.use(cors())
app.listen(PORT, ()=>{
    console.log('Parser launched.')
})

const originalUrl = 'https://www3.iomovies.top/'

const getFilmsPerPage = async (originalUrl, url) => {
    const html = (await axios.get(url)).data
    const $ = cheerio.load(html)
    const filmInfo = []
    $('.flw-item').each(function(){
        const image = $(this).find('.film-poster').find('img').attr('data-src')
        const movieUrl = originalUrl + $(this).find('a').attr('href')
        const filmName = $(this).find('.film-detail').find('h3').text()
        const details = $(this).find('.film-infor').text().replace(/\s+/g, ' ')
        filmInfo.push({name: filmName, url: movieUrl, img: image, seriesDetails: details})
    })
    await fs.writeFile('films.json', JSON.stringify(filmInfo))
    return filmInfo;
}

await getFilmsPerPage(originalUrl, 'https://www3.iomovies.top/filter?type=tv&quality=all&release_year=all&genre=10&country=all')
const getFullInfoFromFile = async (fileName = 'films.json') => {
    const filmInfo = JSON.parse(await fs.readFile(fileName, {encoding:"utf-8"}))
    for (let i = 0; i < filmInfo.length; i++) {
        const element = filmInfo[i];
        const url = originalUrl+element.url
        const html = (await Parser.getHtml(url)).data
        const $ = cheerio.load(html)
        element.description = $('.description').text()
        $('.elements').find('.row-line').each(function(){
            const double = $(this).text().replace(/\s+/g, '').split(':')
            element[double[0]] = double[1];
        })
    }
    await fs.writeFile('newfilms.json', JSON.stringify(filmInfo))
}
await getFullInfoFromFile();