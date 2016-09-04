angular.module("myApp.filters", [])

    .filter("biographyFilter", function () {
        return function (biographies) {
            var text = "";

            biographies.forEach(function (biography) {
                text = biography.text.length > text.length ? biography.text : text;
            });

            return text;
        }
    })

    .filter("newsFilter", function () {
        return function (news) {
            var response = {
                title: "",
                text: ""
            };

            news.forEach(function (data) {
                response = data.summary.length > response.text.length ? {
                    title:data.name,
                    text: data.summary
                } : response;
            });

            return response;
        }
    });