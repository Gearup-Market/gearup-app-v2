"use client";

import React, { useEffect, useState } from "react";
import styles from "./ListingCard.module.scss";
import Image from "next/image";
import { formatLink, shortenTitle } from "@/utils";
import Link from "next/link";
import { useGlobalContext } from "@/contexts/AppContext";
import { EllipseIcon, MoreIcon } from "@/shared/svgs/dashboard";
import MoreModal from "../MoreModal/MoreModal";

interface Props {
    props: any;
    className?: string;
    activeFilter?: string;
    activeRow?: number;
    setActiveRow: React.Dispatch<React.SetStateAction<number>>;
}

const ListingCard = ({ props, className, activeFilter, activeRow, setActiveRow }: Props) => {
    const { setSingleListing } = useGlobalContext();
    const [showMoreModal, setShowMoreModal] = useState(false);

    const handleMoreIconClick = (id: number) => {
        setActiveRow(id)
        setShowMoreModal((prev) => !prev);
        // Add any additional logic for the MoreIcon click here
    };

    
    useEffect(() => {
        const handleBodyClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.closest(`.more-modal`) || target.closest(`.${styles.more_icon}`)) return;
            setShowMoreModal(false);
            setActiveRow(0);
        };
        document.body.addEventListener("click", handleBodyClick);
        return () => {
            document.body.removeEventListener("click", handleBodyClick);
        };
    }, []);

    return (
        <div
            className={`${styles.container} ${className}`}
        >
            <div className={styles.image} data-disabled={props.status.toLowerCase() !== "ongoing"}>
                <Image src={props.image} alt={props.title} fill sizes="100vw" />
                <span className={styles.more_icon} onClick={() => handleMoreIconClick(props.id)}>
                    <MoreIcon />
                </span>
                {
                    showMoreModal && activeRow === props.id && <div className={`${styles.more_modal} more-modal`} onClick={(e)=>e.stopPropagation()}> <MoreModal row={props} activeFilter={activeFilter} /></div>
                }
            </div>
            <div className={styles.row} style={{ alignItems: "flex-start" }}>
                <div className={styles.text}>
                    <h2>{shortenTitle(props.title, 50)}</h2>
                </div>
                <div className={styles.chevron}>
                    <EllipseIcon color="#FFB30F" />
                </div>
            </div>
            <div className={styles.pricing_container}>
                <div className={styles.pricing}>
                    <p>{props.price}</p>
                </div>
            </div>
        </div>
    );
};

export default ListingCard;
