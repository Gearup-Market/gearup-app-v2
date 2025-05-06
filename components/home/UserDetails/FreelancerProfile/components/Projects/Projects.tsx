'use client'
import React, { useState } from "react";
import styles from './Projects.module.scss';
import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Icon } from "@/shared";
import { ProjectDetails } from "./components";

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

const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 3,
  },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};
const Projects = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  const handleProjectClick = (id: number) => {
    setActiveProject(id);
  };

  return (
    <div className={styles.container}>
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        showDots={false}
        ssr={true}
        rewind={false}
        infinite={false}
        autoPlay={false}
        slidesToSlide={1}
        keyBoardControl={true}
        transitionDuration={500}
        centerMode={true}
        focusOnSelect={true}
      >
        {projects.map((project) => (
          <ListItem
            key={project.id}
            title={project.title}
            id={project.id}
            image={project.image}
            onClick={() => handleProjectClick(project.id)}
          />
        )
        )}
      </Carousel>
      <ProjectDetails projectId={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
};

export default Projects;

const ListItem = ({
  title,
  id,
  image,
  onClick,
}: {
  title: string;
  id: number;
  image: string;
    onClick: () => void;
}) => {


  return (
    <div className={styles.project}>
      <div className={styles.content}>
        <div className={styles.image_container}>
          <Image src={image} alt={title} fill objectFit="cover" />
        </div>
        <div className={styles.title_container}>
          <h3 className={styles.title}>{title}</h3>
          <button onClick={onClick}>
            <Icon src="/svgs/red-arrow-right.svg" className={styles.red_arrow} />
          </button>
        </div>
      </div>
    </div>
  );
};
