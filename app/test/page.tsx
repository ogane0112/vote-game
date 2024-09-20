import RegisterName from '@/components/profile/RegisterName'
import { Message } from '@/components/form-message'
const Page: React.FC<{ searchParams: Message }> = ({ searchParams }) => {
  return (
    <div className='game-container'>
      <RegisterName searchParams={searchParams} />
    </div>
  )
}

export default Page
