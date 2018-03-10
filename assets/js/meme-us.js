var memic = {
    baseMemes: ['knuckels', 'dog eyes', 'deep dream', ''],
    makeButton: function(memeIdea){

    },
    makeGif: function(giph){
        console.log("be still: " + giph.images.original_still.url);
            console.log("be loopy: " + giph.images.original.url);
    },
    makeAllButtons: function(){
        // loop array
        this.baseSet.forEach(function(maybeMeme){
            //make a button
            console.log("make me a meme:" + maybeMeme)
            memic.makeButton(maybeMeme);
        });
    },
    makeAllGifs: function(giphies){
        // loop the set of giphies
        for (const key in giphies) {
            if (giphies.hasOwnProperty(key)) {
                const giph = giphies[key];
                //make a gif
                // console.log(giph);
                memic.makeGif(giph);
            }
        }
    },
    buttonBubbler: function(){},
    gifBubbler: function(){},
    giphyGetter: function(queryString){
        var secretSauce = 'meme ';

        var paramString = $.param({
            q: secretSauce + queryString,
            limit: 10,
            rating: "g",
            fmt: "json"
        })
    
        // create a url string for giphy endpoint
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&" + paramString;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response){
            console.log(response.data);
            
            // make all giphs            
            memic.makeAllGifs(response.data);

        }).fail(function(response){
            alert("Sorry looks like giphy got ");
            console.log(response);
        });
    }
}