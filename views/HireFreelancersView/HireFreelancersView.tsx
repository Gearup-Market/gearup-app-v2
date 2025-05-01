'use client'
import { FreelancerCategories, FreelancerHeroSection, FreelancerMoreCategories, CategoryList } from '@/components/home/hire-freelancers'
import React from 'react'
import styles from './HireFreelancersView.module.scss'
import { useSearchParams } from 'next/navigation'

const HireFreelancersView = () => {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const description = searchParams.get('description')

  return (
    <div className={styles.container}>
      <FreelancerHeroSection category={category} description={description} />
      {
        !category ?
          <>
            <FreelancerCategories />
            <FreelancerMoreCategories />
          </>
          :
          <CategoryList category={category} />
      }
    </div>
  )
}

export default HireFreelancersView