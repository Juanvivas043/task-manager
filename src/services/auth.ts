import { supabase } from "./client"

const date = new Date
const fechaActual = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

export async function signUp({ email, password, username, nombre, apellido }: {
	email: string;
	password: string;
	username: string;
	nombre: string;
	apellido: string;
}){

  	if(!email || !password || !username || !nombre || !apellido) {
		return {
			errorMessage: 'Los campos no pueden estar vacio'
		}
	}

	if(password.length < 8) {
		return {
			errorMessage: 'La contraseña debe ser mayor a 8 caracteres'
		}
	}

	if(!email.includes("@")) {
		return {
			errorMessage: 'Debe escribir un correo valido'
		}
	}

  	const { data: userSignUp , error: errorUserSignUp } = await supabase.auth.signUp({
    	email: email,
    	password: password
  	})
	
	
	if(errorUserSignUp) {
		return {
			errorMessage: "El correo electronico ya esta registrado"
		}
	}

	const { error } = await supabase.from("profiles").update({
		username: username,
		first_name: nombre,
		last_name: apellido,
		avatar_url: '',
		updated_at: fechaActual,
		created_at: fechaActual,
		email: email
	}).eq("id", userSignUp.user?.id)

	if(error) {
		return {
			errorMessage: "Error al crear un perfil para el usuario"
		}
	}

  	return {
		errorMessage: ""
	}
}

export async function signIn({ email, password }: {
	email: string,
	password: string 
}) {
	if(!email || !password) {
		return {
			errorMessage: "Los campos no pueden estar vacios"
		}
	}

	if(password.length < 8) {
		return {
			errorMessage: 'La contraseña debe ser mayor a 8 caracteres'
		}
	}

	if(!email.includes("@")) {
		return {
			errorMessage: 'Debe escribir un correo valido'
		}
	}
  
  	const { error: errorUserSignIn } = await supabase.auth.signInWithPassword({
    	email: email,
    	password: password
  	})

  	if(errorUserSignIn) {
		return {
			errorMessage: "El correo electronico no esta registrado"
		}
  	}

  	return {
		errorMessage: ""
	}

}

export async function getSession() {
    const {data, error} = await supabase.auth.getSession()

    if(error) {
        throw new Error(error.message)
    }

    return data
}

export async function signOut() {
    const { error } = await supabase.auth.signOut()

    if(error) {
        throw new Error(error.message)
    }

}