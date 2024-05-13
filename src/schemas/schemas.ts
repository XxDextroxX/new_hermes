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
    });

export const CreateUserSchema = z.object({
    name: z.string().min(1, {
        message: "Nombre requerido",
    }),
    userName: z.string().min(1, {
        message: "Usuario requerido",
    }),
    email: z.string().email({ message: "Email invalido" }),
});

export const CreateUserAntSchema = z.object({
    username: z.string().min(1, {
        message: "Usuario requerido",
    }),
    owner: z.string().optional(),

});

export const CreateEspciesSchema = z.object({
    serialFrom: z.string().min(1, {
      message: "Los números son inválidos",
    }),
    serialTo: z.string().min(1, {
      message: "Los números son inválidos",
    }),

  });

export const UpdateUserSchema = z.object({
    name: z.string().optional(),
    username: z.string().optional(),
    email: z.string().email({ message: "Email invalido" }).optional(),
    oldPassword: z.string().optional(),
    password: z.string().optional(),
  });

export const getReportUserSchema = z.object({
        from: z.string().min(1, {
            message: "Fecha de inicio requerida",
        }),
        to: z.string().min(1, {
            message: "Fecha de fin requerida",
        }),
  });

export const createRequesterSchema = z.object({
        name: z.string().min(1, {
            message: "Nombre requerido",
        }),
       
  });

export const createProvidersSchema = z.object({
        name: z.string().min(1, {
            message: "Nombre requerido",
        }),
        details: z.string().optional(),
       
  });

export const createProcessSchema = z.object({
       date: z.string().optional(),
       antUserId: z.string().optional(),
       requesterUserId: z.string().optional(),
       providerId: z.string().optional(),
       plate: z.string().min(1, {
           message: "Placa requerida",
       }),
       observations: z.string().optional(),
  });


    
