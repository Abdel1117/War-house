import {  useAppDispatch } from "../../app/hooks"
import { increment, decrement } from "../../features/counter/counterSlice"

const BouttonBox = () => {


    const dispatch = useAppDispatch()
    

  return (
    <div className="flex items-center justify-between border-2">
        <button className="outline-none border border-white rounded-md w-[100px] h-[40px] text-white font-bold"  onClick={() => {dispatch(increment())}}>+</button>
        <button className="outline-none border border-white rounded-md w-[100px] h-[40px] text-white font-bold"  onClick={() => {dispatch(decrement())}}>-</button>

    </div>
  )
}

export default BouttonBox