const PORT = 8000
const axios = require('axios')
const express = require('express')
const cheerio = require('cheerio')
const { response } = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

const url = "https://www.theguardian.com/uk"

//app.method(path, handler)
app.get('/', function(req, res){
    res.json('This is my web scraper')
})

app.get('/results', (req,res) => {
 axios(url)
 .then(response => {
    const html =response.data
        console.log(html)
    const $ = cheerio.load(html)
    const articles = []

    $('.fc-item__title', html).each(function() {
          const title = $(this).text()
          const url = $(this).find('a').attr('href')
          articles.push({
            title,
            url
          })
        })
        // console.log(articles)
        res.json(articles)
 }).catch(err => console.log(err))   
})




app.listen(PORT, () => console.log(`server running on port ${PORT}`))