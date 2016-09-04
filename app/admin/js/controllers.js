angular.module("myApp.controllers", []).

    controller("mainController", ["$scope", "$window", "$q", "$sce", "$filter", "$location", "$timeout", "localStorageService", "youtubeService", "musicService", function ($scope, $window, $q, $sce, $filter, $location, $timeout, localStorageService, youtubeService, musicService) {
        var timeoutPromise = $timeout(0);

        $scope.foundedMusic = [];
        $scope.recentArtists = localStorageService.getStorageItem("recentArtists") || [];
        $scope.recentSongs = localStorageService.getStorageItem("recentSongs") || [];
        $scope.calendarValues = [[
            "1890s", "1900s", "1910s", "1920s"
        ],[
            "1930s", "1940s", "1950s", "1960s"
        ],[
            "1970s", "1980s", "1990s", "2000s"
        ],[
            "2010s"
        ]];

        $scope.getArtists = function (response, scope) {
            response.data.forEach(function (artist, index, artists) {
                $q.all([youtubeService.getYoutubeVideo(artist.name), musicService.getArtistBiography(artist.name), musicService.getArtistImage(artist.name)]).then(function (response) {
                    var text = $filter("biographyFilter")(response[1].data.response.biographies),
                        image = response[2].data.response.images[0] ? response[2].data.response.images[0].url : "",
                        recentArtists = localStorageService.getStorageItem("recentArtists") || [],
                        artistData = {
                            name: artist.name,
                            biography: text,
                            image: image,
                            videoUrl: $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + response[0].data.items[0].id.videoId)
                        };

                    scope.musicians.unshift(artistData);
                    $scope.recentArtists.unshift(artistData);

                    if (index == artists.length - 1) {
                        if (recentArtists) {
                            recentArtists = scope.musicians.concat(recentArtists);

                            if (recentArtists.length > 10) {
                                recentArtists = recentArtists.slice(0, 10);
                            }
                        } else {
                            recentArtists = scope.musicians;
                        }

                        localStorageService.setStorageItem("recentArtists", recentArtists);
                    }
                }, function (response) {
                    console.log(response);
                });
            });
        };

        $scope.search = function (searchText) {
            if (searchText) {
                if (!timeoutPromise.$$state.status) {
                    $timeout.cancel(timeoutPromise);
                }

                timeoutPromise = $timeout(function () {
                    $q.all(musicService.suggestMusic(searchText)).then(function (response) {
                        response[1].data.data.forEach(function (song) {
                            song.name = song.artist_name + "-" + song.name;
                        });
                        $scope.foundedMusic = response[0].data.data.concat(response[1].data.data);
                    }, function (response) {
                        console.log(response);
                    });
                }, 500);
            }
        };

        $scope.searchWithDecades = function (decade) {
            $location.path("/decade/" + decade);
        };

        $scope.searchWithGenres = function (genre) {
            $location.path("/genre/" + genre);
        };

        $scope.findSimilar = function (musician) {
            musicService.getSimilarArtist(musician.name).success(function (response) {
                if (response.data[0]) {
                    $scope.select(response.data[0]);
                } else {
                    alert("There is no similar artist in our base");
                }
            }).error(function (response) {
                console.log(response);
            });
        };

        $scope.select = function (data) {
            $scope.searchText = "";

            switch  (data.entity_type) {
                case "artist":
                    $location.path("/artist_info/" + data.name);
                    break;
                case "track":
                    $location.path("/song_info/" + data.name);
            }
        };


        $scope.viewArtist = function (musician) {
            musician.entity_type = "artist";
            $scope.select(musician);
        };

        $scope.viewSong = function (song) {
            song.entity_type = "track";
            $scope.select(song);
        }
    }]).

    controller("homeController", ["$scope", "$sce", "$filter", "localStorageService", "musicService", function ($scope, $sce, $filter, localStorageService, musicService) {
        var dailyArtist;
        $scope.savedMusicians = localStorageService.getStorageItem("recentArtists") || [];

        $scope.savedMusicians.forEach(function (musician) {
            musicService.getArtistNews(musician.name).then(function (response) {
                musician.news = $filter("newsFilter")(response.data.response.news).text ? $filter("newsFilter")(response.data.response.news) : {
                    title: "No news",
                    text: "There is no news about this artist"
                };
            }, function (response) {
                console.log(response);
            });
        });

        musicService.getDailyArtist().success(successCallback).error(function (response) {
            console.log(response);
        });

        function successCallback(response) {
            if (!response.data.length) {
                localStorageService.setStorageItem("dailyArtist", "");
                musicService.getDailyArtist().success(successCallback).error(function (response) {
                    console.log(response);
                });
                return;
            }

            dailyArtist = response.data[0];
            musicService.getArtistImage(dailyArtist.name).success(function (response) {
                $scope.dailyArtist = {
                    name: dailyArtist.name,
                    genre:dailyArtist.main_genre,
                    country: dailyArtist.country_of_origin,
                    image: response.response.images[0].url
                }
            }).error(function (response) {
                console.log(response);
            });
        }

    }]).

    controller("regionMusicController", ["$scope", "regionService", "musicService", function ($scope, regionService, musicService) {
        var country;

        $scope.musicians = [];

        regionService.getUserRegion().then(function (response) {
            country = response.countryName;
            musicService.getArtistByCountry(country).success(function (response) {
                $scope.$parent.getArtists(response, $scope);
            }).error(function (response) {
                console.log(response);
            });
        }, function () {
            $scope.blocked = true;
        });
    }]).

    controller("artistInfoController", ["$scope", "$q", "$sce", "$filter", "$routeParams", "$location", "localStorageService", "youtubeService", "musicService", function ($scope, $q, $sce, $filter, $routeParams, $location, localStorageService, youtubeService, musicService) {
        var artist;

        artist = $routeParams.artist;

        $q.all([musicService.getArtistBiography(artist), musicService.getArtistImage(artist), youtubeService.getYoutubeVideo(artist)]).then(function (response) {
            var text = $filter("biographyFilter")(response[0].data.response.biographies),
                image = response[1].data.response.images[0] ? response[1].data.response.images[0].url : "",
                recentArtists = localStorageService.getStorageItem("recentArtists") || [];

            $scope.artist = {
                name: artist,
                videoUrl: $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + response[2].data.items[0].id.videoId),
                biography: text,
                image: image
            };

            if (!recentArtists.length || recentArtists[0].name != artist) {
                $scope.$parent.recentArtists.unshift($scope.artist);
                recentArtists.unshift($scope.artist);
            }

            if (recentArtists.length > 10) {
                recentArtists = recentArtists.slice(0, 10);
            }

            localStorageService.setStorageItem("recentArtists", recentArtists);
        }, function (response) {
            console.log(response);
        });
    }]).

    controller("songInfoController", ["$scope", "$q", "$sce", "$routeParams", "localStorageService", "youtubeService", "musicService", function ($scope, $q, $sce, $routeParams, localStorageService, youtubeService, musicService) {
        var song,
            recent_songs = $("#songs-list");

        song = $routeParams.song;

        $q.all([youtubeService.getYoutubeVideo(song), musicService.getSong(song.substring(song.indexOf("-") + 1))]).then(function (response) {
            var recentSongs = localStorageService.getStorageItem("recentSongs") || [];

            $scope.song = {
                name: song,
                album: response[1].data.data[0].album_title,
                release: response[1].data.data[0].release_year,
                genre: response[1].data.data[0].main_genre,
                videoUrl: $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + response[0].data.items[0].id.videoId)
            };

            if (!recentSongs.length || recentSongs[0].name != song) {
                $scope.$parent.recentSongs.unshift($scope.song);
                recentSongs.unshift($scope.song);
            }

            if (recentSongs.length > 10) {
                recentSongs = recentSongs.slice(0, 10);
            }

            localStorageService.setStorageItem("recentSongs", recentSongs);
        }, function (response) {
            console.log(response);
        });

    }]).

    controller("genreController", ["$scope", "$routeParams", "musicService", function ($scope, $routeParams, musicService) {
        var genre = $routeParams.genre;

        $scope.musicians = [];

        musicService.getArtistsByGenre(genre).success(function (response) {
            $scope.$parent.getArtists(response, $scope);
        }).error(function (response) {
            console.log(response);
        });
    }]).

    controller("decadeController", ["$scope", "$routeParams", "musicService", function ($scope, $routeParams, musicService) {
        var decade = $routeParams.decade;

        $scope.musicians = [];

        musicService.getArtistsByDecade(decade).success(function (response) {
            $scope.$parent.getArtists(response, $scope);
        }).error(function (response) {
            console.log(response);
        });
    }]);