import GameTest from "@/components/game/test/GameTest"
import { createClient } from "@/utils/supabase/server"


export default async function Page({ params }: { params: { id: string } }) {
     const supabase  = createClient()
     const {data,error} = await supabase.auth.getUser()

    return <GameTest gameId={params.id} userId={data?.id} />
  }