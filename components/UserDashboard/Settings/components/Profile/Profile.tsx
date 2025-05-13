'use client'
import React, { useState } from 'react';
import styles from './Profile.module.scss';
import { PersonalInfoForm, SocialForm } from './components';
import HeaderSubText from "@/components/Admin/HeaderSubText/HeaderSubText";
import { Button, ToggleSwitch } from '@/shared';
import CareerInfo from './components/CareerInfo/CareerInfo';

enum ProfileTypeEnum {
  PERSONAL_INFO = "Personal info",
  CAREER_INFO = "Career info",
}

const Profile: React.FC = () => {
  const [activeProfileType, setActiveProfileType] = useState<ProfileTypeEnum>(ProfileTypeEnum.PERSONAL_INFO);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <HeaderSubText
          title="Profile"
        />
        <div className={styles.offers_switch}>
          Open to offers? <ToggleSwitch />
        </div>
      </div>
      <ul className={styles.profile_type_select}>
        {
          profileTypesc.map((profileType) => (
            <Button
              key={profileType.id}
              className={`${styles.profile_type} ${activeProfileType === profileType.value ? styles.active : ''}`}
              onClick={() => setActiveProfileType(profileType.value)}
            >
              {profileType.label}
            </Button>
          ))
        }
      </ul>
      {
        activeProfileType === ProfileTypeEnum.PERSONAL_INFO &&
        <>
          <PersonalInfoForm />
          <SocialForm />
        </>
      }
      {
        activeProfileType === ProfileTypeEnum.CAREER_INFO &&
        <CareerInfo />
      }
    </div>
  );
};

export default Profile;


const profileTypesc = [
  {
    id: 1,
    label: "Personal info",
    value: ProfileTypeEnum.PERSONAL_INFO,
  },
  {
    id: 2,
    label: "Career info",
    value: ProfileTypeEnum.CAREER_INFO,
  },
]