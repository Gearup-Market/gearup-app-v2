'use client';

import React, { useState } from 'react';
import styles from './AdminNavbar.module.scss';
import { Button, InputField, Logo } from '@/shared';
import { ArrowDownIcon, LogoIcon, NotificationIcon } from '@/shared/svgs/dashboard';
import Image from 'next/image';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import { useAuth } from '@/contexts/AuthContext';

const AdminNavbar = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showSearchBar,setShowSearchBar]=useState<boolean>(false)
  const [showMenubar,setShowMenubar]=useState<boolean>(false)
  const {user}=useAuth()
  

  const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
	setSearchTerm(e.target.value);
  };

  const toggleSearchBar =()=>{
    setShowSearchBar((prev)=>!prev)

  }


  return (
    <div className={styles.navbar_container}>
      <div className={styles.logo_icon}>
        <Logo type="dark" />
      </div>
     
      <div className={styles.input_container} data-show={showSearchBar}>
        <InputField placeholder="Try e.g Nikon SR ..." icon="/svgs/icon-search-dark.svg" iconTitle="search-icon" className={`${styles.search_field}`} onChange={handleSearchTerm} data-focus={!!searchTerm}/>
		<span className={styles.close} onClick={toggleSearchBar}>Close</span>
      </div>
      
      <div className={styles.icons_container}>
        <div className={styles.mob_buttons}>
          <Button buttonType="transparent" onClick={toggleSearchBar} className={`${styles.small_icon} ${styles.circle_border}`}>
              <Image
                src={ "/svgs/icon-search-normal.svg"}
                height={70}
                width={70}
                alt=""
                sizes="100vw"
              />
          </Button>
          <Button buttonType="transparent"  className={`${styles.small_icon} ${styles.circle_border}`}>
              <Image
                src={"/svgs/icon-notification.svg" }
                height={70}
                width={70}
                alt=""
                sizes="100vw"
              />
          </Button>
          <Button
            onClick={() => setShowMenubar(!showMenubar)}
            buttonType="transparent" className={styles.small_icon}
          >
             <Image
                src={!collapsed ? "/svgs/icon-hamburger.svg" : "/svgs/icon-cart.svg"}
                height={70}
                width={70}
                alt=""
                sizes="100vw"
              />
          </Button>
        </div>
      </div>
      <div className={styles.navbar_container__details}>
        <div className={styles.avatar}>
          <Image src="/images/admin-img.jpg" width={40} height={40} alt="avatar" />
        </div>
        <span className={styles.name}>{user?.userName || "Guest"}</span>
        <span>
          <ArrowDownIcon />
        </span>
      </div>

      {
        showMenubar &&
      <div className={styles.sidemenu_container}>
        <AdminSidebar isMobile={true} onClose={() => setShowMenubar(!showMenubar)}/>
      </div>
      }
    </div>
  );
};

export default AdminNavbar;
