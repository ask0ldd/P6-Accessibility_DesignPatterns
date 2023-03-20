// Products blueprints
class Media {

    constructor(media){

    }
}

class Image extends Media {
    constructor(media){
        super(media)
    }
}

class Video extends Media {
    constructor(media){
        super(media)
    }
}

// Factory function
function mediaFactory(media){
    if(media.video){
        return new Video(media)
    }
    if(media.image){
        return new Image(media)
    }
}