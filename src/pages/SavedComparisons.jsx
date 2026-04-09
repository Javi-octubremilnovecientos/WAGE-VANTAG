import React from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { BarChart3, Trash2, ChevronRight, Plus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export default function SavedComparisons() {
  const queryClient = useQueryClient();

  const { data: comparisons = [], isLoading } = useQuery({
    queryKey: ['comparisons'],
    queryFn: () => base44.entities.WageComparison.list('-created_date'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.WageComparison.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['comparisons'] }),
  });

  return (
    <div className="min-h-screen pb-16">
      <div className="max-w-lg mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-8 mb-6"
        >
          <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="font-heading text-2xl font-bold mb-1">Saved Comparisons</h1>
          <p className="text-sm text-muted-foreground">Your previously saved wage comparisons</p>
        </motion.div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-card border border-border rounded-xl p-4 animate-pulse">
                <div className="h-4 bg-muted rounded w-1/2 mb-2" />
                <div className="h-3 bg-muted rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : comparisons.length > 0 ? (
          <div className="space-y-3">
            {comparisons.map((comp, idx) => (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-card border border-border rounded-xl p-4"
              >
                <div className="flex items-center justify-between">
                  <Link
                    to={`/wage-comparison?countries=${comp.countries?.join(',')}&wage=${comp.form_data?.wage || 0}`}
                    className="flex items-center gap-3 flex-1"
                  >
                    <div className="w-9 h-9 rounded-lg bg-secondary/20 flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{comp.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {comp.created_date ? format(new Date(comp.created_date), 'MMM d, yyyy') : ''}
                      </p>
                    </div>
                  </Link>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => deleteMutation.mutate(comp.id)}
                      className="p-2 text-destructive/60 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-muted/30 rounded-2xl p-8 text-center">
            <BarChart3 className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground mb-3">No comparisons saved yet</p>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-primary font-medium"
            >
              <Plus className="w-3 h-3" />
              Start comparing
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}