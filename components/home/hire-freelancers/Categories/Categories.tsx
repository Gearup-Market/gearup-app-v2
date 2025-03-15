'use client'
import React, { useState } from 'react'
import styles from './Categories.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

const Categories = () => {
    return (
        <div className={styles.container}>
            <Swiper
                slidesPerView={1.3}
                spaceBetween={40}

                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className={`mySwiper ${styles.mob_swiper}`}
            >
                {
                    categories.map((category, index) => (
                        <SwiperSlide key={category.id}>
                            <ListItem
                                title={category.title}
                                description={category.description}
                                bgImage={category.bgImage}
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            <ul className={styles.categories}>
                {
                    categories.map((category, index) => (
                        <ListItem
                            key={category.id}
                            title={category.title}
                            description={category.description}
                            bgImage={category.bgImage}
                        />
                    ))
                }
            </ul>
        </div>
    )
}

export default Categories


const ListItem = ({ title, description, bgImage }: { title: string, description: string, bgImage: string }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <li
            className={styles.category}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                background: `linear-gradient(rgba(0, 0, 0, ${isHovered ? 0.8 : 0.5}), rgba(0, 0, 0, ${isHovered ? 0.8 : 0.5})), url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
        >
            <div className={`${styles.content} ${isHovered ? styles.expanded : ""}`}>
                <h3>{title}</h3>
                {isHovered && <p>{description}</p>}
            </div>
        </li>
    );
};

const categories = [
    {
        id: 1,
        title: "Cinematographer",
        description: "Find cinematographers who craft stunning visuals with expert camera, lighting, and composition skills",
        bgImage: "/images/cinematographers-img.png"
    },
    {
        id: 2,
        title: "Video Editor",
        description: "Transform raw footage into polished stories through expert editing and post-production skills.",
        bgImage: "/images/video-editor-img.png"
    },
    {
        id: 3,
        title: "Photographer",
        description: "Capture moments and scenes with precision, artistry, and creativity.",
        bgImage: "/images/photographer-img.png"
    },
    {
        id: 4,
        title: "Colorist",
        description: "Find colorists who enhance the mood and tone of your visuals with expert color grading and correction.",
        bgImage: "/images/colorist-img.png"
    },
    {
        id: 5,
        title: "Producers",
        description: "Find producers who manage all aspects of production, from budgeting and scheduling to coordinating teams.",
        bgImage: "/images/producers-img.png"
    },
    {
        id: 6,
        title: "Lighting Technician",
        description: "Find lighting technicians who set up and control lighting to create the perfect ambiance for your production",
        bgImage: "/images/lightening-technician-img.png"
    },
    {
        id: 7,
        title: "Camera Operator",
        description: "Find camera operators who skillfully capture every shot with precision, movement, and creative framing.",
        bgImage: "/images/camera-operator-img.png"
    },
    {
        id: 8,
        title: "Drone operator",
        description: "Find drone operators who capture breathtaking aerial footage with precision and expertise.",
        bgImage: "/images/drone-operator-img.png"
    },
]