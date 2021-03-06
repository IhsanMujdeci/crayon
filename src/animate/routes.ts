import { handlerFunc } from "../router/types";
import { AnimationRoute } from "./types";
import { getAnimationState } from "./state";

export const routes = (
    routes:  AnimationRoute[]
): handlerFunc => (
    req, res, state, app
) => {
    const animationState = getAnimationState(state)
    for (const route of routes) {
        if (!route.from) {
            route.from = req.routePattern
        }
        if (!route.to) {
            route.to = req.routePattern
        }
    }
    animationState.putRoutes(routes)

    res.ctx.animation = animationState.calculate(app)
}