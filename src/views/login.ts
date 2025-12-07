import { signIn } from "../services/auth"
import { type LoginCredentials, type RegisterCredentials } from "../types/definitions"
import { appRouter } from "../main"

export async function loginPage(): Promise<string> {
    const loginPageContenedor: string = /*html*/ `
    <section id="contenedorForm" class="flex items-center justify-center bg-[url(/fondologin.webp)] h-screen bg-cover bg-center bg-black/50 bg-blend-overlay">
        <div class="flex flex-col items-center justify-center md:w-175 w-2/3 bg-white rounded-xl shadow-xl shadow-black animate-fade-in-up">
            <h1 class="text-3xl font-normal text-center px-4 py-4 mt-10">
                Inicia sesión en <span class="font-bold text-blue-500">Trellito</span>
            </h1>

            <div class="w-3/4 py-10 flex flex-col gap-8">
                <form id="formularioLogin" class="flex flex-col items-center justify-around gap-8">
                    <input type="email" placeholder="Correo electrónico" name="email" id="email" class="bg-gray-300/45 w-full p-4 rounded-full focus:outline-blue-500 focus:caret-blue-500 transform duration-200 text-sm"/>
                    <input type="password" placeholder="Contraseña" name="password" id="password" class="bg-gray-300/45 w-full p-4 rounded-full focus:outline-blue-500 focus:caret-blue-500 transform duration-200 text-sm"/>
                    <div id="error" class="text-white/0 h-3 text-xs text-center"></div>
                    <button type="submit" class="bg-blue-500 w-full p-3 rounded-full font-bold text-white hover:cursor-pointer hover:bg-blue-700 transform duration-200 hover:scale-101">Enviar</button>
                </form>

                <a id="formularioToggle" class="text-blue-500 text-center underline hover:cursor-pointer text-sm"></a>
            </div>
        </div>
    </section>`
    
    return loginPageContenedor

}

export async function RegisterPage(): Promise<string> {
    const RegisterPageContenedor: string = /*html*/ `
    <section id="contenedorForm" class="flex items-center justify-center bg-[url(/fondologin.webp)] h-screen bg-cover bg-center bg-black/50 bg-blend-overlay">
        <div class="flex flex-col items-center justify-center md:w-175 w-2/3 bg-white rounded-xl shadow-xl shadow-black animate-fade-in-up">
            <h1 class="text-3xl font-normal text-center px-4 py-4 mt-10">
                Registrate en <span class="font-bold text-blue-500">Trellito</span>
            </h1>

            <div class="w-3/4 py-10 flex flex-col gap-8">
                <form id="formularioRegister" class="flex flex-col items-center justify-around gap-8">
                    <div class="flex flex-row w-full gap-2">
                        <input type="text" placeholder="Nombre" name="nombre" id="nombre" class="bg-gray-300/45 w-full p-4 rounded-full focus:outline-blue-500 focus:caret-blue-500 transform duration-200 text-sm"/>
                        <input type="text" placeholder="Apellido" name="apellido" id="apellido" class="bg-gray-300/45 w-full p-4 rounded-full focus:outline-blue-500 focus:caret-blue-500 transform duration-200 text-sm"/>
                    </div>
                    <input type="text" placeholder="Usuario" name="username" id="username" class="bg-gray-300/45 w-full p-4 rounded-full focus:outline-blue-500 focus:caret-blue-500 transform duration-200 text-sm"/>
                    <input type="email" placeholder="Correo electrónico" name="email" id="email" class="bg-gray-300/45 w-full p-4 rounded-full focus:outline-blue-500 focus:caret-blue-500 transform duration-200 text-sm"/>
                    <input type="password" placeholder="Contraseña" name="password" id="password" class="bg-gray-300/45 w-full p-4 rounded-full focus:outline-blue-500 focus:caret-blue-500 transform duration-200 text-sm"/>
                    <div id="error" class="text-white/0 h-3 text-xs text-center"></div>
                    <button type="submit" class="bg-blue-500 w-full p-3 rounded-full font-bold text-white hover:cursor-pointer hover:bg-blue-700 transform duration-200 hover:scale-101">Enviar</button>
                </form>

                <a id="formularioToggle" class="text-blue-500 text-center underline hover:cursor-pointer text-sm"></a>
            </div>
        </div>
    </section>`
    
    return RegisterPageContenedor

}

export async function loginPageEvents(): Promise<void> {
    const formLogin: HTMLFormElement | null = document.querySelector("#formularioLogin");
    const formToggle: HTMLAnchorElement | null = document.querySelector("#formularioToggle");
    const contenedorForm: HTMLDivElement | null = document.querySelector("#contenedorForm");

    if(!contenedorForm || !formToggle || !formLogin) return 
    
    const divApp = contenedorForm.parentElement;
    formToggle.innerHTML += "No tienes una cuenta? Registrate";

    formToggle.addEventListener("click", async (e: Event) => {
        e.preventDefault();
        (divApp as HTMLElement).innerHTML = "";
        (divApp as HTMLElement).innerHTML += await RegisterPage();
        await registerPageEvents();
        
    });

    formLogin.addEventListener("submit", async (e: Event) => {
        e.preventDefault()
        const emailInput : HTMLInputElement | null = document.querySelector("#email")
        const passwordInput : HTMLInputElement | null = document.querySelector("#password")
        const errorContainer: HTMLAnchorElement | null = document.querySelector("#error")

        if(!emailInput || !passwordInput || !errorContainer) return

        const emailValue: string = emailInput.value.trim()
        const passwordValue: string = passwordInput.value.trim()

        const {email, password, errorMessage} = await validateLoginCredentials({emailValue, passwordValue})

        if(errorMessage) {
            errorContainer.innerHTML = ""
            const error = /*html*/`
            <p class="text-red-500">${errorMessage}</p>
            `
            return errorContainer.innerHTML += error
        }

        const {user, session} = await signIn({email, password})

        if(!user || !session) return console.log("usuario no existe")

        await appRouter()
    
    });
}

