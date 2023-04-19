import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '../hooks/useRegisterModal';
import useLoginModal from '../hooks/useLoginModal';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../Button';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Modal from './Modal';

const SignupSchema = z.object({
  email: z.string().email('이메일 형식이 아닙니다.'),
  name: z.string(),
  password: z.string().min(6).max(18),
});

export type SignupForm = z.infer<typeof SignupSchema>;

export default function RegisterModal() {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit: SubmitHandler<SignupForm> = async ({
    email,
    name,
    password,
  }) => {
    // setIsLoading(true);
    console.log('## Register : ', email, name, password);
  };

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register('email', { required: true })}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register('name', { required: true })}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register('password', { required: true })}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        // onClick={() => signIn('google')}
        onClick={() => alert('구글 로그인')}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        // onClick={() => signIn('github')}
        onClick={() => alert('깃헙 로그인')}
      />
      <div
        className="
          mt-4
          text-center
          font-light
          text-neutral-500
        "
      >
        <p>
          Already have an account?
          <span
            onClick={onToggle}
            className="
              cursor-pointer
              text-neutral-800
              hover:underline
            "
          >
            {' '}
            Log in
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}
