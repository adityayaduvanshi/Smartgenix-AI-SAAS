'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { ChatCompletionRequestMessage } from 'openai';

import Heading from '@/components/heading';
import { formSchema } from './constants';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Empty from '@/components/empty';
import Loader from '@/components/loader';
import { cn } from '@/lib/utils';
import { UserAvatar } from '@/components/user-avatar';
import { BotAvatar } from '@/components/bot-avatar';
import { useProModal } from '@/hooks/use-pro-modal';
import toast from 'react-hot-toast';

const ConversationPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: 'user',
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post('/api/conversation', {
        messages: newMessages,
      });
      setMessages((current) => [...current, userMessage, response.data]);

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
        title="Conversation"
        description="Our most advanced conversation model"
        bgColor="bg-violet-500/10"
        icon={MessageSquare}
        iconColor="text-violet-500"
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
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0  outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="How do I calculate the radius of a circle?"
                        {...field}
                      />
                    </FormControl>
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
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted ">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="No conversation started." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((mes) => (
              <div
                className={cn(
                  'p-8  w-full flex items-start gap-x-4 md:gap-x-8 rounded-lg',
                  mes.role === 'user'
                    ? 'bg-white border justify-end border-black/10'
                    : 'bg-muted justify-start'
                )}
                key={mes.content}
              >
                {mes.role !== 'user' && <BotAvatar />}
                <p className="text-sm">{mes.content}</p>
                {mes.role === 'user' && <UserAvatar />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
