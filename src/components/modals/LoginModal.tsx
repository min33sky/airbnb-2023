'use client';

import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Heading from '../Heading';
import Button from '../Button';
import Input from '../inputs/Input';
import Modal from './Modal';
import { toast } from 'react-hot-toast';
import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';

const SigninSchema = z.object({
  email: z.string().email('이메일 형식이 아닙니다.'),
  password: z.string(),
});

export type SigninForm = z.infer<typeof SigninSchema>;

export default function LoginModal() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninForm>({
    resolver: zodResolver(SigninSchema),
  });

  const onSubmit: SubmitHandler<SigninForm> = async ({ email, password }) => {
    // setIsLoading(true);

    console.log(email, password);

    // TODO: Login Logic

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      console.log('## Login Result : ', result);

      if (result?.ok) {
        toast.success('로그인 성공');
        router.refresh();
        loginModal.onClose();
      } else {
        throw new Error('로그인 실패');
      }
    } catch (error: any) {
      console.log(error);
      toast.error('로그인 실패');
    }
  };

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register('email', { required: true })}
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
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className="mt-4 text-center font-light text-neutral-500">
        <p>
          First time using Airbnb?
          <span
            onClick={onToggle}
            className="cursor-pointer font-semibold text-neutral-800 hover:underline"
          >
            {' '}
            Create an account
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}
