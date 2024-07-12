import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { AuthHeader } from "./components/AuthHeader";
import { Button } from "../../components/ui/button";
import { FormInput } from "../../components/form-input";
import { Separator } from "../../components/ui/separator";
import { useToast } from "../../components/ui/use-toast";
import { SignInData, signInSchema } from "./schemas/signInSchema";
import { SignIn } from "./api/auth.service";
import { useAuth } from "../../context/AuthContext";

export function SignInPage() {
  const { reset, handleSubmit, control } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  });

  const { toast } = useToast();
  const { login } = useAuth();
  const queryClient = useQueryClient();

  const { mutateAsync: signIn } = useMutation({
    mutationFn: async (data: SignInData) => {
      return SignIn(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
    },
  });

  const onSubmit = async (data: SignInData): Promise<void> => {
    try {
      const token = await signIn(data);
      login(token);

      reset();
    } catch (err: any) {
      toast({ title: err.response.data.message, status: "error" });
    }
  };

  return (
    <div className="flex size-full flex-col">
      <AuthHeader />
      <div className="grid size-full grid-cols-1 lg:grid-cols-2">
        <div className="flex size-full flex-col items-center justify-center bg-[#574436]">
          <strong className="text-4xl font-semibold text-zinc-50">
            Tecnologia e Saúde
          </strong>
          <span className="mt-1 text-lg text-zinc-300">
            Soluções integradas e personalizadas para sua clínica.
          </span>
          <Button className="mt-12 bg-white bg-opacity-15 hover:bg-white/20 ">
            Conheça a ClinicBoost
          </Button>
        </div>
        <div className="flex size-full flex-col items-center justify-center">
          <div className="mb-12 flex w-1/2 flex-col">
            <span className="text-3xl text-mesLightBlue">Olá,</span>
            <strong className="text-5xl text-mesDarkBlue">Bem vindo!</strong>
          </div>
          <form
            className="flex w-1/2 flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormInput
              control={control}
              name="email"
              label="Email"
              required
              placeholder="Informe o email"
            />
            <FormInput
              control={control}
              name="password"
              label="Senha"
              required
              placeholder="Informe a senha"
            />
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <Button type="submit" className="h-12 w-full text-base">
                Entrar
              </Button>
              <Separator className="bg-zinc-300" />
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm text-zinc-500">
                  Ainda não possui conta?
                </span>
                <Link
                  to="/sign-up"
                  className="text-sm text-blue-500 transition-all hover:text-blue-400"
                >
                  Cadastrar-se
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
