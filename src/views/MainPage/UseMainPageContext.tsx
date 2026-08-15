import { createContext } from "react"
import type { UseMainPageReturn } from "./useMainPage"

const UseMainPageContext = createContext<UseMainPageReturn | null>(null)

export default UseMainPageContext
