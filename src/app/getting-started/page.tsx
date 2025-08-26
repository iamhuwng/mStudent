// @module:platform-core @layer:ui @owner:studio
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, KeyRound, Database, Wand2 } from 'lucide-react';
import Link from 'next/link';

export default function GettingStartedPage() {
  const envFileContent = `# Firebase Service Account for project 'mstudent-9bs9s'
FIREBASE_PROJECT_ID="mstudent-9bs9s"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-...@mstudent-9bs9s.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"

# Iron Session (for encrypting cookies)
# Generate a random 32-character string for this: openssl rand -base64 32
SECRET_COOKIE_PASSWORD="a-secure-random-password-at-least-32-chars-long"

# Google AI / Gemini
GEMINI_API_KEY="your-gemini-api-key"
`;

  return (
    <div className="container p-4 md:p-8">
      <div className="space-y-2 mb-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold font-headline">Setup Your Environment</h1>
        <p className="text-muted-foreground">
          I have created a Firebase project for you named <code className='font-mono bg-muted p-1 rounded-md'>mstudent-9bs9s</code>.
          Follow these steps to connect your local environment to it.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Step 1: Set Up Your Environment File</CardTitle>
          <CardDescription>
            Create a file named <code>.env.local</code> in the root directory of this project. This file will store your secret keys and is ignored by Git.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p>Copy and paste the following content into your new <code>.env.local</code> file:</p>
          <pre className="p-4 rounded-md bg-muted text-sm overflow-x-auto">
            <code>
              {envFileContent}
            </code>
          </pre>
          <p>Next, you will replace the placeholder values by following the steps below.</p>
        </CardContent>
      </Card>

      <Separator className="my-8 max-w-4xl mx-auto" />

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Step 2: Get Firebase Server Credentials</CardTitle>
          <CardDescription>
            Your app's backend needs administrator access to your Firebase project.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
                <Database className="w-6 h-6 mt-1 text-primary"/>
                <div>
                    <h3 className="font-semibold">1. Go to your Firebase Project</h3>
                    <p className="text-sm text-muted-foreground">Navigate to the <Link href="https://console.firebase.google.com/" target="_blank" className="underline">Firebase Console</Link> and select the project with the ID <code className='font-mono bg-muted p-1 rounded-md'>mstudent-9bs9s</code>.</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <KeyRound className="w-6 h-6 mt-1 text-primary"/>
                <div>
                    <h3 className="font-semibold">2. Generate a Service Account Key</h3>
                    <p className="text-sm text-muted-foreground">
                        In the Firebase Console, go to <strong>Project Settings</strong> (click the gear icon next to "Project Overview") &gt; <strong>Service accounts</strong>.
                        Click on <strong>"Generate new private key"</strong>. A JSON file will be downloaded.
                    </p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <Terminal className="w-6 h-6 mt-1 text-primary"/>
                <div>
                    <h3 className="font-semibold">3. Update your <code>.env.local</code> file</h3>
                    <p className="text-sm text-muted-foreground">
                        Open the downloaded JSON file. Copy the <code>project_id</code>, <code>client_email</code>, and <code>private_key</code> values from the JSON file into the corresponding fields in your <code>.env.local</code> file.
                    </p>
                    <Alert variant="destructive" className="mt-2">
                      <AlertTitle>Important!</AlertTitle>
                      <AlertDescription>When you copy the <code>private_key</code>, make sure it remains a single line with <code>\n</code> characters for newlines, exactly as shown in the template above.</AlertDescription>
                    </Alert>
                </div>
            </div>
        </CardContent>
      </Card>
      
      <Separator className="my-8 max-w-4xl mx-auto" />

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Step 3: Get Your Gemini API Key</CardTitle>
          <CardDescription>
            The app uses the Gemini API for generative AI features.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
                <Wand2 className="w-6 h-6 mt-1 text-primary"/>
                <div>
                    <h3 className="font-semibold">1. Get API Key from Google AI Studio</h3>
                    <p className="text-sm text-muted-foreground">
                        Go to the <Link href="https://aistudio.google.com/app/apikey" target="_blank" className="underline">Google AI Studio</Link>.
                        Click on <strong>"Create API key"</strong> to get your key. Make sure the API is enabled for your new Firebase project.
                    </p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <Terminal className="w-6 h-6 mt-1 text-primary"/>
                <div>
                    <h3 className="font-semibold">2. Update your <code>.env.local</code> file</h3>
                    <p className="text-sm text-muted-foreground">
                        Copy the generated key and paste it as the value for <code>GEMINI_API_KEY</code> in your <code>.env.local</code> file. You will also need to generate a secure 32-character string for `SECRET_COOKIE_PASSWORD`.
                    </p>
                </div>
            </div>
        </CardContent>
      </Card>

    </div>
  );
}
