"use server"
import { createClient } from "@/utils/supabase/server"
import { Player,User } from "./type"


export const getPlayer = async(gameId: string):Promise<Player[]> =>{
    const supabase = createClient()
    const { data:player, error } = await supabase
  .from('players')
  .select(`
    user_auth_id,
    coins,
    userprofile (
      name
    )
  `)
.eq('game_id',gameId)
const result: Player[] = []
player?.map((play) => {
    result.push(
        {
            name: play.userprofile.name,
            coin: play.coins
        }
    )

})
console.log(result)
   
    return result
}