import React from 'react';
import { CheckCircle2, Info, AlertCircle, X, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Toast = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isGold = toast.type === 'gold';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 shadow-2xl border transition-all duration-300 animate-fade-in-up flex items-start space-x-3 ${
              isGold
                ? 'bg-charcoal text-warm-50 border-gold-500/60 shadow-gold-glow'
                : isError
                ? 'bg-red-950 text-white border-red-800'
                : 'bg-white text-charcoal border-warm-300'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isGold ? (
                <Sparkles className="w-5 h-5 text-gold-400" />
              ) : isError ? (
                <AlertCircle className="w-5 h-5 text-red-400" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-gold-600" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className={`text-xs uppercase tracking-wider font-bold mb-0.5 ${
                isGold ? 'text-gold-300' : isError ? 'text-red-300' : 'text-charcoal'
              }`}>
                {toast.title}
              </h4>
              <p className={`text-xs leading-relaxed ${
                isGold ? 'text-warm-200' : isError ? 'text-red-100' : 'text-charcoal-500'
              }`}>
                {toast.message}
              </p>
            </div>

            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className={`p-1 rounded hover:bg-black/10 transition-colors shrink-0 ${
                isGold ? 'text-warm-300 hover:text-white' : 'text-charcoal-400 hover:text-charcoal'
              }`}
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
