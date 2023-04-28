'use client';

import useRentModal from '@/hooks/useRentModal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import Modal from './Modal';
import { categories } from '@/utils/categories';
import Heading from '../Heading';
import CategoryInput from '../inputs/CategoryInput';
import CountrySelect from '../inputs/CountrySelect';
import dynamic from 'next/dynamic';
import Counter from '../Counter';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';

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

  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  //? 지도 컴포넌트를 동적으로 불러오기 위해 사용 (SSR도 사용하지 않는다.)
  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location],
  );

  console.log('##### Rent Modal Errors: ', errors);

  const onSubmit: SubmitHandler<RentForm> = async (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    console.log('## Rent : ', data);

    //!!!!!!!!!!!!!!!!!!!!!!!!!! 테스트용 (지울꺼임 ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ)
    if (!data.imageSrc) {
      setCustomValue(
        'imageSrc',
        'https://res.cloudinary.com/dfqxossjf/image/upload/v1682478401/tga33uhnyz6m3lfydtcl.jpg',
      );
    }

    setIsLoading(true);

    try {
      const response = await fetch('api/listings', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      toast.success('Listing created successfully');
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY);
      rentModal.onClose();
    } catch (error) {
      console.log('## Rent Error: ', error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
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

  /**
   * 모달 내용
   */
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
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenitis do you have"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue('guestCount', value)}
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue('roomCount', value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you have?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue('bathroomCount', value)}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          onChange={(value) => setCustomValue('imageSrc', value)}
          value={imageSrc}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register('title', { required: true })}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register('description', { required: true })}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register('price', {
            required: true,
            valueAsNumber: true,
          })}
          errors={errors}
          required
        />
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
