import { Routes } from "@/types";
import ListingRoute from "./listings.routes";
import CategoryRoute from "./category.routes";

const Route: Routes[] = [new CategoryRoute(), new ListingRoute()];

export default Route;
