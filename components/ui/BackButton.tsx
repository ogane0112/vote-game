import { SubmitButton } from '../submit-button'
import { signOutAction } from '@/app/actions'
function BackButton() {
  return (
    <SubmitButton
      formAction={signOutAction}
      pendingText='ローディング中...'
      className='w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition duration-300 ease-in-out'
    >
      ホーム画面へ戻る
    </SubmitButton>
  )
}

export default BackButton