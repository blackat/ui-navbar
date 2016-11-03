'use strict';

angular.module('App', ['ui.bootstrap', 'ui.router', 'ui.navbar'])

    .config(function ($stateProvider, $urlRouterProvider) {

        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/home");

        // Now set up the states
        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "partials/home.html"
            })
            .state('state1', {
                url: "/state1",
                templateUrl: "partials/state1.html"
            })
            .state('state2', {
                url: "/state2",
                templateUrl: "partials/state2.html"
            })
            .state('state3', {
                url: "/state3",
                templateUrl: "partials/state3.html"
            })
            .state('state4', {
                url: "/state4",
                templateUrl: "partials/state4.html"
            })
            .state('metal-gear', {
                url: "/metal-gear",
                templateUrl: "partials/metal-gear.html"
            });
    })

    .controller('NavigationController', function ($scope) {

        $scope.tree = [{
            name: "States",
            link: "#",
            subtree: [{
                name: "state 1",
                link: "state1",
                subtree: [{
                    name: "state 3",
                    link: "state3"
                }]
            }, {
                name: "state 2",
                link: "state2",
                subtree: [{
                    name: "state 4",
                    link: "state4"
                }]
            }]
        }, {
            name: "No states",
            link: "#",
            subtree: [{
                name: "no state connected",
                link: "#"
            }]
        }, {
            name: "divider",
            link: "#"

        }, {
            name: "State has not been set up",
            link: "#"
        }, {
            name: "divider",
            link: "#"
        }, {
            name: "Here again no state set up",
            link: "#"
        }];

        $scope.trees = [{
            name: "Konami",
            link: "#",
            subtree: [{
                name: "Metal Gear",
                link: "#",
                subtree: [{
                    name: "Metal Gear",
                    link: "metal-gear"
                }, {
                    name: "Metal Gear 2: Solid Snake",
                    link: "#"
                }, {
                    name: "Metal Gear Solid: The Twin Snakes",
                    link: "#"
                }]
            }, {
                name: "divider",
                link: "#"
            }, {
                name: "Castlevania",
                link: "#",
                subtree: [{
                    name: "Castlevania",
                    link: "#"
                }, {
                    name: "Castlevania II: Simon's Quest",
                    link: "#"
                }, {
                    name: "Castlevania III: Dracula's Curse",
                    link: "#"
                }]
            }]
        }, {
            name: "SNK",
            link: "#",
            subtree: [{
                name: "Fatal Fury",
                link: "#",
                subtree: [{
                    name: "Fatal Fury",
                    link: "#"
                }, {
                    name: "Fatal Fury 2",
                    link: "#"
                }, {
                    name: "Fatal Fury: King of Fighters",
                    link: "#"
                }, {
                    name: "Fatal Fury Special",
                    link: "#"
                }]
            }, {
                name: "divider",
                link: "#"
            }, {
                name: "Metal Slug",
                link: "#",
                subtree: [{
                    name: "Metal Slug",
                    link: "#"
                }, {
                    name: "Metal Slug 2",
                    link: "#"
                }, {
                    name: "Metal Slug 3",
                    link: "#"
                }, {
                    name: "Metal Slug 4",
                    link: "#"
                }, {
                    name: "Metal Slug 5",
                    link: "#"
                }, {
                    name: "Metal Slug 6",
                    link: "#"
                }, {
                    name: "Metal Slug 7",
                    link: "#"
                }, {
                    name: "Metal Slug X",
                    link: "#"
                }]
            }]
        }, {
            name: "Sega",
            link: "#"
        },{
            name: "Nintendo",
            link: "#"
        }]
    });