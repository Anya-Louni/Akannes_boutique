import { SignUp } from '@clerk/nextjs';
import { Sparkles } from 'lucide-react';

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] p-4 bg-gradient-to-br from-pink-50/50 to-rose-50/30">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Sparkles className="h-8 w-8 text-pink-600" />
          </div>
          <h1 className="text-4xl font-headline font-bold text-pink-700 text-shadow-magic">
            Join the Magic
          </h1>
          <p className="text-pink-600/70 mt-2">Create your enchanted account</p>
        </div>
        <div className="glass-surface rounded-2xl p-8 border-2 border-pink-200/50">
          <SignUp 
            appearance={{
              elements: {
                formButtonPrimary: 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform',
                card: 'bg-transparent shadow-none',
                headerTitle: 'text-pink-700 font-headline text-2xl font-bold',
                headerSubtitle: 'text-pink-600/70',
                socialButtonsIconButton: 'border-pink-200 hover:bg-pink-50 text-pink-700 rounded-xl',
                formFieldInput: 'bg-white/80 border-pink-200 rounded-xl focus:border-pink-400 text-pink-900',
                formFieldLabel: 'text-pink-700 font-semibold',
                footerActionLink: 'text-pink-600 hover:text-pink-700 font-semibold',
                dividerLine: 'bg-pink-200',
                dividerText: 'text-pink-600/70',
                formFieldInputShowPasswordButton: 'text-pink-600 hover:text-pink-700',
                identityPreviewText: 'text-pink-700',
                formResendCodeLink: 'text-pink-600 hover:text-pink-700',
                otpCodeFieldInput: 'border-pink-200 focus:border-pink-400'
              },
              layout: {
                socialButtonsPlacement: 'top'
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
