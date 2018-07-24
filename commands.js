/*
This is just a continuation of the main file, just in another file on github for ease of access.
*/

//Basically stalking tweets that include @example
var stream = T.stream('statuses/filter',{
    track: '@example'
});

const anime = 'Hataraku Saibou \nCells at Work';
const commands ='anime \nangry';

stream.on('tweet', function(tweet){
    if(tweet.text.indexOf('@example anime')>1){
        var name = '@' + tweet.user.screen_name;
        var nameID = tweet.id_str;
        T.post('statuses/update',{
            in_reply_to_status_id: nameID,
            status: name + ' ' + anime
        }, function(err,data,response){
            console.log(name + ' ' + anime);
        });
    }
});
