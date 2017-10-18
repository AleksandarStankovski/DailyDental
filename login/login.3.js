var express = require('express');
var path = require("path");

var helpers = require("./services/helpers");

var APP_CONFIG = require("./app.config.js");

var ADMIN_URI = APP_CONFIG.administrationURIClear;

var moment = require("moment");

var activityService = require("./services/activityService");

var Logger = require("logger");
var logger = new Logger();

var modelHelper = require("./services/modelHelper");

var appModels = require("./models");

module.exports = {
    getRoutes: function() {
        var routes = {}

        routes[ADMIN_URI + "rest/orders"] = require("./administration/routes/ordersEndpoint")
        routes[ADMIN_URI + "rest/categories"] = require("./administration/routes/categoryEndpoint")
        routes[ADMIN_URI + "rest/products"] = require("./administration/routes/productEndpoint")
        routes[ADMIN_URI + "rest/promoProducts"] = require("./administration/routes/promoProductEndpoint")
        routes[ADMIN_URI + "rest/reports"] = require("./administration/routes/reportsEndpoint")
        routes[ADMIN_URI + "rest/employees"] = require("./administration/routes/employeeEndpoint")
        routes[ADMIN_URI + "rest/courier"] = require("./administration/routes/courierEndpoint")
        routes[ADMIN_URI + "rest/logout"] = require("./administration/routes/logout")
        routes[ADMIN_URI + "rest/profile"] = require("./administration/routes/profileEndpoint")
        routes[ADMIN_URI + "rest/nav"] = require("./administration/routes/navEndpoint")
        routes[ADMIN_URI + "rest/carousel"] = require("./administration/routes/carouselEndpoint")
        routes[ADMIN_URI + "rest/supplies"] = require("./administration/routes/suppliesEndpoint")
        routes[ADMIN_URI + "rest/storage"] = require("./administration/routes/storageEndpoint")
        routes[ADMIN_URI + "rest/invoice"] = require("./administration/routes/invoiceEndpoint")
        routes[ADMIN_URI + "rest/leasing"] = require("./administration/routes/leasingEndpoint")
        routes[ADMIN_URI + "rest/activities"] = require("./administration/routes/activitiesEndpoint")
        routes[ADMIN_URI + "rest/banner"] = require("./administration/routes/bannerEndpoint")
        routes[ADMIN_URI + "rest/bulletin"] = require("./administration/routes/bulletinEndpoint");
        routes[ADMIN_URI + "rest/promoCodes"] = require("./administration/routes/promoCodeEndpoint");
        routes[ADMIN_URI + "rest/popup"] = require("./administration/routes/popupEndpoint");
        routes[ADMIN_URI + "api/rest/uri.js"] = require("./administration/routes/baseUri")

        return routes;
    },
    login: function(app) {
        app.post(APP_CONFIG.administrationLoginURI + "/auth/login", function(req, res) {

            if (req.session.admin) {
                return res.send("Already logged in")
            }

            if (!req.body.userName || !req.body.password) {
                return res.status(401).send("Ќевалидно потребителско име или парола");
            }

            appModels.employee
                .findOne({ userName: req.body.userName ? req.body.userName.toString() : null }, function(err, user) {

                    if (!user) return res.status(401).send("Ќевалидно потребителско име или парола");

                    if (helpers.encyptPassword(req.body.password) != user.password) {
                        logger.send({
                            facility: "node.js",
                            short_message: "Trying to login in Coffee Mall Administration with invalid credentials",
                            message: "Trying to login in  Coffee Mall Administration with invalid credentials",
                            remote_address: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                            full_message: "USERNAME: " + req.body.userName,
                            url: req.originalUrl,
                            email_notification: "yes"
                        });
                        return res.status(401).send("Ќевалидно потребителско име или парола");
                    }

                    user.password = undefined;
                    req.session.admin = user;

                    activityService.create({
                        type: "success login",
                        user: req.session.admin,
                        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
                    }, function(err, result) {
                        req.session.save(function() {
                            res.send(ADMIN_URI);
                        });
                    });


                });

        });

        app.use(APP_CONFIG.administrationLoginURI, function(req, res, next) {

            if (!req.session.admin) {
                next();
            } else {
                res.redirect(APP_CONFIG.administrationURIClear);
            }
        }, express.static(path.join(__dirname, 'administration', 'login')));
    },
    web: function(app) {
        console.log("initializing administration static files : " + path.join(__dirname, "administration", "web", "dist"))
        app.use(APP_CONFIG.administrationURIClear,
            express.static(path.join(__dirname, "administration", "web", "dist")));
    },
    routes: function(app) {
        app.use(ADMIN_URI + "rest/*", function(req, res, next) {
            req.models = appModels;

            req.modelHelper = modelHelper;

            req.mergeObjects = function(obj1, obj2) {
                var obj3 = {};
                for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
                for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
                return obj3;
            }

            if (req.query.fieldNames && req.query.fieldValues) {
                //building the search query to be accessible in the router
                if (Object.prototype.toString.call(req.query.fieldNames) !== '[object Array]') {
                    req.query.fieldNames = [req.query.fieldNames];
                }

                if (Object.prototype.toString.call(req.query.fieldValues) !== '[object Array]') {
                    req.query.fieldValues = [req.query.fieldValues];
                }

                var dbSearchQuery = {};
                req.query.fieldNames.forEach(function(fieldName, index) {

                    if (moment(req.query.fieldValues[index], 'YYYY-M-D', true).isValid()) {
                        dbSearchQuery[fieldName] = {
                            $gte: moment(req.query.fieldValues[index], 'YYYY-M-D', true).startOf('day').toDate(),
                            $lte: moment(req.query.fieldValues[index], 'YYYY-M-D', true).endOf('day').toDate()
                        }
                    } else {
                        if (!(req.query.fieldValues[index] === 'true' || req.query.fieldValues[index] === 'false')) {
                            dbSearchQuery[fieldName] = {
                                $regex: new RegExp(req.query.fieldValues[index], 'i')
                            }
                        } else {
                            //so it is boolean, no need for regexp
                            dbSearchQuery[fieldName] = req.query.fieldValues[index]
                        }

                    }


                });

                req.dbSearchQuery = dbSearchQuery;
            }

            next();
        });

        var routes = this.getRoutes();

        Object.keys(routes).forEach(function(key) {
            app.use(key, routes[key]);
        });

    }
}