import { Routes } from "@/types";
import AuthRoute from "./auth.routes";
import UserRoute from "./user.routes";
import ReviewRoute from "./review.routes";

const Route: Routes[] = [new AuthRoute(), new UserRoute(), new ReviewRoute()];

export default Route;
