define(['flight-history'], function(History) {

    var intitialRoute = document.location.pathname;

    describe('flight-history', function() {

        describe('Loading events', function(){

          beforeEach(function() {
            var routes = {};
            routes[intitialRoute] ='testDebug';

            spy = sinon.spy();
            $(document).on('testDebug', spy);

            this.component = (new History()).initialize(document, {
              routes: routes
            });
          });

          afterEach(function(){
            this.component.teardown();
          });

          it('should fire the testDebug event on load', function() {
            expect(spy.called).to.equal(true);
          });

        });

        describe('URL change', function(){

          beforeEach(function() {
            this.component = (new History()).initialize(document, {
              routes: {
                '/': 'uiIndex',
                '/params/{x}/{y}/': 'uiWithParams',
                '/debug.html': 'testDebug'
              }
            });
          });

          afterEach(function(){
            history.replaceState({ test: 'end' }, '', intitialRoute);
            this.component.teardown();
          });

          it('should set the URL to </> on <uiIndex>', function() {
            this.component.trigger('uiIndex');
            expect(document.location.pathname).to.equal('/');
          });

          it('should set the URL to </params/1/2> on <uiWithParams>', function() {
            this.component.trigger('uiWithParams', {
              x: 1,
              y: 2
            });
            expect(document.location.pathname).to.equal('/params/1/2/');
          });

          it('should set the URL to </debug.html> on <testDebug>', function() {
            this.component.trigger('testDebug');
            expect(document.location.pathname).to.equal('/debug.html');
          });

        });

        describe('Popstate events', function(){

          beforeEach(function() {
            spy = sinon.spy();
            this.component = (new History()).initialize(document, {
              routes: {
                '/': 'uiIndex',
                '/params/{x}/{y}': 'uiWithParams'
              }
            });
          });

          afterEach(function(){
            history.replaceState({ test: 'end' }, '', intitialRoute);
            this.component.teardown();
          });

          describe('An index route', function(){
            it('should trigger uiIndex', function() {
              this.component.on('uiIndex', spy);

              history.replaceState({ test: 'index' }, '', '/');
              $(window).trigger('popstate');

              expect(spy.called).to.equal(true);
            });
          });

          describe('A route with params', function(){
            beforeEach(function(){
              this.component.on('uiWithParams', spy);
              history.replaceState({ test: 'params' }, '', '/params/1/2/');
              $(window).trigger('popstate');
            });

            it('should trigger uiWithParams', function() {
              expect(spy.called).to.equal(true);
            });

            it('should set the <x> param', function() {
              expect(spy.args[0][1].x).to.equal('1');
            });

            it('should set the <y> param', function() {
              expect(spy.args[0][1].y).to.equal('2');
            });
          });

        });

    });

});
