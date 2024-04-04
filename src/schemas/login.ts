import * as z from "zod"; 


export const LoginShema = z.object({
    userName: z.string().min(1,
        {
            message: "Nombre de usuario requerido",
        }
    ),
    password: z.string().min(1, {
        message: "Password requerido",
    }),
})

export const RecoveryPasswordSchema = z.object({
    email: z.string().email({ message: "Email invalido" }),
})

export const RecoveryCodeSchema = z.object({
    code: z.string().min(1,
        {
            message: "Código requerido",
        }
    ),
    password: z.string().min(1, {
        message: "Contraseña requerido",
    }),
    confirmPassword: z.string().min(1, {
        message: "Confirmar contraseña requerido",
    }),
    })
    
