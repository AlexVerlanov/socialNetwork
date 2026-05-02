import {useSelector} from 'react-redux'
import {RootState} from "../redux/redux-store";


export const useAppSelector = useSelector.withTypes<RootState>()
