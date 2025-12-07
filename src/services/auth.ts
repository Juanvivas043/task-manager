import type { UserAttributes } from "@supabase/supabase-js"
import { supabase } from "./client"

export async function signUp({ email, password }: UserAttributes){
  	if(!email || !password) return 

  	const { data: userSignUp , error: errorUserSignUp } = await supabase.auth.signUp({
    	email: email,
    	password: password
  	})

  	if(errorUserSignUp) {
    	throw new Error(errorUserSignUp.message)
  	} 

  	return userSignUp
}

export async function signIn({ email, password }: {
	email: string,
	password: string 
}) {
	if(!email || !password) return {
		email: '',
		password: ''
	}
  
  	const {data: userSignIn, error: errorUserSignIn} = await supabase.auth.signInWithPassword({
    	email: email,
    	password: password
  	})

  	if(errorUserSignIn) {
		throw new Error(errorUserSignIn.message)
  	}

  	return {
		user: userSignIn.user,
		session: userSignIn.session,
		weakPassword: userSignIn.weakPassword
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