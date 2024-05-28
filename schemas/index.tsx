import * as z from "zod"

import React from 'react'

export const LoginSchema = z.object({
  email: z.string().email({
    message:"Email is required"
  }),
  password:z.string().min(1,{
    message: "Password is required"
  })
})


