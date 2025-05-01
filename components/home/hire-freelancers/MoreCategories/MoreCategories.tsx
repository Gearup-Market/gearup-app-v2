import React from 'react'
import styles from './MoreCategories.module.scss'
import { useUpdateUrlParams } from '@/hooks';

const MoreCategories = () => {
    const { updateParams } = useUpdateUrlParams();

    const handleCategorySelect = (category: string, description: string) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        updateParams({ category, description });
    };


    return (
        <section className={styles.container}>
            <h2 className={styles.title}>More categories</h2>
            <ul className={styles.categories}>

                {
                    moreCategories.map((category) => (
                        <button onClick={() => handleCategorySelect(category.title, category.description)} key={category.id} className={styles.category}>
                            <h3>{category.title}</h3>
                            <p>{category.description}</p>
                        </button>
                    ))
                }
            </ul>
        </section>
    )
}

export default MoreCategories



const moreCategories = [
    {
        id: 1,
        title: "Audio technicians",
        description: "Find audio technicians who ensure top-notch sound quality for your projects, from recording to mastering"
    },
    {
        id: 2,
        title: "Visual Effects Artists",
        description: "Find visual effects artists who bring imaginative concepts to life with cutting-edge visual effects and animations."
    },
    {
        id: 3,
        title: "Lighting Designers",
        description: "Find lighting designers who set the perfect mood and highlight key elements with professional lighting setups."
    },
    {
        id: 4,
        title: "Set Designers",
        description: "Find set designers who create immersive and visually appealing environments tailored to your project's needs."
    },
    {
        id: 5,
        title: "Production Assistants",
        description: "Find production assistants who ensure smooth and efficient operations throughout the production process."
    },
    {
        id: 6,
        title: "Sound Designers",
        description: "Find sound designers who craft unique soundscapes and audio experiences that enhance your project's impact."
    },
    {
        id: 7,
        title: "Costume Designers",
        description: "Find costume designers who create distinctive and period-appropriate attire to enhance character and storytelling."
    },
    {
        id: 8,
        title: "Makeup Artists",
        description: "Find makeup artists who bring characters to life with creative and professional makeup techniques."
    },
    {
        id: 9,
        title: "Prop Masters",
        description: "Find prop masters who source and manage props to ensure authenticity and functionality in your production."
    },
    {
        id: 10,
        title: "Gaffers",
        description: "Find gaffers who handle lighting setups and electrical needs to create the perfect atmosphere for your shoot."
    },
    {
        id: 11,
        title: "Key Grip",
        description: "Find key grips who manage rigging and support equipment to ensure smooth camera movements and safety."
    },
    {
        id: 12,
        title: "Script Supervisors",
        description: "Find script supervisors who ensure continuity and accuracy in your production’s script and scenes."
    },
    {
        id: 13,
        title: "Directors",
        description: "Find directors who lead your project with a creative vision, guiding performances and overall direction."
    },
    {
        id: 14,
        title: "Production Designers",
        description: "Find production designers who craft visually compelling settings and environments for your project"
    },
    {
        id: 15,
        title: "Stunt Coordinators",
        description: "Find stunt coordinators who ensure safe and expertly executed stunts and action sequences"
    },
]