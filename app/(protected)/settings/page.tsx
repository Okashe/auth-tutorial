import { auth } from "@/auth"

const Settingspage = async() => {
    const session = await auth();
    
  return (
    <div>
      {JSON.stringify(session)}
    </div>
  )
}

export default Settingspage
