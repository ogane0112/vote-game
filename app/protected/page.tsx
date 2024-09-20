import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Room from '@/components/start/GameStartScreen'

export default async function ProtectedPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/sign-in')
  }

  return (
    <>
      <Room />
    </>
  )
}
