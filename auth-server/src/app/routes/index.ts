import type { Application } from "express";
import { healthCheck, helloMonday } from "@/app/controllers";
import { Route } from "@/lib/app/enums";

export default function (app: Application) {
    app.get(Route.HEALTH_CHECK, healthCheck);
    app.post(Route.HELLO_MONDAY, helloMonday);
}
