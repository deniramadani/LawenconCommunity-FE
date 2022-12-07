import { Component, OnInit } from "@angular/core";
import { Router, Route } from "@angular/router";

@Component({
    selector: 'app-site-map',
    templateUrl: './site-map.component.html',

})

export class SiteMapComponent implements OnInit {

    routepath :any[] = []

    constructor(private router: Router) { }

    ngOnInit() {
        this.printpath('', this.router.config);
    }

    printpath(parent: String, config: Route[]) {
        for (let i = 0; i < config.length; i++) {
            const route = config[i];
            console.log(parent + '/' + route.path);
            this.routepath.push(parent + '/' + route.path)
            if (route.children) {
                const currentPath = route.path ? parent + '/' + route.path : parent;
                this.printpath(currentPath, route.children);
            }
        }
    }

}