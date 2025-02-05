'use client';

import { useState } from 'react';
import {
  Card,
  Input,
  Textarea,
  Button,
  Chip,
  RadioGroup,
  Radio,
} from '@nextui-org/react';
import {
  SendIcon,
  BugIcon,
  LightbulbIcon,
  MessageCircleIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import { feedbackSchema } from '@/schemas/feedback';
import { Feedback } from '@/types/feedback';

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState<Feedback>({
    type: '',
    subject: '',
    description: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrors({});

    try {
      const validatedData = feedbackSchema.safeParse({
        ...feedback,
        subject: feedback.subject.trim(),
        description: feedback.description.trim(),
        email: feedback.email.trim(),
      });
      console.log(validatedData);
      if (!validatedData.success) {
        const formattedErrors: Record<string, string> = {};
        validatedData.error.issues.forEach((issue) => {
          formattedErrors[issue.path[0] as string] = issue.message;
        });
        setErrors(formattedErrors);
        const firstError = validatedData.error.issues[0];
        toast.error(firstError.message);
        return;
      }
      const response = await fetch('/api/send-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback: validatedData.data }),
      });
      if (response.ok) {
        toast.success('Thank you for your feedback!');
        setFeedback({ type: '', subject: '', description: '', email: '' });
      } else {
        throw new Error('Error sending feedback');
      }
    } catch {
      toast.error('Error sending feedback');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full mx-auto mt-16 flex items-center justify-center p-5">
      <Card className="w-full max-w-xl h-max p-6 space-y-8 bg-background backdrop-blur-md border border-gray-200">
        <div className="space-y-5">
          <div className="flex justify-center">
            <div className="bg-primary/10 p-3 rounded-full">
              <MessageCircleIcon className="w-6 h-6 text-primary" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Share Your Feedback
            </h1>
            <p className="text-default-500 text-center text-sm">
              Help us improve your experience
            </p>
          </div>
        </div>

        <RadioGroup
          value={feedback.type}
          onValueChange={(value) => {
            setFeedback({ ...feedback, type: value.toString() });
            setErrors({ ...errors, type: '' });
          }}
          isRequired
          isInvalid={!!errors.type}
          classNames={{
            label: "after:content-['*'] after:text-danger after:ml-0.5 mb-4",
            wrapper: "flex flex-row gap-6"
          }}
          label="Feedback Type"
          errorMessage={errors.type}
          orientation="horizontal"
        >
            <Radio
              value="bug"
              size="sm"
              className="group border border-content2 rounded-xl p-3 hover:border-danger hover:bg-danger/5 transition-all data-[selected=true]:border-danger data-[selected=true]:bg-danger/10 flex-1 max-w-[200px]"
              description="Report an issue or bug"
            >
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-danger/10 group-hover:bg-danger/20 transition-colors">
                  <BugIcon className="w-4 h-4 text-danger" />
                </div>
                <div>
                  <span className="font-semibold text-sm">Bug Report</span>
                  <Chip
                    color="danger"
                    variant="flat"
                    size="sm"
                    className="ml-2"
                  >
                    Critical
                  </Chip>
                </div>
              </div>
            </Radio>

            <Radio
              value="feature"
              size="sm"
              className="group border border-content2 rounded-xl p-3 hover:border-success hover:bg-success/5 transition-all data-[selected=true]:border-success data-[selected=true]:bg-success/10 flex-1 max-w-[200px]"
              description="Suggest new features"
            >
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-success/10 group-hover:bg-success/20 transition-colors">
                  <LightbulbIcon className="w-4 h-4 text-success" />
                </div>
                <div>
                  <span className="font-semibold text-sm">Feature Request</span>
                  <Chip
                    color="success"
                    variant="flat"
                    size="sm"
                    className="ml-2"
                  >
                    Idea
                  </Chip>
                </div>
              </div>
            </Radio>

            <Radio
              value="other"
              size="sm"
              className="group border border-content2 rounded-xl p-3 hover:border-primary hover:bg-primary/5 transition-all data-[selected=true]:border-primary data-[selected=true]:bg-primary/10 flex-1 max-w-[200px]"
              description="Share other thoughts"
            >
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <MessageCircleIcon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <span className="font-semibold text-sm">General</span>
                  <Chip
                    color="primary"
                    variant="flat"
                    size="sm"
                    className="ml-2"
                  >
                    Other
                  </Chip>
                </div>
              </div>
            </Radio>
        </RadioGroup>

        <div className="space-y-4">
          <Input
            type="email"
            label="Email"
            placeholder="your@email.com"
            variant="bordered"
            radius="sm"
            classNames={{
              label: 'text-sm font-medium',
              input: 'text-sm',
              inputWrapper:
                'border-content2 hover:border-primary focus-within:border-primary',
            }}
            value={feedback.email}
            isInvalid={!!errors.email}
            errorMessage={errors.email}
            onChange={(e) => {
              setFeedback({ ...feedback, email: e.target.value });
              setErrors({ ...errors, email: '' });
            }}
            className="w-full"
          />

          <Input
            label="Subject"
            placeholder="Brief description of your feedback"
            variant="bordered"
            radius="sm"
            classNames={{
              label: 'text-sm font-medium',
              input: 'text-sm',
              inputWrapper:
                'border-content2 hover:border-primary focus-within:border-primary',
            }}
            isRequired
            value={feedback.subject}
            isInvalid={!!errors.subject}
            errorMessage={errors.subject}
            onChange={(e) => {
              setFeedback({ ...feedback, subject: e.target.value });
              setErrors({ ...errors, subject: '' });
            }}
            className="w-full"
          />

          <Textarea
            label="Detailed Description"
            placeholder="Share your thoughts in detail..."
            variant="bordered"
            radius="sm"
            minRows={4}
            classNames={{
              label: 'text-sm font-medium',
              input: 'text-sm overflow-y-auto max-h-[200px]',
              inputWrapper:
                'border-content2 hover:border-primary focus-within:border-primary',
            }}
            isRequired
            value={feedback.description}
            isInvalid={!!errors.description}
            errorMessage={errors.description}
            onChange={(e) => {
              setFeedback({ ...feedback, description: e.target.value });
              setErrors({ ...errors, description: '' });
            }}
            className="w-full"
          />

          <div className="flex justify-end pt-4">
            <Button
              color="primary"
              variant="shadow"
              size="sm"
              radius="sm"
              endContent={<SendIcon className="w-4 h-4" />}
              onClick={handleSubmit}
              isLoading={isLoading}
            >
              Send Feedback
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
