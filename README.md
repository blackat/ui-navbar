# ui-navbar - Responsive navigation bar with submenu in AngularJS

[![Build Status](https://travis-ci.org/blackat/ui-navbar.svg?branch=master)](https://travis-ci.org/blackat/ui-navbar)
[![devDependency Status](https://david-dm.org/blackat/ui-navbar/dev-status.svg?branch=master)](https://david-dm.org/blackat/ui-navbar#info=devDependencies)

## Quick description
Build a responsive navigation menu bar with sub-menu in a __recursive__ fashion using ui-router to load partials. The menu items as well as the corresponding states are set in a `json` object in the `$scope` as following:

    $scope.tree = [{
            name: "States",
            link: "#",
            subtree: [{
                name: "state 1",
                link: "state1"
            },{
                name: "state 2",
                link: "state2"
            }]
        }];

## Features

- Recursive item menu definition in `json` format.
- Easy way to define a `divider` between items.
- Unlimited level of nesting.
- Responsive.
- Fully compatible with AngularJS.
- Standard Html5 with AngularJS Bootstrap attributes such as `dropdown`.
- Support tag `navbar-right` from Bootstrap with submenu opening on the left.
- __No jquery required__ to manage responsivness and dropdown actions.

## Dependencies

- AngularJS, required 1.4.x, tested with 1.4.8.
- UI Boostrap, required 0.14.0, tested with 1.1.1.
- ui-router, required 0.2.15, tested with 0.2.15.
- Twitter Bootstrap, required 3.3.6, tested with 3.3.6.

## Update

-  Prefixed `angular-ui-bootstrap` components in the `index.html` demo page according to the [migration guide](https://github.com/angular-ui/bootstrap/wiki/Migration-guide-for-prefixes).
- Updated the documentation.

## How it's done
It is a collection of directives and templates to create recursively a navigation bar in AngularJS based on Html attributes used to define a dropdown menu defined in ui-boostrap package.

Dependencies are [ui-boostrap](https://github.com/angular-ui/bootstrap) to manage dropdown and collapse, then [ui-router](https://github.com/angular-ui/ui-router) to manage routing to partials.

## Plunkr live demo

- version < 0.14.x Live demo at [Plunkr](http://plnkr.co/edit/V7tecYv4wNPP198HRQlJ?p=info)
- version > 0.14.x Live demo at [Plunkr](http://plnkr.co/edit/zyxXk6w079OgswKHQgno?p=info)

## How to setup the ui-navbar

#### 1) Install ui-navbar
Via npm
```
npm install ui-navbar --save
```

or via Bower
```
bower install ui-navbar --save
```

#### 2) Html part for the nav bar:
```html
<div ng-controller="NavigationController">
    <nav class="navbar navbar-default" role="navigation">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" ng-init="navCollapsed = true"
                    ng-click="navCollapsed = !navCollapsed">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" ui-sref="home">Brand</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" ng-class="!navCollapsed && 'in'">

            <ul class="nav navbar-nav">
                <li uib-dropdown>
                    <a href="#" uib-dropdown-toggle>
                        Dropdown
                        <b class='caret'></b>
                    </a>
                    <tree tree='tree'></tree>
                </li>
                <li uib-dropdown>
                    <a href="#" uib-dropdown-toggle>
                        Just a clone
                        <span class='caret'></span>
                    </a>
                    <tree tree='tree'></tree>
                </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li uib-dropdown>
                    <a href="#" uib-dropdown-toggle>
                        Dropdown right
                        <b class='caret'></b>
                    </a>
                    <tree tree='tree'></tree>
                </li>
                <li uib-dropdown>
                    <a href="#" uib-dropdown-toggle>
                        Just a clone right
                        <span class='caret'></span>
                    </a>
                    <tree tree='tree'></tree>
                </li>
            </ul>
        </div>
        <!-- /.navbar-collapse -->
    </nav>
</div>
```

#### 3) Html part to hook the partials
```html
<!-- Hook here the partials -->
<div ui-view=""></div>
```
#### 4) Configure routing in your module adding required dependencies
```javascript
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
            });
    })
```
#### 5) Configure the controller adding the menu item to be displayed in the nav bar 
```javascript
.controller('NavigationController', function ($scope) {

        $scope.tree = [{
            name: "States",
            link: "#",
            subtree: [{
                name: "state 1",
                link: "state1"
            },{
                name: "state 2",
                link: "state2"
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
    });
```

## Demo
From the folder `demo` type

    npm install
    node server.js

then type in a browser `http://localhost:5000` to get the demo page working.