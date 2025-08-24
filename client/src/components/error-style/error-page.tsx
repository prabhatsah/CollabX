import React from 'react';
import MovingPig from './moving-pig';
import { cn } from '@/lib/utils';

const ErrorPage = () => {
  return (
    <div
      className={cn(' fixed inset-0 flex flex-col items-center justify-center')}
    >
      <MovingPig />
      <div className="text-center">
        <label className="text-3xl font-bold text-destructive/50">
          Whoops !!!
        </label>
        <p className="text-white/50 text-md">
          It looks like one of the developers fell asleep
        </p>
        <p className="m-5 border-t"></p>
        <a className="text-blue-500" href="/home">
          Back to Home Page
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
