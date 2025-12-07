import { headerComponent } from "../components/headerComponent"
import { signOut } from "../services/auth"

export async function dashboardPage() {
    const headerContenedor = await headerComponent()

    const dashboardContenedor = /*html*/ `
    <div class="bg-red-200">
        <h1>Dashboard</h1>
    </div>`

    const dashboardPageContenedor = headerContenedor + dashboardContenedor

    return dashboardPageContenedor

}

signOut()
