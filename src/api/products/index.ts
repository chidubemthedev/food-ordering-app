import { supabase } from "@/app/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProductList = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("name", { ascending: true });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useInsertProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: any) => {
      const { data, error } = await supabase
        .from("products")
        .insert({
          name: product.name,
          image: product.image,
          price: product.price,
        })
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product: any) => {
      const { data, error } = await supabase
        .from("products")
        .update({
          name: product.name,
          image: product.image,
          price: product.price,
        })
        .eq("id", product.id)
        .select()
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: async (_, data) => {
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["products", data.id],
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data, error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};
