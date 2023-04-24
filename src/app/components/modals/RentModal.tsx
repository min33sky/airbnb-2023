'use client';

import useRentModal from '@/hooks/useRentModal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import Modal from './Modal';
import { categories } from '@/app/utils/categories';
import Heading from '../Heading';
import CategoryInput from '../inputs/CategoryInput';
import CountrySelect from '../inputs/CountrySelect';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentSchema = z.object({
  category: z.string(),
  location: z.object({
    flag: z.string(),
    label: z.string(),
    latlng: z.array(z.number()),
    region: z.string(),
    value: z.string(),
  }),
  guestCount: z.number().int().positive(),
  roomCount: z.number().int().positive(),
  bathroomCount: z.number().int().positive(),
  imageSrc: z.string(),
  price: z.number().int().positive(),
  title: z.string(),
  description: z.string(),
});

type RentForm = z.infer<typeof RentSchema>;
type RentFormKeys = keyof RentForm;

/**
 * RentModal
 */
export default function RentModal() {
  const router = useRouter();
  const rentModal = useRentModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<RentForm>({
    resolver: zodResolver(RentSchema),
    defaultValues: {
      category: 'apartment',
      location: {
        label: 'Anywhere',
        value: 'anywhere',
        flag: '',
        latlng: [0, 0],
        region: '',
      },
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  });

  //TODO: const map;

  const category = watch('category');
  const location = watch('location');

  console.log('##### Rent Modal Errors: ', errors);

  const onSubmit: SubmitHandler<RentForm> = (data) => {
    onNext();
    console.log('## Rent : ', data);
  };

  const setCustomValue = (key: RentFormKeys, value: any) => {
    setValue(key, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const onBack = useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create';
    }
    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 md:grid-cols-2 ">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />
        {/* <Map center={location?.latlng} /> */}
      </div>
    );
  }

  return (
    <Modal
      title="Airbnb your home!"
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
}
