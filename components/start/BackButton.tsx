import React from 'react'
import { SubmitButton } from '../submit-button'
import { signOutAction } from '@/utils/supabase/actions'

function BackButton() {
  return (
    <form>
      <SubmitButton
        formAction={signOutAction}
        pendingText='ローディング中...'
        className='w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition duration-300 ease-in-out'
      >
        ホーム画面へ戻る
      </SubmitButton>
    </form>
  )
}

export default BackButton
