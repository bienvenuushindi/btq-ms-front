import ContainerOne from '@/components/utils/wrappers/ContainerOne';
import Form, {InputImageContext} from '@/components/forms/Form';
import React, {useCallback, useState} from 'react';
import InputFileImage from '@/components/forms/InputFileImage';

export default function UserForm({user}){
  const initial = {email: '', password: '', firstName: '', lastName: '',  country_name: '', city: '', tel1: '',tel2: '',address1: '', address2: ''};
  const [formState, setFormState] = useState({...initial});
  const getImageUrls = () => {
    return (user.image_urls).map((image_path) => (
      image_path
    ));
  };
  const [photos, setPhotos] = useState(getImageUrls());
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const data = {
        user: formState
      };
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
  const userForm = {
      left: [
        [{
          label: 'First Name',
          required: true,
          placeholder: 'First name',
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
          placeholder: 'Second name',
          value: formState.lastName,
          name: 'lastname',
          type: 'text',
          input_type: 'text',
          className: '',
          action: (e) => {
            setFormState((s) => ({...s, lastName: e.target.value}));
          },
        }],
        [{
          label: 'Email',
          required: true,
          placeholder: 'Email address',
          value: formState.email,
          name: 'email',
          type: 'email',
          input_type: 'text',
          className: '',
          action: (e) => {
            setFormState((s) => ({...s, email: e.target.value}));
          },
        },
        {
          label: 'Country',
          required: true,
          placeholder: 'Select country',
          name: 'country_id',
          value: formState.country_name,
          input_type: 'select',
          className: '',
          options: {'CG': 'Congo', 'RW': 'RWANDA', 'UG': 'Uganda', 'KE': 'Kenya', 'QA': 'Qatar',},
          action: (e) => {
            const countryName = e.target.options[e.target.selectedIndex].text;
            setFormState((s) => ({...s, country_id: e.target.value, country_name: countryName}));
          }
        }],
        [{
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
          placeholder: 'Primary phone number',
          value: formState.tel1,
          name: 'Phone 1',
          type: 'tel',
          input_type: 'text',
          className: '',
          action: (e) => {
            setFormState((s) => ({...s, tel1: e.target.value}));
          },
        }],
        [{
          label: 'Phone 2',
          required: false,
          placeholder: 'Secondary phone number',
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
          placeholder: 'Avenue, building, floor',
          value: formState.address1,
          name: 'address1',
          type: 'text',
          input_type: 'text',
          className: '',
          action: (e) => {
            setFormState((s) => ({...s, address1: e.target.value}));
          },
        }],
        {
          label: 'Address 2',
          required: false,
          placeholder: 'Additional address details',
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
          input_type: 'button',
          className: 'w-full justify-center',
          type: 'submit',
          placeholder: 'Save Changes'
        }
      ],
      right: [
        {
          input_type: 'custom',
          component: (
            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Profile Media</p>
                <h4 className="mt-2 font-display text-2xl font-bold text-slate-900">Photo</h4>
                <p className="mt-2 text-sm text-slate-500">Keep a recognizable profile image for the account.</p>
              </div>
              <InputImageContext.Provider value={{photos, setPhotos}}>
                <InputFileImage/>
              </InputImageContext.Provider>
            </div>
          )
        }
      ]
    };

  return (
    <ContainerOne>
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">Account</p>
          <h2 className="mt-2 font-display text-4xl font-bold text-slate-900">{content.header}</h2>
          <p className="mt-3 max-w-2xl text-base text-slate-500">
            Keep personal details, contact information, and profile media aligned with the rest of the dashboard experience.
          </p>
        </div>
        <Form handleSubmit={handleSubmit} fields={userForm}/>
      </div>
    </ContainerOne>
  );
}
