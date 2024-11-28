'use client';
import { FC, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CopyIcon } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import useClipboard from '@/hooks/useClipboard';

const FormOgImage: FC = () => {
  const [preview, setPreview] = useState<string | undefined>(undefined);

  const { copy } = useClipboard();

  const formSchema = z.object({
    title: z.string().min(2, { message: 'Minimal 2 karakter' }),
    description: z.string().min(2, { message: 'Minimal 2 karakter' }),
    img: z.union([z.string().url(), z.string().length(0).optional()]),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      img: '',
    },
  });

  function onSubmit(val: z.infer<typeof formSchema>) {
    const { title, description, img } = val;

    const params = new URLSearchParams();

    if (title) {
      params.append('title', title);
    }

    if (description) {
      params.append('description', description);
    }

    if (img) {
      params.append('logoUrl', img);
    }

    const ogImgUrl = `/api/og?${params.toString()}`;
    setPreview(ogImgUrl);
  }

  useEffect(() => {
    const params = new URLSearchParams();
    params.append('title', 'Naufal Akbar Nugroho');
    params.append(
      'description',
      'Saya bersemangat membuat kontribusi untuk memberikan pengetahuan teknologi kepada semua orang!',
    );
    params.append(
      'logoUrl',
      'https://nuflakbrr.github.io/static/favicons/android-chrome-512x512.png',
    );

    const ogImgUrl = `/api/og?${params}`;
    setPreview(ogImgUrl);
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-3 justify-between items-center">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>OG Image Generator</CardTitle>
          <CardDescription>Generate OG image for your website.</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Naufal Akbar Nugroho" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Saya bersemangat membuat kontribusi untuk memberikan pengetahuan teknologi kepada semua orang!"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="img"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo</FormLabel>
                    <FormControl>
                      <Input placeholder="https://google.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="w-[500px]">
        <CardContent>
          <div className="overflow-hidden rounded-xl mt-6">
            {preview && (
              <Image
                src={preview}
                alt="Open Graph Image"
                width={1200}
                height={630}
                className="object-cover w-full h-full"
              />
            )}
          </div>

          <div className="flex flex-col gap-2 mt-5">
            <span>Link Output:</span>

            <div className="flex items-center justify-between gap-2 rounded-lg">
              <span className="w-full px-5 py-3 text-sm text-gray-900 truncate bg-white border border-gray-300 rounded-md dark:border-gray-900 dark:bg-neutral-900 dark:text-gray-100">
                {(process.env.NEXT_PUBLIC_API_URL || '') + preview}
              </span>

              <Button
                onClick={() => {
                  copy(`${(process.env.NEXT_PUBLIC_API_URL || '') + preview}`);
                }}
              >
                <CopyIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormOgImage;
