import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-headline text-center mb-8 text-primary">
          Welcome Back
        </h1>
        <div className="glass-surface rounded-2xl p-8">
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
                card: 'bg-transparent shadow-none',
                headerTitle: 'text-primary font-headline',
                headerSubtitle: 'text-muted-foreground',
                socialButtonsIconButton: 'border-border hover:bg-muted',
                formFieldInput: 'bg-background border-border',
                footerActionLink: 'text-primary hover:text-primary/80'
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
