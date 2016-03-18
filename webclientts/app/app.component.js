System.register(['angular2/core', './ContactList/ContactList.component', './AddContactApp/AddContactApp', './EditContactApp/EditContactApp', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, ContactList_component_1, AddContactApp_1, EditContactApp_1, router_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ContactList_component_1_1) {
                ContactList_component_1 = ContactList_component_1_1;
            },
            function (AddContactApp_1_1) {
                AddContactApp_1 = AddContactApp_1_1;
            },
            function (EditContactApp_1_1) {
                EditContactApp_1 = EditContactApp_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        styles: [".contact-manager-title { color: #121212; }"],
                        template: "\n    <div>\n      <h1 class=\"contact-manager-title\">Contact Manager Angular Client</h1>\n      <contact-list></contact-list>\n    </div>\n",
                        directives: [ContactList_component_1.ContactList]
                    }),
                    router_1.RouteConfig([
                        { path: '/add-contact', name: 'AddContact', component: AddContactApp_1.AddContactApp },
                        { path: '/edit-contact', name: 'EditContact', component: EditContactApp_1.EditContactApp }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map