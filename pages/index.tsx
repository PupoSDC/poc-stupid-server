import { unknown, z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "../src/zodResolver";
import { FunctionComponent } from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";

type FormSchemaType = {
  name: string,
}

const formSchema : z.ZodSchema<FormSchemaType> = z.object({
  name: z.string().min(3, "nameToShort"),
})

export const FormError : FunctionComponent<{ error: any}> = ({
  error,
}) => {
  const { t } = useTranslation('formErrors');
  console.log(error);
  return error ? <span>{t(error.message, error.other)}</span> : null;
}


export default function Home() {
  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (data: unknown) => alert(data);


  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <input defaultValue="1" {...register("name")} />
      <FormError error={errors["name"]} />
    
        
      <input type="submit" />
    </form>
  )
}

export async function getStaticProps({ locale = "en" }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['formErrors'])),
    },
  };
}