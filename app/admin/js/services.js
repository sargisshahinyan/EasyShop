angular.module("myApp.services", [])

    .factory("regionService", ["$http", "$q", function ($http, $q) {
        return {
            getUserRegion: function () {
                var deferred = $q.defer();

                navigator.geolocation.getCurrentPosition(function(position) {
                    $http({
                        method: "GET",
                        url: "http://ws.geonames.org/countryCode",
                        params: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                            username:'saqo9662',
                            type: "JSON"
                        }
                    }).success(function (response) {
                        deferred.resolve(response);
                    }).error(function (resopnse) {
                        console.log(resopnse);
                    });
                }, function () {
                    deferred.reject();
                });

                return deferred.promise;
            }
        };
    }])

    .factory("youtubeService", ["$http", function ($http) {
        return {
            getYoutubeVideo: function (searchText) {
                return $http({
                    method: "GET",
                    url: "https://www.googleapis.com/youtube/v3/search",
                    params:{
                        key: "AIzaSyBkpL3CRjmIO8WEY_uH0CFvZv2kBnkfgI0",
                        part: "snippet",
                        type: "video",
                        q: encodeURIComponent(searchText).replace(/%20/g, "+"),
                        maxResults: 1
                    }
                })
            }
        }
    }])

    .factory("musicService", ["$http", "musicGraphApi", "echonestApi", "artistSearchUrl", function ($http, musicGraphApi, echonestApi, artistSearchUrl) {
        return {
            getArtistBiography: function (artistName) {
                return $http({
                    method: "GET",
                    url: "http://developer.echonest.com/api/v4/artist/biographies",
                    params: {
                        api_key: echonestApi,
                        name: artistName,
                        format: "json"
                    }
                });
            },
            getArtistImage:function (artistName) {
                return $http({
                    method: "GET",
                    url: "http://developer.echonest.com/api/v4/artist/images",
                    params: {
                        api_key: echonestApi,
                        name: artistName,
                        format: "json",
                        results: 1
                    }
                })
            },
            getArtistByCountry: function (country) {
                return $http({
                    method: "GET",
                    url: artistSearchUrl,
                    params: {
                        api_key: musicGraphApi,
                        limit: 5,
                        country: country
                    }
                });
            },
            suggestMusic: function (suggestText) {
                var params = {
                    api_key: musicGraphApi,
                    prefix: suggestText,
                    limit: 10
                };

                return [
                    $http({
                        method: "GET",
                        url: "http://api.musicgraph.com/api/v2/artist/suggest",
                        params: params
                    }),
                    $http({
                        method: "GET",
                        url: "http://api.musicgraph.com/api/v2/track/suggest",
                        params: params
                    })
                ];
            },
            getArtistNews: function (artistName) {
                return $http({
                    method: "GET",
                    url: "http://developer.echonest.com/api/v4/artist/news",
                    params: {
                        api_key: echonestApi,
                        name: artistName,
                        format: "json",
                        high_relevance: true
                    }
                });
            },
            getArtistsByGenre: function (genre) {
                return $http({
                    method: "GET",
                    url: artistSearchUrl,
                    params: {
                        api_key: musicGraphApi,
                        limit: 5,
                        genre: genre
                    }
                });
            },
            getArtistsByDecade: function (decade) {
                return $http({
                    method: "GET",
                    url: artistSearchUrl,
                    params: {
                        api_key: musicGraphApi,
                        limit: 5,
                        decade: decade
                    }
                });
            },
            getSimilarArtist: function (artistName) {
                return $http({
                    method: "GET",
                    url: artistSearchUrl,
                    params: {
                        api_key: musicGraphApi,
                        limit: 1,
                        similar_to: artistName
                    }
                });
            },
            getSong:function (songName) {
                return $http({
                    method: "GET",
                    url: "http://api.musicgraph.com/api/v2/track/search",
                    params: {
                        api_key: musicGraphApi,
                        limit: 1,
                        title: songName
                    }
                });
            },
            getDailyArtist: function () {
                var dailyArtistProperties = JSON.parse(localStorage.getItem("dailyArtist")),
                    decades,
                    genres;

                if(!dailyArtistProperties || dailyArtistProperties.date != new Date().toJSON().slice(0,10)) {
                    dailyArtistProperties = {};
                    decades = [1890, 1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010];
                    genres = [
                        "Alternative/Indie",
                        "Blues",
                        "Children's",
                        "Classical/Opera",
                        "Country",
                        "Electronica/Dance",
                        "Folk",
                        "Instrumental",
                        "Jazz",
                        "Latin",
                        "New Age",
                        "Pop",
                        "Rap/Hip Hop",
                        "Reggae/Ska",
                        "Rock",
                        "Seasonal",
                        "Soul/R&B",
                        "Vocals"
                    ];

                    dailyArtistProperties.date = new Date().toJSON().slice(0,10);
                    dailyArtistProperties.gender = Math.random() > Math.random() ? "Male" : "Female";
                    dailyArtistProperties.decade = decades[Math.floor(Math.random() * decades.length)] + "s";
                    dailyArtistProperties.genre = genres[Math.floor(Math.random() * genres.length)];
                    localStorage.setItem("dailyArtist", JSON.stringify(dailyArtistProperties));
                }

                return $http({
                    method: "GET",
                    url: artistSearchUrl,
                    params: {
                        api_key: musicGraphApi,
                        limit: 1,
                        genre: dailyArtistProperties.genre,
                        decade: dailyArtistProperties.decade,
                        gender: dailyArtistProperties.gender
                    }
                });
            }
        }
    }])

    .factory("localStorageService", function () {
        return {
            getStorageItem: function (key) {
                return JSON.parse(localStorage.getItem(key));
            },
            setStorageItem: function (key, value) {
                return localStorage.setItem(key, JSON.stringify(value));
            }
        }
    });