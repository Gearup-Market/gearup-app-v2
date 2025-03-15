import { FreelancerCategories, FreelancerHeroSection, FreelancerMoreCategories } from '@/components/home/hire-freelancers'
import React from 'react'
import styles from './HireFreelancersView.module.scss'

const HireFreelancersView = () => {
  return (
    <div className={styles.container}>
      <FreelancerHeroSection />
      <FreelancerCategories />
      <FreelancerMoreCategories />
    </div>
  )
}

export default HireFreelancersView