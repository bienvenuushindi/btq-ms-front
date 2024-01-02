import SearchTagBox from '@/components/tags/SearchTag';
import ContainerOne from '@/components/ContainerOne';
import Form from '@/components/Form';
import React, {useCallback, useState} from 'react';
import {API_URL, authFetcher, BASE_URL} from '@/lib/api';
import useSWRImmutable from 'swr/immutable';

export default function UserForm({user}){
  const initial = {email: '', password: '', firstName: '', lastName: '',  country_name: '', city: '', tel1: '',tel2: '',address1: '', address2: ''};
  const [formState, setFormState] = useState({...initial});
  const getImageUrls = () => {
    return (user.image_urls).map((image_path) => (
      `${BASE_URL + image_path}`
    ));
  };
  const [photos, setPhotos] = useState(getImageUrls());
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const data = {
        user: formState
      };
      console.log(data)
      // try {
      //   if (mode === 'register') {
      //     await register(data);
      //   } else {
      //     await signin(data);
      //   }
      //   router.push('/home');
      // } catch (e) {
      //   setError(`Could not ${mode}`);
      // } finally {
      //   setFormState({...initial});
      // }
    },
    [
      formState.email,
      formState.password,
      formState.firstName,
      formState.lastName,
    ]
  );
  const content = {
    header: 'Profile',
    subheader: '',
    buttonText: 'Save changes'
  };
  const userForm = [
    [{
      label: 'First Name',
      required: true,
      placeholder: 'First Name',
      value: formState.firstName,
      name: 'firstname',
      type: 'text',
      input_type: 'text',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, firstName: e.target.value}));
      },
    },{
      label: 'Second Name',
      required: true,
      placeholder: 'Second Name',
      value: formState.lastName,
      name: 'lastname',
      type: 'text',
      input_type: 'text',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, lastName: e.target.value}));
      },
    }],
    {
      label: 'Email',
      required: true,
      placeholder: 'Email',
      value: formState.email,
      name: 'email',
      type: 'email',
      input_type: 'text',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, lastName: e.target.value}));
      },
    },
    {
      label: 'Select Origin Country',
      required: true,
      placeholder: 'Select Country',
      name: 'country_id',
      value: formState.country_name,
      input_type: 'select',
      className: '',
      options: {'CG': 'Congo', 'RW': 'RWANDA', 'UG': 'Uganda', 'KE': 'Kenya', 'QA': 'Qatar',},
      action: (e) => {
        const countryName = e.target.options[e.target.selectedIndex].text;
        setFormState((s) => ({...s, country_id: e.target.value, country_name: countryName}));
      }
    },
    {
      label: 'City',
      required: true,
      placeholder: 'City',
      value: formState.city,
      name: 'city',
      type: 'text',
      input_type: 'text',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, city: e.target.value}));
      },
    },
    {
      label: 'Phone 1',
      required: true,
      placeholder: 'Phone number 1',
      value: formState.tel1,
      name: 'Phone 1',
      type: 'tel',
      input_type: 'text',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, tel1: e.target.value}));
      },
    },
    {
      label: 'Phone 2',
      required: true,
      placeholder: 'Phone number 2',
      value: formState.tel2,
      name: 'Phone 2',
      type: 'tel',
      input_type: 'text',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, tel2: e.target.value}));
      },
    },
    {
      label: 'Address 1',
      required: true,
      placeholder: 'Avenue, Building name, Floor Number',
      value: formState.address1,
      name: 'address1',
      type: 'text',
      input_type: 'text',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, address1: e.target.value}));
      },
    },
    {
      label: 'Address 2',
      required: false,
      placeholder: 'Avenue, Building name, Floor Number',
      value: formState.address2,
      name: 'address2',
      type: 'text',
      input_type: 'text',
      className: '',
      action: (e) => {
        setFormState((s) => (
          {...s, address2: e.target.value}
        ));
      },
    },
    {
      label: 'Photos',
      input_type: 'image-file',
      image_props: {photos, setPhotos}
    },
    {
      input_type: 'button',
      className: '',
      type: 'submit',
      placeholder: 'Save Changes'
    }
  ];

  return (
    <ContainerOne>
      <div className="w-full lg:w-2/4 mx-auto">
        <div className="text-center">
          <h2 className="text-3xl mb-2 text-black">{content.header}</h2>
          <p className="tex-lg text-black/25">{content.subheader}</p>
          <Form handleSubmit={handleSubmit} fields={userForm}/>
        </div>
      </div>
    </ContainerOne>
  );
}