var Twit = require('twit');
var chalk = require('chalk');
var fs = require('fs'),
Twit = require('twit');
const log = console.log;
var T = new Twit(config);
log(new Date().toLocaleString(), chalk.black.bgGreen(`Bot loaded`));
log(new Date().toLocaleString(), chalk.black.bgGreen('Current interval 14400000 milliseconds 4 hours'));
function randomtweet(){
    let cellstwitpost = ~~(Math.random() * cellstwit.length);
    log(new Date().toLocaleString(), chalk.cyan.bgMagenta('Getting tweet...'));
    T.post('statuses/update',{
        status: cellstwit[cellstwitpost]
    }, function(err,data,response){
        log(new Date().toLocaleString(), chalk.blue('Posted tweet'));
        log(new Date().toLocaleString(), chalk.black.bgRed(cellstwit[cellstwitpost]));
    });
    log(new Date().toLocaleString(), chalk.cyan.bgMagenta('Image selected'));
    log(new Date().toLocaleString(), chalk.cyan.bgMagenta('Getting img...'));
    var base64content = fs.readFileSync(cellstwitimg[cellstwitimglist],{
        encoding: 'base64'
    });
    T.post('media/upload', {media_data: base64content},function(err,data,response){
        log(new Date().toLocaleString(), chalk.cyan.bgMagenta('Img loaded...'));
        var mediaIdStr = data.media_id_string
        var altText = "#はたらく細胞"
        var meta_params = {
            media_id: mediaIdStr, altText:{text:altText}
        }
        T.post('media/metadata/create', meta_params, function(err,data,response){
            log(new Date().toLocaleString(), chalk.cyan.bgMagenta('Img media created.'));
            if(!err){
                var imgtweet = {
                    status: '#はたらく細胞', media_ids:[mediaIdStr]
                }
                T.post('statuses/update', imgtweet, function(err,data,response){
                    log(new Date().toLocaleString(), chalk.cyan.bgMagenta('Img posted.'));
                })
            }else{
                log(err);
            }
        });
    });
}
setInterval(
    randomtweet,
    14400000 
);