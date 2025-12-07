import { headerComponent } from "../components/headerComponent"
import { appRouter } from "../main"
import { signOut } from "../services/auth"

export async function dashboardPage() {
    const headerContenedor = await headerComponent()

    const dashboardContenedor = /*html*/ `
    <div class="bg-red-200">
        <h1>Dashboard</h1>
    </div>
    <button type="submit" id="logout" class="bg-blue-500 p-5 rounded-full font-bold text-white hover:cursor-pointer hover:bg-blue-700 transform duration-200 hover:scale-101">Cerrar Sesion</button>`
    

    const dashboardPageContenedor = headerContenedor + dashboardContenedor

    return dashboardPageContenedor

}

export async function dashboardPageEvents() {
    const botonLogOut = document.querySelector("#logout")

    if(!botonLogOut) return

    botonLogOut.addEventListener("click", async (e) => {
        e.preventDefault()
        await signOut()

        appRouter()
    })
}
