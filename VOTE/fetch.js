// var myHeaders = new Headers();
// myHeaders.append('Content-Type', 'image/jpeg');

fetch(`/getMatchList?limit=10&page=1&search=&userId=0`, {
    method: 'GET',
    headers: {
        xxx: 'xxx'
    },
    cache: 'default'
}).then(response=> {
    let contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    }
    return response.text();
}).then(result=> {
    console.log(result);
});