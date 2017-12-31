$.ajax({
    url: '/getMatchList',
    dataType: 'json',
    method: 'get',
    cache: false,
    data: {
        limit: 10,
        page: 1,
        search:'周'
    },
    success: function (result) {
        console.log(result);
    }
});