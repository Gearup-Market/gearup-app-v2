'use client'
import React from "react";
import styles from './Projects.module.scss';
import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Icon } from "@/shared";

const projects = [
  {
    id: 1,
    title: "Cinematographer",
    image: "/images/dominic.png",
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
    image: "/images/daniel.png",
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

const Projects = () => {
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <div className={styles.container}>
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        showDots={false}
        ssr={false}
        infinite={false}
        autoPlay={false}
        keyBoardControl={true}
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="carousel-item-padding-40-px"
      >
        {projects.map((project) => (
          <ListItem
            key={project.id}
            title={project.title}
            id={project.id}
            image={project.image}
          />
        )
        )}
      </Carousel>
    </div>
  );
};

export default Projects;

const ListItem = ({
  title,
  id,
  image,
}: {
  title: string;
  id: number;
  image: string;
}) => {
  const handleProjectClick = () => {
    console.log(`Project clicked: ${title}, id: ${id}`);
  };

  return (
    <div className={styles.project}>
      <div className={styles.content}>
        <div className={styles.image_container}>
          <Image src={image} alt={title} fill objectFit="cover" />
        </div>
        <div className={styles.title_container}>
          <h3 className={styles.title}>{title}</h3>
          <button onClick={handleProjectClick}>

          <Icon src="/svgs/red-arrow-right.svg" />
          </button>
        </div>
      </div>
    </div>
  );
};
