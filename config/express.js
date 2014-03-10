/**
 * Module dependencies
 */


var express = require('express'),
    mongoStore = require('connect-mongo')(express),
    flash = require('connect-flash'),
    helpers = require('view-helpers');


module.exports = function (app, config, passport) {
  app.set('showStackError', true);

  app.use(express.compress( {
    filter: function (req, res) {
      return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
    },
    level:9
  }));
  app.use(express.favicon());
  app.use(express.static(config.root+'/public'));

  if (process.env.NODE_ENV !== 'test') {
    app.use(express.logger('dev'));
  }

 // assign the template engine to .html files
  app.engine('html', consolidate[config.templateEngine]);

  // set .html as the default extension
  app.set('view engine', 'html');

  app.set('views', config.root+'/app/views');
  app.set('view engine', 'swig');
  app.configure(function () {
    app.use(helpers(config.app.name));
    app.use(express.cookieParser());

    app.use(express.bodyParser());
    app.use(express.methodOverride());

        app.use(express.session({
          secret: 'noobjs',
          store: new mongoStore({
            url: config.db,
            collection : 'sessions'
          })
    }));

    app.use(flash());

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);

    app.use(function (err, req, res, next) {
      if (~err.message.indexOf('not found')) return next();

      console.log(err.stack);

      res.status(500).render('500', {error: err.stack });
    });

    app.use(function (req, res, next){
      res.status(404).render('404', {url: req.originalUrl, error: 'Not found' });
    });

  });
};
