import { isEmpty } from "./isEmpty";
import isNil from "lodash/isNil";
import omitBy from "lodash/omitBy";

export function buildUrlQuery(params: any) {
	if (isEmpty(params)) return "";
	if (typeof params !== "object") return "";
	if (Array.isArray(params)) return "";
    const queryObject = omitBy(params, isNil)
	const queryArray = Object.keys(queryObject);
	const queryString = queryArray
		.map(key => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))
		.join("&");

	return `?${queryString}`;
}
