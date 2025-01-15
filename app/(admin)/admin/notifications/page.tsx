'use client';

import { useState } from 'react';
import { Button, Input, Textarea } from '@nextui-org/react';
import { createGlobalNotification } from '@/services/notification';
import { toast } from 'sonner';

export default function AdminNotificationsPage() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createGlobalNotification(title, message);
      toast.success('Уведомление отправлено всем пользователям');
      setTitle('');
      setMessage('');
    } catch  {
      toast.error('Ошибка при отправке уведомления');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Отправка уведомлений</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Textarea
          label="Сообщение"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <Button
          type="submit"
          color="primary"
          isLoading={isLoading}
        >
          Отправить всем
        </Button>
      </form>
    </div>
  );
} 