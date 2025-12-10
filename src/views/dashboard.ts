import { SideBarDesktop, SideBarMobile, siderBarEvents } from "../components/sideBarComponent"
import { worksSpacesComponent } from "./workspace"

export async function dashboardPage() {

    let objetosPrueba = [
        {id: 1, title: "Miune2", descripcion: "Espacios de trabajo para gestionar tareas de miune2"},
        {id: 2, title: "Espacioseo", descripcion: "Espacios de trabajo para gestionar tareas de Espacioseo"},
        {id: 3, title: "Profit", descripcion: "Espacios de trabajo para gestionar tareas de Profit"},
        {id: 4, title: "Profit", descripcion: "Espacios de trabajo para gestionar tareas de Profit"}
    ]

    const dashboardPageContenedor = /*html*/ `
    ${await SideBarMobile()}
    <section class="flex flex-row h-screen animate-fade-in-up">
        ${await SideBarDesktop()}
        <div class="flex flex-col bg-white w-full p-20 gap-8">
            <h1 class="text-3xl font-semibold">Bienvenido a <span class="text-md text-blue-500 font-semibold">Trellito</span>!</h1>
            <p class="text-gray-500 text-md">Puedes comenzar creando un espacio de trabajo para organizar tus tareas.</p>

            <div class="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-15 w-auto md:mt-15">
                ${objetosPrueba ? objetosPrueba.map((objeto) => {
                    return /*html*/ `
                        <div id="contenedorNumeroId" class="col-span-1 bg-blue-500 rounded-xl flex flex-col justify-end pt-25 shadow-md shadow-black relative hover:cursor-pointer hover:scale-101 transform duration-300">
                            <div class="flex flex-row justify-between items-center bg-gray-800 text-white font-semibold rounded-b-xl h-17 px-5">                                                                
                                <div class="break-all">
                                    <h2 class="">${objeto.title}</h2>
                                </div>
                                <div>
                                    <button id="botonMenuElemento">...</button>
                                    
                                    <div id="contenedorOpciones" class="absolute hidden bg-white text-black font-semibold z-10 rounded-xl shadow-xs shadow-black p-5">
                                        Editar
                                    </div>

                                </div>
                            </div>
                        </div>
                        `
                
                }).join('') : `<div class="col-span-3 text-gray-900 text-md"> No hay ningun espacio de trabajo. Empieza creando uno! </div>`}
            </div>
        </div>
    </section>
    `
    

    return dashboardPageContenedor

}

export async function dashboardPageEvents() {
    await siderBarEvents()

    const botonToogleOpciones = document.querySelector("#botonMenuElemento")
    const contenedorOpciones = document.querySelector("#contenedorOpciones")
    const contenedorNumeroId = document.querySelector("#contenedorNumeroId")

    botonToogleOpciones?.addEventListener("click", () => {
        contenedorOpciones?.classList.add("animate-fade-in-up")
        contenedorOpciones?.classList.remove("hidden")
    })

    contenedorNumeroId?.addEventListener("click", async () => {
        await worksSpacesComponent()
    })
}
