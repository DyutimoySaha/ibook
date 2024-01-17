import { Link, useNavigate} from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react_query/queries'
import { useEffect } from 'react';
import { useUserContext } from '@/context/AuthContext';

const Topbar = () => {
    const {mutate: signOut, isSuccess} = useSignOutAccount();
    const navigate = useNavigate();
    const {user}= useUserContext();

    useEffect(( )=> {
      if (isSuccess) navigate(0);
    }, [isSuccess])

    
    return (
    <section className='topbar'>
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 item-center">
        <img 
        src="/assets/images/ibook.png"
        alt="logo"
        width={(130)}
        height={324}
          />
        </Link>

        <div className="flex gap-4">
          <Button variant="ghost" className="shad-button_ghost"
          onClick={()=> signOut()}>
            <img src="/assets/icons/logut.svg" alt="logout"/> 
          </Button>
          <Link to={'/profile/${user.id}'} className="flex-center gap-3">
            <img 
              src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
              alt="profile"
              className='h-8 w-8 rounded-full' 
              />
          </Link>
          </div>
      </div>
    </section>
  )
}

export default Topbar