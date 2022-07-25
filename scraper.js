import puppeteer from 'puppeteer';
import * as fs from 'fs';

const url = "https://hdi.zetfix.online/serials/comedy_serials/";

let browser = await puppeteer.launch({
  headless: false,  defaultViewport: null,
});
let page = await browser.newPage();

const result = [];
const scrapePage = async (pageNumber) => {
  await page.goto(`${url}/page/${pageNumber}`), { waitUntil: "networkidle2" };
  
  let data = await page.evaluate(() => {
    var title = Array.from(document.querySelectorAll(".vi-title")).map(
      (title) => title.innerText
    );

    var time = Array.from(document.querySelectorAll(".vi-title")).map(
      (time) => time.innerText
    );
  
    return [title, time];
  });
  return data;
}

let data = "["
for (let i =0 ; i < 2; i++) {
  const pageData = await scrapePage(i);
  console.log(pageData);
  result.push(pageData);
  if(i === 2 - 1){
    data = data + JSON.stringify(result[i])
    break
  }
  data = data + JSON.stringify(result[i]) + ","

};
data = data + "]"

fs.appendFileSync('./result.txt', data);
// const dataInJSON = txtToJSON({ filePath: "./result.txt" });
// console.log(dataInJSON)

// JSON.parse(fs.readFileSync('./result.txt'));
// fs.readFile(filePath, function (error, content) {
//   var conve = JSON.parse(content);
//   console.log(conve.collection.length);
// });






//movie parser
// const originalUrl = 'https://www3.iomovies.top/'

// const getFilmsPerPage = async (originalUrl, url) => {
//     const html = (await axios.get(url)).data
//     const $ = cheerio.load(html)
//     const filmInfo = []
//     $('.flw-item').each(function(){
//         const image = $(this).find('.film-poster').find('img').attr('data-src')
//         const movieUrl = originalUrl + $(this).find('a').attr('href')
//         const filmName = $(this).find('.film-detail').find('h3').text()
//         const details = $(this).find('.film-infor').text().replace(/\s+/g, ' ')
//         filmInfo.push({name: filmName, url: movieUrl, img: image, seriesDetails: details})
//     })
//     await fs.writeFile('films.json', JSON.stringify(filmInfo))
//     return filmInfo;
// }

// await getFilmsPerPage(originalUrl, 'https://www3.iomovies.top/filter?type=tv&quality=all&release_year=all&genre=10&country=all')
// const getFullInfoFromFile = async (fileName = 'films.json') => {
//     const filmInfo = JSON.parse(await fs.readFile(fileName, {encoding:"utf-8"}))
//     for (let i = 0; i < filmInfo.length; i++) {
//         const element = filmInfo[i];
//         const url = originalUrl+element.url
//         const html = (await Parser.getHtml(url)).data
//         const $ = cheerio.load(html)
//         element.description = $('.description').text()
//         $('.elements').find('.row-line').each(function(){
//             const double = $(this).text().replace(/\s+/g, '').split(':')
//             element[double[0]] = double[1];
//         })
//     }
//     await fs.writeFile('newfilms.json', JSON.stringify(filmInfo))
// }
// await getFullInfoFromFile();