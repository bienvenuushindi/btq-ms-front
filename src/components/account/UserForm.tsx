import ContainerOne from '@/components/utils/wrappers/ContainerOne';
import Form, {InputImageContext} from '@/components/forms/Form';
import React, {useEffect, useMemo, useState} from 'react';
import InputFileImage from '@/components/forms/InputFileImage';
import {API_ENDPOINTS, send} from '@/lib/api';
import toastShow from '@/components/toast/toast-selector';
import {useRouteTransition} from '@/components/navigation/RouteTransitionProvider';
import {revalidateCache} from '@/lib/cache';

const COUNTRY_OPTIONS = {
  CG: 'Congo',
  RW: 'Rwanda',
  UG: 'Uganda',
  KE: 'Kenya',
  QA: 'Qatar',
};

const buildInitialState = (user: any) => {
  const address = user?.address || {};

  return {
    name: user?.name || '',
    email: user?.email || '',
    phone_number: user?.phone_number || address?.tel1 || '',
    country_name: address?.country || '',
    country_id: address?.code || '',
    city: address?.city || '',
    tel1: address?.tel1 || user?.phone_number || '',
    tel2: address?.tel2 || '',
    address1: address?.address1 || '',
    address2: address?.address2 || '',
  };
};

export default function UserForm({user}: {user: any}) {
  const {startNavigation} = useRouteTransition();
  const initialState = useMemo(() => buildInitialState(user), [user]);
  const [formState, setFormState] = useState(initialState);
  const [photos, setPhotos] = useState<string[] | File[]>(user?.image_urls || []);

  useEffect(() => {
    setFormState(initialState);
  }, [initialState]);

  useEffect(() => {
    setPhotos(user?.image_urls || []);
  }, [user]);

  const isPlaceholderImage = (photo: any) => (
    typeof photo === 'string' && (
      photo.includes('no-img.png') ||
      photo.includes('user-placeholder.svg')
    )
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) return;

    const formData = new FormData();
    Object.entries(formState).forEach(([key, value]) => {
      formData.append(`user[${key}]`, String(value ?? ''));
    });

    photos.forEach((photo) => {
      if (isPlaceholderImage(photo)) return;
      formData.append('user[images][]', photo as any);
    });

    try {
      await send(`/users/${user.id}`, formData, 'PUT');
      await revalidateCache({
        keys: [API_ENDPOINTS.CURRENT_USER, `${API_ENDPOINTS.USERS}/${user.id}`],
      });
      toastShow('success', 'Profile updated successfully');
      startNavigation('Refreshing profile...');
      window.location.reload();
    } catch (error) {
      toastShow('error', 'Could not update profile');
    }
  };

  const fields = {
    left: [
      [
        {
          label: 'Full Name',
          required: true,
          placeholder: 'Your full name',
          value: formState.name,
          name: 'name',
          type: 'text',
          input_type: 'text',
          action: (e) => setFormState((s) => ({...s, name: e.target.value})),
        },
        {
          label: 'Email',
          required: true,
          placeholder: 'Email address',
          value: formState.email,
          name: 'email',
          type: 'email',
          input_type: 'text',
          action: (e) => setFormState((s) => ({...s, email: e.target.value})),
        },
      ],
      [
        {
          label: 'Primary Phone',
          required: true,
          placeholder: 'Primary phone number',
          value: formState.tel1,
          name: 'tel1',
          type: 'tel',
          input_type: 'text',
          action: (e) => setFormState((s) => ({
            ...s,
            tel1: e.target.value,
            phone_number: e.target.value,
          })),
        },
        {
          label: 'Secondary Phone',
          required: false,
          placeholder: 'Secondary phone number',
          value: formState.tel2,
          name: 'tel2',
          type: 'tel',
          input_type: 'text',
          action: (e) => setFormState((s) => ({...s, tel2: e.target.value})),
        },
      ],
      [
        {
          label: 'Country',
          required: true,
          placeholder: 'Select country',
          name: 'country_id',
          value: formState.country_id,
          input_type: 'select',
          options: COUNTRY_OPTIONS,
          action: (e) => {
            const countryName = e.target.options[e.target.selectedIndex].text;
            setFormState((s) => ({...s, country_id: e.target.value, country_name: countryName}));
          },
        },
        {
          label: 'City',
          required: true,
          placeholder: 'City',
          value: formState.city,
          name: 'city',
          type: 'text',
          input_type: 'text',
          action: (e) => setFormState((s) => ({...s, city: e.target.value})),
        },
      ],
      [
        {
          label: 'Address 1',
          required: true,
          placeholder: 'Avenue, building, floor',
          value: formState.address1,
          name: 'address1',
          type: 'text',
          input_type: 'text',
          action: (e) => setFormState((s) => ({...s, address1: e.target.value})),
        },
        {
          label: 'Address 2',
          required: false,
          placeholder: 'Additional address details',
          value: formState.address2,
          name: 'address2',
          type: 'text',
          input_type: 'text',
          action: (e) => setFormState((s) => ({...s, address2: e.target.value})),
        },
      ],
      {
        input_type: 'button',
        className: 'w-full justify-center',
        type: 'submit',
        placeholder: 'Save Changes',
      },
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
        ),
      },
    ],
  };

  return (
    <ContainerOne>
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">Account</p>
          <h2 className="mt-2 font-display text-4xl font-bold text-slate-900">Profile</h2>
          <p className="mt-3 max-w-2xl text-base text-slate-500">
            Keep personal details, contact information, and profile media aligned with the rest of the dashboard experience.
          </p>
        </div>
        <Form handleSubmit={handleSubmit} fields={fields}/>
      </div>
    </ContainerOne>
  );
}
