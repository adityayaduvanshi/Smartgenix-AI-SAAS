'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRight, Download, ImageIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import Heading from '@/components/heading';
import { amountOptions, formSchema, resolutionOptions } from './constants';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Empty from '@/components/empty';
import Loader from '@/components/loader';
import { cn } from '@/lib/utils';
import { UserAvatar } from '@/components/user-avatar';
import { BotAvatar } from '@/components/bot-avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { useProModal } from '@/hooks/use-pro-modal';
import toast from 'react-hot-toast';

const ImagePage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      amount: '1',
      resolution: '512x512',
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);
      const response = await axios.post('/api/image', values);

      const urls = response.data.map((image: { url: string }) => image.url);
      setImages(urls);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error('Something went wrong!');
      }
    } finally {
      router.refresh();
    }
  };
  return (
    <div>
      <Heading
        title="Image Generation"
        description="Turn your prompt into an images"
        bgColor="bg-pink-700/10"
        icon={ImageIcon}
        iconColor="text-pink-700"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="A picture of horse in Swiss alps"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="amount"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map((amount) => (
                          <SelectItem key={amount.value} value={amount.value}>
                            {amount.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                name="resolution"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOptions.map((res) => (
                          <SelectItem key={res.value} value={res.value}>
                            {res.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button
                disabled={isLoading}
                className="col-span-12 lg:col-span-2 w-full "
                type="submit"
              >
                Generate <ArrowRight className="w-5 h-5 ml-4" />
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-20 flex flex-col justify-center items-center">
              <Loader />
              <p className="text-sm font-light ">
                It might take up to 1 minute
              </p>
            </div>
          )}
          {images.length === 0 && !isLoading && (
            <Empty label="No images generated." />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8 gap-4">
            {images.map((src) => (
              <Card key={src} className="rounded-lg overflow-hidden">
                <div className=" relative aspect-square ">
                  <Image src={src} alt="image gen" fill />
                </div>
                <CardFooter className="p-2">
                  <Button
                    onClick={() => window.open(src)}
                    variant="secondary"
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" /> Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
