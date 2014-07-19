define(
    [
        'flight/lib/component'
    ],
    function (defineComponent) {
        return defineComponent(flightHistory);

        function flightHistory() {
            
            this.defaultAttrs({
                routeBase: "",
                routes: {},
            });
            
            var _routes = [],
                _useHashState = !window.history || !window.history.pushState;
            
            function parseRoute(route, event) {
                var finishedRoute = route,
                    keys = [],
                    regex = /{[\w]+[\d\w]*}/g,
                    matches;
                    
                while ((matches = regex.exec(route)) !== null) {
                    var match = matches[0];
                    finishedRoute = finishedRoute.replace(match, "([\\w\\s\\d-]+)");
                    keys.push(match.substr(1, match.length-2));
                }
                
                return {
                    route: RegExp(finishedRoute + "$"),
                    original: route,
                    keys: keys, 
                    event: event
                };
            }
            
            this.onLoad = function(e) {
                var that = this,
                    location = _useHashState? window.location.hash : window.location.pathname;
                
                _routes.forEach(function(el) {
                    var result = el.route.exec(location);
                    if (result !== null) {
                        var data = {};
                        for (var i = 0; i < result.slice(1).length; i++) {
                            data[el.keys[i]] = result[i+1];
                        }
                        that.trigger(document, el.event, data);
                    }
                });
            };
            
            this.onEvent = function(e, data) {
                var urlToPush;
                
                _routes.forEach(function(el) {
                    if(e.type == el.event) {
                        urlToPush = el.original;
                        el.keys.forEach(function(key) {
                            if (data[key] !== undefined) {
                                urlToPush = urlToPush.replace("{"+key+"}", data[key]);
                            }
                        });
                        if (_useHashState) {
                            window.location.hash = urlToPush;
                        } else {
                            history.pushState(data, "", urlToPush);
                        }
                    }
                });
            };
            
            this.after('initialize', function() {
                this.on(window, 'popstate', this.onLoad);
                this.on(window, 'hashchange', this.onLoad);
                
                for (var key in this.attr.routes) {
                    this.on(document, this.attr.routes[key], this.onEvent);
                    _routes.push(parseRoute(this.attr.routeBase + key, this.attr.routes[key]));
                }
                
                this.onLoad();
            });
        }
    }
);
