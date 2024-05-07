import { useAppSelector } from '../../app/hooks'
import BouttonBox from '../../components/ButtonBox/BouttonBox'

const Accueil = () => {

  const count = useAppSelector((state) => state.counter.value)
 
  return (
    <div className=''>
      <p className='text-2xl'>Accueil</p>
        <p className='text-xl text-center'>{count}</p>
        <BouttonBox />
      </div>
  )
}

export default Accueil