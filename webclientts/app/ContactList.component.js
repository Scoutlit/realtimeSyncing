System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var AppComponent, ContactElement;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(http) {
                    var _this = this;
                    //this.contacts = [{ name: "Wendy" }, {name: "Jonathan"}, { name: "Wendy"}];
                    http.get('http://localhost:8888/contact')
                        .map(function (resp) { return resp.json(); })
                        .subscribe(function (data) { return _this.contacts = data; });
                }
                AppComponent.prototype.addName = function () {
                    this.contacts.push({ name: "WTF" });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'contact-list',
                        template: "\n    <div *ngFor=\"#contact of contacts\">{{ contact.name }}</div>\n"
                    }), 
                    __metadata('design:paramtypes', [Object])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
            ContactElement = (function () {
                function ContactElement() {
                }
                return ContactElement;
            }());
        }
    }
});
//# sourceMappingURL=ContactList.component.js.map