import React from "react";
import { Listings } from "../../../components/Admin";

interface Props {
	showTitle?: boolean;
	userid?: string;
}

const ListingsView = ({ showTitle = false, userid }: Props) => {
	return <Listings showTitle={showTitle} userid={userid} />;
};

export default ListingsView;
