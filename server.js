const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
  express:server,
  noCache: true
})

server.get("/", function(req, res) {
  const about = {
    avatar_url: "https://avatars.githubusercontent.com/u/66640568?s=460&u=33005c55db6f08513cc427accd084bbd699ba9ef&v=4",
    name: "Arthur Lima",
    role: "Estudante - Análise e Desenvolvimento de Sistemas",
    description: "Programador front-end, buscando aprendizado em novas tecnologias",
    links: [
      { name: "Github", url: "https://github.com/" },
      { name: "Twitter", url: "https://twitter.com/" },
      { name: "Linkedin", url: "https://www.linkedin.com/" }
    ]
  }
  return res.render("about", { about: about})
})

server.get("/portfolio", function(req, res) {

  return res.render("portfolio", { items: videos })
})

server.get("/video", function(req, res) {
  const id = req.query.id

  const video = videos.find(function(video) {
    return video.id == id
  })

  if (!video) {
    return res.send("Video not found!")
  }

  return res.render("video", { item: video })
})

server.listen(5000, function () {
  console.log("server is running")
})