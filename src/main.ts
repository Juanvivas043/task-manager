import { getSession } from "./services/auth";
import { loginPageEvents, loginPage } from "./views/login";
import { dashboardPage } from "./views/dashboard";
import "./style.css"

export async function appRouter() {
	let divParent: HTMLDivElement | null = document.querySelector("#app")
	
	if(!divParent) return
	divParent.innerHTML = ''

	const isSessionActive = await getSession()
	console.log(isSessionActive.session)

	if((isSessionActive.session !== null)) {
		return await dashboardPage().then((page) => {
			divParent.innerHTML += page
		})
	}
	
	return await loginPage().then((page) => {
		divParent.innerHTML += page
	}).then(() => {
		loginPageEvents()
	})

}

await appRouter()