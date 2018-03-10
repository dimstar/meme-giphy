var memic = {
    baseMemes: ['knuckles', 'dog', 'deep dream', 'test', 'cat', 'baby'],
    init: function(){
        // bubble the gif buttons to call the giphyGetter
        $(document.body).on('click', '.gif-button', function(){
            event.preventDefault();
            console.log(this);
            memic.giphyGetter($(this).val());
        });
        
        // bubble the gif clicks
        $(document.body).on('click', '.gif', function(){
            event.preventDefault();
            console.log(this);
            memic.gifLooper(this);
        });

        // bubble the button that grabs the input
        $(document.body).on('click', '.makeButton', function(event){
            event.preventDefault();
            console.log(this);
            memic.makeButton( $('#memeInput').val() );
            // clear meme intake
            $('#memeInput').val('');
        });

        memic.makeAllButtons();
    },
    buttonWrapper: function(){
        return $("#buttonWrapper");
    },
    makeButton: function(memeIdea){
        if(memeIdea === '') return false;
        var button = $("<button>");
        var attrs = {
            class: "btn btn-primary m-2 gif-button",
            value: memeIdea
        }
        button.attr(attrs).text(memeIdea);
        memic.buttonWrapper().append(button);
    },
    makeAllButtons: function(){
        // loop array
        this.baseMemes.forEach(function(maybeMeme){
            //make a button
            console.log("make me a meme:" + maybeMeme)
            memic.makeButton(maybeMeme);
        });
    },
    makeGif: function(giph, counter){
        console.log("be still: " + giph.images.original_still.url);
        console.log("be loopy: " + giph.images.original.url);
        
        var loopy = giph.images.original.url;
        var still = giph.images.original_still.url;

        var marginRight = (counter%3 === 0) ? '1.4%' : '0';
        
        var gifBoxAttrs = {
            class: 'gif-box rounded col-3',
            id: 'box-' + counter
        };

        var gifBox = $('<div>').attr(gifBoxAttrs);

        var gif = $('<img>');
        var gifAttrs = {
            src: still,
            'data-still': still,
            'data-loop': loopy,
            "data-state": "still",
            class: 'gif img-fluid rounded'
            // style: 'width: 100%; margin: 0 '+ marginRight +' 12px 0;'
        }
        gif.attr(gifAttrs);
        gifBox.append(gif);
        memic.gifWrapper().append(gifBox);
    },
    makeAllGifs: function(giphies){
        // clear the gifs
        memic.gifWrapper().empty();
        var cnt = 0;
        // loop the set of giphies
        for (const key in giphies) {
            if (giphies.hasOwnProperty(key)) {
                const giph = giphies[key];
                //make a gif
                // console.log(giph);
                memic.makeGif(giph, cnt);
                cnt++;
            }
        }
    },
    gifLooper: function(gif){
        var $this = $(gif);
        var state = $this.attr('data-state');

        var whenStill = {"src": $this.attr("data-loop"), "data-state": "animate"};
        var whenAnimate = {"src": $this.attr("data-still"), "data-state": "still"};

        (state === 'still') ?
          $this.attr(whenStill)
        :
          $this.attr(whenAnimate)
        ;
    },
    gifWrapper: function(){
        return $("#gifWrapper");
    },
    buttonBubbler: function(){},
    gifBubbler: function(){},
    giphyGetter: function(queryString){
        var secretSauce = 'meme ';

        var paramString = $.param({
            q: secretSauce + queryString,
            limit: 12,
            rating: "g",
            fmt: "json"
        });
    
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

memic.init();