export async function registerPageEvents(): Promise<void> {
    const formRegister: HTMLFormElement | null = document.querySelector("#formularioRegister");
    const formToggle: HTMLAnchorElement | null = document.querySelector("#formularioToggle");
    const contenedorForm: HTMLDivElement | null = document.querySelector("#contenedorForm");
    
    if(!contenedorForm || !formToggle || !formRegister) return 
    
    const divApp = contenedorForm.parentElement;
    formToggle.innerHTML += "Tienes una cuenta? Inicia sesión";

    formToggle.addEventListener("click", async (e: Event) => {
        e.preventDefault();
        (divApp as HTMLElement).innerHTML = "";
        (divApp as HTMLElement).innerHTML = await loginPage();
        await loginPageEvents();
    
    });

    formRegister.addEventListener("submit", async (e: Event) => {
        e.preventDefault()
        const nombreInput : HTMLInputElement | null = document.querySelector("#nombre")
        const apellidoInput : HTMLInputElement | null = document.querySelector("#apellido")
        const usernameInput : HTMLInputElement | null = document.querySelector("#username")
        const emailInput : HTMLInputElement | null = document.querySelector("#email")
        const passwordInput : HTMLInputElement | null = document.querySelector("#password")
        const errorContainer = document.querySelector("#error")

        if(!emailInput || !passwordInput || !errorContainer || !nombreInput || !apellidoInput || !usernameInput) return

        const nombreValue: string = nombreInput.value.trim()
        const apellidoValue: string = apellidoInput.value.trim()
        const usernameValue: string = usernameInput.value.trim()
        const emailValue: string = emailInput.value.trim()
        const passwordValue: string = passwordInput.value.trim()

        const {email, password, username, nombre, apellido, errorMessage} = await validateReisterCredentiales({nombreValue, apellidoValue, usernameValue, emailValue, passwordValue})

        if(errorMessage) {
            errorContainer.innerHTML = ""
            const error = /*html*/`
            <p class="text-red-500">${errorMessage}</p>
            `
            return errorContainer.innerHTML += error
        }

        console.log(email, password, username, nombre, apellido, errorMessage)
        //aprender expresiones regulares
        //metodo para crear cuenta, tengo que hacer un insert donde sea el mismo id e insertar los datos de nombre, apellido, usuario, created_at, updated_at
        //cuando se creee la cuenta redireccionar al dahsboard
        //Crear el inicio del dashboard y labarra lateral
    });
}

function validateLoginCredentials({emailValue, passwordValue, error}: {
    emailValue: string; 
    passwordValue: string;
    error?: string
}): LoginCredentials {

    if(!emailValue || !passwordValue) {
        return {
            email: "",
            password: "",
            errorMessage: "No pueden estar vacio los campos"
        }}

    if(passwordValue.length < 8) {
        return {
            email: "",
            password: "",
            errorMessage: "La constraseña debe ser mayor a 8 caracteres"
    }}

    if(!emailValue.includes("@")) {
        return {
            email: "",
            password: "",
            errorMessage: "Debe introducir un correo valido"
    }}
    
    const credentials: LoginCredentials  = {
        email: emailValue, 
        password: passwordValue,
        errorMessage: error || ""
    }

    return credentials

}


function validateReisterCredentiales({emailValue, passwordValue, usernameValue, nombreValue, apellidoValue, error}: {
    emailValue: string; 
    passwordValue: string;
    usernameValue: string;
    nombreValue: string;
    apellidoValue: string;
    error?: string
}): RegisterCredentials  {

    if(!emailValue || !passwordValue || !usernameValue || !nombreValue || !apellidoValue) {
        return {
            email: "",
            password: "",
            username: "",
            nombre: "",
            apellido: "",
            errorMessage: "No pueden estar vacio los campos"
        }}

    if(passwordValue.length < 8) {
        return {
            email: "",
            password: "",
            username: "",
            nombre: "",
            apellido: "",
            errorMessage: "La constraseña debe ser mayor a 8 caracteres"
    }}

    if(!emailValue.includes("@")) {
        return {
            email: "",
            password: "",
            username: "",
            nombre: "",
            apellido: "",
            errorMessage: "Debe introducir un correo valido"
    }}

    
    const credentials: RegisterCredentials  = {
        email: emailValue,
        password: passwordValue,
        username: usernameValue,
        nombre: nombreValue,
        apellido: apellidoValue,
        errorMessage: error || ""
    }

    return credentials

}



