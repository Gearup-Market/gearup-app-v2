'use client'
import React, { useState, useEffect, useRef } from "react";
import styles from './ProjectList.module.scss';
import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { MoreIcon } from "@/shared/svgs/dashboard";
import { OptionDetails } from "./components";

const projects = [
    {
        id: 1,
        title: "Cinematographer",
        image: "/images/gimbal.png",
    },
    {
        id: 2,
        title: "Video Editor",
        image: "/images/lense.png",
    },
    {
        id: 3,
        title: "Photographer",
        image: "/images/gimbal.png",
    },
    {
        id: 4,
        title: "Colorist",
        image: "/images/guitar.png",
    },
    {
        id: 5,
        title: "Producers",
        image: "/images/lense.png",
    },
    {
        id: 6,
        title: "Lighting Technician",
        image: "/images/gimbal.png",
    },
    {
        id: 7,
        title: "Camera Operator",
        image: "/images/studio.png",
    },
    {
        id: 8,
        title: "Drone operator",
        image: "/images/video.png",
    },
];

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 6
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};
const ProjectList = () => {

    return (
        <div className={styles.container}>
            <h3>Projects</h3>
            <Carousel
                responsive={responsive}
                swipeable={true}
                draggable={true}
                showDots={false}
                ssr={false}
                rewind={false}
                infinite={true}
                autoPlay={false}
                partialVisible
                slidesToSlide={1}
                keyBoardControl={true}
                transitionDuration={500}
                focusOnSelect={false}
                arrows={true}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {projects.map((project) => (
                    <ListItem
                        key={project.id}
                        title={project.title}
                        image={project.image}
                    />
                )
                )}
            </Carousel>
        </div>
    );
};

export default ProjectList;

const ListItem = ({
    title,
    image,
}: {
    title: string;
    image: string;
}) => {
    const [showMore, setShowMore] = useState(false);
    const moreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
                setShowMore(false);
            }
        }

        if (showMore) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showMore]);

    return (
        <div className={styles.project}>
            <div className={styles.image_container}>
                <Image src={image} alt={title} fill />
                <button onClick={() => setShowMore(true)}>
                    <MoreIcon />
                </button>
                {showMore && (
                    <div ref={moreRef}>
                        <OptionDetails />
                    </div>
                )}
            </div>
            <h3 className={styles.title}>{title}</h3>
        </div>
    );
};

