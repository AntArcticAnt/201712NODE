module.exports = {
    query(suffix = 'txt'){
        suffix = suffix.toUpperCase();
        let suffixMIME = 'text/plain';
        switch (suffix) {
            case 'HTML':
                suffixMIME = 'text/html';
                break;
            case 'CSS':
                suffixMIME = 'text/css';
                break;
            case 'JS':
                suffixMIME = 'text/javascript';
                break;
            case 'JSON':
                suffixMIME = 'application/json';
                break;
            case 'JPG':
            case 'JPEG':
                suffixMIME = 'image/jpeg';
                break;
            case 'PNG':
                suffixMIME = 'image/png';
                break;
            case 'GIF':
                suffixMIME = 'image/gif';
                break;
            case 'ICO':
                suffixMIME = 'image/x-icon';
                break;
        }
        return suffixMIME;
    }
};