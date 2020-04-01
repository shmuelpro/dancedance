exports.decode = (arr) => {
  
    if (arr[0] === 0) {
        if (arr[1] === 0) {
            return "noselection";
        }
        if (arr[1] == 1) {
            return "slect";
        } else if (arr[1] == 2) {
            return "start";
        } else if (arr[1] === 128) {
            return "centerleft"
        } else if (arr[1] === 32) {
            return "centerright"
        } else if (arr[1] === 16) {
            return "middleup"
        }
        else if (arr[1] === 64) {
            return "middledown"
        }


    } else if (arr[1] === 0) {
        if (arr[0] == 1) {
            return "bottomleft";
        } else if (arr[0] == 2) {
            return "topright";
        }else if (arr[0] == 4) {
            return "topleft";
        }else if (arr[0] == 8) {
            return "bottomright";
        }


    }
}