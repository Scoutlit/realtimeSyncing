System.register(['angular2/core', './ContactList.component'], function(exports_1, context_1) {
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
    var core_1, ContactList_component_1;
    var ContactElement;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ContactList_component_1_1) {
                ContactList_component_1 = ContactList_component_1_1;
            }],
        execute: function() {
            ContactElement = (function () {
                function ContactElement() {
                }
                ContactElement.prototype.ngOnInit = function () {
                    // console.log('contact - ', this.contact)
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', ContactList_component_1.ContactItem)
                ], ContactElement.prototype, "contact", void 0);
                ContactElement = __decorate([
                    core_1.Component({
                        selector: 'contact-element',
                        styles: [".contact-card { margin-bottom: 5px; padding: 10px; border: 1px solid #c3c3c3 }"],
                        template: "\n      <div class='contact-card'>\n        <h2>{{ contact.name }}</h2>\n        <h3>{{ contact.phoneNumber }}</h3>\n        <button (click)=\"editContact(contact)\">Edit</button>\n      </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], ContactElement);
                return ContactElement;
            }());
            exports_1("ContactElement", ContactElement);
        }
    }
});
//# sourceMappingURL=ContactElement.component.js.map