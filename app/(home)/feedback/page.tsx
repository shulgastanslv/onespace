'use client';

import { useState } from 'react';
import { 
  Card, 
  Input, 
  Textarea, 
  Button, 
  Chip,
  RadioGroup,
  Radio
} from '@nextui-org/react';
import { SendIcon, BugIcon, LightbulbIcon, MessageCircleIcon } from 'lucide-react';

export default function Page() {
  const [feedbackType, setFeedbackType] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!feedbackType) {
      alert('Please select feedback type');
      return;
    }
    if (!subject) {
      alert('Please enter subject');
      return;
    }
    if (!description) {
      alert('Please enter description');
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch('/api/send-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feedbackType,
          subject,
          description,
          email,
        }),
      });
      if (response.ok) {
        setFeedbackType('');
        setSubject('');
        setDescription('');
        setEmail('');
      }
    } catch (error) {
      console.error('Error sending feedback:', error);
      alert('An error occurred while sending feedback');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto items-center justify-center h-screen flex p-4 max-w-xl">
      <Card className="p-4 space-y-6 bg-background border-gray-200 border-1 rounded-lg">
        <div className="space-y-1">
          <h1 className="text-xl font-bold flex items-center gap-2">
              Give us feedback
          </h1>
          <p className="text-default-500">
              We value your opinion and constantly work on improving our product
          </p>
        </div>

        <div className="space-y-6">
          <RadioGroup
            value={feedbackType}
            onValueChange={setFeedbackType}
            isRequired
            classNames={{
              label: "after:content-['*'] after:text-danger after:ml-0.5",
            }}
            label="Type of feedback"
          >
            <div className="flex flex-row justify-between w-full">
              <Radio 
                value="bug"
                className="border rounded-lg p-3 hover:bg-content2 flex-1 mx-1"
                description="Report a problem or issue"
              >
                <div className="flex items-center gap-2">
                  <BugIcon className="w-8 h-8 text-danger" />
                  <div>
                    <span className="font-medium">Bug Report</span>
                    <Chip color="danger" size="sm" className="ml-2">Bug</Chip>
                  </div>
                </div>
              </Radio>
              
              <Radio 
                value="feature"
                className="border rounded-lg p-3 hover:bg-content2 flex-1 mx-1"
                description="Suggest new features or improvements"
              >
                <div className="flex items-center gap-2">
                  <LightbulbIcon className="w-8 h-8 text-success" />
                  <div>
                    <span className="font-medium">Feature Request</span>
                    <Chip color="success" size="sm" className="ml-2">Idea</Chip>
                  </div>
                </div>
              </Radio>

              <Radio 
                value="other"
                className="border rounded-lg p-3 hover:bg-content2 flex-1 mx-1"
                description="Other type of feedback"
              >
                <div className="flex items-center gap-2">
                  <MessageCircleIcon className="w-8 h-8 text-primary" />
                  <div>
                    <span className="font-medium">Other Feedback</span>
                    <Chip color="primary" size="sm" className="ml-2">Other</Chip>
                  </div>
                </div>
              </Radio>
            </div>
          </RadioGroup>

          <Input
            type="email"
            label="Email (optional)"
            placeholder="For feedback with you"
            variant="bordered"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Subject"
            placeholder="Short description"
            variant="bordered"
            isRequired
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <Textarea
            label="Detailed description"
            placeholder="Describe your idea or problem in more detail..."
            variant="bordered"
            minRows={4}
            isRequired
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-end">
            <Button 
              color="primary"
              className="w-max"
              variant="shadow"
              size="md"
              endContent={<SendIcon className="w-4 h-4" />}
              onClick={handleSubmit}
              isLoading={isLoading}
            >
              Send
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
} 