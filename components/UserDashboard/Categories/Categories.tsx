"use client";
import React from 'react'
import styles from './Categories.module.scss'
import HeaderSubText from '../HeaderSubText/HeaderSubText'
import { Button, CustomImage } from '@/shared'
import Link from 'next/link'
import { useGetCategoriesDetailed } from '@/app/api/hooks/listings'

const Categories = () => {
  const { isFetching: loading, data: categories } = useGetCategoriesDetailed();
  return (
    <div className={styles.container}>
      <HeaderSubText title="Categories" description='Select a catergory that you have interest in and view gears in those categories specifically' variant='main' />

      <div className={styles.container__categories_container}>
        {
          categories?.data.map((category, index) => (
            <div key={index} className={styles.category}>
              <div className={styles.category__image}>
                <CustomImage src={category.image} alt={category.name} height={150} width={150} />
              </div>
              <h3 className={styles.category__title}>{category.name}</h3>
              <p className={styles.gears}>{category.itemsCount} Gears</p>
              <Link href={`/rent?category=${category.name.toLowerCase()}`}>
                <Button buttonType='secondary' className={styles.button}>
                  View Gears
                </Button>
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Categories;