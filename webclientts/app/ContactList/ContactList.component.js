System.register(['angular2/core', '../ContactElement/ContactElement.component', 'angular2/router', '../services/ContactManagerService'], function(exports_1, context_1) {
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
    var core_1, ContactElement_component_1, router_1, ContactManagerService_1;
    var ContactList;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ContactElement_component_1_1) {
                ContactElement_component_1 = ContactElement_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (ContactManagerService_1_1) {
                ContactManagerService_1 = ContactManagerService_1_1;
            }],
        execute: function() {
            ContactList = (function () {
                function ContactList(contactMananger) {
                    this.contactMananger = contactMananger;
                }
                ContactList.prototype.ngOnInit = function () {
                    var _this = this;
                    this.contactMananger.getContacts()
                        .then(function (contacts) { _this.contacts = contacts; });
                    this.contactMananger.subscribeToNewContacts(function (newContact) {
                        console.log('new contact', newContact);
                        this.contacts.push(newContact.data);
                        console.log('new contact list', this.contacts);
                    }.bind(this));
                };
                ContactList = __decorate([
                    core_1.Component({
                        selector: 'contact-list',
                        styles: [".contact-list { padding: 5px;}"],
                        template: "\n      <div class=\"contact-list\">\n        <h2>Contact List</h2>\n        <a [routerLink]=\"['AddContact']\">Add Contact</a>\n        <router-outlet></router-outlet>\n        <contact-element *ngFor=\"#contact of contacts\" [contact]=\"contact\"></contact-element>\n      </div>\n    ",
                        directives: [ContactElement_component_1.ContactElement, router_1.ROUTER_DIRECTIVES],
                        providers: [ContactManagerService_1.ContactManagerService]
                    }), 
                    __metadata('design:paramtypes', [ContactManagerService_1.ContactManagerService])
                ], ContactList);
                return ContactList;
            }());
            exports_1("ContactList", ContactList);
        }
    }
});
//# sourceMappingURL=ContactList.component.js.map