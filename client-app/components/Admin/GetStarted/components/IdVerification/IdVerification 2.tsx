import React from 'react'
import styles from './IdVerification.module.scss'
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText'
import { InputField, Select } from '@/shared'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { LogoutNavIcon } from '@/shared/svgs/dashboard';
import { UploadDetails } from './components';

interface IdentificationProps {
  identification: string;
  identificationNumber: string;

}

const IdVerification = () => {

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
  });

  const handleSubmit = (values: IdentificationProps) => {
    // Handle form submission
    console.log(values);
  };

  const identificationOptions = [
    'NIN',
    'International Passport',
    'Driver’s License',
    'Voter’s Card',
    'National ID Card',
  ]

  const initialValues = {
    identification: '',
    identificationNumber: ''
  }

  const uploadedFiles = [
    {
      name: 'NIN',
      size: '2.5mb',
      status: 'success'
    },
    {
      name: 'Voter’s Card',
      size: '2.5mb',
      status: 'error'
    },
    {
      name: 'National ID Card',
      size: '2.5mb',
      status: 'uploading'
    },
  ]
  return (
    <div className={styles.container}>
      <HeaderSubText title="ID verification" description='Please provide a valid means of identification' />
      <div className={styles.container__form_container}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form >
            <div className={styles.container__form_container__form}>
              <div className={styles.field}>
                <InputField label='Identification number' placeholder='Enter Identification number' />
              </div>
              <div className={styles.field}>
                <Select label='Identification' options={identificationOptions} />
              </div>
              <div className={styles.upload_box}>
                <span className={styles.rotate_icon}>
                  <LogoutNavIcon color='#7B8086' />
                </span>
                <p className={styles.drop_document_text}>Drop your documents here, or <span className={styles.click_to_upload}>click to upload</span></p>
              </div>
            </div>
            <div className={styles.documents_container}>
              {
                uploadedFiles.map((item, index) => (
                  <div key={index}>
                    <UploadDetails item={item} />
                  </div>
                ))
              }
            </div>
          </Form>
        </Formik>
      </div>
    </div >
  )
}

export default IdVerification