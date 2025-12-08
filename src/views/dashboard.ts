import { sideBarComponent, siderBarEvents } from "../components/sideBarComponent"

export async function dashboardPage() {

    const dashboardPageContenedor = /*html*/ `
    <section class="flex flex-row h-screen">
        ${await sideBarComponent()}
        <div class="flex flex-col bg-white w-full p-20 gap-8">
            <h1 class="text-3xl font-semibold">Bienvenido a <span class="text-md text-blue-500 font-semibold">Trellito</span>!</h1>
            <p class="text-gray-500 text-md">Puedes comenzar creando un espacio de trabajo para organizar tus tareas.</p>
        </div>
    </section>
    `
    

    return dashboardPageContenedor

}

export async function dashboardPageEvents() {
    await siderBarEvents()
}
