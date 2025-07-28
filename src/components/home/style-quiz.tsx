
'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { recommendStyle, type StyleQuizInput, type StyleQuizOutput } from '@/ai/flows/style-quiz-flow';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Step = 'color' | 'vibe' | 'activity' | 'result';

const quizData = {
  color: {
    title: 'What colors call to you?',
    options: [
      { value: 'Pastels', label: 'Pastels & Pinks', image: 'https://placehold.co/400x300.png', hint: 'pastel aesthetic' },
      { value: 'Darks', label: 'Black & Burgundy', image: 'https://placehold.co/400x300.png', hint: 'dark academia' },
      { value: 'Brights', label: 'Bold & Bright', image: 'https://placehold.co/400x300.png', hint: 'bright fashion' },
    ],
  },
  vibe: {
    title: 'What\'s your desired vibe?',
    options: [
      { value: 'Cute', label: 'Doll-like & Cute', image: 'https://placehold.co/400x300.png', hint: 'porcelain doll' },
      { value: 'Elegant', label: 'Mysterious & Elegant', image: 'https://placehold.co/400x300.png', hint: 'victorian portrait' },
      { value: 'Bold', label: 'Confident & Glamorous', image: 'https://placehold.co/400x300.png', hint: 'fashion model' },
    ],
  },
  activity: {
    title: 'Choose a magical activity:',
    options: [
      { value: 'Tea party', label: 'A Garden Tea Party', image: 'https://placehold.co/400x300.png', hint: 'tea party' },
      { value: 'Concert', label: 'A Midnight Concert', image: 'https://placehold.co/400x300.png', hint: 'rock concert' },
      { value: 'Shopping', label: 'A Chic Shopping Spree', image: 'https://placehold.co/400x300.png', hint: 'luxury shopping' },
    ],
  },
};

export function StyleQuiz() {
  const [step, setStep] = useState<Step>('color');
  const [answers, setAnswers] = useState<Partial<StyleQuizInput>>({});
  const [result, setResult] = useState<StyleQuizOutput | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleAnswer = (question: keyof StyleQuizInput, value: string) => {
    const newAnswers = { ...answers, [question]: value };
    setAnswers(newAnswers);

    if (step === 'color') setStep('vibe');
    else if (step === 'vibe') setStep('activity');
    else if (step === 'activity') {
      getRecommendation(newAnswers as StyleQuizInput);
      setStep('result');
    }
  };

  const getRecommendation = (finalAnswers: StyleQuizInput) => {
    startTransition(async () => {
      const recommendation = await recommendStyle(finalAnswers);
      setResult(recommendation);
    });
  };
  
  const resetQuiz = () => {
    setStep('color');
    setAnswers({});
    setResult(null);
  }

  const renderQuestion = (questionKey: 'color' | 'vibe' | 'activity') => {
    const question = quizData[questionKey];
    return (
      <div className="text-center animate-fadeIn">
        <h3 className="font-headline text-3xl text-primary">{question.title}</h3>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {question.options.map(option => (
            <Card
              key={option.value}
              onClick={() => handleAnswer(questionKey, option.value)}
              className="cursor-pointer group overflow-hidden hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <Image src={option.image} alt={option.label} fill className="object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint={option.hint} />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-lg">{option.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };
  
  const renderResult = () => (
    <div className="text-center animate-popIn flex flex-col items-center">
        {isPending ? (
            <>
                <Loader2 className="h-16 w-16 text-primary animate-spin" />
                <p className="mt-4 text-muted-foreground">Finding your magical match...</p>
            </>
        ) : result ? (
            <>
                <p className="text-muted-foreground">Your magical style is...</p>
                <h3 className="font-headline text-5xl text-primary text-shadow-magic mt-2">
                    {result.style}
                    <span className="ml-2">{result.icon}</span>
                </h3>
                <p className="mt-4 max-w-prose text-lg">{result.description}</p>
                 <Button className="mt-8 rounded-full" size="lg">Shop {result.style} style</Button>
                <Button variant="link" onClick={resetQuiz} className="mt-2 text-primary">Or take the quiz again!</Button>
            </>
        ) : (
            <p>Something magical went wrong. Please try again!</p>
        )}
    </div>
  )

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-primary/5 p-8 md:p-12 rounded-3xl shadow-xl border-2 border-primary/20">
            <CardHeader className="text-center p-0 mb-8">
                <div className="flex justify-center text-primary mb-2">
                    <Wand2 className="h-10 w-10" />
                </div>
                <CardTitle className="font-headline text-4xl md:text-5xl text-primary text-shadow-magic">
                    Find Your Magical Style
                </CardTitle>
                <CardDescription className="text-lg mt-2 text-foreground/70 max-w-2xl mx-auto">
                    Answer three simple questions and our magic stylist will find the perfect look for you!
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0 min-h-[300px] flex items-center justify-center">
                {step === 'color' && renderQuestion('color')}
                {step === 'vibe' && renderQuestion('vibe')}
                {step === 'activity' && renderQuestion('activity')}
                {step === 'result' && renderResult()}
            </CardContent>
        </Card>
      </div>
    </section>
  );
}
