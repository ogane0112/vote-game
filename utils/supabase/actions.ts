'use server'

import { encodedRedirect } from '@/utils/utils'
import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'



//userIDを取得する関数
export const getUserId = async():Promise<string> => {
    const supabase = createClient()
    //userIDを取得する処理
    const {
      data: { user },
    } = await supabase.auth.getUser()
  
    if (!user) {
      return encodedRedirect('error', '/test', 'user認証に失敗しました！')
    }

    const authId = user?.id

    const { data, error } = await supabase
      .from('userprofile')
      .select('*')
      .eq('auth_id', authId)
      .single()

    console.log(data.id)

    return  data.id
}

//お題をランダムに取得する処理
export const getTheme = async () => {
  const supabase = createClient()

  const { data: theme, error } = await supabase.from('topics').select('*').order('random()')

  if (error) encodedRedirect('error', '/test', 'データ取得に失敗しました')

  return theme
}
export const entryPlayer = async() =>{
  const supabase = createClient()
    
  const { data, error } = await supabase
  .from('players')
  .insert([
    { some_column: 'someValue', other_column: 'otherValue' },
  ])
  .select()

}
//部屋へ入出する処理
export const enterRoom = async ():Promise<void> => {
  const supabase = createClient()
    
  const { data, error } = await supabase
  .from('players')
  .insert([
    { some_column: 'someValue', other_column: 'otherValue' },
  ])
  .select()
        
}
//部屋を作成する処理
export const makeRoom= async (): Promise<void>  => {
const supabase = createClient()
const userId = await getUserId()
const { data:topic, error } = await supabase
  .rpc('get_random_topic')
  .single();
const {data:games,error: createRoomError } = await supabase
.from('games')
.insert([
  { current_topic_id : topic.id, current_round: 0,status: "active",creator_id:  userId},
])
.select()
.single()
console.log(games)

    
// const { data:playerData, error } = await supabase
// .from('players')
// .insert([
//   { game_id: data[0].id, other_column: 'otherValue' },
// ])
// .select()



redirect(`/protected/room/${games.id}`)

}

//名前変更の処理
export const changeName = async (formData: FormData) => {
  const supabase = createClient()

  //userIDを取得する処理
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return encodedRedirect('error', '/test', 'user認証に失敗しました！')
  }

  const id = user?.id

  //userNameを更新する処理
  const { data, error } = await supabase
    .from('userprofile')
    .update({ other_column: 'otherValue' })
    .eq('auth_id', id)
    .select()

  if (error) {
    return encodedRedirect('error', '/test', 'エラーが発生しました')
  }
}

//初回名前登録の処理
export const registerName = async (formData: FormData) => {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const id = user?.id
  const name = formData.get('name')?.toString()
  const { error } = await supabase
    .from('userprofile')
    .insert([{ name: name, auth_id: id }])
    .select()
  if (error) {
    console.log(error)
    return encodedRedirect('error', '/test', '既に登録済みです！')
  } else {
    return redirect('/protected')
  }
}

export const signUpAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()
  const supabase = createClient()
  const origin = headers().get('origin')

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    console.error(error.code + ' ' + error.message)
    return encodedRedirect('error', '/sign-up', error.message)
  } else {
    return encodedRedirect(
      'success',
      '/sign-up',
      'Thanks for signing up! Please check your email for a verification link.'
    )
  }
}

export const signInAction = async (formData: FormData) => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return encodedRedirect('error', '/sign-in', error.message)
  }

  return redirect('/protected')
}

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString()
  const supabase = createClient()
  const origin = headers().get('origin')
  const callbackUrl = formData.get('callbackUrl')?.toString()

  if (!email) {
    return encodedRedirect('error', '/forgot-password', 'Email is required')
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  })

  if (error) {
    console.error(error.message)
    return encodedRedirect('error', '/forgot-password', 'Could not reset password')
  }

  if (callbackUrl) {
    return redirect(callbackUrl)
  }

  return encodedRedirect(
    'success',
    '/forgot-password',
    'Check your email for a link to reset your password.'
  )
}

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = createClient()

  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!password || !confirmPassword) {
    encodedRedirect(
      'error',
      '/protected/reset-password',
      'Password and confirm password are required'
    )
  }

  if (password !== confirmPassword) {
    encodedRedirect('error', '/protected/reset-password', 'Passwords do not match')
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  })

  if (error) {
    encodedRedirect('error', '/protected/reset-password', 'Password update failed')
  }

  encodedRedirect('success', '/protected/reset-password', 'Password updated')
}


//ログアウトする処理
export const signOutAction = async () => {
  const supabase = createClient()
  await supabase.auth.signOut()
  return redirect('/')
}


