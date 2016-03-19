System.register(['angular2/core', 'angular2/http'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var ContactManagerService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            //import socketIOClient from 'socket.io-client';
            //import sailsIOClient from 'sails.io.js'
            //console.log(socketIOClient);
            //console.log(sailsIOClient);
            ContactManagerService = (function () {
                function ContactManagerService(http) {
                    this.http = http;
                    //let io = sailsIOClient(socketIOClient);
                    //io.sails.url = 'http://localhost:8888';
                    //console.log('io', io);
                }
                ContactManagerService.prototype.getContacts = function () {
                    var _this = this;
                    return new Promise(function (resolve) {
                        _this.http.get('http://localhost:8888/contact')
                            .map(function (resp) { return resp.json(); })
                            .subscribe(function (data) {
                            resolve(data);
                            // console.log("contacts - ", this.contacts);
                        });
                    });
                };
                ContactManagerService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], ContactManagerService);
                return ContactManagerService;
            }());
            exports_1("ContactManagerService", ContactManagerService);
        }
    }
});
//# sourceMappingURL=ContactManagerService.js.map