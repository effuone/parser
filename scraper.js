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