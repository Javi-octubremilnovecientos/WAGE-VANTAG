import React from 'react';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PlanInfoCard({ name, price, features, highlighted = false, current = false }) {
  return (
    <div className={`rounded-2xl border p-6 transition-all ${
      highlighted
        ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
        : 'border-border bg-card'
    }`}>
      {current && (
        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full mb-3 inline-block">
          Current Plan
        </span>
      )}
      <h3 className="font-heading font-bold text-xl mb-1">{name}</h3>
      <p className="text-2xl font-heading font-bold mb-4">
        {price}
        {price !== 'Free' && <span className="text-sm font-normal text-muted-foreground">/mo</span>}
      </p>
      <div className="space-y-3 mb-6">
        {features.map((f, idx) => (
          <div key={idx} className="flex items-start gap-2.5 text-sm">
            {f.included ? (
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            ) : (
              <X className="w-4 h-4 text-muted-foreground/40 flex-shrink-0 mt-0.5" />
            )}
            <span className={f.included ? 'text-foreground' : 'text-muted-foreground/60'}>
              {f.text}
            </span>
          </div>
        ))}
      </div>
      {!current && (
        <Link
          to={highlighted ? "/plans" : "/"}
          className={`block w-full py-2.5 rounded-xl text-center text-sm font-semibold transition-opacity ${
            highlighted
              ? 'bg-primary text-primary-foreground hover:opacity-90'
              : 'bg-muted text-foreground hover:bg-muted/80'
          }`}
        >
          {highlighted ? 'Upgrade Now' : 'Get Started'}
        </Link>
      )}
    </div>
  );
}