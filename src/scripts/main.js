if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
        value: function(search, pos) {
            pos = !pos || pos < 0 ? 0 : +pos;
            return this.substring(pos, pos + search.length) === search;
        }
    });
}

function hasWebPSupport(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
};
hasWebPSupport(function(support) {
    var regex = /\.(jpg|png|jpeg)$/gi;
    if (support) {
        var elements = document.querySelectorAll('*[data-src]');
        for (var elemIdx = 0; elemIdx < elements.length; elemIdx++) {
            var value = elements[elemIdx].getAttribute('data-src');
            elements[elemIdx].setAttribute('data-src', value.replace(regex,'.webp'));
        }
        var elements = document.querySelectorAll('*[data-srcset]');
        for (var elemIdx = 0; elemIdx < elements.length; elemIdx++) {
            console.log(elements[elemIdx]);
        }
    }
});

document.addEventListener("DOMContentLoaded", function() {

    // Images
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    if (lazyImage.dataset.srcset) {
                        lazyImage.srcset = lazyImage.dataset.srcset;
                    }
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }

    // Video
    var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));
    if ("IntersectionObserver" in window) {
        var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(video) {
            if (video.isIntersecting) {
                for (var source in video.target.children) {
                var videoSource = video.target.children[source];
                if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                    videoSource.src = videoSource.dataset.src;
                }
                }

                video.target.load();
                video.target.classList.remove("lazy");
                lazyVideoObserver.unobserve(video.target);
            }
            });
        });

        lazyVideos.forEach(function(lazyVideo) {
            lazyVideoObserver.observe(lazyVideo);
        });
    }                
});

window.addEventListener("DOMContentLoaded", function(){
    
    document.body.classList.remove("fade-out");
    var imageElementsSets = document.querySelectorAll(".img-slide");
    var imageSets = {};

    for(var x = 0; x < imageElementsSets.length; x++) {
        var image = imageElementsSets[x];
        image.classList.remove("img-slide");

        for (var i = 0; i < image.classList.length; i++) {
            var className = image.classList[i];
            if (className.startsWith("slide-")) {
                if (!imageSets[className]) {
                    imageSets[className] = [];
                }
                imageSets[className].push(image);
                break;
            }
        }
    }


    // switch images of sets
    setInterval(function() {
        for(var imageName in imageSets) {
            
            // turn off the active image
            var activeImage = document.querySelector("." + imageName + ":not(.hide)");
            if (activeImage && activeImage.classList) {
                activeImage.classList.add('hide');
            }

            // turn on the next image
            if (imageSets[imageName]) {
                var idx = imageSets[imageName].indexOf(activeImage);
                var nextImage = imageSets[imageName][idx+1];
                if (nextImage) {
                    nextImage.classList.remove('hide');
                } else {
                    imageSets[imageName][0].classList.remove('hide');
                }
            }
        }

    }, 6000);
});