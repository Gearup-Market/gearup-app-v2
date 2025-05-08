'use client'

import React from 'react'
import Modal from "@/shared/modals/modal/Modal";
import styles from './ProjectDetails.module.scss'
import Image from 'next/image'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface Props {
    projectId: number | null
    onClose: () => void
}

const responsive = {
    tablet: { breakpoint: { max: 4000, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const ProjectDetails = ({ projectId, onClose }: Props) => {
    return (
        <Modal
            openModal={!!projectId}
            setOpenModal={onClose}
            title="Project details"
            className={styles.container}
        >
            <div >
                <div className={styles.image_container}>
                    <Image src="/images/categories-1.png" alt="project-image" fill objectFit='cover' />
                </div>
                <h2 className={styles.project_title}>Project title</h2>
            </div>
            <div className={styles.details_body}>
                <div className={`${styles.description} ${styles.background}`}>
                    <h3>Description</h3>
                    <p>I handled every detail, focusing on [specific task]. The result? [Key achievement], which had a significant impact on [client&apos;s need or industry]. This project highligh ...<span className={styles.read_more}>Read more</span></p>
                </div>
                <div className={`${styles.proof_of_work} ${styles.background}`}>
                    <h3>Proof of work</h3>
                    <div className={styles.carousel_container}>
                        <Carousel
                            responsive={responsive}
                            swipeable={true}
                            draggable={true}
                            showDots={false}
                            ssr={true}
                            infinite={false}
                            autoPlay={false}
                            slidesToSlide={1}
                            keyBoardControl={true}
                            transitionDuration={500}
                            containerClass="carousel-container"
                            itemClass="carousel-item-padding-40-px"
                            centerMode={true}
                            focusOnSelect={true}
                        >
                            {projects.map((project) => (
                                <div className={styles.image_container} key={project.id}>
                                    <Image src={project.image} alt={"project-media"} height={241} width={280} />
                                </div>
                            )
                            )}
                        </Carousel>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ProjectDetails

const projects = [
    {
        id: 1,
        image: "/images/dominic.png",
    },
    {
        id: 2,
        image: "/images/lense.png",
    },
    {
        id: 3,
        image: "/images/gimbal.png",
    },
    {
        id: 4,
        image: "/images/guitar.png",
    },
    {
        id: 5,
        image: "/images/lense.png",
    },
    {
        id: 6,
        image: "/images/daniel.png",
    },
    {
        id: 7,
        image: "/images/studio.png",
    },
    {
        id: 8,
        image: "/images/video.png",
    },
];
