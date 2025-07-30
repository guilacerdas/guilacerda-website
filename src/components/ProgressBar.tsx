import React from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export default function ProgressBar({
  currentStep,
  totalSteps,
  className = "",
}: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">
          Etapa {currentStep} de {totalSteps}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className="h-2 transition-all duration-300 bg-red-600 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
