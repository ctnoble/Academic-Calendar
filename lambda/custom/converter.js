var json2html = require("node-json2html")
var data = require('../../models/en-US.json');
var fs = require('fs');

var topHalfHtml = "<!DOCTYPE html><html><head><style>div {font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;font-size: 28px;font-style: normal;font-variant: normal;font-weight: 500;line-height: 26.4px;}p {font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;font-size: 24px;font-style: normal;font-variant: normal;font-weight: 500;line-height: 26.4px;}h1 {font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;font-size: 40px;font-style: normal;font-variant: normal;font-weight: 500;line-height: 26.4px; text-align: center;}</style></head><body>"
var bottomHalfHtml = "</body></html>"
var invocationName = data.interactionModel.languageModel.invocationName;
var title = "<h1>"+invocationName+"</h1><br/><br/><br/><br/>";
var transform =  {"<>":"div","id":"${name}","html":[
{"<>":"div","html":"<b>${name}</b>"},
{"<>":"ol","html":[
      {"<>":"p","html":"${samples}"},
]}
]}
var html =  json2html.transform(data.interactionModel.languageModel.intents,transform) 

//put spaces between utterances
var htmlOutput = html.split(',').join('<br/>');
htmlOutput = topHalfHtml + title + htmlOutput + bottomHalfHtml;

//create new intents.html file
fs.writeFile('intents.html', htmlOutput, function (err) {
    if (err) throw err;
    console.log('HTML file saved!');
});
