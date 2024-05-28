'use client'

import * as z from "zod"

import { useTransition } from "react"
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import  {LoginSchema} from "@/schemas"
import { Button } from "../ui/button"
import {Input} from "../ui/input"
import { Form, FormControl, FormItem, FormField, FormLabel, FormMessage} from "../ui/form"
import CardWrapper from "./card-wrapper"
import FormError from "../form-error"
import FormSuccess from "../form-success"
import { login } from "@/actions/login"

const LoginForm = () => {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues:{
      email:"",
      password:"",
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>)=>{
    login(values)
  }
  return (
    <CardWrapper
     headerLabel="Welcome back"
     backButtonLabel="Don't have an account?"
     backButtonHref="/auth/register"
     showSocial
     >
       <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                         { ...field }
                         placeholder="John.doe@example.com"
                         type="email"
                       />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                         {...field}
                         placeholder= "******"
                         type = "password"
                       />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
            <FormError message=""/>
            <FormSuccess message=""/>
            <Button
             type="submit"
             className="w-full"
             >
              Login
            </Button>
          </form>
       </Form>
    </CardWrapper>
  )
}

export default LoginForm
