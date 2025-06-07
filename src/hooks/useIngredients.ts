
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { useToast } from './use-toast';

export const useIngredients = () => {
  return useQuery({
    queryKey: ['ingredients'],
    queryFn: () => apiService.getIngredients(),
  });
};

export const useIngredient = (id: string) => {
  return useQuery({
    queryKey: ['ingredients', id],
    queryFn: () => apiService.getIngredient(id),
    enabled: !!id,
  });
};

export const useCreateIngredient = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (ingredientData: any) => apiService.createIngredient(ingredientData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ingredients'] });
      toast({
        title: "Ingredient created",
        description: "Ingredient has been successfully created.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create ingredient. Please try again.",
        variant: "destructive",
      });
      console.error('Create ingredient error:', error);
    },
  });
};

export const useUpdateIngredient = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      apiService.updateIngredient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ingredients'] });
      toast({
        title: "Ingredient updated",
        description: "Ingredient has been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update ingredient. Please try again.",
        variant: "destructive",
      });
      console.error('Update ingredient error:', error);
    },
  });
};

export const useDeleteIngredient = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => apiService.deleteIngredient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ingredients'] });
      toast({
        title: "Ingredient deleted",
        description: "Ingredient has been successfully deleted.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete ingredient. Please try again.",
        variant: "destructive",
      });
      console.error('Delete ingredient error:', error);
    },
  });
};
