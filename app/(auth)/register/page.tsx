"use client"
import React from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UserCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { BACKEND_URL } from '@/lib/constants';

interface FormData {
  First_Name: string;
  Last_Name: string;
  Email: string;
  Password: string;
  PasswordConfirmation: string;
}

const RegisterPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch ,reset } = useForm<FormData>();
  const { toast } = useToast();
  const onSubmit = async (data: FormData) => {
    try {
        const trimmedData = {
            First_Name: data.First_Name.trim(),
            Last_Name: data.Last_Name.trim(),
            Email: data.Email.trim(),
            Password: data.Password, 
          };
      const response = await axios.post(`${BACKEND_URL}/api/register`, trimmedData);
      
      console.log(response.data[0].Message);
    
      if (response.data[0].Status === "F") {
        toast({
          title: "Error ❌",
          description: response.data[0].Message,  
          variant:'destructive'
        });
        return;
      }
  
      toast({
        title: "Request sent ✅",
        description: "Registration request added successfully",
      });
    
        reset();
  
  
    } catch (error: any) {
      console.error('Error registering user:', error.message);
      
      toast({
        title: "Error",
        description: `${error.message}`, 
      });
    }
  };
  

  return (
    <section>
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-green-500 lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            alt="WMS"
            src="/images/loginLogo.png"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
            fill
          />
          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="#">
              <span className="sr-only">Home</span>
            </a>
            <h2 className="mt-6 text-xl font-bold text-black sm:text-2xl md:text-3xl">
              Share video for solutions 
            </h2>
            <p className="mt-4 leading-relaxed text-black">
              Registration page
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid grid-cols-6 gap-6">
              <Card className="col-span-6">
                <CardHeader className="text-center p-6 rounded-t-lg">
                  <UserCircle className="mx-auto h-12 w-12 text-blue-400 hidden lg:block" />
                  <CardTitle className="mt-4 text-2xl font-bold">Register</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                        First Name *
                      </label>
                      <Input
                        type="text"
                        id="FirstName"
                        {...register('First_Name', { required: 'First name is required' })}
                        className="mt-1 w-full rounded-md"
                      />
                      {errors.First_Name && <p className="text-red-500">{errors.First_Name.message}</p>}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                        Last Name *
                      </label>
                      <Input
                        type="text"
                        id="LastName"
                        {...register('Last_Name', { required: 'Last name is required' })}
                        className="mt-1 w-full rounded-md"
                      />
                      {errors.Last_Name && <p className="text-red-500">{errors.Last_Name.message}</p>}
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                        Email *
                      </label>
                      <Input
                        type="email"
                        id="Email"
                        {...register('Email', { required: 'Email is required' })}
                        className="mt-1 w-full rounded-md"
                      />
                      {errors.Email && <p className="text-red-500">{errors.Email.message}</p>}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
                        Password *
                      </label>
                      <Input
                        type="password"
                        id="Password"
                        {...register('Password', { required: 'Password is required' })}
                        className="mt-1 w-full rounded-md"
                      />
                      {errors.Password && <p className="text-red-500">{errors.Password.message}</p>}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
                        Password Confirmation *
                      </label>
                      <Input
                        type="password"
                        id="PasswordConfirmation"
                        {...register('PasswordConfirmation', {
                          required: 'Password confirmation is required',
                          validate: (value) => value === watch('Password') || 'Passwords do not match',
                        })}
                        className="mt-1 w-full rounded-md"
                      />
                      {errors.PasswordConfirmation && <p className="text-red-500">{errors.PasswordConfirmation.message}</p>}
                    </div>
                  </div>

                  <div className="col-span-6 sm:flex sm:items-center sm:gap-4 mt-6">
                    <Button type="submit" className="inline-block w-full sm:w-auto font-medium rounded-md px-4 py-2 transition focus:outline-none focus:ring">
                      Create an account
                    </Button>
                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                      Already have an account?{' '}
                      <Link href="/login" className="text-blue-700 underline">
                        Log in
                      </Link>.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default RegisterPage;
