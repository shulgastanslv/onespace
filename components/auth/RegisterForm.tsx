'use client'

import { Button, Input, Card, CardBody, CardHeader, Divider, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ThemeSwitch } from "../theme/ThemeSwitch";
import { Eye, EyeClosed } from "lucide-react";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/');
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async () => {
    router.push('/');
  };

  return (
    <Card className="max-w-sm w-full bg-background/50 backdrop-blur-md border border-gray-200/25 rounded-lg shadow-md">
      <CardHeader className="flex justify-between items-center gap-2">
        <h2 className="text-lg font-bold">Create an account</h2>
        <ThemeSwitch />
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="bordered"
            radius="lg"
            classNames={{
              input: "text-sm",
              inputWrapper: "bg-background/50",
            }}
          />
          <Input
            label="Password"
            type={isVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="bordered"
            radius="lg"
            endContent={
              <Button
                className="focus:outline-none border-none"
                type="button"
                variant="ghost"
                color="default"
                size="sm"
                radius="full"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <Eye className="w-4 h-4 text-default-400" />
                ) : (
                  <EyeClosed className="w-4 h-4 text-default-400" />
                )}
              </Button>
            }
            classNames={{
              input: "text-sm",
              inputWrapper: "bg-background/50",
            }}
          />

          <div className="flex items-center justify-center gap-3">
            <input
              type="checkbox"
              id="terms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="rounded text-primary"
              required
            />
            <label htmlFor="terms" className="text-sm text-default-600">
              I agree to the <Link href="/terms" className="text-primary text-sm">terms of use</Link> and{" "}
              <Link href="/privacy" className="text-primary text-sm">privacy policy</Link>
            </label>
          </div>

          <Button 
            type="submit" 
            color="primary" 
            fullWidth
            isDisabled={!acceptTerms}
          >
            Register
          </Button>
          
          <p className="text-center text-sm text-default-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary text-sm">
              Login
            </Link>
          </p>
        </form>
        <Divider className="my-4" />
        <Button 
          onClick={handleLogin}
          color="default"
          fullWidth
          startContent={<GithubIcon />}
        >
          Register with GitHub
        </Button>
      </CardBody>
    </Card>
  );
}

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
); 