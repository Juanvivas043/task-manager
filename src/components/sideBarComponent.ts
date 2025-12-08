import { appRouter } from "../main"
import { getSession, signOut } from "../services/auth"

export async function sideBarComponent(){
    const session = await getSession()
    const headerContainer = /*html*/ `
    <aside class="bg-blue-600 text-white hidden lg:flex lg:flex-col justify-between p-8">
        <div class="flex flex-row gap-3 bg-white p-5 rounded-md">
            <svg class="text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2H2V12C2 12.5304 2.21071 13.0391 2.58579 13.4142C2.96086 13.7893 3.46957 14 4 14H14V4C14 3.46957 13.7893 2.96086 13.4142 2.58579C13.0391 2.21071 12.5304 2 12 2Z"></path>
                <path d="M18 10V22H10V18"></path>
                <path d="M22 10H14V18H22Z"></path>
            </svg>
            <h2 class="text-xl text-blue-500 font-semibold">Trellito</h2>
        </div>
        <div class="flex flex-col gap-5">
            <div class="flex flex-row gap-2 hover:scale-101 transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <a href="#" class="text-md font-semibold">Mi Perfil</a>
            </div>

            <div class="flex flex-row gap-2 hover:scale-101 transform duration-300">
                <svg class="text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                <a href="#" class="text-md font-semibold">Mis Espacios</a>
            </div>
        </div>
        <div class="flex flex-col gap-5 w-full">
            <h4 class="text-left text-md font-semibold">${session.session?.user.email}</h4>
            <button type="submit" id="logout" class="flex flex-row gap-3 bg-gray-600 text-center p-3 rounded-md font-bold text-white hover:cursor-pointer hover:bg-red-700 transform duration-200 hover:scale-101">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Cerrar sesion
            </button>
        </div>
    </aside>
    
    <aside id="sideBarMobileContainer" class="bg-blue-600 text-white hidden absolute h-screen flex-col lg:hidden justify-between p-8">
        <div class="flex flex-row gap-3 bg-white p-5 rounded-md">
            <svg class="text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2H2V12C2 12.5304 2.21071 13.0391 2.58579 13.4142C2.96086 13.7893 3.46957 14 4 14H14V4C14 3.46957 13.7893 2.96086 13.4142 2.58579C13.0391 2.21071 12.5304 2 12 2Z"></path>
                <path d="M18 10V22H10V18"></path>
                <path d="M22 10H14V18H22Z"></path>
            </svg>
            <h2 class="text-xl text-blue-500 font-semibold">Trellito</h2>
        </div>
        <div class="flex flex-col gap-5">
            <div class="flex flex-row gap-2 hover:scale-101 transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <a href="#" class="text-md font-semibold">Mi Perfil</a>
            </div>

            <div class="flex flex-row gap-2 hover:scale-101 transform duration-300">
                <svg class="text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                <a href="#" class="text-md font-semibold">Mis Espacios</a>
            </div>
        </div>
        <div class="flex flex-col gap-5 w-full">
            <h4 class="text-left text-md font-semibold">${session.session?.user.email}</h4>
            <button type="submit" id="logoutMobile" class="flex flex-row gap-3 bg-gray-600 text-center p-3 rounded-md font-bold text-white hover:cursor-pointer hover:bg-red-700 transform duration-200 hover:scale-101">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Cerrar sesion
            </button>
        </div>
    </aside>
    
    <button id="sideBarClose" class="lg:hidden hidden shadow-sm shadow-black/70 p-2 rounded-full absolute text-blue-500 top-15 right-15">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 12H5"></path>
            <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
    </button>

    <button id="sideBarOpen" class="lg:hidden shadow-sm shadow-black/70 p-2 rounded-full absolute text-blue-500 bottom-15 left-15">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"></path>
            <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
    </button>
    `
    return headerContainer
}

export async function siderBarEvents() {
    const botonLogOut = document.querySelector("#logout")
    const botonLogoutMobile = document.querySelector("#logoutMobile")
    const sideBarClose = document.querySelector("#sideBarClose")
    const sideBarOpen = document.querySelector("#sideBarOpen")
    const sideBarMobileContainer = document.querySelector("#sideBarMobileContainer")

    if(!botonLogOut || !botonLogoutMobile || !sideBarClose || !sideBarMobileContainer || !sideBarOpen) return

    sideBarClose.addEventListener("click", async (e) => {
        e.preventDefault()
        
        sideBarMobileContainer.classList.remove("animate-slide-in-right")
        sideBarMobileContainer.classList.add("animate-slide-out-left")
        
        sideBarOpen.classList.remove("hidden")
        sideBarOpen.classList.remove("animate-slide-out-left")
        sideBarOpen.classList.add("animate-slide-in-right")

        sideBarClose.classList.remove("animate-slide-in-left")
        sideBarClose.classList.add("animate-slide-out-right")

        setTimeout(() => {
            sideBarMobileContainer.classList.add("hidden")
            sideBarMobileContainer.classList.remove("flex")
            sideBarClose.classList.add("hidden")
        }, 300)
    })

    sideBarOpen.addEventListener("click", async (e) => {
        e.preventDefault()
        
        sideBarMobileContainer.classList.remove("hidden")
        sideBarMobileContainer.classList.add("flex")
        sideBarMobileContainer.classList.remove("animate-slide-out-left")
        sideBarMobileContainer.classList.add("animate-slide-in-right")

        sideBarOpen.classList.remove("animate-slide-in-right")
        sideBarOpen.classList.add("animate-slide-out-left")

        sideBarClose.classList.remove("hidden")
        sideBarClose.classList.remove("animate-slide-out-right")
        sideBarClose.classList.add("animate-slide-in-left")

        setTimeout(() => {
            sideBarOpen.classList.add("hidden")
        }, 300)
    })

    botonLogOut.addEventListener("click", async (e) => {
        e.preventDefault()
        await signOut()

        appRouter()
    })

    botonLogoutMobile.addEventListener("click", async (e) => {
        e.preventDefault()
        await signOut()

        appRouter()
    })
}
    