(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = null;
    hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("web/static/js/app.js", function(exports, require, module) {
"use strict";

require("./app_module");

require("./controllers/main_controller");

require("./controllers/main_shopController");

require("./services/shopService.js");
});

;require.register("web/static/js/app_module.js", function(exports, require, module) {
'use strict';

angular.module("mobilesolution", ['ui.router', 'satellizer', 'ngMaterial']).run(['$rootScope', '$state', '$stateParams', '$timeout', '$window', function ($rootScope, $state, $stateParams, $timeout, $window) {}]).config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $urlRouterProvider.otherwise("/");
    $stateProvider.state("main", {
        url: "/",
        templateUrl: "partials/main.html",
        controller: "mainController"
    }).state("main.Shop", {
        url: "shop",
        templateUrl: "partials/main.shop.html",
        controller: "mainShopController"
    });
});
});

;require.register("web/static/js/controllers/main_controller.js", function(exports, require, module) {
'use strict';

angular.module("mobilesolution").controller('mainController', ['$scope', '$state', '$rootScope', function ($scope, $state, $rootScope) {

              $state.go("main.Shop");
}]);
});

;require.register("web/static/js/controllers/main_shopController.js", function(exports, require, module) {
'use strict';

angular.module("mobilesolution").controller('mainShopController', ['$scope', '$state', '$rootScope', 'ShopService', function ($scope, $state, $rootScope, ShopService) {
  console.log('Main Home Controller');
  $scope.slected_Publisher = "";
  $scope.slected_Order = "";
  $scope.sortReverse = false;
  $scope.faviconhover = false;
  $scope.ShopService = ShopService;
  ShopService.getNews();
}]);
});

;require.register("web/static/js/services/shopService.js", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by arnab on 22/11/17.
 */
var ShopService = function () {
    function ShopService($http) {
        _classCallCheck(this, ShopService);

        this.$http = $http;
        this.newzDetails = [];
        this.publisher = [];
        this.newzList = [];
        this.sortedArray = [];
        this.slected_Order = "TIMESTAMP";
        this.sortReverse = false;
    }

    _createClass(ShopService, [{
        key: 'getNews',
        value: function getNews() {
            var _this = this;

            this.$http({
                url: ' https://api.myjson.com/bins/10ijyt',
                method: 'GET'
            }).then(function (response) {
                _this.newzDetails = response.data;
                _this.newzList = response.data;
                console.log("this.newzDetails", _this.newzDetails);
                for (var i = 0; i < response.data.length; i++) {
                    _this.publisher.indexOf(response.data[i].PUBLISHER) === -1 ? _this.publisher.push(response.data[i].PUBLISHER) : console.log("This item already exists");
                }
            }, function (error) {
                console.log("inside Error part in design service....");
            });
        }
    }, {
        key: 'sortingnewzBasedCategory',
        value: function sortingnewzBasedCategory(category) {
            console.log(category);
            this.newzDetails = [];
            for (var i = 0; i < this.newzList.length; i++) {
                if (this.newzList[i].CATEGORY === category) {
                    console.log("Executing.....");
                    this.newzDetails.push(this.newzList[i]);
                }
            }
            console.log("this.newzDetails", this.newzDetails);
        }
    }, {
        key: 'sortingnewzBasedpublisher',
        value: function sortingnewzBasedpublisher(publisher) {
            console.log(publisher);
            this.newzDetails = [];
            for (var i = 0; i < this.newzList.length; i++) {
                if (this.newzList[i].PUBLISHER === publisher) {
                    console.log("Executing.....");
                    this.newzDetails.push(this.newzList[i]);
                }
            }
            console.log("this.newzDetails", this.newzDetails);
        }
    }, {
        key: 'sortingBasedonTime',
        value: function sortingBasedonTime() {

            for (var i = 0; i < this.newzList.length; i++) {
                this.sortedArray.push([this.newzList[i].TIMESTAMP, this.newzList[i]]);
            }
        }
    }]);

    return ShopService;
}();

ShopService.$inject = ['$http'];
angular.module('mobilesolution').service('ShopService', ShopService);
});

;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');

require('web/static/js/app');
//# sourceMappingURL=app.js.map