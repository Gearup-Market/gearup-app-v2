import { Routes } from "@/types";
import AuthRoute from "./auth.routes";
import UserRoute from "./user.routes";

const Route: Routes[] = [new AuthRoute(), new UserRoute()];

export default Route;
