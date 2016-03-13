System.register(['angular2/core', 'angular2/http', './ContactElement.component'], function(exports_1, context_1) {
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
    var core_1, http_1, ContactElement_component_1;
    var ContactList, ContactItem;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (ContactElement_component_1_1) {
                ContactElement_component_1 = ContactElement_component_1_1;
            }],
        execute: function() {
            ContactList = (function () {
                function ContactList(http) {
                    this.http = http;
                }
                ContactList.prototype.ngOnInit = function () {
                    var _this = this;
                    //this.contacts = [{ name: "Wendy" }, {name: "Jonathan"}, { name: "Wendy"}];
                    this.http.get('http://localhost:8888/contact')
                        .map(function (resp) { return resp.json(); })
                        .subscribe(function (data) {
                        _this.contacts = data;
                        console.log("contacts - ", _this.contacts);
                    });
                };
                ContactList = __decorate([
                    core_1.Component({
                        selector: 'contact-list',
                        template: "\n      <div>\n        <h2>Contact List</h2>\n        <contact-element *ngFor=\"#contact of contacts\" [contact]=\"contact\"></contact-element>\n      </div>\n    ",
                        directives: [ContactElement_component_1.ContactElement]
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], ContactList);
                return ContactList;
            }());
            exports_1("ContactList", ContactList);
            ContactItem = (function () {
                function ContactItem() {
                }
                return ContactItem;
            }());
            exports_1("ContactItem", ContactItem);
        }
    }
});
//# sourceMappingURL=ContactList.component.js.map